import {
    View,
    ActivityIndicator,
    TouchableOpacity,
    AppState,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    NavigationContainer,
    createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navi from "./src/components/Navigation/Navi";
import { useFonts } from "expo-font";

import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StepProvider from "./StepProvider";

// fcm
import * as Notifications from "expo-notifications";

import * as NavigationBar from "expo-navigation-bar";

// Auth & Map
import MapListScreen from "./src/screens/Map/MapListScreen";
import SignupScreen from "./src/screens/Signup/SignupScreen";
import LoginScreen from "./src/screens/Login/LoginScreen";
import LandingScreen from "./src/screens/Landing/LandingScreen";
import FindPWScreen from "./src/screens/FindPW/FindPWScreen";
import MyPWScreen from "./src/screens/FindPW/MyPWScreen";
import SignupUserInfoScreen from "./src/screens/Signup/SignupUserInfoScreen";
import SignupAgreementScreen from "./src/screens/Signup/SignupAgreementScreen";
// import MapScreen from "./src/screens/Map/MapScreen";
// import HomeScreen from "./src/screens/Home/HomeScreen";

// Record 하위
import CheckInScreen from "./src/screens/Record/CheckIn/CheckInScreen";
import SelfReportScreen from "./src/screens/Record/SelfReport/SelfReportScreen";
import CalendarScreen from "./src/screens/Record/Calendar/CalendarScreen";
import CalculatorScreen from "./src/screens/Record/Calculator/CalculatorScreen";
import CalculatorIcon from "./assets/icons/Records/Calculator.svg";

// Record 하위 - 학부모
import ParentsCalendarScreen from "./src/screens/Parents/Record/ParentsCalendarScreen";

// Community 하위 - 학부모
import ParentsReviewWriteScreen from "./src/screens/Parents/Community/ParentsReviewWriteScreen";
import ParentsFacilitySelectScreen from "./src/screens/Parents/Community/ParentsFacilitySelectScreen";
import ParentsProgramReviewWriteScreen from "./src/screens/Parents/Community/ParentsProgramReviewWriteScreen";
import ParentsProgramSelectScreen from "./src/screens/Parents/Community/ParentsProgramSelectScreen";

// Settings
import SmallLogo from "./src/components/Logo/SmallLogo";
import UserInfoScreen from "./src/screens/Settings/UserInfo/UserInfoScreen";
import WishListScreen from "./src/screens/Settings/Wishlist/WishListScreen";
import ParentSettingScreen from "./src/screens/Settings/Parent/ParentSettingScreen";
import ChangePWScreen from "./src/screens/Settings/ChangePW/ChangePWScreen";
import KaKaoSignupScreen from "./src/screens/Signup/KakaoSignupScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerLogoutHandler } from "./src/api/authEvents";
import WithdrawalScreen from "./src/screens/Settings/Withdrawal/Withdrawal";

import KaKaoSignupAgreementScreen from "./src/screens/Signup/KaKaoSignupAgreementScreen";
import AgreementDetail from "./src/screens/Signup/AgreementDetail copy";

enableScreens();

const Stack = createNativeStackNavigator();

// 알림 처리 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const navigationRef = createNavigationContainerRef();

registerLogoutHandler(async () => {
    console.log("🔴 triggerLogout → App.js에서 네비 초기화 실행");

    await AsyncStorage.clear();

    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: "Landing" }],
        });
    }
});

