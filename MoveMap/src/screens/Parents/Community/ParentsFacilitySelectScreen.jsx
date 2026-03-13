import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { S } from "./ParentsFacilitySelectScreen.style";

import CloseIcon from "../../../../assets/icons/Community/close.svg";
import SearchIcon from "../../../../assets/icons/Community/search.svg";
import CustomText from "../../../components/common/CustomText";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { getFacilitylist } from "../../../api/map";

let typingTimer = null;

export default function ParentsFacilitySelectScreen() {
    const navigation = useNavigation();

    const [query, setQuery] = useState("");
    const [facilityData, setFacilityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);

    /** -----------------------------------
     * 디바운스 검색 (0.4초 뒤 요청)
     * ----------------------------------- */
    const handleSearch = useCallback((text) => {
        setQuery(text);

        if (typingTimer) clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            fetchFacilities(text);
        }, 400);
    }, []);

    /** -----------------------------------
     * 검색 API 요청
     * ----------------------------------- */
    const fetchFacilities = async (keywordText) => {
        if (!keywordText || keywordText.trim() === "") {
            setFacilityData([]);
            return;
        }

        try {
            setLoading(true);

            const params = {
                northEastLat: 43,
                northEastLng: 132,
                southWestLat: 33,
                southWestLng: 124,
                keyword: keywordText,
                cursor: 0,
                size: 50,
            };

            const res = await getFacilitylist(params);
            setFacilityData(res.facilities || []);

        } catch (error) {
            console.error("❌ 시설 검색 실패:", error);
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
                        placeholder="시설명을 검색하세요"
                        placeholderTextColor="#999"
                        value={query}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* 리스트 */}
                <ScrollView style={S.listScrollView} showsVerticalScrollIndicator={false}>

                    {/* 검색어 없을 때 */}
                    {!query && (
                        <View style={{ padding: 20 }}>
                            <CustomText>검색된 시설이 없습니다.</CustomText>
                        </View>
                    )}

                    {/* 로딩 상태 */}
                    {loading && (
                        <View style={{ padding: 20 }}>
                            <CustomText>검색 중...</CustomText>
                        </View>
                    )}

                    {/* 검색 결과 */}
                    {!loading &&
                        facilityData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    S.listItem,
                                    selectedFacility?.id === item.id && S.selectedItem,
                                ]}
                                onPress={() => setSelectedFacility(item)}
                            >
                                <View style={{ flex: 1 }}>
                                    <CustomText style={S.itemName}>{item.name}</CustomText>
                                    <CustomText style={S.itemAddress}>{item.address}</CustomText>
                                </View>

                                <CustomText style={S.itemType}>
                                    {item.facilitySubtype}
                                </CustomText>
                            </TouchableOpacity>
                        ))
                    }

                    {/* 결과 없음 */}
                    {!loading && query && facilityData.length === 0 && (
                        <View style={{ padding: 20 }}>
                            <CustomText>검색 결과가 없습니다.</CustomText>
                        </View>
                    )}

                </ScrollView>

                {/* 선택 버튼 */}
                <BaseButton
                    title="선택"
                    disabled={!selectedFacility}
                    onPress={() => {
                        const parseAddress = (address) => {
                            if (!address) return { city: null, district: null };

                            const parts = address.split(" "); 
                            return {
                                city: parts[0] || null,        // 서울특별시
                                district: parts[1] || null,    // 성동구
                            };
                        };

                        const { city, district } = parseAddress(selectedFacility.address);

                        navigation.navigate("ParentsReviewWrite", {
                            facility: {
                                ...selectedFacility,
                                city,
                                district,
                            },
                        });
                    }}
                />

            </View>
        </SafeAreaView>
    );
}
