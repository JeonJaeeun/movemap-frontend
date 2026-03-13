import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../components/common/CustomText";
const S = {
    Container: styled.View`
        flex: 1;
        padding-top: 45px;

        background-color: #ffffff;
        overflow: hidden;
    `,
    LogoWrapper: styled.View`
        height: auto;
        width: 100%;
        height: 10%;
        margin-bottom: 30px;
        flex-shrink: 0;

        align-items: center;
        align-self: center;
    `,
    IconGrid: styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `,

    IconWrapper: styled.View`
        align-items: center;
    `,

    AuthContainer: styled.View`
        display: flex;
        padding: 0 20px;
        align-items: center;
        width: 100%;
        margin-top: auto;

        border-width: 2px;
        border-style: solid;
        border-top-color: #00000024;
        border-right-color: white;
        border-left-color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding-bottom: 60px;

        background-color: #ffffff;
    `,

    Description: styled(CustomText)`
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: #121212;
    `,

    KakaoLogin: styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 90%;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 10px;
        background-color: #fee500;
    `,
    KakaoText: styled(CustomText)`
        text-align: center;
        color: #121212;
    `,
    ToSignupButton: styled(TouchableOpacity)`
        justify-content: center;
        align-items: center;

        width: 135px;
    `,
};

export { S };
