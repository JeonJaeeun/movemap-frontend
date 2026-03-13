import styled from "styled-components/native";
import CustomText from "../../components/common/CustomText";

export const S = {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #fff;
    `,
    ContentsContainer: styled.View`
        flex: 1;
        padding: 20px;
    `,

    TitleWrapper: styled.View`
        width: 100%;
        margin-bottom: 20px;
    `,
    Title: styled(CustomText)`
        width: 100%;
        text-align: left;
        font-size: 25px;

        margin-bottom: 10px;
        color: #000;
    `,
    SubTitle: styled(CustomText)`
        font-size: 18px;

        color: #333;
    `,
    Detail: styled.Text`
        width: 100%;
        text-align: left;
        font-size: 15px;
        line-height: 24px;
        color: #555;
    `,
    Line: styled.View`
        border-bottom-width: 1px;
        border-bottom-color: #b0b0b0;
        width: 100%;
    `,
    TableContainer: styled.View`
        border-width: 1px;
        border-color: #ddd;
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 20px;
        overflow: hidden;
    `,
    TableRow: styled.View`
        flex-direction: row;
        border-bottom-color: #ddd;
    `,
    TableCell: styled.View`
        flex: ${(props) => props.flex || 1};
        padding: 8px;
        border-right-width: 1px;
        border-right-color: #ddd;
        justify-content: center;
    `,
    TableText: styled.Text`
        font-size: 13px;
        color: #333;
        text-align: center;
    `,
};
