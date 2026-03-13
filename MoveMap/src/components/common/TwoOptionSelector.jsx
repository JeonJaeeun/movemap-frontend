import { S } from "./TwoOptionSelector.style";

function TwoOptionSelector({
    options,
    currentValue,
    onSelect,
    containerStyle,
}) {
    return (
        <S.UserRoleButtonContainer style={containerStyle}>
            {options.map((option) => {
                const isSelected = currentValue === option.value;
                return (
                    <S.UserRole
                        key={option.value}
                        isSelected={isSelected}
                        onPress={() => onSelect(option.value)}
                    >
                        <S.UserRoleText isSelected={isSelected}>
                            {option.label}
                        </S.UserRoleText>
                    </S.UserRole>
                );
            })}
        </S.UserRoleButtonContainer>
    );
}

function SmallTwoOptionSelector({
    options,
    currentValue,
    onSelect,
    containerStyle,
}) {
    return (
        <S.OptionButtonContainer style={containerStyle}>
            {options.map((option) => {
                const isSelected = currentValue === option.value;
                return (
                    <S.OptionWrapper
                        key={option.value}
                        isSelected={isSelected}
                        onPress={() => onSelect(option.value)}
                    >
                        <S.OptionText isSelected={isSelected}>
                            {option.label}
                        </S.OptionText>
                    </S.OptionWrapper>
                );
            })}
        </S.OptionButtonContainer>
    );
}
export { TwoOptionSelector, SmallTwoOptionSelector };
