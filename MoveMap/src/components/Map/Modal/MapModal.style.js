import styled from "styled-components/native";
import { TouchableOpacity, View, Text } from "react-native";
import CustomText from "../../common/CustomText";
import { Dropdown } from "react-native-element-dropdown";

export const S = {
    ContentContainer: styled.View`
        padding-bottom: 120px;
        background-color: #fff;
    `,

    ListItemContainer: styled.View`
        flex-direction: row;
        width: 100%;
        padding: 15px 20px;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;

        background-color: ${(props) => (props.isSelected ? "#E6F7E6" : "#fff")};
    `,
    InfoClickBox: styled(TouchableOpacity)`
        flex: 1;
        padding-right: 15px;
    `,
    TextInfoWrapper: styled.View``,

    TitleText: styled(CustomText)`
        font-size: 17px;
        color: #121212;
    `,

    SubtitleText: styled(CustomText)`
        font-size: 13px;
        color: #555;
        margin-top: 2px;
    `,

    RatingWrapper: styled.View`
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
    `,
    RatingText: styled(CustomText)`
        font-size: 14px;
        color: #10c838;
        margin-right: 5px;
    `,
    ReviewCountText: styled(CustomText)`
        font-size: 12px;
        color: #777;
        margin-left: 5px;
    `,

    DistanceAddressText: styled(CustomText)`
        font-size: 13px;
        color: #777;
        margin-top: 5px;
    `,

    IconRightWrapper: styled.View`
        justify-content: center;
        align-items: center;
        width: 75px;
    `,
    IconWrapper: styled(TouchableOpacity)``,
    MapButtonWrapper: styled(TouchableOpacity)`
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;

        margin-left: auto;
        margin-right: auto;

        width: 150px;
        height: 50px;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background-color: #e6f5e6;
        border-radius: 25px;
        z-index: 10;
        elevation: 5;
    `,

    TopSelectBarContainer: styled.View`
        flex-direction: row;

        padding: 10px 20px;
        background-color: #fff;
        align-items: center;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
        gap: 8px;
    `,
    AllButton: styled(TouchableOpacity)`
        background-color: ${(props) => (props.isActive ? "#009900" : "#fff")};
        border-radius: 20px;
        padding: 4.2px 13px;
        elevation: 5;
    `,
    AllButtonText: styled(CustomText)`
        color: ${(props) => (props.isActive ? "#FFFFFF" : "#333333")};
        font-size: 12px;
    `,

    DropdownButton: styled(Dropdown)`
        width: 95px;
        align-items: center;
        background-color: #fff;
        border-radius: 13px;
        padding: 3px 12px;
        elevation: 5;
    `,
};
