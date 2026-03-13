import { TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styled from "styled-components";
import CustomText from "./CustomText";

export const S = {
    Container: styled.View`
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 9.69px;
        margin-top: 20px;
    `,
    Text: styled(CustomText)`
        padding-left: 9.36px;
        font-size: 16px;
        font-weight: 500;
        color: #121212;
    `,
    InputWrapper: styled.View`
        width: 100%;
        height: 50px;
        padding: 0px 19px;
        background-color: #fcfcfc;
        border-radius: 12px;
        justify-content: center;
    `,
    InputText: styled(TextInput)`
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #121212;
    `,

    InputTextHalf: styled(TextInput)`
        width: 65%;
        font-size: 14px;
        font-weight: 500;
        color: #121212;
    `,
    EmailInputContainer: styled.View`
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0px 19px;
        justify-content: space-between;
        background-color: #fcfcfc;
        border-radius: 12px;
    `,
    EmailcheckButton: styled(TouchableOpacity)`
        justify-content: center;
        align-items: center;
        padding: 6px 15px;
        background-color: ${({ disabled }) => (disabled ? "#B7BDCC" : "#090")};
        border-radius: 5px;
    `,
    EmailCheckText: styled(CustomText)`
        font-size: 12px;
        font-weight: 500;
        color: #fafafa;
    `,

    DropdownContainer: styled.View`
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    `,

    Dropdown: styled(Dropdown)`
        width: 48%;
        background-color: #fcfcfc;
        border-radius: 12px;
    `,
    ResonDropdownContainer: styled(Dropdown)`
        width: 100%;
        border: 1px solid #b7bdcc;
        background: #fff;
        border-radius: 12px;
    `,

    MapDropdownContainer: styled.View`
        flex: 1;
        flex-direction: row;
        gap: 5px;
    `,

    MapDropdown: styled(Dropdown)`
        width: 22%;
        background-color: #f0fbed;
        border-radius: 12px;
    `,

    UserInfoText: styled(CustomText)`
        font-size: 14px;
        font-weight: 500;
        color: #121212;
    `,

    UserBodyInfoContainer: styled.View`
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    `,
    UserBodyInfoBoxContainer: styled.View`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 47.5%;
    `,
    UserBodyInfoTextWrapper: styled.View`
        flex-direction: row;
        width: 100%;
        aspect-ratio: 1;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        border: solid 2px #b7bdcc;
    `,
    BodyInfoTitle: styled(CustomText)`
        width: 100%;
        padding-left: 9.36px;
        padding-bottom: 10px;
        font-size: 16px;
        font-weight: 500;
    `,
    BodyInfoUnit: styled(CustomText)`
        font-size: 20px;
        font-weight: 500;
    `,
    BodyInfoInput: styled(TextInput)`
        font-size: 36px;
        font-style: normal;
        font-weight: 500;
    `,
};
