import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { S } from "./SignupScreen.style";
import {
    TextInputComponents,
    EmailInputComponents,
    CodeInputComponent,
    PWInputWrapper,
} from "../../components/common/TextInput";

import { AdressDropDownComponent } from "../../components/common/Dropdown";
import { BaseButton } from "../../components/Buttons/BaseButton";
import { TwoOptionSelector } from "../../components/common/TwoOptionSelector";
import { useNavigation } from "@react-navigation/native";
import { postEmailSend, postEmailVerify, postSignup } from "../../api/auth";

const ROLES = {
    STUDENT: "STUDENT",
    PARENT: "PARENT",
};

const ROLE_OPTIONS = [
    { value: ROLES.STUDENT, label: "학생" },
    { value: ROLES.PARENT, label: "학부모" },
];

export default function SignupScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickName] = useState("");
    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");

    const [role, setRole] = useState(ROLES.STUDENT);

    const isFormValid =
        email.trim() !== "" &&
        isVerified &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword &&
        nickname.trim() !== "" &&
        sido.trim() !== "" &&
        sigungu.trim() !== "";

    const handleSendCode = async () => {
        if (!email.trim()) {
            Alert.alert("알림", "이메일을 입력해주세요.");
            return;
        }
        try {
            await postEmailSend(email);
        } catch (error) {
            console.error("인증코드 발송 실패:", error);
            Alert.alert("인증코드 발송 실패");
        }
    };

    const handleVerifyCode = async () => {
        if (!code.trim()) {
            Alert.alert("알림", "인증 번호를 입력해주세요.");
            return;
        }
        try {
            await postEmailVerify(code, email);
            setIsVerified(true);
        } catch (error) {
            setIsVerified(false);
            Alert.alert("인증 실패", "인증 번호가 일치하지 않습니다.");
        }
    };

    const handleNext = () => {
        navigation.navigate("SignupUserInfo", {
            type: "LOCAL",
            role: role,
            email: email,
            password: password,
            nickname: nickname,
            sido: sido,
            sigungu: sigungu,
        });
    };

    const handleParentSignup = async () => {
        try {
            await postSignup(
                "LOCAL",
                role,
                email,
                password,
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
                <EmailInputComponents
                    label="아이디(이메일)"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChangeText={setEmail}
                    onPress={handleSendCode}
                    disabled={email.trim() === ""}
                />
                <CodeInputComponent
                    label="이메일 인증"
                    placeholder="인증번호를 입력해주세요."
                    value={code}
                    onChangeText={setCode}
                    onPress={handleVerifyCode}
                    disabled={code.trim() === ""}
                />
                <PWInputWrapper
                    label="비밀번호"
                    placeholder="영문 대/소문자, 숫자, 특수문자를 포함해 주세요."
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <PWInputWrapper
                    label="비밀번호 확인"
                    placeholder="비밀번호 확인을 위해 다시 한 번 입력해주세요."
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
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
