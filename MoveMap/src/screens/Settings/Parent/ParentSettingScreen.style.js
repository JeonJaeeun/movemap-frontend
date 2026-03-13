import styled from "styled-components";
import CustomText from "../../../components/common/CustomText";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const S = {
    Container: styled.View`
        flex: 1;
        justify-content: columns;
        width: 100%;
        padding: 0px 20px;
        padding-top: 30px;
        gap: 30px;
        background-color: #fff;
    `,
    InfoContainer: styled.View`
        flex-direction: column;
        gap: 20px;
    `,
    Text: styled(CustomText)`
        padding-left: 9.36px;
        font-size: 20px;
        font-weight: 700;
        color: #009900;
    `,
    InputTextWrapper: styled.View`
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 5px 19px;
        background-color: #f8f8fb;
        border: 1px solid #b7bdcc;
        border-radius: 12px;
    `,
    TextWrapper: styled.View`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 17px 19px;
        gap: 10px;
        background-color: #f8f8fb;
        border: 1px solid #b7bdcc;
        border-radius: 12px;
    `,
    InsideContentsContainer: styled.View`
        flex-direction: row;
        gap: 5px;
        align-items: center;
    `,
    ParentTextWrapper: styled.View`
        width: 80%;
        flex-direction: row;
        align-items: center;
        gap: 5px;
    `,
    InviteCode: styled(CustomText)`
        flex: 1;
        margin-right: 10px;

        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
        color: #1a1a1a;
    `,
    InsideText: styled(CustomText)`
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
        color: #1a1a1a;
    `,
    InsideTextInput: styled(TextInput)`
        flex: 1;
        margin-right: 20px;
        font-size: 20px;
        font-weight: 500;
        color: #1a1a1a;
    `,
    InsideTextParents: styled(CustomText)`
        color: #000;

        font-size: 16px;
        font-weight: 400;
    `,
    Button: styled(TouchableOpacity)`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin: 5px 0px;
        border-radius: 5px;
        background: #b7bdcc;
    `,
    ButtonText: styled(CustomText)`
        color: #fafafa;
        font-size: 12px;
        font-weight: 500;
    `,

    ButtonContainer: styled.View`
        flex-direction: row;
        gap: 5px;
    `,
    EmptyBox: styled.View`
        flex: 1;
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
    UserName: styled(CustomText)`
        font-size: 14px;

        font-weight: 500;
    `,
};
