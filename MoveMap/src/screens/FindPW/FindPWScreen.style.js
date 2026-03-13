import styled from "styled-components";
import CustomText from "../../components/common/CustomText";
export const S = {
    Container: styled.View`
        flex: 1;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
    `,
    ContentsContainer: styled.View`
        flex: 1;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 30px;
        padding-top: 179px;
    `,
    LogoWrapper: styled.View`
        width: 100%;
        padding-bottom: 20px;
    `,
    MainText: styled(CustomText)`
        padding-bottom: 19.56px;
        font-size: 20px;
        font-weight: 700;
        color: #090;
    `,

    MyPWContainer: styled.View`
        flex: 1;
        flex-direction: column;
        width: 100%;
        background-color: #fff;
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
    PWContainer: styled.View`
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0px 20px;
    `,
    PWWrapper: styled.View`
        width: 100%;
        padding: 20px;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 12px;
        elevation: 7;
    `,
    PW: styled(CustomText)`
        font-size: 20px;
        font-weight: 700;
        color: #1a1a1a;
    `,
};
