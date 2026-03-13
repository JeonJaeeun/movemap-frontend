import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import CustomText from "../../components/common/CustomText";
import { S } from "./LeagueScreen.style";

import {
    getLeagueStatus,
    getLeagueRanks,
} from "../../api/league";

// SVG 아이콘
import StarStart from "../../../assets/icons/League/star_start.svg";
import StarWalk from "../../../assets/icons/League/star_walk.svg";
import StarRun from "../../../assets/icons/League/star_run.svg";
import StarAdv from "../../../assets/icons/League/star_adv.svg";
import StarChamp from "../../../assets/icons/League/star_champ.svg";
import StarGray from "../../../assets/icons/League/star_gray.svg";
import QuestionIcon from "../../../assets/icons/League/question.svg";

import ClockIcon from "../../../assets/icons/League/clock.svg";
import UpArrow from "../../../assets/icons/League/arrow_up_green.svg";

const LEAGUE_LEVELS = [
    { id: 0, name: "출발", icon: StarStart, color: "#FDBAE3" },
    { id: 1, name: "걷기", icon: StarWalk, color: "#FEE500" },
    { id: 2, name: "뛰기", icon: StarRun, color: "#70B3F7" },
    { id: 3, name: "모험", icon: StarAdv, color: "#A5F269" },
    { id: 4, name: "챔피언", icon: StarChamp, color: "#FD6B5E" },
];

// 백엔드 enum → Index
const LEAGUE_MAP = {
    START: 0,
    WALK: 1,
    RUN: 2,
    ADVENTURE: 3,
    CHAMPION: 4,
};

function getRankStyle(index) {
    if (index === 0)
        return { type: "badge", bg: "#FFAC33", color: "#9E5200" };
    if (index === 1)
        return { type: "badge", bg: "#CCD6DD", color: "#627077" };
    if (index === 2)
        return { type: "badge", bg: "#FF8A3B", color: "#7C4119" };
    if (index === 3)
        return { type: "plain", color: "#090" };
    return { type: "plain", color: "#9C9C9C" };
}

function getDaysLeftThisWeek() {
    const now = new Date();
    const day = now.getDay();
    return (7 - day) % 7;
}

function colorToAlpha30(hex) {
    return hex + "4D";
}

export default function LeagueScreen() {

    const [currentLeagueIndex, setCurrentLeagueIndex] = useState(null);
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = await getLeagueStatus();
                const leagueIdx = LEAGUE_MAP[status.leagueType];
                setCurrentLeagueIndex(leagueIdx);

                const league = await getLeagueRanks();
                setRanking(league.ranks[status.leagueType] || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (
        loading ||
        currentLeagueIndex === null ||
        !LEAGUE_LEVELS[currentLeagueIndex]
    ) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    /** --------------------- 탭 렌더링 --------------------- */
    const renderLeagueItem = ({ item, index }) => {
        const isUnlocked = index <= currentLeagueIndex;
        const IconComponent = isUnlocked ? item.icon : StarGray;
        const isCurrent = index === currentLeagueIndex;

        return (
            <View style={S.tabItem}>
                <View style={S.iconWrapper}>
                    <IconComponent
                        width={isCurrent ? 40 : 30}
                        height={isCurrent ? 70 : 50}
                    />
                    {!isUnlocked && <QuestionIcon style={S.questionOverlay} />}
                </View>

                <View
                    style={[
                        S.labelWrapper,
                        {
                            backgroundColor: isUnlocked
                                ? colorToAlpha30(item.color)
                                : colorToAlpha30("#D9D9D9"),
                        },
                    ]}
                >
                    <CustomText
                        style={[
                            S.labelText,
                            { color: isUnlocked ? item.color : "#999" },
                        ]}
                    >
                        {isUnlocked ? item.name : "?"}
                    </CustomText>
                </View>
            </View>
        );
    };

    /** --------------------- 랭킹 렌더링 --------------------- */
    const renderRankItem = ({ item, index }) => {
        const rankStyle = getRankStyle(index);

        return (
            <View>
                <View style={S.rankRow}>
                    {rankStyle.type === "badge" ? (
                        <View style={[S.rankBadge, { backgroundColor: rankStyle.bg }]}>
                            <CustomText style={[S.rankBadgeText, { color: rankStyle.color }]}>
                                {index + 1}
                            </CustomText>
                        </View>
                    ) : (
                        <CustomText
                            style={[S.rankPlainNumber, { color: rankStyle.color }]}
                        >
                            {index + 1}
                        </CustomText>
                    )}

                    <CustomText style={S.rankDistrict}>{item.regionName}</CustomText>
                    <CustomText style={S.rankTime}>{item.weeklyScore}점</CustomText>
                </View>

                {index === 3 && (
                    <View style={S.promotionZone}>
                        <UpArrow />
                        <CustomText style={S.promotionText}>PROMOTION ZONE</CustomText>
                        <UpArrow />
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            
            {/* 상단 고정 영역 */}
            <View style={S.headerContainer}>
                <CustomText style={S.title}>
                    {LEAGUE_LEVELS[currentLeagueIndex].name}
                </CustomText>
    
                <View style={S.daysLeftRow}>
                    <ClockIcon />
                    <CustomText style={S.daysLeft}>
                        {getDaysLeftThisWeek()}일 남음
                    </CustomText>
                </View>
    
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: -10 }}
                    contentContainerStyle={{ paddingRight: 20 }}
                >
                    {LEAGUE_LEVELS.map((item, index) => (
                        <View key={item.id}>
                            {renderLeagueItem({ item, index })}
                        </View>
                    ))}
                </ScrollView>
            </View>
    
            {/* 아래 랭킹 스크롤 */}
            <FlatList
                data={ranking}
                renderItem={renderRankItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={S.listContainer}
                style={{ flex: 1 }}
            />
    
        </View>
    );
}    