import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";
export const S = {
    Container: styled.View`
        flex: 1;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
    `,
    ContentsContainer: styled.View`
        flex: 1;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 179px;
    `,
    LogoWrapper: styled.View`
        width: 100%;
        padding-bottom: 20px;
    `,
    MainText: styled(CustomText)`
        padding-bottom: 19.56px;
        font-size: 20px;
        color: #090;
    `,
    ToSignupContainer: styled.View`
        flex-direction: row;
        gap: 10px;
    `,
    ToSignupScreenText: styled(CustomText)`
        font-size: 14px;
        font-weight: 500;
        color: #5e6d93;
    `,
    ToSignupScreenButton: styled(TouchableOpacity)``,
    SignupButtonText: styled(CustomText)`
        font-size: 14px;
        font-weight: 500;
        color: #090;
    `,
    ToFindPWButtonContainer: styled.View`
        width: 100%;
        padding-top: 10px;
    `,
    ToFindPWButton: styled(TouchableOpacity)`
        margin-left: auto;
    `,
    FindPWButtonText: styled(CustomText)`
        font-size: 14px;
        font-weight: 500;
        color: #b7bdcc;
    `,
};
