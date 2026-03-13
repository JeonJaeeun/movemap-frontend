import React, { useEffect } from "react";
import { login, getProfile } from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";
import { S } from "./BaseButton.style";
import KaKao from "../../../assets/icons/Kakao.svg";
import Empty from "../../../assets/icons/empty.svg";

const BaseButton = ({ title, onPress, disabled }) => {
    return (
        <S.BaseButtonContainer
            onPress={disabled ? null : onPress}
            disabled={disabled}
        >
            <S.ButtonText style={disabled}>{title}</S.ButtonText>
        </S.BaseButtonContainer>
    );
};

const Button = ({ title, onPress, disabled, style }) => {
    return (
        <S.ButtonContainer
            onPress={disabled ? null : onPress}
            disabled={disabled}
            style={style}
        >
            <S.ButtonText>{title}</S.ButtonText>
        </S.ButtonContainer>
    );
};

function KaKaoButton({ onLoginSuccess, onLoginFail }) {
    const signInWithKakao = async () => {
        console.log("▶ 카카오 로그인 버튼 클릭됨");
        try {
            const token = await login();
            console.log("로그인 성공 토큰:", token);

            const profile = await getProfile();
            console.log("사용자 프로필:", profile);
            if (onLoginSuccess) {
                onLoginSuccess({ token, profile });
            }
        } catch (err) {
            console.error("로그인 에러:", err);

            if (err.code === "E_CANCELLED_OPERATION") {
                console.log("사용자가 로그인을 취소했습니다.");
            } else {
                Alert.alert("로그인 실패", "다시 시도해주세요.");
            }

            if (onLoginFail) {
                onLoginFail(err);
            }
        }
    };
    return (
        <S.KakaoLogin onPress={signInWithKakao}>
            <KaKao />
            <S.KakaoText>카카오 로그인</S.KakaoText>
            <Empty />
        </S.KakaoLogin>
    );
}

export { BaseButton, KaKaoButton, Button };
