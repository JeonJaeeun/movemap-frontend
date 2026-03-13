import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { View, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import {
    NaverMapView,
    NaverMapMarkerOverlay,
} from "@mj-studio/react-native-naver-map";
import * as Location from "expo-location";
import { S } from "./MapScreen.style";
import { Header } from "../../components/Map/Header/Header";
import { SearchBar } from "../../components/Map/SearchBar/SearchBar";
import { MapModal } from "../../components/Map/Modal/MapModal";
import ListLogo from "../../../assets/icons/Map/list.svg";
import MapLogo from "../../../assets/icons/Map/map.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    getFacility,
    getFacilitylist,
    getFacilityMarkers,
    getInitialFacility,
    getProgramlist,
    getProgramMarkers,
} from "../../api/map";
import { getMember } from "../../api/user";

import * as Notifications from "expo-notifications";
import { getDistance } from "../../utils/location/getDistance";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { registerDevice } from "../../api/notification";
import CustomText from "../../components/common/CustomText";

const DEFAULT_CAMERA = {
    latitude: 37.5666102,
    longitude: 126.9783881,
    zoom: 12,
};

const FloatingListButton = ({ onPress }) => (
    <S.ButtonContainer>
        <S.ListButtonWrapper onPress={onPress}>
            <CustomText
                style={{
                    marginRight: 5,
                    fontSize: 18,
                    color: "#10C838",
                    fontWeight: 500,
                }}
            >
                <ListLogo />
            </CustomText>
            <S.ListButtonText>List</S.ListButtonText>
        </S.ListButtonWrapper>
    </S.ButtonContainer>
);

const ITEM_TYPES = {
    FACILITIES: "facilities",
    PROGRAMS: "programs",
};

