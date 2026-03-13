import React from "react";
import { TextInput } from "react-native";
import { S } from "./TextInput.style";

function TextInputComponents({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
}) {
    return (
        <S.Container>
            <S.Text>{label}</S.Text>
            <S.InputWrapper>
                <S.InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#b7bdcc"
                    secureTextEntry={secureTextEntry}
                ></S.InputText>
            </S.InputWrapper>
        </S.Container>
    );
}

function EmailInputComponents({
    label,
    placeholder,
    value,
    onChangeText,
    onPress,
    disabled,
}) {
    return (
        <S.Container>
            <S.Text>{label}</S.Text>
            <S.EmailInputContainer>
                <S.InputTextHalf
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="email-address"
                    placeholderTextColor="#b7bdcc"
                />
                <S.EmailcheckButton
                    onPress={disabled ? null : onPress}
                    disabled={disabled}
                >
                    <S.EmailCheckText disabled={disabled}>
                        인증 코드 발송
                    </S.EmailCheckText>
                </S.EmailcheckButton>
            </S.EmailInputContainer>
        </S.Container>
    );
}

function TextInputWrapper({ placeholder, value, onChangeText }) {
    return (
        <S.Container>
            <S.InputWrapper>
                <S.InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#b7bdcc"
                ></S.InputText>
            </S.InputWrapper>
        </S.Container>
    );
}

function PWInputWrapper({ placeholder, value, onChangeText, secureTextEntry }) {
    return (
        <S.Container>
            <S.InputWrapper>
                <S.InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#b7bdcc"
                ></S.InputText>
            </S.InputWrapper>
        </S.Container>
    );
}

function CodeInputComponent({
    label,
    placeholder,
    value,
    onChangeText,
    onPress,
    disabled,
}) {
    return (
        <S.Container>
            <S.Text>{label}</S.Text>
            <S.EmailInputContainer>
                <S.InputTextHalf
                    style={{ width: "80%" }}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#b7bdcc"
                />
                <S.EmailcheckButton
                    onPress={disabled ? null : onPress}
                    disabled={disabled}
                >
                    <S.EmailCheckText disabled={disabled}>
                        인증
                    </S.EmailCheckText>
                </S.EmailcheckButton>
            </S.EmailInputContainer>
        </S.Container>
    );
}

function UserInfoComponent({ label, info, value }) {
    return (
        <S.Container>
            <S.Text>{label}</S.Text>
            <S.InputWrapper>
                <S.UserInfoText>{info}</S.UserInfoText>
            </S.InputWrapper>
        </S.Container>
    );
}

function UserBodyInfoComponent({
    height,
    weight,
    onChangeHeight,
    onChangeWeight,
}) {
    return (
        <S.UserBodyInfoContainer>
            <S.UserBodyInfoBoxContainer>
                <S.BodyInfoTitle>키</S.BodyInfoTitle>
                <S.UserBodyInfoTextWrapper>
                    <S.BodyInfoInput
                        value={String(height)}
                        onChangeText={onChangeHeight}
                        placeholder="100"
                        keyboardType="numeric"
                    />
                    <S.BodyInfoUnit>cm</S.BodyInfoUnit>
                </S.UserBodyInfoTextWrapper>
            </S.UserBodyInfoBoxContainer>

            <S.UserBodyInfoBoxContainer>
                <S.BodyInfoTitle>몸무게</S.BodyInfoTitle>
                <S.UserBodyInfoTextWrapper>
                    <S.BodyInfoInput
                        value={String(weight)}
                        onChangeText={onChangeWeight}
                        placeholder="40"
                        keyboardType="numeric"
                    />
                    <S.BodyInfoUnit>kg</S.BodyInfoUnit>
                </S.UserBodyInfoTextWrapper>
            </S.UserBodyInfoBoxContainer>
        </S.UserBodyInfoContainer>
    );
}

export {
    TextInputComponents,
    EmailInputComponents,
    TextInputWrapper,
    CodeInputComponent,
    UserInfoComponent,
    UserBodyInfoComponent,
    PWInputWrapper,
};
