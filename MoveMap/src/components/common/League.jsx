import { S } from "./League.style";
import First from "../../../assets/icons/League/1.svg";
import Second from "../../../assets/icons/League/2.svg";
import Third from "../../../assets/icons/League/3.svg";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getLeagueRanks, getLeagueStatus } from "../../api/league";

const getRankBadgeStyle = (index) => {
    switch (index) {
        case 0:
            return { backgroundColor: "#FFAC33", color: "#FFFFFF" }; // 1위 (주황/골드)
        case 1:
            return { backgroundColor: "#CCD6DD", color: "#FFFFFF" }; // 2위 (실버)
        case 2:
            return { backgroundColor: "#FF8A3B", color: "#FFFFFF" }; // 3위 (브론즈)
        default:
            return { backgroundColor: "#F0F0F0", color: "#000000" };
    }
};
const getRankIcon = (index) => {
    switch (index) {
        case 0:
            return <First />;
        case 1:
            return <Second />;
        case 2:
            return <Third />;
        default:
            return null;
    }
};

export const TopLeague = () => {
    const [topRanks, setTopRanks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTopRanks = async () => {
            try {
                const status = await getLeagueStatus();
                const leagueData = await getLeagueRanks();

                if (!status || !leagueData || !leagueData.ranks) {
                    setTopRanks([]);
                    return;
                }

                const currentLeagueList =
                    leagueData.ranks[status.leagueType] || [];

                setTopRanks(currentLeagueList.slice(0, 3));
            } catch (error) {
                console.error("TopLeague Load Error:", error);
                setTopRanks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopRanks();
    }, []);
    if (loading) {
        return <ActivityIndicator size="small" color="#999" />;
    }

    if (topRanks.length === 0) {
        return (
            <S.Container>
                <S.EmptyText>아직 랭킹 정보가 없습니다.</S.EmptyText>
            </S.Container>
        );
    }

    return (
        <S.Container>
            {topRanks.length > 0 ? (
                topRanks.map((item, index) => (
                    <S.RankingContainer key={index}>
                        <S.RankIconWrapper>
                            {getRankIcon(index)}
                        </S.RankIconWrapper>
                        <S.RankerNameWrapper>
                            <S.RankerName>
                                {item.regionName || item.nickname}
                            </S.RankerName>
                        </S.RankerNameWrapper>

                        <S.TotalTime>{item.weeklyScore}점</S.TotalTime>
                    </S.RankingContainer>
                ))
            ) : (
                <View style={{ padding: 10, alignItems: "center" }}>
                    <S.RankerName>아직 랭킹 정보가 없습니다.</S.RankerName>
                </View>
            )}
        </S.Container>
    );
};