export default function MapScreen() {
    const mapRef = useRef(null);

    // 현재 위치 받아오기
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialCamera, setInitialCamera] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapReady, setMapReady] = useState(false);
    const [authError, setAuthError] = useState(null);

    // 학부모 => 알림 기능 x
    const [userRole, setUserRole] = useState("STUDENT");

    const mapModalRef = useRef(null);
    const [isListButtonVisible, setIsListButtonVisible] = useState(true);
    const [modalIndex, setModalIndex] = useState(-1);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [clusterMarkers, setClusterMarkers] = useState([]);

    const [facilityList, setFacilityList] = useState([]);
    const [filterType, setFilterType] = useState(null);
    const [isVoucherAvailable, setIsVoucherAvailable] = useState(false);

    const [searchKeyword, setSearchKeyword] = useState("");

    const [selectedMarkerId, setSelectedMarkerId] = useState(null);

    const [selectedType, setSelectedType] = useState(ITEM_TYPES.FACILITIES);

    // role 불러오기
    useEffect(() => {
        const loadRole = async () => {
            const role = await AsyncStorage.getItem("userRole");
            setUserRole(role || "STUDENT");
        };
        loadRole();
    }, []);

    useEffect(() => {
        const registerPushDevice = async () => {
            try {
                if (userRole !== "STUDENT") return;
    
                // 이미 등록돼있다면 스킵
                const saved = await AsyncStorage.getItem("deviceRegistered");
                if (saved === "true") return;
    
                // 권한 확인
                const perm = await Notifications.getPermissionsAsync();
                if (!perm.granted) {
                    const req = await Notifications.requestPermissionsAsync();
                    if (!req.granted) {
                        console.log("푸시 권한 거부됨");
                        return;
                    }
                }
    
                // Expo Push Token 가져오기
                const projectId =
                    Constants.expoConfig?.extra?.eas?.projectId ||
                    Constants.easConfig?.projectId;
    
                const tokenData =
                    await Notifications.getExpoPushTokenAsync({
                        projectId,
                    });
    
                const fcmToken = tokenData.data; // ← 백엔드는 이걸 fcmToken으로 받음!
    
                console.log("📌 EXPO PUSH TOKEN:", fcmToken);
    
                // deviceId 구성
                const deviceId =
                    Device.osInternalBuildId ??
                    Device.osBuildId ??
                    Device.deviceName ??
                    Math.random().toString(36).slice(2);
    
                const deviceType = Device.osName?.toUpperCase() || "ANDROID";
    
                // 서버로 등록
                await registerDevice({
                    fcmToken,
                    deviceType,
                    deviceId,
                });
    
                await AsyncStorage.setItem("deviceRegistered", "true");
                console.log("📌 디바이스 등록 성공:", deviceId);
            } catch (err) {
                console.error("❌ 디바이스 등록 실패:", err);
            }
        };
    
        registerPushDevice();
    }, [userRole]);    

    // 중복 알림 방지 저장 공간
    const notifiedFacilities = useRef(new Set());

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const data = response.notification.request.content.data;
    
                if (data.facilityId) {
                    // 알림에서 시설ID 받아서 자동 이동
                    navigation.navigate("CheckIn", {
                        facilityId: data.facilityId,
                        facilityName: data.facilityName,
                    });
                }
            }
        );
    
        return () => subscription.remove();
    }, []);
    

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMember();
                if (userData && userData.city && userData.district) {
                    setSelectedCity(userData.city);
                    setSelectedDistrict(userData.district);
                }
            } catch (error) {
                console.error("내 정보 로딩 실패:", error);
            }
        };
        fetchUserData();
    }, []);

    // 실시간 위치 추적
    useFocusEffect(
        useCallback(() => {
            let locationWatcher = null;

            const startWatching = async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("권한 필요", "현재 위치를 불러올 수 없습니다.");
                    setInitialCamera(DEFAULT_CAMERA);
                    setIsLoading(false);
                    return;
                }

                locationWatcher = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 3000,
                        distanceInterval: 1,
                    },
                    (location) => {
                        if (!location?.coords) return;

                        const { latitude, longitude } = location.coords;

                        // console.log("📍 위치 추적:", latitude, longitude);

                        setCurrentLocation({ latitude, longitude });

                        if (!initialCamera) {
                            setInitialCamera({
                                latitude,
                                longitude,
                                zoom: 16,
                            });
                        }
                    }
                );

                setIsLoading(false);
            };

            startWatching();

            return () => {
                if (locationWatcher) locationWatcher.remove();
            };
        }, [])
    );

    const lastCallTime = useRef(0);

    const handleCameraChanged = async (e) => {
        const now = Date.now();
        if (now - lastCallTime.current < 1000) {
            return;
        }
        lastCallTime.current = now;

        const { latitude, longitude } = e;
        const DELTA = 0.05;

        const baseParams = {
            northEastLat: latitude + DELTA,
            northEastLng: longitude + DELTA,
            southWestLat: latitude - DELTA,
            southWestLng: longitude - DELTA,
            city: selectedCity,
            district: selectedDistrict,
            ...(filterType && { facilityTypes: filterType }),
            ...(searchKeyword && { keyword: searchKeyword }),
        };

        try {
            let markerData;
            let listData;
            if (selectedType === ITEM_TYPES.PROGRAMS) {
                const programParams = {
                    ...baseParams,
                    minPrice: 0,
                    maxPrice: 0,
                    minAge: 0,
                    maxAge: 100,
                    maxResults: 20,
                };

                markerData = await getProgramMarkers(programParams);
                listData = await getProgramlist({
                    ...programParams,
                    size: 20,
                });
            } else {
                const facilityParams = {
                    ...baseParams,

                    isVoucherAvailable: isVoucherAvailable,
                    maxResults: 20,
                };
                markerData = await getFacilityMarkers(facilityParams);
                listData = await getFacilitylist({
                    ...facilityParams,
                    cursor: 0,
                    size: 20,
                });
            }
            if (markerData && markerData.markers) {
                setMarkers(markerData.markers);
                const clusters = markerData.markers.map((item, i) => ({
                    identifier: `marker-${i}`,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    image: {
                        symbol:
                            item.facilityId === selectedMarkerId
                                ? "yellow"
                                : "green",
                    },
                    width: 32,
                    height: 32,
                    facilityId: item.facilityId || item.id,
                }));
                setClusterMarkers(clusters);
            }
            if (listData) {
                const rawList = listData.facilities || listData.programs || [];

                const formattedList = rawList.map((item) => ({
                    id: item.id,
                    name: item.name || item.programName,
                    type:
                        item.facilitySubtype ||
                        item.programType ||
                        (selectedType === ITEM_TYPES.PROGRAMS
                            ? "프로그램"
                            : "시설"),
                    address: item.address || "",
                    distance: item.distanceMeters
                        ? `${(item.distanceMeters / 1000).toFixed(1)}km`
                        : "-",
                    rating: item.avgRating || 0,
                    reviewCount: item.reviewCount || 0,
                    isBookmarked: item.isBookmarked,
                    latitude: item.latitude,
                    longitude: item.longitude,
                }));
                setFacilityList(formattedList);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddressChange = ({ latitude, longitude }) => {
        if (mapRef.current) {
            mapRef.current.animateCameraTo(
                {
                    latitude: latitude,
                    longitude: longitude,
                    zoom: 14,
                },
                { duration: 500 }
            );
        }
    };
    useEffect(() => {
        if (initialCamera) {
            handleCameraChanged(initialCamera);
        }
    }, [
        selectedCity,
        selectedDistrict,
        filterType,
        isVoucherAvailable,
        searchKeyword,
        selectedType,
    ]);

    const navigation = useNavigation();

    const moveToCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("권한 거부", "위치 권한이 필요합니다.");

                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            if (mapRef.current) {
                mapRef.current.animateCameraTo(
                    {
                        latitude,
                        longitude,
                        zoom: 16,
                    },
                    { duration: 1000 }
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert("오류", "현재 위치를 가져올 수 없습니다.");
        } finally {
        }
    };

    const handleFacilityPress = (item) => {
        setSelectedMarkerId(item.id);

        if (mapRef.current) {
            mapRef.current.animateCameraTo(
                {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    zoom: 17,
                },
                { duration: 500 }
            );
        }
    };

    const handleOpenModal = () => {
        setModalIndex(0);
    };

    const handleModalStateChange = (index) => {
        setModalIndex(index);

        setIsListButtonVisible(index === -1);
        if (index === 1) {
            navigation.navigate("MapList");
            setModalIndex(0);
        }
    };
    /*
    useFocusEffect(
        useCallback(() => {
            let locationWatcher = null;

            const startWatching = async () => {
                setInitialCamera(null);

                let { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== "granted") {
                    Alert.alert(
                        "위치 권한 필요",
                        "지도 초기 위치 설정을 위해 위치 정보 접근 권한이 필요합니다.",
                        [{ text: "확인" }]
                    );
                    setInitialCamera(DEFAULT_CAMERA);
                }

                try {
                    locationWatcher = await Location.watchPositionAsync(
                        {
                            accuracy: Location.Accuracy.BestForNavigation,
                            timeInterval: 10000, //10초마다 갱신
                            distanceInterval: 5,
                        },
                        (location) => {
                            //console.log("📍 현재 위치 갱신됨:", latitude, longitude);

                            const newCamera = {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                zoom: 16,
                            };
                            setInitialCamera(newCamera);
                        }
                    );
                } catch (error) {
                    console.error("위치 추적 실패:", error);
                    Alert.alert(
                        "오류",
                        "현재 위치를 가져오는 데 실패했습니다. 기본 위치로 지도를 표시합니다."
                    );
                    setInitialCamera(DEFAULT_CAMERA);
                } finally {
                    setIsLoading(false);
                }
            };

            startWatching();

            return () => {
                if (locationWatcher) {
                    locationWatcher.remove();
                }
            };
        }, [])
    );
*/
    const handleAuthError = (event) => {
        const { errorCode, errorMessage } = event.nativeEvent;
        const errorLog = `
        --- 맵 인증 실패 ---
        에러 코드: ${errorCode}
        에러 메시지: ${errorMessage}
        ---------------------
        `;
        console.error(errorLog);
        setAuthError(`인증 실패: ${errorCode}`);
    };

    const handleMapReady = () => {
        console.log("--- 맵 로딩 완료 ---");
        setMapReady(true);
        setAuthError(null);
    };

    useEffect(() => {
        if(userRole === "PARENT") return;
        if (!currentLocation || facilityList.length === 0) return;

        facilityList.forEach((facility) => {
            if (!facility.latitude || !facility.longitude) return;

            const distance = getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                facility.latitude,
                facility.longitude
            );

            // 테스트용 출력
            // const DEBUG = false;

            //if (DEBUG) console.log(`📍 거리 계산 → ${facility.name}: ${distance.toFixed(1)}m`);

            // 200m 이하 접근 + 아직 알림 안 보낸 시설이면
            if (distance < 200 && !notifiedFacilities.current.has(facility.id)) {
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: `📍 ${facility.name} 근처입니다`,
                        boDMDdy: `${facility.name} 근처에 도착했어요!`,
                        priority: Notifications.AndroidNotificationPriority.MAX,
                        color: "#10C838",
                        data: {
                            facilityId: facility.id,
                            facilityName: facility.name,
                        },
                    },
                    trigger: null,
                });

                console.log(`🔔 알림 발송: ${facility.name}`);

                // 중복 알림 방지
                notifiedFacilities.current.add(facility.id);
            }
        });
    }, [currentLocation, facilityList]);



    if (isLoading || initialCamera === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <CustomText style={{ marginTop: 10 }}>현재 위치를 찾는 중...</CustomText>
            </View>
        );
    }

    return (
        <S.Container>
            <Header
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                onAddressChange={handleAddressChange}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <SearchBar
                onLocationClick={moveToCurrentLocation}
                onSearch={setSearchKeyword}
            />

            <View style={styles.container}>
                {authError && <Text style={styles.errorText}>{authError}</Text>}
                <NaverMapView
                    ref={mapRef}
                    style={styles.map}
                    initialCamera={initialCamera}
                    showsLocationButton={true}
                    onAuthFailed={handleAuthError}
                    onInitialized={handleMapReady}
                    onCameraChanged={handleCameraChanged}
                    clusters={[
                        {
                            key: "global",
                            markers: clusterMarkers,
                            screenDistance: 100,
                            minZoom: 10,
                            maxZoom: 18,
                            animate: true,
                        },
                    ]}
                    locationOverlay={{
                        isVisible: true,
                        position: {
                            //latitude: initialCamera.latitude,
                            //longitude: initialCamera.longitude,
                            latitude: currentLocation?.latitude ?? initialCamera.latitude,
                            longitude: currentLocation?.longitude ?? initialCamera.longitude,
                        },
                    }}
                ></NaverMapView>
            </View>

            <MapModal
                ref={mapModalRef}
                data={facilityList}
                index={modalIndex}
                onChange={handleModalStateChange}
                onDetailPress={handleFacilityPress}
                selectedType={filterType}
                setSelectedType={setFilterType}
                isVoucherAvailable={isVoucherAvailable}
                setIsVoucherAvailable={setIsVoucherAvailable}
            />
            {isListButtonVisible && (
                <FloatingListButton onPress={handleOpenModal} />
            )}
        </S.Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 500,
        color: "green",
    },
    errorText: {
        fontSize: 16,
        fontWeight: 500,
        color: "red",
        padding: 10,
        textAlign: "center",
    },
});