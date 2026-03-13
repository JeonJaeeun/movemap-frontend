import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../common/CustomText";

export const S = {
    Container: styled.View`
        width: 100%;

        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
        padding-top: 25px;
        padding-bottom: 10px;
    `,

    TypeSelectorWrapper: styled.View`
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 10px;
    `,
    TypeButton: styled(TouchableOpacity)`
        padding: 5px 10px;
    `,
    TypeText: styled(CustomText)`
        font-size: ${(props) => (props.isSelected ? "24px" : "20px")};
        
        margin-right: 10px;
        border-bottom-width: ${(props) => (props.isSelected ? "3px" : "0px")};
        border-bottom-color: #333;
        padding: 0 3px;
    `,

    AddressSelectorWrapper: styled.View`
        flex-direction: row;
    `,
};
