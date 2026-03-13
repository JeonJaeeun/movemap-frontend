import { useState } from "react";
import { TextInputComponents } from "../../../components/common/TextInput";
import { Title } from "../../../components/Settings/Title";
import { S } from "./ChangePWScreen.style";
import { Alert } from "react-native";
import { BaseButton } from "../../../components/Buttons/BaseButton";
import { patchPW } from "../../../api/auth";
import { useNavigation } from "@react-navigation/native";

export default function ChangePWScreen() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const isFormValid =
        currentPassword.trim() !== "" &&
        newPassword.trim() !== "" &&
        confirmPassword.trim() !== "";

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert(
                "오류",
                "새 비밀번호와 확인 비밀번호가 일치하지 않습니다."
            );
            return;
        }

        try {
            const data = {
                currentPassword,
                newPassword,
                confirmPassword,
            };

            const res = await patchPW(data);
            Alert.alert("알림", "비밀번호가 성공적으로 변경되었습니다.");
            navigation.navigate("Screens", {
                screen: "SettingTab",
            });
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            Alert.alert("오류", "비밀번호 변경 중 오류가 발생했습니다.");
        }
    };
    return (
        <S.Container>
            <Title label="비밀번호 변경" style={{ paddingBottom: 10 }} />
            <TextInputComponents
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력하세요"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInputComponents
                label="새 비밀번호"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                secureTextEntry={true}
                onChangeText={setNewPassword}
            />
            <TextInputComponents
                label="비밀번호 다시 입력"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <BaseButton
                title="완료"
                onPress={handleChangePassword}
                disabled={!isFormValid}
            />
        </S.Container>
    );
}
