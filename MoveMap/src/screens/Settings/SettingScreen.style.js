import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import CustomText from "../../components/common/CustomText";
export const S = {
    Container: styled.View`
        flex: 1;
        justify-content: columns;
        width: 100%;
        padding: 0px 20px;
        background-color: #fff;
    `,
    SettingContentsContainer: styled.View`
        padding-top: 30px;
        gap: 20px;
        width: 100%;
    `,
    ButtonsContainer: styled(TouchableOpacity)`
        flex-direction: row;
    `,
    IconWrapper: styled.View`
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    `,

    InfoWrapper: styled(CustomText)`
        flex: 1;
        font-size: 20px;
        font-weight: 600;
        color: #000;
    `,

    ArrowIconWrapper: styled.View`
        justify-content: center;
        align-items: center;
    `,

    DropdownContentWrapper: styled.View`
        width: 100%;
        padding: 20px 25px;

        margin-bottom: 20px;
        gap: 10px;
        border: solid 2px #b7bdcc;
        border-radius: 12px;
    `,

    DropdownItem: styled.View`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `,

    DropdownText: styled(CustomText)`
        font-size: 20px;
        font-weight: 400;
        color: #000000;
    `,

    SwitchWrapper: styled.View`
        width: 50px;
        height: 28px;
        border-radius: 14px;
        border: 2px solid #9c9c9c;

        overflow: hidden;
        justify-content: center;
        align-items: center;
    `,

    SettingsInfoWrapper: styled(CustomText)`
        flex: 1;
        font-size: 20px;
        font-weight: 400;
        color: #000000;
    `,
};
