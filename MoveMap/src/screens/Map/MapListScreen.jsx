import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as Location from "expo-location";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { S } from "./MapScreen.style";
import { Header } from "../../components/Map/Header/Header";
import { SearchBar } from "../../components/Map/SearchBar/SearchBar";
import {
    ListItemContents,
    TopSelectBar,
} from "../../components/Map/Modal/MapModal";
import MapLogo from "../../../assets/icons/Map/map.svg";

import { getFacilitylist, getProgramlist } from "../../api/map";
import { getMember } from "../../api/user";
import { ScrollView } from "react-native-gesture-handler";
import CustomText from "../../components/common/CustomText";

const ITEM_TYPES = {
    FACILITIES: "facilities",
    PROGRAMS: "programs",
};

const FloatingMapButton = ({ onPress }) => (
    <S.MapButtonContainer>
        <S.MapButtonWrapper onPress={onPress}>
            <CustomText
                style={{
                    marginRight: 5,
                    fontSize: 18,
                    color: "#10C838",
                }}
            >
                <MapLogo />
            </CustomText>
            <S.MapButtonText>Map</S.MapButtonText>
        </S.MapButtonWrapper>
    </S.MapButtonContainer>
);

export default function MapListScreen() {
    const navigation = useNavigation();
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [selectedType, setSelectedType] = useState(ITEM_TYPES.FACILITIES);
    const [filterType, setFilterType] = useState(null);
    const [isVoucherAvailable, setIsVoucherAvailable] = useState(false);

    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.5666102,
        longitude: 126.9783881,
    });

    useEffect(() => {
        const init = async () => {
            try {
                const userData = await getMember();
                if (userData && userData.city && userData.district) {
                    setSelectedCity(userData.city);
                    setSelectedDistrict(userData.district);
                }
            } catch (e) {
                console.error(e);
            }
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    const loc = await Location.getCurrentPositionAsync({});
                    setCurrentLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };
        init();
    }, []);
    const handleAddressChange = ({ latitude, longitude }) => {
        setCurrentLocation({ latitude, longitude });
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { latitude, longitude } = currentLocation;
            const DELTA = 0.05;

            const baseParams = {
                northEastLat: latitude + DELTA,
                northEastLng: longitude + DELTA,
                southWestLat: latitude - DELTA,
                southWestLng: longitude - DELTA,
                city: selectedCity,
                district: selectedDistrict,
                ...(searchKeyword && { keyword: searchKeyword }),
                size: 50,
            };

            let response;
            let formattedList = [];

            if (selectedType === ITEM_TYPES.PROGRAMS) {
                const programParams = {
                    ...baseParams,
                    minPrice: 0,
                    maxPrice: 0,
                    minAge: 0,
                    maxAge: 100,
                };
                console.log("프로그램 리스트 요청:", programParams);
                response = await getProgramlist(programParams);

                if (response && response.programs) {
                    formattedList = response.programs.map((item) => ({
                        id: item.id,
                        name: item.programName || item.name,
                        type: item.programType || "프로그램",
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
                }
            } else {
                const facilityParams = {
                    ...baseParams,
                    ...(filterType && { facilityTypes: filterType }),
                    isVoucherAvailable: isVoucherAvailable,
                };
                console.log("시설 리스트 요청:", facilityParams);
                response = await getFacilitylist(facilityParams);

                if (response && response.facilities) {
                    formattedList = response.facilities.map((item) => ({
                        id: item.id,
                        name: item.name,
                        type: item.facilitySubtype || item.facilityType,
                        address: item.address,
                        distance: item.distanceMeters
                            ? `${(item.distanceMeters / 1000).toFixed(1)}km`
                            : "-",
                        rating: item.avgRating || 0,
                        reviewCount: item.reviewCount || 0,
                        isBookmarked: item.isBookmarked,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }));
                }
            }
            setDataList(formattedList);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [
        selectedCity,
        selectedDistrict,
        selectedType,
        filterType,
        isVoucherAvailable,
        searchKeyword,
        currentLocation,
    ]);

    const handleCloseTab = () => {
        navigation.goBack();
    };

    const handleItemPress = (item) => {
        console.log("선택된 아이템:", item.name);

        navigation.goBack();
    };

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
                onLocationClick={() => console.log("현위치")}
                onSearch={setSearchKeyword}
            />

            <FloatingMapButton onPress={handleCloseTab} />

            <S.TopEmptyView />

            <TopSelectBar
                selectedType={filterType}
                setSelectedType={setFilterType}
                isVoucherAvailable={isVoucherAvailable}
                setIsVoucherAvailable={setIsVoucherAvailable}
                filterState={{
                    typeSelected: !!filterType,
                    couponSelected: isVoucherAvailable,
                }}
                setFilterState={() => {}}
            />

            <ScrollView>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#10C838" />
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        <ListItemContents
                            data={dataList}
                            onDetailPress={handleItemPress}
                            selectedName={null}
                            selectedType={selectedType}
                        />
                        {dataList.length === 0 && (
                            <View style={styles.emptyContainer}>
                                <CustomText style={styles.emptyText}>
                                    검색 결과가 없습니다.
                                </CustomText>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </S.Container>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyText: {
        color: "#999",
        fontSize: 16,
    },
});
