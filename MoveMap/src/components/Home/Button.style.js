import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../common/CustomText";

export const S = {
    Containter: styled.View`
        width: 100%;
        justify-content: center;
        align-items: center;
    `,
    ButtonContainer: styled(TouchableOpacity)`
        flex-direction: row;
        padding: 12px 18px;
        justify-content: center;
        align-items: center;

        background-color: #fff;
        border-radius: 20px;
        elevation: 5;
    `,
    TextWrapper: styled.View`
        flex: 1;
        justify-content: center;
        align-items: center;
    `,
    ButtonText: styled(CustomText)`
        font-size: 18px;
        color: #121212;
    `,
    ArrowIconWrapper: styled.View`
        justify-content: center;
        align-items: center;
    `,

    ExerciseContainer: styled.View`
        flex-direction: row;
        justify-content: space-between;
    `,
    AountBoxConatiner: styled.View`
        width: 32%;
        aspect-ratio: 1;
        justify-content: space-between;
        padding: 16px 0px;
        border-radius: 12px;
        border-width: 2px;
        border-color: ${(props) => props.borderColor || "#000"};
        background-color: ${(props) => props.backgroundColor || "#FFF"};
    `,
    ExerciesNameWrapper: styled.View`
        width: 100%;
        justify-content: center;
        align-items: center;
    `,
    ExerciesName: styled(CustomText)`
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: ${(props) => props.fontColor || "#000"};
    `,
    ExerciseAmount: styled(CustomText)`
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: #000000;
    `,
};
