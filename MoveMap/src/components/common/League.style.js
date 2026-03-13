import styled from "styled-components";

import CustomText from "./CustomText";

export const S = {
    Container: styled.View`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 25px 21px;
        border-radius: 12px;
        border: 1px solid #b7bdcc;
        background: #fff;
        gap: 10px;
    `,
    RankingContainer: styled.View`
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `,
    RankIconWrapper: styled.View`
        justify-content: center;
        align-items: center;
        width: 24px;
    `,
    RankerNameWrapper: styled.View`
        flex: 1;
    `,
    RankerName: styled(CustomText)`
        color: #000;
        font-size: 20px;
        font-weight: 600;
    `,
    TotalTime: styled(CustomText)`
        color: #000;
        font-size: 20px;
        font-weight: 600;
    `,
};
