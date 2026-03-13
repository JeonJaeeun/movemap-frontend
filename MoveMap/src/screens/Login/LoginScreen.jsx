import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { S } from "./LoginScreen.style";
import Logo from "../../../assets/icons/Logo_small.svg";
import {
    PWInputWrapper,
    TextInputWrapper,
} from "../../components/common/TextInput";
import { Button, KaKaoButton } from "../../components/Buttons/BaseButton";
import SmallLogo from "../../components/Logo/SmallLogo";
import { useState } from "react";

import { postKakaoLogin, postLogin } from "../../api/auth";
import { getMember } from "../../api/user";

import { registerDeviceOnce } from "../../utils/registerDeviceOnce";

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid = email.trim() !== "" && password.trim() !== "";
    const processLoginSuccess = async (accessToken, refreshToken) => {
        try {
            if (accessToken) {
                await AsyncStorage.setItem("accessToken", accessToken);
                if (refreshToken) {
                    await AsyncStorage.setItem("refreshToken", refreshToken);
                }
                await registerDeviceOnce();
            }

            await AsyncStorage.removeItem("logoutFlag");

            try {
                const member = await getMember();
                console.log("회원 조회 성공:", member);

                if (member?.role) {
                    await AsyncStorage.setItem("userRole", member.role);
                }
            } catch (e) {
                console.log("회원정보 조회 실패:", e);
            }
            navigation.reset({
                index: 0,
                routes: [{ name: "Screens" }],
            });
        } catch (error) {
            console.error("로그인 후처리 중 에러:", error);
        }
    };
    const handleLogin = async () => {
        try {
            const result = await postLogin(email, password);
            console.log("이메일 로그인 결과:", result);
            await processLoginSuccess(result.accessToken, result.refreshToken);
        } catch (error) {
            console.error("이메일 로그인 에러:", error);
            Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    const handleKakaoSuccess = async (data) => {
        const kakaoToken = data.token.accessToken;
        console.log("카카오 토큰 획득:", kakaoToken);

        try {
            const result = await postKakaoLogin(kakaoToken);
            console.log("카카오 로그인 결과:", result);

            if (result.isNewMember) {
                console.log(
                    "신규 회원입니다. 추가 정보 입력 화면으로 이동합니다."
                );
                navigation.navigate("KakaoSignupAgreement", {
                    kakaoId: result.kakaoId,
                });
            } else {
                console.log("기존 회원입니다. 메인으로 이동합니다.");
                await processLoginSuccess(
                    result.accessToken,
                    result.refreshToken
                );
            }
        } catch (error) {
            console.error("백엔드 통신 에러:", error);
            Alert.alert("오류", "서버 로그인 중 문제가 발생했습니다.");
        }
        navigation.reset({
            index: 0,
            routes: [{ name: "Screens" }],
        });
    };

    const handleKakaoFail = (error) => {
        console.log("로그인 실패:", error);
    };

    const handleSignup = () => {
        navigation.navigate("SignupAgreement");
    };

    const handleFindPW = () => {
        navigation.navigate("FindPW");
    };
    return (
        <S.Container>
            <S.ContentsContainer>
                <S.MainText>무브맵 로그인</S.MainText>
                <S.ToSignupContainer>
                    <S.ToSignupScreenText>
                        아직 계정이 없으신가요?
                    </S.ToSignupScreenText>
                    <S.ToSignupScreenButton onPress={handleSignup}>
                        <S.SignupButtonText>회원가입하기</S.SignupButtonText>
                    </S.ToSignupScreenButton>
                </S.ToSignupContainer>

                <TextInputWrapper
                    placeholder="아이디 (이메일)"
                    value={email}
                    onChangeText={setEmail}
                />

                <PWInputWrapper
                    placeholder="비밀번호 (영문 대/소문자, 숫자, 특수문자 포함)"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <Button
                    title="로그인"
                    onPress={handleLogin}
                    disabled={!isFormValid}
                    style={{ marginTop: 15 }}
                />

                <S.ToFindPWButtonContainer>
                    <S.ToFindPWButton>
                        <S.FindPWButtonText onPress={handleFindPW}>
                            비밀번호를 잊으셨나요?
                        </S.FindPWButtonText>
                    </S.ToFindPWButton>
                </S.ToFindPWButtonContainer>

                <View style={{ paddingTop: 30 }}>
                    <KaKaoButton
                        onLoginSuccess={handleKakaoSuccess}
                        onLoginFail={handleKakaoFail}
                    />
                </View>
            </S.ContentsContainer>
        </S.Container>
    );
}
