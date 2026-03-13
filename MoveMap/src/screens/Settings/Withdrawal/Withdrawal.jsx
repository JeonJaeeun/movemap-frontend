import { Title } from "../../../components/Settings/Title";
import { S } from "./Withdrawal.style";
import CautionIcon from "../../../../assets/icons/Settings/caution.svg";
import {
    AdressDropDownComponent,
    ReasonDropDownComponent,
} from "../../../components/common/Dropdown";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { Alert } from "react-native";
import { deleteMember } from "../../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function WithdrawalScreen() {
    const navigation = useNavigation();
    const handleWithdrawal = async () => {
        Alert.alert(
            "회원 탈퇴",
            "정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "탈퇴하기",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteMember();

                            await AsyncStorage.clear();

                            Alert.alert(
                                "탈퇴 완료",
                                "회원 탈퇴가 정상적으로 처리되었습니다.",
                                [
                                    {
                                        text: "확인",
                                        onPress: () => {
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: "Login" }],
                                            });
                                        },
                                    },
                                ]
                            );
                        } catch (error) {
                            Alert.alert(
                                "오류",
                                "회원 탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요."
                            );
                        }
                    },
                },
            ]
        );
    };

    return (
        <S.Container>
            <Title label="회원 탈퇴" style={{ paddingBottom: 20 }} />
            <S.ConfirmText>정말 탈퇴하시겠어요?</S.ConfirmText>
            <S.WholeCautionContainer>
                <S.CautionContiner>
                    <CautionIcon />
                    <S.CautionTextWrapper>
                        <S.CautionText>
                            탈퇴 즉시 계정에 로그인할 수 없으며 해당 서비스의
                            모든 기능 (예: 콘텐츠 시청, 게시물 작성, 메시지 전송
                            등)을 이용할 수 없게 됩니다.
                        </S.CautionText>
                    </S.CautionTextWrapper>
                </S.CautionContiner>
                <S.CautionContiner>
                    <CautionIcon />
                    <S.CautionTextWrapper>
                        <S.CautionText>
                            사용자가 생성했거나 저장한 데이터에 더 이상 접근할
                            수 없습니다.
                        </S.CautionText>
                    </S.CautionTextWrapper>
                </S.CautionContiner>
            </S.WholeCautionContainer>
            <S.ConfirmText>떠나는 이유를 알려주세요</S.ConfirmText>
            <S.WholeCautionContainer>
                <S.CautionContiner>
                    <S.ReasonTextWrapper>
                        <S.CautionText>
                            무브맵을 아끼고 사랑해주신 시간에 감사드립니다.
                            떠나시는 이유를 저희에게 공유해주시면 더욱 유용한
                            서비스를 제공할 수 있는 무브맵이 되도록
                            노력하겠습니다.
                        </S.CautionText>
                    </S.ReasonTextWrapper>
                </S.CautionContiner>
                <ReasonDropDownComponent />
            </S.WholeCautionContainer>
            <BaseButton title="계정 탈퇴" onPress={handleWithdrawal} />
        </S.Container>
    );
}
