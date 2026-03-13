import React, { useState } from "react";
import { S } from "./SignupUserInfoScreen.style";
import { TwoOptionSelector } from "../../components/common/TwoOptionSelector";
import { BaseButton } from "../../components/Buttons/BaseButton";
import {
    TextInputComponents,
    UserBodyInfoComponent,
} from "../../components/common/TextInput";
import LoginScreen from "../Login/LoginScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postKakaoSignup, postSignup } from "../../api/auth";
import { Alert } from "react-native";

const GENDER = {
    MAN: "MAN",
    WOMAN: "WOMAN",
};

const GENDER_OPTIONS = [
    { value: GENDER.MAN, label: "남자" },
    { value: GENDER.WOMAN, label: "여자" },
];

export default function SignupUserInfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { type, role, email, password, kakaoId, nickname, sido, sigungu } =
        route.params;
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [currentGender, setCurrentGender] = useState(GENDER.MAN);

    const isFormValid =
        age.trim() !== "" && height.trim() !== "" && weight.trim() !== "";

    const handleSignupComplete = async () => {
        try {
            if (type == "LOCAL") {
                await postSignup(
                    type,
                    role,
                    email,
                    password,
                    nickname,
                    sido,
                    sigungu,
                    currentGender,
                    Number(age),
                    Number(height),
                    Number(weight)
                );
                Alert.alert("가입 성공", "회원가입이 완료되었습니다.", [
                    {
                        text: "확인",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]);
            } else {
                await postKakaoSignup(
                    type,
                    role,
                    kakaoId,
                    nickname,
                    sido,
                    sigungu,
                    currentGender,
                    Number(age),
                    Number(height),
                    Number(weight)
                );
                Alert.alert("가입 성공", "회원가입이 완료되었습니다.", [
                    {
                        text: "확인",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]);
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
            Alert.alert("가입 실패", "회원가입 중 오류가 발생했습니다.");
        }
    };
    return (
        <>
            <S.Container>
                <S.Section>
                    <S.Label>성별</S.Label>
                    <TwoOptionSelector
                        options={GENDER_OPTIONS}
                        currentValue={currentGender}
                        onSelect={setCurrentGender}
                        style={{ paddingBottom: 0 }}
                    />
                </S.Section>
                <S.SpacingBox>
                    <TextInputComponents
                        label="나이"
                        placeholder="나이를 입력해주세요."
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />
                </S.SpacingBox>
                <UserBodyInfoComponent
                    height={height}
                    onChangeHeight={setHeight}
                    weight={weight}
                    onChangeWeight={setWeight}
                />
            </S.Container>
            <BaseButton
                title="회원가입"
                onPress={handleSignupComplete}
                disabled={!isFormValid}
            />
        </>
    );
}
