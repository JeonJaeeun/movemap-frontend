import { S } from "./Button.style";
import Arrow from "../../../assets/icons/Home/arrow.svg";
import { useNavigation } from "@react-navigation/native";
export const FindButton = () => {
    const navi = useNavigation();

    const handleNavi = () => {
        navi.navigate("Screens", {
            screen: "MapTab",
        });
    };
    return (
        <S.Containter>
            <S.ButtonContainer onPress={handleNavi}>
                <S.TextWrapper>
                    <S.ButtonText>현재 위치 근처 놀이터 찾기</S.ButtonText>
                </S.TextWrapper>
                <S.ArrowIconWrapper>
                    <Arrow />
                </S.ArrowIconWrapper>
            </S.ButtonContainer>
        </S.Containter>
    );
};
