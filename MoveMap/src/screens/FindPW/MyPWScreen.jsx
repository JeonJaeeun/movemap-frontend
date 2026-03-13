import { S } from "./FindPWScreen.style";
import Logo from "../../../assets/icons/Logo_small.svg";
import Green from "../../../assets/icons/Green_.svg";
import Pink from "../../../assets/icons/Pink_.svg";
import Red from "../../../assets/icons/Red_.svg";
import Blue from "../../../assets/icons/Blue_.svg";
import Orange from "../../../assets/icons/Orange_.svg";
import Yellow from "../../../assets/icons/Yellow_.svg";
//import SmallLogo from "../../components/Logo/SmallLogo";

export default function MyPWScreen() {
    return (
        <S.MyPWContainer>
            <S.IconGrid>
                <S.IconWrapper style={{ paddingTop: 139 }}>
                    <Red />
                </S.IconWrapper>
                <S.IconWrapper style={{ paddingTop: 37 }}>
                    <Blue />
                </S.IconWrapper>
            </S.IconGrid>

            <S.PWContainer>
                <S.MainText>내 비밀번호</S.MainText>
                <S.PWWrapper>
                    <S.PW>asdfasdfasdf</S.PW>
                </S.PWWrapper>
            </S.PWContainer>
            <S.IconGrid>
                <S.IconWrapper style={{ paddingTop: 77 }}>
                    <Yellow />
                </S.IconWrapper>
                <S.IconWrapper style={{ paddingTop: 66, paddingLeft: 5 }}>
                    <Pink />
                </S.IconWrapper>
                <S.IconWrapper style={{ paddingTop: 25, marginRight: -40 }}>
                    <Orange />
                </S.IconWrapper>
                <S.IconWrapper style={{ marginTop: 92 }}>
                    <Green />
                </S.IconWrapper>
            </S.IconGrid>
        </S.MyPWContainer>
    );
}
