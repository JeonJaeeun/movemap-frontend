import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export const S = {
    Container: styled.View`
        width: 100%;
        height: 70px;
        flex-direction: row;
        justify-content: space-around;
        border-width: 3px;
        border-style: solid;
        border-top-color: #00000024;
        border-right-color: #fff;
        border-left-color: #fff;
        background-color: #fff;
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;

        padding-top: 10px;
    `,

    IconWrapper: styled(TouchableOpacity)`
        flex: 1;
        align-items: center;
        justify-content: center;
    `,
};
