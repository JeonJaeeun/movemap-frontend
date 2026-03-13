import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationBar } from "./Navigation";

import HomeScreen from "../../screens/Home/HomeScreen";
import MapScreen from "../../screens/Map/MapScreen";
import RecordScreen from "../../screens/Record/RecordScreen";
import ParentsRecordScreen from "../../screens/Parents/Record/ParentsRecordScreen";
import LeagueScreen from "../../screens/League/LeagueScreen";
import ParentsCommunityScreen from "../../screens/Parents/Community/ParentsCommunityScreen";
import SettingScreen from "../../screens/Settings/SettingScreen";

import SmallLogo from "../Logo/SmallLogo";
import CalendarIcon from "../../../assets/icons/Records/Calendar.svg";
import CalculatorIcon from "../../../assets/icons/Records/Calculator.svg";

const Tab = createBottomTabNavigator();

export default function Navi() {

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const loadRole = async () => {
            const role = await AsyncStorage.getItem("userRole");

            if(role === "PARENT") setUserType("parent");
            else setUserType("student");
        };
        loadRole();
    }, []);

    if(!userType) return null;

    return (
        <Tab.Navigator
            tabBar={(props) => (
                <NavigationBar userType={userType} {...props} />
            )}
            initialRouteName="HomeTab"
        >
            {/* Home Tab */}
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    headerTitle: (props) => <SmallLogo {...props} />,
                    headerTitleAlign: "center",
                }}
            />

            {/* Map Tab */}
            <Tab.Screen
                name="MapTab"
                component={MapScreen}
                options={{
                    headerShown: false,
                }}
            />

            {/* Record Tab */}
            <Tab.Screen
                name="RecordTab"
                component={
                    userType === "student"
                        ? RecordScreen
                        : ParentsRecordScreen
                }
                options={({ navigation }) => ({
                    headerTitle: () => <SmallLogo />,
                    headerTitleAlign: "center",

                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: 27 }}
                            onPress={() => 
                                navigation.navigate(
                                    userType === "student"
                                        ? "Calendar"
                                        : "ParentsCalendar"
                                )
                            }
                        >
                            <CalendarIcon />
                        </TouchableOpacity>
                    ),

                    headerRight: () =>
                        userType === "student" ? (
                            <TouchableOpacity
                                style={{ marginRight: 27 }}
                                onPress={() => navigation.navigate("Calculator")}
                            >
                                <CalculatorIcon />
                            </TouchableOpacity>
                        ) : null,
                })}
            />

            {/* League Tab & ParentsCommunity Tab */}
            {userType === "student" ? (
                <Tab.Screen
                    name="LeagueTab"
                    component={LeagueScreen}
                    options={{
                        headerTitle: (props) => <SmallLogo {...props} />,
                        headerTitleAlign: "center",
                    }}
                />
            ) : (
                <Tab.Screen
                    name="CommunityTab"
                    component={ParentsCommunityScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}

            {/* Setting Tab */}
            <Tab.Screen
                name="SettingTab"
                component={SettingScreen}
                options={{
                    headerTitle: (props) => <SmallLogo {...props} />,
                    headerTitleAlign: "center",
                }}
            />

        </Tab.Navigator>
    );
}
