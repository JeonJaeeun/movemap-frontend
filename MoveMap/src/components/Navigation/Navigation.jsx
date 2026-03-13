import { S } from "./Navigation.style";

import Home_G from "../../../assets/icons/Navigation/green/home_green";
import Map_G from "../../../assets/icons/Navigation/green/map_green";
import Record_G from "../../../assets/icons/Navigation/green/board_green";
import Chart_G from "../../../assets/icons/Navigation/green/chart_green";
import Community_G from "../../../assets/icons/Navigation/green/community_green";
import User_G from "../../../assets/icons/Navigation/green/user_green";

import Home from "../../../assets/icons/Navigation/white/home";
import Map from "../../../assets/icons/Navigation/white/map";
import Record from "../../../assets/icons/Navigation/white/board";
import Chart from "../../../assets/icons/Navigation/white/chart";
import Community from "../../../assets/icons/Navigation/white/community";
import User from "../../../assets/icons/Navigation/white/user";

import { useSafeAreaInsets } from "react-native-safe-area-context";

function NavigationBar({ state, navigation, userType }) {
    const currentRouteName = state.routes[state.index].name;
    const insets = useSafeAreaInsets();

    const studentNavItems = [
        { name: "HomeTab", ActiveIcon: Home_G, InactiveIcon: Home },
        { name: "MapTab", ActiveIcon: Map_G, InactiveIcon: Map },
        { name: "RecordTab", ActiveIcon: Record_G, InactiveIcon: Record },
        { name: "LeagueTab", ActiveIcon: Chart_G, InactiveIcon: Chart },
        { name: "SettingTab", ActiveIcon: User_G, InactiveIcon: User },
    ];

    const parentNavItems = [
        { name: "HomeTab", ActiveIcon: Home_G, InactiveIcon: Home },
        { name: "MapTab", ActiveIcon: Map_G, InactiveIcon: Map },
        { name: "RecordTab", ActiveIcon: Record_G, InactiveIcon: Record },
        { name: "CommunityTab", ActiveIcon: Community_G, InactiveIcon: Community },
        { name: "SettingTab", ActiveIcon: User_G, InactiveIcon: User },
    ];

    const isHomeActive = currentRouteName == "Home";

    const navItems = userType === "student" ? studentNavItems : parentNavItems;

    return (
        <S.Container style={{ paddingBottom: insets.bottom || 10 }}>
            {navItems.map((item) => {
                const isFocused = item.name === currentRouteName;
                const IconComponent = isFocused
                    ? item.ActiveIcon
                    : item.InactiveIcon;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: item.name,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(item.name);
                    }
                };

                return (
                    <S.IconWrapper
                        key={item.name}
                        onPress={onPress}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                    >
                        <IconComponent />
                    </S.IconWrapper>
                );
            })}
        </S.Container>
    );
}

export { NavigationBar };
