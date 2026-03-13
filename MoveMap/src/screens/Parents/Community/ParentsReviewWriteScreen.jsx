import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import CustomText from "../../../components/common/CustomText";
import { S } from "./ParentsReviewWriteScreen.style";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchIcon from "../../../../assets/icons/Community/search.svg";
import StarFilled from "../../../../assets/icons/Community/star_filled_big.svg";
import StarEmpty from "../../../../assets/icons/Community/star_empty_big.svg";
import CloseIcon from "../../../../assets/icons/Community/close.svg";

import { postFacilityReview } from "../../../api/review";

export default function ParentsReviewWriteScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const selectedFacility = route.params?.facility ?? null;

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const isFormValid =
        selectedFacility &&
        rating > 0 &&
        title.trim().length >= 5 &&
        content.trim().length >= 10;

    const handleSubmit = async () => {
        try {
            await postFacilityReview({
                facilityId: selectedFacility.id,
                rating,
                title, 
                content,  
            });

            Alert.alert("완료", "리뷰가 등록되었습니다!");

            navigation.navigate("Screens", {
                screen: "CommunityTab",
                params: {
                    city: selectedFacility.city,
                    district: selectedFacility.district,
                },
            });
        } catch (error) {
            Alert.alert("오류", "리뷰 등록에 실패했습니다.");
        }
    };

    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
                {i <= rating ? <StarFilled /> : <StarEmpty />}
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={S.Container}>

                <TouchableOpacity
                    style={S.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <CloseIcon />
                </TouchableOpacity>

                <CustomText style={S.headerText}>후기 작성</CustomText>

                <CustomText style={S.label}>시설을 선택해주세요!</CustomText>

                <TouchableOpacity
                    style={S.searchBox}
                    onPress={() => navigation.navigate("ParentsFacilitySelect")}
                >
                    <SearchIcon width={20} height={20} />
                    <CustomText style={{ marginLeft: 10, color: "#000" }}>
                        {selectedFacility ? selectedFacility.name : "시설 선택"}
                    </CustomText>
                </TouchableOpacity>

                <CustomText style={[S.label, { marginTop: 20 }]}>
                    이 시설은 어떠셨나요?
                </CustomText>

                <View style={S.starRow}>{renderStars()}</View>

                {/* 제목 */}
                <CustomText style={S.label}>글 제목</CustomText>
                <TextInput
                    style={S.inputBox}
                    placeholder="제목을 입력해주세요. (5자 이상)"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* 내용 */}
                <CustomText style={S.label}>글 내용</CustomText>
                <TextInput
                    style={[S.inputBox, S.textArea]}
                    placeholder="내용을 입력해주세요. (10자 이상)"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                <BaseButton
                    title="등록"
                    onPress={handleSubmit}
                    disabled={!isFormValid}
                />
            </View>
        </SafeAreaView>
    );
}