export default function App() {
    const [initialRoute, setInitialRoute] = useState("Landing");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken");

                if (token) {
                    console.log("자동 로그인 성공");
                    console.log("토큰: ", token);
                    setInitialRoute("Screens");
                } else {
                    console.log("토큰 없음, 로그인 필요");
                    setInitialRoute("Landing");
                }
            } catch (e) {
                console.error("토큰 확인 실패", e);
                setInitialRoute("Landing");
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        let hideTimeout;

        const setImmersiveMode = async () => {
            try {
                await NavigationBar.setVisibilityAsync("hidden");

                await NavigationBar.setBehaviorAsync("overlay-swipe");
            } catch (e) {
                console.log("Navigation Bar Error:", e);
            }
        };

        setImmersiveMode();

        const appStateSubscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (nextAppState === "active") {
                    setImmersiveMode();
                }
            }
        );

        const visibilitySubscription = NavigationBar.addVisibilityListener(
            ({ visibility }) => {
                if (visibility === "visible") {
                    if (hideTimeout) clearTimeout(hideTimeout);

                    hideTimeout = setTimeout(() => {
                        NavigationBar.setVisibilityAsync("hidden");
                    }, 3000);
                }
            }
        );

        return () => {
            appStateSubscription.remove();
            if (visibilitySubscription) visibilitySubscription.remove();
            if (hideTimeout) clearTimeout(hideTimeout);
        };
    }, []);

    // 알림 액션(YES / NO) 카테고리 등록 + 클릭 리스너
    useEffect(() => {
        // 1) 알림 카테고리 등록 (YES / NO 버튼)
        Notifications.setNotificationCategoryAsync("facility-checkin", [
            {
                identifier: "YES_CHECKIN",
                buttonTitle: "예",
                options: { opensAppToForeground: true },
            },
            {
                identifier: "NO_STAY",
                buttonTitle: "아니요",
                options: { opensAppToForeground: true },
            },
        ]);

        // 2) 알림 클릭 리스너
        const sub = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const actionId = response.actionIdentifier;
                const data = response.notification.request.content.data || {};

                console.log("🔔 알림 클릭됨:", actionId, data);

                // YES 버튼 눌렀을 때만 CheckIn으로 이동
                if (actionId === "YES_CHECKIN" && data.facilityId) {
                    navigationRef.current?.navigate("CheckIn", {
                        facilityId: data.facilityId,
                        facilityName: data.facilityName,
                    });
                }

                // 알림 본문 클릭(기본 액션)도 YES처럼 처리하고 싶으면:
                // if (
                //   actionId === Notifications.DEFAULT_ACTION_IDENTIFIER &&
                //   data.facilityId
                // ) {
                //   navigationRef.current?.navigate("CheckIn", {
                //     facilityId: data.facilityId,
                //     facilityName: data.facilityName,
                //   });
                // }

                // NO_STAY면 아무 것도 안 함 → 그대로 Map 화면 유지
            }
        );

        return () => sub.remove();
    }, []);

    const [fontsLoaded] = useFonts({
        PretendardRegular: require("./assets/fonts/Pretendard-Regular.otf"),
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StepProvider>
                <SafeAreaProvider>
                    <NavigationContainer ref={navigationRef}>
                        <Stack.Navigator initialRouteName={initialRoute}>
                            <Stack.Screen
                                name="Landing"
                                component={LandingScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="KakaoSignup"
                                component={KaKaoSignupScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="SignupAgreement"
                                component={SignupAgreementScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />
                            <Stack.Screen
                                name="KakaoSignupAgreement"
                                component={KaKaoSignupAgreementScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />
                            <Stack.Screen
                                name="AgreementDetail"
                                component={AgreementDetail}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="Withdrawal"
                                component={WithdrawalScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="Screens"
                                component={Navi}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            {/* Record 관련 화면 */}
                            <Stack.Screen
                                name="Calendar"
                                component={CalendarScreen}
                                options={({ navigation }) => ({
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                    headerRight: () => (
                                        <TouchableOpacity
                                            style={{ marginRight: 27 }}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "Calculator"
                                                )
                                            }
                                        >
                                            <CalculatorIcon />
                                        </TouchableOpacity>
                                    ),
                                })}
                            />

                            <Stack.Screen
                                name="CheckIn"
                                component={CheckInScreen}
                                options={({ navigation }) => ({
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                    headerRight: () => (
                                        <TouchableOpacity
                                            style={{ marginRight: 27 }}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "Calculator"
                                                )
                                            }
                                        >
                                            <CalculatorIcon />
                                        </TouchableOpacity>
                                    ),
                                })}
                            />

                            <Stack.Screen
                                name="SelfReport"
                                component={SelfReportScreen}
                                options={({ navigation }) => ({
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                    headerRight: () => (
                                        <TouchableOpacity
                                            style={{ marginRight: 27 }}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "Calculator"
                                                )
                                            }
                                        >
                                            <CalculatorIcon />
                                        </TouchableOpacity>
                                    ),
                                })}
                            />

                            <Stack.Screen
                                name="Calculator"
                                component={CalculatorScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="ParentsCalendar"
                                component={ParentsCalendarScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                    headerRight: () => null,
                                }}
                            />

                            {/* Map 관련 화면 */}
                            <Stack.Screen
                                name="MapList"
                                component={MapListScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            {/* Community 관련 화면 */}
                            <Stack.Screen
                                name="ParentsReviewWrite"
                                component={ParentsReviewWriteScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            <Stack.Screen
                                name="ParentsFacilitySelect"
                                component={ParentsFacilitySelectScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="ParentsProgramReviewWrite"
                                component={ParentsProgramReviewWriteScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            <Stack.Screen
                                name="ParentsProgramSelect"
                                component={ParentsProgramSelectScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            {/* Auth */}

                            <Stack.Screen
                                name="Signup"
                                component={SignupScreen}
                                options={{
                                    headerTitle: (props) => (
                                        <SmallLogo {...props} />
                                    ),
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="SignupUserInfo"
                                component={SignupUserInfoScreen}
                                options={{
                                    headerTitle: (props) => (
                                        <SmallLogo {...props} />
                                    ),
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="FindPW"
                                component={FindPWScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="MyPW"
                                component={MyPWScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            {/* Settings 관련 화면 */}
                            <Stack.Screen
                                name="UserInfo"
                                component={UserInfoScreen}
                                options={{
                                    headerTitle: (props) => (
                                        <SmallLogo {...props} />
                                    ),
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="ChangePW"
                                component={ChangePWScreen}
                                options={{
                                    headerTitle: () => <SmallLogo />,
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="WishList"
                                component={WishListScreen}
                                options={{
                                    headerTitle: (props) => (
                                        <SmallLogo {...props} />
                                    ),
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="ParentSetting"
                                component={ParentSettingScreen}
                                options={{
                                    headerTitle: (props) => (
                                        <SmallLogo {...props} />
                                    ),
                                    headerTitleAlign: "center",
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </StepProvider>
        </GestureHandlerRootView>
    );
}
