import { useEffect, useState } from "react";
import { S } from "./Button.style";
import { getCheckIn, getSelf, getSteps } from "../../api/record";
import { getChildren } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ExerciseAmountBox = ({
    backgroundColor,
    fontColor,
    borderColor,
}) => {
    const [stepCount, setStepCount] = useState(0);
    const [checkInMinutes, setCheckInMinutes] = useState(0);
    const [selfMinutes, setSelfMinutes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                const role = await AsyncStorage.getItem("role");
                let targetChildId = null;
                if (role !== "STUDENT") {
                    try {
                        const childrenResult = await getChildren();
                        const children =
                            childrenResult.children || childrenResult || [];

                        if (children.length > 0) {
                            targetChildId =
                                children[0].id || children[0].childId;
                        } else {
                            console.log("연동된 자녀가 없습니다.");
                            return;
                        }
                    } catch (childError) {
                        console.error(
                            "자녀 조회 실패 (권한 문제 등):",
                            childError
                        );
                        return;
                    }
                }

                const stepData = await getSteps(today, targetChildId);
                if (stepData) setStepCount(stepData.count);
                const checkInData = await getCheckIn(today);

                if (checkInData && checkInData.records) {
                    const total = checkInData.records.reduce((sum, record) => {
                        return sum + record.durationMinutes;
                    }, 0);

                    setCheckInMinutes(total);
                }
                const selfData = await getSelf(today);
                if (selfData && selfData.records) {
                    const totalself = selfData.records.reduce((sum, record) => {
                        return sum + record.durationMinutes;
                    }, 0);
                    setSelfMinutes(totalself);
                }
            } catch (error) {
                throw error;
            }
        };

        fetchData();
    }, []);

    return (
        <S.ExerciseContainer>
            <S.AountBoxConatiner
                backgroundColor="#FED9ED"
                borderColor="#FA81C4"
            >
                <S.ExerciesNameWrapper>
                    <S.ExerciesName fontColor="#FA81C4">
                        Check-In
                    </S.ExerciesName>
                </S.ExerciesNameWrapper>
                <S.ExerciesNameWrapper>
                    <S.ExerciseAmount>
                        <S.ExerciseAmount>{checkInMinutes}분</S.ExerciseAmount>
                    </S.ExerciseAmount>
                </S.ExerciesNameWrapper>
            </S.AountBoxConatiner>
            <S.AountBoxConatiner
                backgroundColor="#D4E8FD"
                borderColor="#70B3F7"
            >
                <S.ExerciesNameWrapper>
                    <S.ExerciesName fontColor="#70B3F7">Step</S.ExerciesName>
                </S.ExerciesNameWrapper>
                <S.ExerciesNameWrapper>
                    <S.ExerciseAmount>
                        {stepCount.toLocaleString()}
                    </S.ExerciseAmount>
                </S.ExerciesNameWrapper>
            </S.AountBoxConatiner>
            <S.AountBoxConatiner
                backgroundColor="#EDFCE1"
                borderColor="#A5F269"
            >
                <S.ExerciesNameWrapper>
                    <S.ExerciesName fontColor="#A5F269">Self</S.ExerciesName>
                </S.ExerciesNameWrapper>
                <S.ExerciesNameWrapper>
                    <S.ExerciseAmount>{selfMinutes}분</S.ExerciseAmount>
                </S.ExerciesNameWrapper>
            </S.AountBoxConatiner>
        </S.ExerciseContainer>
    );
};
