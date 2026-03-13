import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export const S = {
    Container: styled.View`
        flex: 1;
        justify-content: columns;
        width: 100%;
        background-color: #fff;
    `,
    TopBarContainer: styled.View`
        padding: 0px 20px;
    `,
    ListContainter: styled.View`
        width: 100%;
        gap: 10px;
    `,
    WishContents: styled(TouchableOpacity)`
        width: 100%;
        height: 100px;
        background-color: #ececec;
        border-radius: 12px;
    `,
};
