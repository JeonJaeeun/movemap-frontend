import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";
export const S = {
    ContainerWrapper: styled.View`
        flex: 1;
        background-color: #fff;
    `,
    Container: styled.View`
        flex: 1;
        padding: 20px;
        gap: 30px;
        background-color: #fff;
    `,

    ContentsContainer: styled.View`
        flex-direction: column;
        gap: 10px;
    `,
    YoutubeWrapper: styled.View`
        justify-content: center;
        align-items: center;
    `,
    ContentsName: styled(CustomText)`
        font-size: 16px;
        font-weight: 500;
        color: #121212;
    `,

    ContentsWrapper: styled.View`
        height: 215px;
        border: solid 1px #b7bdcc;
        border-radius: 12px;
        overflow: hidden;
        opacity: 0.99;
    `,
    ThisWeekRankingTitleContainer: styled.View`
        flex-direction: row;
        width: 100%;
        gap: 10px;
    `,
    RunButton: styled.View`
        width: 42px;
        padding: 3px 0px;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: #d4e8fd;
    `,
    RunText: styled(CustomText)`
        width: 100%;
        text-align: center;
        color: #70b3f7;
        font-size: 12px;
        font-weight: 600;
    `,
};
