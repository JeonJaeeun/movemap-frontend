import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { S } from "./UserInfoScreen.style";
import UserIcon from "../../../../assets/icons/Settings/userimg";

import { BaseButton } from "../../../components/Buttons/BaseButton";
import { AdressDropDownComponent } from "../../../components/common/Dropdown";
import {
    UserInfoComponent,
    TextInputComponents,
    UserBodyInfoComponent,
} from "../../../components/common/TextInput";
import { TwoOptionSelector } from "../../../components/common/TwoOptionSelector";
import { getMember, patchMember } from "../../../api/user";

export default function UserInfoScreen() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        email: "",
        school: "",
        city: "",
        district: "",
        sex: "",
        age: null,
        height: null,
        weight: null,
    });

    const [currentUser, setCurrentUser] = useState(userInfo);
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMember();
                console.log(userData);
                setUserRole(userData.role);
                if (userData) {
                    const mappedUserInfo = {
                        nickname: userData.nickname,
                        email: userData.email,
                        school: userData.school,
                        city: userData.city,
                        district: userData.district,
                        sex: userData.sex,
                        age: userData.age,
                        height: userData.height,
                        weight: userData.weight,
                    };

                    setUserInfo(mappedUserInfo);
                    setCurrentUser(mappedUserInfo);
                }
            } catch (error) {
                console.error("내 정보 로딩 실패:", error);
            }
        };
        fetchUserData();
    }, []);

    // 필드 변경 감지
    const updateField = (field, value) => {
        setCurrentUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const getModifiedFields = (original, current) => {
        const modified = {};
        Object.keys(original).forEach((key) => {
            if (original[key] !== current[key]) {
                modified[key] = current[key];
            }
        });
        return modified;
    };

    const modifiedData = getModifiedFields(userInfo, currentUser);
    const isModified = Object.keys(modifiedData).length > 0;

    const GENDER = {
        MAN: "MAN",
        WOMAN: "WOMAN",
    };

    const GENDER_OPTIONS = [
        { value: GENDER.MAN, label: "남성" },
        { value: GENDER.WOMAN, label: "여성" },
    ];

    const handleFixInfo = async () => {
        const modified = getModifiedFields(userInfo, currentUser);

        if (Object.keys(modified).length === 0) return;
        if (modified.district) {
            modified.city = currentUser.city;
        }
        console.log("전송할 변경 데이터:", modified);
        try {
            await patchMember(modified);
            setUserInfo(currentUser);
        } catch (error) {
            console.error("정보 수정 에러:", error);
        }
    };

    return (
        <>
            <ScrollView>
                <S.Container>
                    <S.UserIDContainer>
                        <S.UsetIconWrapper>
                            <UserIcon />
                        </S.UsetIconWrapper>
                        <S.IDWrapper>
                            <S.UserName
                                onChangeText={(v) => updateField("nickname", v)}
                            >
                                {currentUser.nickname}
                            </S.UserName>
                        </S.IDWrapper>
                    </S.UserIDContainer>

                    <UserInfoComponent
                        label="아이디 (이메일)"
                        info={userInfo.email}
                    />

                    <AdressDropDownComponent
                        label="내 거주지"
                        cityValue={currentUser.city}
                        districtValue={currentUser.district}
                        onChangeCity={(v) => updateField("city", v)}
                        onChangeDistrict={(v) => updateField("district", v)}
                    />
                    <TwoOptionSelector
                        options={GENDER_OPTIONS}
                        currentValue={currentUser.sex}
                        onSelect={(v) => updateField("sex", v)}
                        style={{ paddingBottom: 30 }}
                    />
                    {userRole === "STUDENT" && (
                        <>
                            <TextInputComponents
                                label="나이"
                                info="12세"
                                value={String(currentUser.age)}
                                onChangeText={(v) =>
                                    updateField("age", Number(v))
                                }
                            />
                            <UserBodyInfoComponent
                                height={currentUser.height}
                                weight={currentUser.weight}
                                onChangeHeight={(v) =>
                                    updateField("height", Number(v))
                                }
                                onChangeWeight={(v) =>
                                    updateField("weight", Number(v))
                                }
                            />
                        </>
                    )}

                    <S.Empty />
                </S.Container>
            </ScrollView>
            <BaseButton
                title="수정"
                onPress={handleFixInfo}
                disabled={!isModified}
            />
        </>
    );
}
