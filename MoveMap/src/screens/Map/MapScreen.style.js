import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";

export const S = {
    Container: styled.View`
        flex: 1;
        background-color: #fff;
    `,
    ButtonContainer: styled.View`
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 40px;
        z-index: 100;
        width: 100%;
    `,
    MapButtonContainer: styled.View`
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 100px;
        z-index: 100;
        width: 100%;
    `,
    ListButtonWrapper: styled(TouchableOpacity)`
        width: 20%;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: #e6f5e6;
        border-radius: 20px;
        padding: 10px 15px;

        elevation: 5;
    `,
    ListButtonText: styled(CustomText)`
        font-size: 16px;
        color: #10c838;
        fontWeight: 500;
    `,
    MapButtonWrapper: styled(TouchableOpacity)`
        width: 20%;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        z-index: 9999;

        background-color: #e6f5e6;
        border-radius: 20px;
        padding: 10px 15px;

        elevation: 5;
    `,
    MapButtonText: styled(CustomText)`
        font-size: 16px;
        color: #10c838;
    `,
    TopEmptyView: styled.View`
        width: 100%;
        height: 60px;
    `,
};
