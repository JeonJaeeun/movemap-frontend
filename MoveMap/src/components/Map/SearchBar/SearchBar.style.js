import { TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../common/CustomText";

export const S = {
    Container: styled.View`
        position: absolute;
        top: 105px;
        left: 0;
        right: 0;
        z-index: 10;
        background-color: transparent;
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
    `,

    SearchInputWrapper: styled.View`
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        background-color: #fff;
        border-radius: 12px;
        height: 48px;
        elevation: 4;
    `,
    SearchInput: styled(TextInput)`
        flex: 1;
        font-size: 16px;
        fontWeight: 500;
        color: #333;
    `,
    SearchIconWrapper: styled(TouchableOpacity)`
        padding: 5px;
    `,
    LocationIconWrapper: styled(TouchableOpacity)`
        padding: 5px;
    `,
    CloseIconWrapper: styled(TouchableOpacity)`
        padding: 5px;
    `,
};
