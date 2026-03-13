import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../common/CustomText";

export const S = {
    BaseButtonContainer: styled(TouchableOpacity)`
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        padding: 10px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 10px;
        background-color: ${(props) =>
            props.disabled ? "#b7bdcc" : "#009900"};
    `,

    ButtonContainer: styled(TouchableOpacity)`
        width: 100%;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 10px;
        background-color: ${(props) =>
            props.disabled ? "#b7bdcc" : "#009900"};
    `,
    ButtonText: styled(CustomText)`
        text-align: center;
        font-size: 17.111px;
        color: #fff;
    `,

    KakaoLogin: styled(TouchableOpacity)`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
        padding-top: 12px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 10px;
        background-color: #fee500;
    `,
    KakaoText: styled(CustomText)`
        width: 45%;
        text-align: center;
        color: #121212;
    `,
};
