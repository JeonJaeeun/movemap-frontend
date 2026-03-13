export default {
    expo: {
        name: "MoveMap",
        slug: "movemap",
        version: "1.0.0",
        orientation: "portrait",
        plugins: [
            [
                "@mj-studio/react-native-naver-map",
                {
                    client_id: process.env.NAVER_MAP_CLIENT_ID,
                    android: {
                        ACCESS_FINE_LOCATION: true,
                        ACCESS_COARSE_LOCATION: true,
                        ACCESS_BACKGROUND_LOCATION: true,
                    },
                },
            ],
            [
                "expo-build-properties",
                {
                    android: {
                        kotlinVersion: "2.0.20",
                        extraMavenRepos: [
                            "https://repository.map.naver.com/archive/maven",
                            "https://devrepo.kakao.com/nexus/content/groups/public/",
                        ],
                    },
                },
            ],
            [
                "expo-location",
                {
                    locationAlwaysAndWhenInUsePermission:
                        "Allow $(PRODUCT_NAME) to use your location.",
                    locationWhenInUsePermission:
                        "Allow $(PRODUCT_NAME) to use your location while you are using the app.",
                },
            ],
            [
                "@react-native-seoul/kakao-login",
                {
                    kakaoAppKey: process.env.KAKAO_LOGIN_KEY,
                },
            ],
            "expo-notifications",
        ],
        android: {
            package: "com.movemap.app",
            adaptiveIcon: {
                foregroundImage: "./assets/icons/MOVEMAP.png",
                backgroundColor: "#FFFFFF",
            },

            googleServicesFile: "./google-services.json",
            useNextNotificationsApi: true,
            permissions: [
                "android.permission.ACCESS_COARSE_LOCATION",
                "android.permission.ACCESS_FINE_LOCATION",
                "android.permission.INTERNET",
                "android.permission.POST_NOTIFICATIONS",
            ],
            notification: {
                icon: "./assets/icon.png",
                color: "#10C838",
                channelId: "default",
                showBadge: true,
                mode: "default",
                collapsedTitle: "MoveMap",
                importance: "max",
                showForeground: true,
            },
        },
        extra: {
            eas: {
                projectId: "4c4bd488-c2c6-4e08-b0fd-cd19c54519d4",
            },
        },
    },
};
