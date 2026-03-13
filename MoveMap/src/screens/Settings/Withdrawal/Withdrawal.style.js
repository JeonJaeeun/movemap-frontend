import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../../components/common/CustomText";

export const S = {
    Container: styled.View`
        flex: 1;
        justify-content: columns;
        width: 100%;
        padding: 0px 20px;
        background-color: #fff;
    `,
    ConfirmText: styled(CustomText)`
        font-size: 16px;
        font-weight: 500;
        color: #000;
    `,
    WholeCautionContainer: styled.View`
        flex-direction: column;
        padding-top: 15px;
        gap: 12px;
    `,
    CautionContiner: styled.View`
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `,
    CautionTextWrapper: styled.View`
        width: 93%;
    `,
    ReasonTextWrapper: styled.View`
        width: 100%;
    `,
    CautionText: styled(CustomText)`
        width: 80%;
        color: #5e6d93;
        font-size: 16px;
        font-weight: 500;
    `,
};
