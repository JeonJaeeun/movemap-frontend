import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../../components/common/CustomText";
import { TextInput } from "react-native-gesture-handler";
export const S = {
    Container: styled.View`
        flex: 1;
        justify-content: columns;
        width: 100%;
        padding: 0px 20px;
        gap: 30px;
        background-color: #fff;
    `,

    UserIDContainer: styled.View`
        margin-top: 30px;
        flex-direction: row;
        justify-content: space-between;
    `,
    UsetIconWrapper: styled.View`
        justify-content: center;
        align-items: center;
    `,
    IDWrapper: styled.View`
        flex: 1;
        justify-content: center;
        padding: 17px 19px;
        background-color: #fff;
        border-radius: 12px;
        border: 1px solid #b7bdcc;
    `,
    UserName: styled(TextInput)`
        font-size: 14px;

        font-weight: 500;
    `,
    Empty: styled.View`
        width: 100%;
        height: 500px;
    `,
};
