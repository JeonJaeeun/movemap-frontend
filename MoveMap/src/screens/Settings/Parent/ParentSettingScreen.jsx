import AsyncStorage from "@react-native-async-storage/async-storage";
import { S } from "./ParentSettingScreen.style";

import { useEffect, useState } from "react";
import ParentLogo from "../../../../assets/icons/Settings/parent.svg";
import UserIcon from "../../../../assets/icons/Settings/userimg";
import { UserInfoComponent } from "../../../components/common/TextInput";
import {
    acceptInvitation,
    getChildren,
    getReceivedInvitation,
    postInvitation,
    rejectInvitation,
} from "../../../api/user";
import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

export default function ParentSettingScreen() {
    const [role, setRole] = useState("");
    const [code, setCode] = useState("");

    const [invitationData, setInvitationData] = useState({
        inviteCode: "",
        myParents: [],
        receivedInviteList: [],
    });

    const [childrenList, setChildrenList] = useState([]);

    const loadStudentData = async () => {
        try {
            const data = await getReceivedInvitation();
            setInvitationData(data);
        } catch (error) {
            console.log("데이터 로드 실패");
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            const storedRole = await AsyncStorage.getItem("role");
            if (storedRole) {
                setRole(storedRole);
                if (storedRole === "STUDENT") {
                    await loadStudentData();
                } else {
                    try {
                        const response = await getChildren();
                        if (response && response.children) {
                            setChildrenList(response.children);
                        }
                    } catch (error) {
                        console.error("아이 정보 로딩 실패");
                    }
                }
            }
        };
        initializeData();
    }, []);

    const handleAccept = async (parentId) => {
        try {
            await acceptInvitation(parentId);
            Alert.alert("수락 완료", "보호자와 연결되었습니다.");
            await loadStudentData();
        } catch (error) {
            Alert.alert("오류", "수락 중 문제가 발생했습니다.");
        }
    };

    const handleReject = async (parentId) => {
        try {
            await rejectInvitation(parentId);
            Alert.alert("거절 완료", "초대를 거절했습니다.");
            await loadStudentData();
        } catch (error) {
            Alert.alert("오류", "거절 중 문제가 발생했습니다.");
        }
    };

    const handleInvite = async () => {
        try {
            await postInvitation(code);
        } catch (error) {}
    };

    const handleCopy = async () => {
        if (!invitationData.inviteCode) return;

        await Clipboard.setStringAsync(invitationData.inviteCode);
        Alert.alert("복사 완료", "초대 코드가 클립보드에 복사되었습니다.");
    };

    return (
        <>
            {role === "STUDENT" ? (
                <S.Container>
                    <S.InfoContainer>
                        <S.Text>초대코드</S.Text>
                        <S.InputTextWrapper>
                            <S.InviteCode>
                                {invitationData.inviteCode}
                            </S.InviteCode>
                            <S.Button onPress={handleCopy}>
                                <S.ButtonText>복사</S.ButtonText>
                            </S.Button>
                        </S.InputTextWrapper>
                    </S.InfoContainer>
                    <S.InfoContainer>
                        <S.Text>나의 보호자</S.Text>
                        <S.TextWrapper>
                            {invitationData.myParents.length > 0 ? (
                                invitationData.myParents.map(
                                    (parent, index) => (
                                        <S.InsideContentsContainer
                                            key={parent.id || index}
                                        >
                                            <ParentLogo
                                                style={{ paddingRight: 5 }}
                                            />
                                            <S.ParentTextWrapper>
                                                <S.InsideText
                                                    style={{ paddingLeft: 5 }}
                                                >
                                                    {parent.nickname}
                                                </S.InsideText>
                                                <S.InsideTextParents>
                                                    부모
                                                </S.InsideTextParents>
                                            </S.ParentTextWrapper>
                                        </S.InsideContentsContainer>
                                    )
                                )
                            ) : (
                                <S.InsideText>
                                    연결된 보호자가 없습니다.
                                </S.InsideText>
                            )}
                        </S.TextWrapper>
                    </S.InfoContainer>
                    <S.InfoContainer>
                        <S.Text>요청 받은 목록</S.Text>
                        <S.TextWrapper>
                            {invitationData.receivedInviteList &&
                            invitationData.receivedInviteList.length > 0 ? (
                                invitationData.receivedInviteList.map(
                                    (item, index) => (
                                        <S.InsideContentsContainer
                                            key={index}
                                            style={{ width: "100%" }}
                                        >
                                            <ParentLogo
                                                style={{ paddingRight: 5 }}
                                            />
                                            <S.ParentTextWrapper>
                                                <S.InsideText
                                                    style={{ paddingLeft: 5 }}
                                                >
                                                    {item.parentName}
                                                </S.InsideText>
                                            </S.ParentTextWrapper>
                                            <S.EmptyBox />
                                            <S.ButtonContainer>
                                                <S.Button
                                                    style={{
                                                        backgroundColor:
                                                            "#7BCF64",
                                                    }}
                                                    onPress={() =>
                                                        handleAccept(
                                                            item.parentId
                                                        )
                                                    }
                                                >
                                                    <S.ButtonText>
                                                        승인
                                                    </S.ButtonText>
                                                </S.Button>
                                                <S.Button
                                                    style={{
                                                        backgroundColor:
                                                            "#FD6B5E",
                                                    }}
                                                    onPress={() =>
                                                        handleReject(
                                                            item.parentId
                                                        )
                                                    }
                                                >
                                                    <S.ButtonText>
                                                        거절
                                                    </S.ButtonText>
                                                </S.Button>
                                            </S.ButtonContainer>
                                        </S.InsideContentsContainer>
                                    )
                                )
                            ) : (
                                <S.InsideContentsContainer>
                                    <S.InsideText>
                                        받은 요청이 없습니다.
                                    </S.InsideText>
                                </S.InsideContentsContainer>
                            )}
                        </S.TextWrapper>
                    </S.InfoContainer>
                </S.Container>
            ) : (
                <S.Container>
                    <S.InfoContainer>
                        <S.Text>초대코드</S.Text>
                        <S.InputTextWrapper>
                            <S.InsideTextInput onChangeText={setCode} />
                            <S.Button>
                                <S.ButtonText onPress={handleInvite}>
                                    초대요청
                                </S.ButtonText>
                            </S.Button>
                        </S.InputTextWrapper>
                    </S.InfoContainer>
                    <S.InfoContainer>
                        <S.Text>나의 아이</S.Text>
                        <S.TextWrapper>
                            {childrenList.length > 0 ? (
                                childrenList.map((child, index) => (
                                    <S.InsideContentsContainer
                                        key={child.id || index}
                                    >
                                        <ParentLogo
                                            style={{ paddingRight: 5 }}
                                        />
                                        <S.ParentTextWrapper>
                                            <S.InsideText>
                                                {child.nickname}
                                            </S.InsideText>
                                            <S.InsideTextParents>
                                                아이
                                            </S.InsideTextParents>
                                        </S.ParentTextWrapper>
                                    </S.InsideContentsContainer>
                                ))
                            ) : (
                                <S.InsideContentsContainer>
                                    <S.InsideText>
                                        연결된 아이가 없습니다.
                                    </S.InsideText>
                                </S.InsideContentsContainer>
                            )}
                        </S.TextWrapper>
                    </S.InfoContainer>
                </S.Container>
            )}
        </>
    );
}
