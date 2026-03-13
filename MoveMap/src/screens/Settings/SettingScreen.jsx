import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Switch, Text } from "react-native";
import { S } from "./SettingScreen.style";

import SmallLogo from "../../components/Logo/SmallLogo";
import UserInfoIcon from "../../../assets/icons/Settings/userInfo.svg";
import ParentsIcon from "../../../assets/icons/Settings/parents.svg";
import HeartIcon from "../../../assets/icons/Settings/heart.svg";
import AlarmIcon from "../../../assets/icons/Settings/alarm.svg";
import SettingIcon from "../../../assets/icons/Settings/setting.svg";

import RightIcon from "../../../assets/icons/Settings/right.svg";
import DownIcon from "../../../assets/icons/Settings/down.svg";
import UpIcon from "../../../assets/icons/Settings/up.svg";
import { postLogout } from "../../api/auth";
import { updatePushSetting, unregisterDevice } from "../../api/notification";

export default function SettingScreen() {
    const navigation = useNavigation();

    const [isAlarmExpanded, setIsAlarmExpanded] = useState(false);

    const [isCheckInOutAlarmOn, setIsCheckInOutAlarmOn] = useState(true);
    const [isRecommendAlarmOn, setIsRecommendAlarmOn] = useState(false);

    const [isSettingExpanded, setIsSettingExpanded] = useState(false);

    const [role, setRole] = useState("");

    const handleNavigate = (screenName) => {
        navigation.navigate(screenName);
    };

    const toggleCheckInOutAlarm = async (value) => {
        try {
            console.log("🔥 toggleCheckInOutAlarm 호출됨:", value);
    
            setIsCheckInOutAlarmOn(value);
    
            const deviceId = await AsyncStorage.getItem("deviceId");
            console.log("📡 현재 deviceId:", deviceId);
    
            if (!deviceId) {
                console.log("deviceId 없음 → 서버로 안 보냄");
                return;
            }
    
            await updatePushSetting(deviceId, value);
            console.log("체크인/체크아웃 알림 설정 변경 성공:", value);
        } catch (err) {
            console.error("알림 설정 변경 오류:", err);
            Alert.alert("오류", "알림 설정 중 문제가 발생했습니다.");
        }
    };    

    const handleLogout = async () => {
        try {
            const deviceId = await AsyncStorage.getItem("deviceId");
    
            if (deviceId) {
                await unregisterDevice(deviceId);
                console.log("기기 등록 해제 완료");
            }
    
            await postLogout();
            
            await AsyncStorage.setItem("logoutFlag", "true");

            await AsyncStorage.multiRemove([
                "accessToken",
                "refreshToken",
                "role",
                "userInfo",
                "deviceId",
            ]);

            console.log("AsyncStorage 비움 완료");

            Alert.alert("로그아웃", "성공적으로 로그아웃 되었습니다.");
            navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
        } catch (error) {
            Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
            console.error(error);
        }
    };
    
    useEffect(() => {
        const loadRole = async () => {
            const storedRole = await AsyncStorage.getItem("role");
            if (storedRole) {
                setRole(storedRole);
            }
        };
        loadRole();
    }, []);

    const navigationItems = [
        {
            icon: <UserInfoIcon />,
            label: "계정 정보",
            screen: "UserInfo",
        },
        {
            icon: <ParentsIcon />,
            label: role === "STUDENT" ? "나의 보호자" : "나의 아이",
            screen: "ParentSetting",
        },
        {
            icon: <HeartIcon />,
            label: "찜 목록",
            screen: "WishList",
        },
    ];

    return (
        <S.Container>
            <S.SettingContentsContainer>
                {navigationItems.map((item, index) => (
                    <S.ButtonsContainer
                        key={item.screen || index}
                        onPress={() => handleNavigate(item.screen)}
                    >
                        <S.IconWrapper>{item.icon}</S.IconWrapper>
                        <S.InfoWrapper>{item.label}</S.InfoWrapper>
                        <S.ArrowIconWrapper>
                            <RightIcon />
                        </S.ArrowIconWrapper>
                    </S.ButtonsContainer>
                ))}

                <S.ButtonsContainer
                    onPress={() => setIsAlarmExpanded(!isAlarmExpanded)}
                >
                    <S.IconWrapper>
                        <AlarmIcon />
                    </S.IconWrapper>
                    <S.InfoWrapper>알림 설정</S.InfoWrapper>
                    <S.ArrowIconWrapper>
                        {isAlarmExpanded ? <UpIcon /> : <DownIcon />}
                    </S.ArrowIconWrapper>
                </S.ButtonsContainer>
                {isAlarmExpanded && (
                    <S.DropdownContentWrapper>
                        <S.DropdownItem>
                            {role === "STUDENT" && (
                                <>
                                    <S.DropdownText>
                                        체크인・체크아웃 알림
                                    </S.DropdownText>
                                    <S.SwitchWrapper>
                                        <Switch
                                            trackColor={{
                                                false: "transparent",
                                                true: "transparent",
                                            }}
                                            thumbColor={
                                                isCheckInOutAlarmOn
                                                    ? "green"
                                                    : "#f4f3f4"
                                            }
                                            onValueChange={
                                                toggleCheckInOutAlarm
                                            }
                                            value={isCheckInOutAlarmOn}
                                        />
                                    </S.SwitchWrapper>
                                </>
                            )}
                        </S.DropdownItem>

                        <S.DropdownItem>
                            <S.DropdownText>추천 정보 알림</S.DropdownText>
                            <S.SwitchWrapper>
                                <Switch
                                    trackColor={{
                                        false: "transparent",
                                        true: "transparent",
                                    }}
                                    thumbColor={
                                        isRecommendAlarmOn ? "green" : "#f4f3f4"
                                    }
                                    onValueChange={setIsRecommendAlarmOn}
                                    value={isRecommendAlarmOn}
                                />
                            </S.SwitchWrapper>
                        </S.DropdownItem>
                    </S.DropdownContentWrapper>
                )}
                <S.ButtonsContainer
                    onPress={() => setIsSettingExpanded(!isSettingExpanded)}
                >
                    <S.IconWrapper>
                        <SettingIcon />
                    </S.IconWrapper>
                    <S.InfoWrapper>일반 설정</S.InfoWrapper>
                    <S.ArrowIconWrapper>
                        {isSettingExpanded ? <UpIcon /> : <DownIcon />}
                    </S.ArrowIconWrapper>
                </S.ButtonsContainer>
                {isSettingExpanded && (
                    <S.DropdownContentWrapper>
                        <S.ButtonsContainer
                            onPress={() => handleNavigate("ChangePW")}
                        >
                            <S.SettingsInfoWrapper>
                                비밀번호 설정
                            </S.SettingsInfoWrapper>
                            <RightIcon />
                        </S.ButtonsContainer>
                        <S.ButtonsContainer onPress={handleLogout}>
                            <S.SettingsInfoWrapper>
                                로그아웃
                            </S.SettingsInfoWrapper>
                            <RightIcon />
                        </S.ButtonsContainer>
                        <S.ButtonsContainer
                            onPress={() => handleNavigate("Withdrawal")}
                        >
                            <S.SettingsInfoWrapper>
                                회원탈퇴
                            </S.SettingsInfoWrapper>
                            <RightIcon />
                        </S.ButtonsContainer>
                    </S.DropdownContentWrapper>
                )}
            </S.SettingContentsContainer>
        </S.Container>
    );
}
