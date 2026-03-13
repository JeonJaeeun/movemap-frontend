import { S } from "./Title.style";
function Title({ label, style }) {
    return (
        <S.TitleContainer style={style}>
            <S.Title>{label}</S.Title>
        </S.TitleContainer>
    );
}

export { Title };
