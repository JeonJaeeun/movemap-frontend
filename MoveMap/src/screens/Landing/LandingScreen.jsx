import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { S } from "./LandingScreen.style";
import Logo from "../../../assets/icons/logo.svg";
import Green from "../../../assets/icons/Green.svg";
import Pink from "../../../assets/icons/Pink.svg";
import Red from "../../../assets/icons/Red.svg";
import Blue from "../../../assets/icons/Blue.svg";
import Orange from "../../../assets/icons/Orange.svg";
import Yellow from "../../../assets/icons/Yellow.svg";
import { KaKaoButton } from "../../components/Buttons/BaseButton";
import { postKakaoLogin } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LandingScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const handleKakaoSuccess = async (data) => {
        const kakaoToken = data.token.accessToken;
        console.log(data);
        console.log("LandingScreen에서 받은 토큰:", data.token.accessToken);

        try {
            const result = await postKakaoLogin(kakaoToken);
            if (result.isNewMember) {
                console.log(
                    "신규 회원입니다. 추가 정보 입력 화면으로 이동합니다."
                );

                navigation.navigate("KakaoSignupAgreement", {
                    kakaoId: result.kakaoId,
                });
            } else {
                console.log("기존 회원입니다. 메인으로 이동합니다.");
                if (result.accessToken) {
                    await AsyncStorage.setItem(
                        "accessToken",
                        result.accessToken
                    );

                    if (result.refreshToken) {
                        await AsyncStorage.setItem(
                            "refreshToken",
                            result.refreshToken
                        );
                    }

                    console.log("토큰 저장 완료:", result.accessToken);
                }

                navigation.reset({
                    index: 0,
                    routes: [{ name: "Screens" }],
                });
            }
        } catch (error) {
            console.error("백엔드 통신 에러:", error);
            Alert.alert("오류", "서버 로그인 중 문제가 발생했습니다.");
        }
    };

    const handleKakaoFail = (error) => {
        console.log("로그인 실패:", error);
    };

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <S.Container>
            <S.LogoWrapper>
                <Logo width="101.5%" height="101.5%" />
            </S.LogoWrapper>
            <S.IconGrid>
                <S.IconWrapper style={{ paddingTop: 25 }}>
                    <Green width={126} />
                </S.IconWrapper>
                <S.IconWrapper>
                    <Pink width={70} style={{ marginRight: 10 }} />
                </S.IconWrapper>
                <S.IconWrapper style={{ paddingTop: 15 }}>
                    <Red width={145} />
                </S.IconWrapper>
            </S.IconGrid>
            <S.IconGrid>
                <S.IconWrapper>
                    <Blue width={193.5} />
                </S.IconWrapper>
                <S.IconWrapper
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        paddingBottom: 20,
                    }}
                >
                    <Orange width={66.47} style={{ marginRight: 20 }} />
                </S.IconWrapper>
                <S.IconWrapper style={{ paddingTop: 5 }}>
                    <Yellow width={180} />
                </S.IconWrapper>
            </S.IconGrid>
            <S.AuthContainer>
                <S.Description
                    style={{
                        paddingTop: 30,
                        paddingBottom: 20,
                    }}
                >
                    간편하게 로그인하고{"\n"}다양한 서비스를 이용해보세요!
                </S.Description>
                <KaKaoButton
                    onLoginSuccess={handleKakaoSuccess}
                    onLoginFail={handleKakaoFail}
                />
                <S.ToSignupButton onPress={handleLogin}>
                    <S.Description
                        style={{
                            paddingTop: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: "black",
                        }}
                    >
                        이메일로 로그인하기
                    </S.Description>
                </S.ToSignupButton>
            </S.AuthContainer>
        </S.Container>
    );
}
