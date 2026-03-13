import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";

const SELECTED_COLOR = "#A8D234";
const DEFAULT_COLOR = "#FCFCFC";

export const S = {
    Container: styled.View`
        flex: 1;
        background-color: #fff;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    `,
    LogoWrapper: styled.View`
        width: 100%;
        padding-bottom: 20px;
    `,
    InfoContainer: styled.View`
        width: 100%;
        gap: 20px;
    `,
    WhoamI: styled(CustomText)`
        padding-left: 9.36px;
        padding-bottom: 9.89px;
        font-size: 16px;
        font-weight: 500;
        color: #121212;
    `,

    UserRoleButtonContainer: styled.View`
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 30px;
        align-self: center;
    `,
    UserRole: styled(TouchableOpacity)`
        justify-content: center;
        align-items: center;
        padding: 15.11px 0px;
        width: 48%;
        border-radius: 12px;
        background-color: ${(props) =>
            props.isSelected ? "#A8D234" : "#FCFCFC"};
    `,
    UserRoleText: styled(CustomText)`
        color: ${(props) => (props.isSelected ? "#FAFAFA" : "#B7BDCC")};
    `,
    Empty: styled.View`
        width: 100%;
        height: 400px;
    `,
    TitleWrapper: styled.View`
        width: 100%;
    `,
    Title: styled(CustomText)`
        width: 100%;
        text-align: start;
        font-size: 25px;
    `,
    SubTitle: styled(CustomText)`
        font-size: 20px;
    `,
    Detail: styled(CustomText)`
        width: 100%;
        text-align: start;
        font-size: 17px;
    `,
    Line: styled.View`
        border: solid 1px #b0b0b0ff;
    `,
};
