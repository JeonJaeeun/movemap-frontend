import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { S } from "./ParentsProgramSelectScreen.style";
import CloseIcon from "../../../../assets/icons/Community/close.svg";
import SearchIcon from "../../../../assets/icons/Community/search.svg";

import CustomText from "../../../components/common/CustomText";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { getProgramlist } from "../../../api/map";

let typingTimer = null;

export default function ParentsProgramSelectScreen() {
    const navigation = useNavigation();

    const [query, setQuery] = useState("");
    const [programData, setProgramData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);

    const [coords, setCoords] = useState(null);
    const [region, setRegion] = useState({ city: null, district: null });
    const [initialLoaded, setInitialLoaded] = useState(false);

    /** ----------------------------------------------------
     * 1) 사용자 위치 + Reverse Geocode로 시/구 가져오기
     * ---------------------------------------------------- */
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            let loc = await Location.getCurrentPositionAsync({});
            setCoords(loc.coords);

            const geo = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });

            if (geo.length > 0) {
                setRegion({
                    city: geo[0].region || null,       // ex "서울특별시"
                    district: geo[0].district || null, // ex "성동구"
                });
            }
        })();
    }, []);

    /** ----------------------------------------------------
     * 2) 초기 자동 로딩 (keyword 없는 기본 리스트)
     * ---------------------------------------------------- */
    useEffect(() => {
        if (coords && region.city && region.district && !initialLoaded) {
            fetchPrograms("");     // ⭐ 초기 리스트 자동 호출
            setInitialLoaded(true);
        }
    }, [coords, region]);

    /** ----------------------------------------------------
     * 3) 검색 디바운스
     * ---------------------------------------------------- */
    const handleSearch = useCallback((text) => {
        setQuery(text);

        if (typingTimer) clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            if (text.trim() === "") {
                // 검색어 없으면 초기 리스트 보여주기
                fetchPrograms("");
            } else {
                fetchPrograms(text.trim());
            }
        }, 400);
    }, [coords, region]);

    /** ----------------------------------------------------
     * 4) 프로그램 API 호출 함수 (초기 + 검색 공통)
     * ---------------------------------------------------- */
    const fetchPrograms = async (keywordText = "") => {
        if (!coords || !region.city || !region.district) return;

        try {
            setLoading(true);

            const params = {
                // 서울 내에서 충분히 넓게 커버
                northEastLat: 38,
                northEastLng: 129,
                southWestLat: 35,
                southWestLng: 125,

                city: region.city,         // "서울특별시"
                district: region.district, // "성동구"

                minPrice: 0,
                maxPrice: 0,      // ⭐ 정답 기반. 전체 가격 조회 위해.

                minAge: 0,
                maxAge: 100,

                size: 20,
                maxResults: 20,
            };

            // 검색어 있을 때만 keyword 추가
            if (keywordText !== "") {
                params.keyword = keywordText;
            }

            console.log("👉 최종 전송 params:", params);

            const res = await getProgramlist(params);
            console.log("👉 프로그램 리스트 응답:", res);

            setProgramData(res.programs || []);
        } catch (err) {
            console.log("❌ 프로그램 리스트 조회 실패:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={S.Container}>

                {/* X 버튼 */}
                <TouchableOpacity
                    style={S.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <CloseIcon width={26} height={26} />
                </TouchableOpacity>

                {/* 검색창 */}
                <View style={S.searchBox}>
                    <SearchIcon width={18} height={18} />
                    <TextInput
                        style={S.searchInput}
                        placeholder="프로그램명을 검색하세요"
                        placeholderTextColor="#999"
                        value={query}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* 리스트 */}
                <ScrollView style={S.listScrollView} showsVerticalScrollIndicator={false}>
                    {loading && (
                        <View style={{ padding: 20 }}>
                            <CustomText>불러오는 중...</CustomText>
                        </View>
                    )}

                    {!loading && programData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                S.listItem,
                                selectedProgram?.id === item.id && S.selectedItem
                            ]}
                            onPress={() => setSelectedProgram(item)}
                        >
                            <View style={{ flex: 1 }}>
                                <CustomText style={S.itemName}>{item.name}</CustomText>
                                <CustomText style={S.itemAddress}>{item.address}</CustomText>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {!loading && programData.length === 0 && (
                        <View style={{ padding: 20 }}>
                            <CustomText>해당 지역의 프로그램이 없습니다.</CustomText>
                        </View>
                    )}
                </ScrollView>

                {/* 선택 버튼 */}
                <BaseButton
                    title="선택"
                    disabled={!selectedProgram}
                    onPress={() =>
                        navigation.navigate("ParentsProgramReviewWrite", {
                            program: selectedProgram,
                        })
                    }
                />
            </View>
        </SafeAreaView>
    );
}
