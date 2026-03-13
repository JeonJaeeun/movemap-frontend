import { S } from "./FindPWScreen.style";
//import Logo from "../../../assets/icons/Logo_small.svg";

import {
    CodeInputComponent,
    EmailInputComponents,
} from "../../components/common/TextInput";
import { BaseButton } from "../../components/Buttons/BaseButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    postEmailSend,
    postEmailVerify,
    postTemporaryPW,
} from "../../api/auth";
import { Alert } from "react-native";

export default function FindPWScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const isFormValid = email.trim() !== "" && code.trim() !== "" && isVerified;

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

    const handleTemporaryPW = async () => {
        try {
            await postTemporaryPW(email);

            // 2. 성공 시 알림 및 이동
            Alert.alert(
                "발급 완료",
                "이메일로 임시 비밀번호가 전송되었습니다.\n로그인 후 비밀번호를 변경해주세요.",
                [
                    {
                        text: "확인",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]
            );
        } catch (error) {
            Alert.alert("오류", "임시 비밀번호 발급 중 문제가 발생했습니다.");
        }
    };

    return (
        <S.Container>
            <S.ContentsContainer>
                <S.MainText>비밀번호 찾기</S.MainText>

                <EmailInputComponents
                    label="아이디(이메일)"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setIsVerified(false);
                    }}
                    onPress={handleSendCode}
                    disabled={email.trim() === ""}
                />

                <CodeInputComponent
                    label="인증 번호"
                    placeholder="인증 번호 6자리를 입력해주세요."
                    value={code}
                    onChangeText={setCode}
                    onPress={handleVerifyCode}
                    disabled={code.trim() === ""}
                />

                <BaseButton
                    title="임시 비밀번호 발급"
                    onPress={handleTemporaryPW}
                    disabled={!isFormValid}
                />
            </S.ContentsContainer>
        </S.Container>
    );
}
