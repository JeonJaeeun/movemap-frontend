import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { S } from "./SignupScreen.style";
import {
    TextInputComponents,
    EmailInputComponents,
    CodeInputComponent,
} from "../../components/common/TextInput";

import { AdressDropDownComponent } from "../../components/common/Dropdown";
import { BaseButton } from "../../components/Buttons/BaseButton";
import { TwoOptionSelector } from "../../components/common/TwoOptionSelector";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postKakaoSignup } from "../../api/auth";

const ROLES = {
    STUDENT: "STUDENT",
    PARENT: "PARENT",
};

const ROLE_OPTIONS = [
    { value: ROLES.STUDENT, label: "학생" },
    { value: ROLES.PARENT, label: "학부모" },
];

export default function KaKaoSignupScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { kakaoId = 0 } = route.params || {};
    const [nickname, setNickName] = useState("");
    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");

    const [role, setRole] = useState(ROLES.STUDENT);

    const isFormValid =
        nickname.trim() !== "" && sido.trim() !== "" && sigungu.trim() !== "";

    const handleNext = () => {
        console.log({
            role,
            kakaoId,
            nickname,
            sido,
            sigungu,
        });
        navigation.navigate("SignupUserInfo", {
            type: "KAKAO",
            role: role,
            kakaoId: kakaoId,
            nickname: nickname,
            sido: sido,
            sigungu: sigungu,
        });
    };

    const handleParentSignup = async () => {
        try {
            await postKakaoSignup(
                "KAKAO",
                role,
                kakaoId,
                nickname,
                sido,
                sigungu,
                "MAN",
                Number(40),
                Number(170),
                Number(70)
            );
            Alert.alert("가입 성공", "회원가입이 완료되었습니다.", [
                { text: "확인", onPress: () => navigation.navigate("Login") },
            ]);
        } catch (error) {
            console.error("회원가입 실패:", error);
            Alert.alert("가입 실패", "회원가입 중 오류가 발생했습니다.");
        }
    };
    return (
        <S.Container>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <S.WhoamI>나는?</S.WhoamI>
                <TwoOptionSelector
                    options={ROLE_OPTIONS}
                    currentValue={role}
                    onSelect={setRole}
                    style={{ paddingBottom: 30 }}
                />
                <TextInputComponents
                    label="닉네임"
                    placeholder="닉네임은 언제든지 변경할 수 있어요!"
                    value={nickname}
                    onChangeText={setNickName}
                />

                <AdressDropDownComponent
                    label="내 거주지"
                    cityValue={sido}
                    districtValue={sigungu}
                    onChangeCity={setSido}
                    onChangeDistrict={setSigungu}
                />

                <S.Empty />
            </ScrollView>

            <BaseButton
                title={role === ROLES.PARENT ? "회원가입" : "다음"}
                onPress={
                    role === ROLES.PARENT ? handleParentSignup : handleNext
                }
                disabled={!isFormValid}
            />
        </S.Container>
    );
}
