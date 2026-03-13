import React, { useEffect, useState} from "react";
import { View, ActivityIndicator } from "react-native";
import CustomText from "../../../components/common/CustomText"
import ScoreBg from "../../../../assets/icons/Records/CalculatorBg"
import { S }  from "./CalculatorScreen.style"

import { getMemberScore } from "../../../api/user";

export default function CalculatorScreen() {

    const [score, setScore] = useState(null);
    const [percent, setPercent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadScore();
    }, []);

    const loadScore = async () => {
        try {
          const data = await getMemberScore();
          setScore(data.score);
          setPercent(data.percent);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
    
      if (loading) {
        return (
          <View style={[S.container, { justifyContent: "center", alignItems: "center" }]}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    
    const desc1 =
        "운동 기록은 체크인, 걷기, 셀프 총 3가지로 나뉘어서 기록됩니다. 체크인은 현 위치 반경 200m에서 조회되는 시설에 접근했을 때 자동 혹은 수동으로 운동 기록을 저장할 수 있는 방법입니다. 걷기 기록은 GPS를 이용해서 이동한 거리와 걸음 수를 바탕으로 연동되는 기록입니다. 마지막으로, 두 가지 방법을 제외하고 스스로 운동한 기록을 저장하고 싶을 때는 셀프 기록을 이용합니다.";

    const desc2 =
        "3가지 기록은 각각 다른 기준에 따라 비율로 합산되어 점수로 나타납니다. 체크인 기록은 횟수에 상관없이 30분 당 15점이 부과되며 최대 30점입니다. 걷기 기록은 3,000보 당 10점이 부과되며 최대 40점입니다. 셀프 기록은 체크인과 마찬가지로 횟수에 상관없이 30분 당 15점이 부과되며 최대 30점입니다. 최대 점수는 100점으로, 나의 운동 기록을 합친 점수가 표시됩니다.";

    return(
        <View style={S.container}>
            {/* 점수 카드 */}
            <View style={S.cardWrapper}>
                <View style={S.card}>
                    <ScoreBg width="100%" height="100%" style={S.cardBg} />
                    <CustomText style={S.scoreText}>{score}/100</CustomText>
                </View>
            </View>

            <View style={S.divider} />

            {/** 설명 */}
            <View style={S.section}>
                <CustomText style={S.sectionTitle}>점수는 이렇게 계산돼요!</CustomText>
                <CustomText style={S.sectionText}>{desc1}</CustomText>
                <View style={{height: 12}} />
                <CustomText style={S.sectionText}>{desc2}</CustomText>
            </View>
        </View>
    );
}
