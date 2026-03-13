import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
export const S = {
    UserRoleButtonContainer: styled.View`
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        align-self: center;
    `,
    UserRole: styled(TouchableOpacity)`
        justify-content: center;
        align-items: center;
        padding: 15.11px 0px;
        width: 48%;
        border-radius: 12px;
        background-color: ${(props) =>
            props.isSelected ? "#009900" : "#FCFCFC"};
    `,
    UserRoleText: styled(CustomText)`
        color: ${(props) => (props.isSelected ? "#FAFAFA" : "#B7BDCC")};
    `,

    OptionButtonContainer: styled.View`
        flex-direction: row;
        gap: 20px;
        padding: 20px 0px;
        align-items: center;
    `,
    OptionWrapper: styled(TouchableOpacity)`
        justify-content: center;
        align-items: center;
        padding: 4px 20px;
        border-radius: 12px;
        background-color: ${(props) =>
            props.isSelected ? "#009900" : "#B7BDCC"};
    `,
    OptionText: styled(CustomText)`
        font-size: 14px;
        color: #fff;
    `,
};
