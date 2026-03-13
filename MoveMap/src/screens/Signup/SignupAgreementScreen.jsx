import React, { useState } from "react";
import { TouchableOpacity, ScrollView, View } from "react-native";
import CustomText from "../../components/common/CustomText";
import { useNavigation } from "@react-navigation/native";
import { BaseButton } from "../../components/Buttons/BaseButton";
import RightArrow from "../../../assets/icons/Community/arrow_right.svg";
import { S } from "./SignupAgreementScreen.style";

export default function SignupAgreementScreen() {
    const navigation = useNavigation();

    const [serviceAgree, setServiceAgree] = useState(false);
    const [privacyAgree, setPrivacyAgree] = useState(false);
    const [locationAgree, setLocationAgree] = useState(false);
    const [ageAgree, setAgeAgree] = useState(false);

    const allRequiredChecked =
        serviceAgree && privacyAgree && locationAgree && ageAgree;

    const goToDetail = (type, setAgreeState) => {
        navigation.navigate("AgreementDetail", {
            type: type,
            onAgree: () => setAgreeState(true),
        });
    };

    const renderItem = (
        label,
        checked,
        onToggle,
        detailType = null,
        setAgreeState = null
    ) => (
        <View style={S.section}>
            {/* 1. 체크박스 영역: 누르면 체크/해제 토글 */}
            <TouchableOpacity
                onPress={onToggle}
                style={S.rowLeft}
                activeOpacity={0.7}
            >
                <View style={[S.checkbox, checked && S.checkboxChecked]} />
                <CustomText style={{ fontSize: 16 }}>{label}</CustomText>
            </TouchableOpacity>

            {/* 2. 화살표 영역: 누르면 상세 화면 이동 */}
            {detailType && (
                <TouchableOpacity
                    onPress={() => goToDetail(detailType, setAgreeState)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <RightArrow width={14} height={14} />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={S.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomText style={S.title}>약관동의가 필요해요</CustomText>

                {/* 1. 서비스 이용약관 */}
                {renderItem(
                    "[필수] 서비스 이용약관 동의",
                    serviceAgree,
                    () => setServiceAgree(!serviceAgree),
                    "service",
                    setServiceAgree // 상태 변경 함수 전달
                )}

                {/* 2. 개인정보 처리방침 */}
                {renderItem(
                    "[필수] 개인정보 수집·이용 동의",
                    privacyAgree,
                    () => setPrivacyAgree(!privacyAgree),
                    "privacy",
                    setPrivacyAgree
                )}

                {/* 3. 위치 기반 서비스 */}
                {renderItem(
                    "[필수] 위치 기반 서비스 이용약관",
                    locationAgree,
                    () => setLocationAgree(!locationAgree),
                    "location",
                    setLocationAgree
                )}

                {/* 4. 만 14세 이상 (상세 화면 없음) */}
                {renderItem(
                    "[필수] 만 14세 이상입니다",
                    ageAgree,
                    () => setAgeAgree(!ageAgree),
                    null // 화살표 없음
                )}

                <View style={S.bottomSpacing} />
            </ScrollView>

            <BaseButton
                title="다음"
                disabled={!allRequiredChecked}
                onPress={() => navigation.navigate("Signup")}
            />
        </View>
    );
}
