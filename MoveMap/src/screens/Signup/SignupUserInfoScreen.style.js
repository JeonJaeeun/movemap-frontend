import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";

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
    Section: styled.View`
        margin-bottom: 20px;
    `,
    Label: styled(CustomText)`
        padding-left: 9.36px;
        padding-bottom: 9.89px;
        font-size: 16px;
        font-weight: 500;
        color: #121212;
    `,
    SpacingBox: styled.View`
    margin-bottom: 20px;
    `,
};