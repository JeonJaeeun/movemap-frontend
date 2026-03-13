import { S } from "./HomeScreen.style";
import YoutubePlayer from "react-native-youtube-iframe";
import Logo from "../../../assets/icons/Logo_small";
import SmallLogo from "../../components/Logo/SmallLogo";
import { BaseButton } from "../../components/Buttons/BaseButton";
import { FindButton } from "../../components/Home/FindButton";
import { ExerciseAmountBox } from "../../components/Home/ExerciseAmountBox";
import { TopLeague } from "../../components/common/League";
import { useCallback, useEffect, useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMember } from "../../api/user";
import { getLeagueStatus } from "../../api/league";
import { getVideos } from "../../api/video";

const LEAGUE_NAME_MAP = {
    START: "출발",
    WALK: "걷기",
    RUN: "뛰기",
    ADVENTURE: "모험",
    CHAMPION: "챔피언",
};

export default function HomeScreen() {
    const { width } = useWindowDimensions();
    const videoHeight = width * 0.5625;
    const [playing, setPlaying] = useState(false);
    const [videoLink, setVideoLink] = useState("");
    const [currentLeagueName, setCurrentLeagueName] = useState("출발");
    useEffect(() => {
        const load = async () => {
            try {
                const userData = await getMember();
                const video = await getVideos();
                setVideoLink(video);
                console.log(userData);
                await AsyncStorage.setItem("role", userData.role);

                const leagueStatus = await getLeagueStatus();
                if (leagueStatus?.leagueType) {
                    setCurrentLeagueName(
                        LEAGUE_NAME_MAP[leagueStatus.leagueType] || "출발"
                    );
                }
            } catch (e) {
                console.error("내 정보 로딩 실패:", e);
            }
        };

        load();
    }, []);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("영상 종료", "영상이 끝까지 재생되었습니다.");
        }
    }, []);

    return (
        <S.ContainerWrapper>
            <ScrollView>
                <S.Container>
                    <FindButton />
                    <S.ContentsContainer>
                        <S.ContentsName>오늘 운동량</S.ContentsName>
                        <ExerciseAmountBox />
                    </S.ContentsContainer>
                    <S.ContentsContainer>
                        <S.ContentsName>오늘의 운동 추천</S.ContentsName>
                        <S.YoutubeWrapper>
                            <YoutubePlayer
                                height={videoHeight}
                                width="100%"
                                play={playing}
                                videoId={videoLink.videoId}
                                onChangeState={onStateChange}
                            />
                        </S.YoutubeWrapper>
                    </S.ContentsContainer>
                    <S.ContentsContainer>
                        <S.ThisWeekRankingTitleContainer>
                            <S.ContentsName>이번주 리그 순위</S.ContentsName>
                            <S.RunButton>
                                <S.RunText>{currentLeagueName}</S.RunText>
                            </S.RunButton>
                        </S.ThisWeekRankingTitleContainer>

                        <TopLeague />
                    </S.ContentsContainer>
                </S.Container>
            </ScrollView>
        </S.ContainerWrapper>
    );
}
