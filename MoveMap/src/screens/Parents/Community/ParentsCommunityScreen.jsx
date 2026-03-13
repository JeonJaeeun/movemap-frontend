import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import CustomText from "../../../components/common/CustomText";
import { S } from "./ParentsCommunityScreen.style";

import ReviewHeader from "../../../components/Records/Review/ReviewHeader";

import { getFacilityReviews, getProgramReviews } from "../../../api/review";

import RightArrow from "../../../../assets/icons/Community/arrow_right.svg";
import StarFilled from "../../../../assets/icons/Community/star_filled.svg";
import StarEmpty from "../../../../assets/icons/Community/star_empty.svg";
import PencilIcon from "../../../../assets/icons/Community/pencil.svg";
import SearchIcon from "../../../../assets/icons/Community/search.svg";

export default function ParentsCommunityScreen({ navigation }) {

    const [selectedType, setSelectedType] = useState("facilities");

    const [reviews, setReviews] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    
    useEffect(() => {
        loadReviews();
    }, [selectedType, keyword]);

    /** 리뷰 API 호출 */
    const loadReviews = async () => {
        try {
            let params;
    
            if (selectedType === "facilities") {
                params = {
                    lat: 37.5666102,
                    lng: 126.9783881,
                    city: "서울특별시",
                    district: "종로구",
                    cursor: 0,
                    size: 20,
                };
                if (keyword) params.keyword = keyword;
    
                const data = await getFacilityReviews(params);
                setReviews(data?.reviews || []);
    
            } else {
                // ⭐ 프로그램 리뷰는 지역 파라미터 제거
                params = {
                    cursor: 0,
                    size: 20,
                };
                if (keyword) params.keyword = keyword;
    
                const data = await getProgramReviews(params);

                console.log("🔥 프로그램 리뷰 응답 전체:", data);
                console.log("🔥 프로그램 리뷰 리스트:", data?.reviews);
                
                setReviews(data?.reviews || []);
            }
    
        } catch (e) {
            console.log("리뷰 조회 실패:", e);
        }
    };
    

    const renderStars = (rating) => (
        <View style={{ flexDirection: "row", gap: 3 }}>
            {[1, 2, 3, 4, 5].map(i =>
                rating >= i ? <StarFilled key={i} /> : <StarEmpty key={i} />
            )}
        </View>
    );

    const handleSearch = (text) => {
        setQuery(text);
        setKeyword(text);
    };

    return (
        <View style={S.Container}>
            <View style={{ marginTop: 15 }}>
                <ReviewHeader
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />
            </View>

            <View style={S.ReviewContainer}>
                <View style={S.searchBox}>
                    <SearchIcon width={18} height={18} />
                    <TextInput
                        style={S.searchInput}
                        placeholder="시설명/후기를 검색하세요"
                        placeholderTextColor="#999"
                        value={query}
                        onChangeText={handleSearch}
                    />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={S.TopSpacing} />

                    {reviews.length === 0 ? (
                        <CustomText style={{ textAlign: "center", marginTop: 30, color: "#777" }}>
                            아직 등록된 리뷰가 없어요.
                        </CustomText>
                    ) : (
                        
                        reviews.map((item, idx) => (
                            <View key={item.reviewId || idx} style={S.reviewCard}>
                                <View style={S.reviewHeaderRow}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                        <CustomText style={S.reviewTitle}>
                                            {item.title || item.reviewTitle || "후기"}
                                        </CustomText>
                                        {renderStars(item.rating)}
                                    </View>
                                </View>

                                <View style={S.placeRow}>
                                    <CustomText style={S.reviewFacility}>
                                        {selectedType === "facilities"
                                            ? item.facilityName
                                            : item.programName}
                                    </CustomText>

                                    <CustomText style={S.reviewCategory}>
                                        {selectedType === "facilities"
                                            ? item.facilityType
                                            : "프로그램"}
                                    </CustomText>
                                </View>

                                <View style={S.reviewBottomRow}>
                                    <CustomText numberOfLines={2} style={S.reviewContent}>
                                        {item.reviewContent || item.content}
                                    </CustomText>
                                    <TouchableOpacity style={S.arrowWrapper}>
                                        <RightArrow />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

            <TouchableOpacity
                style={S.floatingButton}
                onPress={() =>
                    navigation.navigate(
                        selectedType === "facilities"
                            ? "ParentsReviewWrite"
                            : "ParentsProgramReviewWrite"
                    )
                }
            >
                <PencilIcon width={22} height={22} />
                <CustomText style={S.floatingButtonText}>후기 작성</CustomText>
            </TouchableOpacity>
        </View>
    );
}
