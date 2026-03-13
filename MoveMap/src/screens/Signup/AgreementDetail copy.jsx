import React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { S } from "./SignupCheck.style";
import { Button } from "../../components/Buttons/BaseButton";

const POLICY_DATA = {
    TERMS: [
        { type: "mainTitle", text: "MoveMap 서비스 이용 약관" },
        {
            type: "text",
            text: "본 약관은 movemap 서비스 운영팀(이하 “운영자”)이 제공하는 모바일 애플리케이션 및 관련 서비스(이하 “서비스”)의 이용 조건 및 절차, 운영자와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.",
        },
        { type: "subTitle", text: "제1조 (목적)" },
        {
            type: "text",
            text: "본 약관은 movemap 서비스의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.",
        },
        { type: "subTitle", text: "제2조 (정의)" },
        {
            type: "text",
            text: '1. "서비스"란 운영자가 제공하는 movemap 모바일 앱 및 관련 기능을 의미합니다.\n2. "이용자"란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 자를 말합니다.\n3. "계정"이란 이용자가 서비스 이용을 위해 등록한 이메일 등을 말합니다.',
        },

        { type: "subTitle", text: "제3조 (운영자 정보)" },
        {
            type: "text",
            text: "본 서비스는 아래의 운영주체가 제공합니다.\n\u2022 운영자: movemap 개발팀(비영리 프로젝트 팀)\n\u2022 담당자: movemap 운영팀\n\u2022 연락처: wemightmove2025@gmail.com \n ※ 사업자 등록이 없는 개인/팀 단위의 프로젝트임을 명시합니다.",
        },
        { type: "subTitle", text: "제4조 (약관의 효력 및 변경)" },
        {
            type: "text",
            text: "1. 본 약관은 서비스 내에 게시함으로써 효력이 발생합니다. \n 2. 운영자는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다. \n 3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.",
        },
        { type: "subTitle", text: "제5조 (이용자 자격 및 연령 제한)" },
        {
            type: "text",
            text: "1. 본 서비스는 만 14세 이상만 회원가입 및 이용이 가능합니다.\n2. 회원가입 시 “만 14세 이상입니다”에 명시적으로 동의해야 서비스를 이용할 수 있습니다.\n 3. 만 14세 미만임이 확인될 경우, 운영자는 즉시 계정을 삭제하거나 이용을 제한할 수 있습니다.\n4. 이용자는 자신의 연령 정보를 허위로 입력하거나 속여서는 안 됩니다.",
        },
        { type: "subTitle", text: "제6조 (서비스의 제공 및 변경)" },
        {
            type: "text",
            text: "1. 운영자는 아래와 같은 서비스를 제공합니다. \n\u2022 걸음 수 측정 및 운동량 기록 서비스 \n\u2022 운동 시설 체크인 기능 \n\u2022지역 기반 리그 및 랭킹 서비스 \n\u2022기타 운영자가 정하는 서비스",
        },
        { type: "subTitle", text: "제7조 (서비스 이용의 제한 및 중단)" },
        {
            type: "text",
            text: "운영자는 다음의 경우 서비스 제공을 제한하거나 중단할 수 있습니다.\n1. 시스템 점검, 서버 장애 등 불가피한 경우 \n2. 천재지변 등 불가항력적인 상황 \n3. 이용자가 법령 또는 본 약관을 위반한 경우",
        },
        { type: "subTitle", text: "제8조 (회원가입 및 계정 관리)" },
        {
            type: "text",
            text: "1. 이용자는 본인의 이메일 및 정확한 정보를 기반으로 회원가입해야 합니다.\n2. 타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.\n3. 계정 관리 책임은 이용자 본인에게 있으며, 계정 도용 또는 부주의로 발생한 문제에 대해 운영자는 책임지지 않습니다.",
        },
        { type: "subTitle", text: "제9조 (이용자의 의무)" },
        {
            type: "text",
            text: "이용자는 다음 행위를 해서는 안 됩니다.\n1. 타인의 정보 도용 또는 허위 정보 제공\n2. 서비스의 정상적 운영을 방해하는 행위\n3. 해킹, 비정상적 접근, 자동화된 프로그램 사용\n4. 운영자 또는 제3자의 권리 침해 행위\n5. 법령 또는 공공질서에 위반되는 행위",
        },
        { type: "subTitle", text: "제10조 (운영자의 의무)" },
        {
            type: "text",
            text: "1. 운영자는 법령에 따라 이용자의 개인정보를 안전하게 보호하며, 개인정보 처리방침에 따라 이를 처리합니다.\n2. 운영자는 안정적인 서비스 제공을 위해 최선을 다합니다.",
        },
        { type: "subTitle", text: "제11조 (개인정보 보호)" },
        {
            type: "text",
            text: "이용자의 개인정보 처리에 관한 사항은 별도의 개인정보 처리방침에 따릅니다.\n개인정보 처리방침은 앱 내에서 언제든지 확인할 수 있습니다.",
        },
        { type: "subTitle", text: "제12조 (이용계약의 해지)" },
        {
            type: "text",
            text: "1. 이용자는 언제든지 서비스 내 기능을 통해 회원 탈퇴를 요청할 수 있습니다.\n2. 탈퇴 시 이용자의 모든 개인정보 및 기록은 관련 법령에 따라 처리됩니다.\n3. 이용자가 약관을 위반한 경우, 운영자는 사전 통보 없이 계정을 제한하거나 삭제할 수 있습니다.",
        },
        { type: "subTitle", text: "제13조 (책임의 제한)" },
        {
            type: "text",
            text: "1. 운영자는 천재지변, 시스템 장애, 네트워크 불안정 등 불가항력적인 사유로 발생한 손해에 대해 책임을 지지 않습니다.\n2. 이용자의 귀책으로 발생한 손해에 대해서도 책임지지 않습니다.\n3. 운영자는 서비스에 제공되는 지역 리그, 점수, 운동기록 등의 정보 정확성을 100% 보장하지 않을 수 있습니다.",
        },
        { type: "subTitle", text: "부칙" },
        {
            type: "text",
            text: "본 약관은 2025년 12월 5일부터 적용됩니다.",
        },
    ],

    PRIVACY: [
        { type: "mainTitle", text: "개인정보 처리방침" },
        { type: "subTitle", text: "1. 개인정보의 처리 목적" },
        {
            type: "text",
            text: "① 무브맵은 다음의 목적을 위하여 최소한의 개인정보를 수집·처리합니다. 처리하고 있는 개인정보는 다음 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 ｢개인정보 보호법｣ 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n ② 무브맵이 처리하는 개인정보파일의 처리목적은 다음과 같습니다.",
        },
        {
            type: "table",
            headers: ["개인정보파일 명칭", "개인정보 처리 목적"],
            ratios: [1, 2],
            rows: [
                ["회원관리 정보", "앱 회원가입·로그인, 본인확인, 계정 관리"],
                ["운동기록 정보", "체크인·걸음수 관리, 리포트 제공"],
                ["리그·랭킹 정보", "자치구별 리그 운영, 주간 순위 산정"],
                ["위치·체크인 정보", "공공체육시설 반경 500m 자동 체크인"],

                [
                    "커뮤니티·후기 정보",
                    "장소·프로그램 후기 작성·열람, 별점·추천 기능 운영",
                ],
                [
                    "알림·푸시 정보",
                    "운동미션·리그갱신·추천 알림, 공지사항 푸시 발송",
                ],
            ],
        },
        { type: "subTitle", text: "2. 개인정보의 처리 및 보유기간" },
        {
            type: "text",
            text: "① 무브맵은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리하고 보유합니다.\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.",
        },
        {
            type: "table",
            // 🔥 [수정됨] 이미지와 동일하게 4열(서비스 명칭, 운영근거, 수집항목, 보유기간)로 구성
            headers: ["서비스 명칭", "운영근거", "수집항목", "보유기간"],
            ratios: [0.8, 0.7, 1.5, 1],
            rows: [
                [
                    "회원관리 정보",
                    "정보주체 동의",
                    "(필수) 이메일(ID), 비밀번호, 닉네임, 학생/학부모 선택, 자치구, 학교, 학년(학생 선택 시) 키, 체중",
                    "회원탈퇴 시까지 (전자상거래법 등 법령에 따른 최소 보관기간 준수)",
                ],
                [
                    "운동기록 정보",
                    "정보주체 동의",
                    "체크인(장소·시간), 걸음수, 셀프기록(운동종류·시간), 환산점수, 리포트내역",
                    "기록일로부터 3년 (통계·분석 목적 한정, 이후 익명화 또는 파기)",
                ],
                [
                    "리그·랭킹 정보",
                    "정보주체 동의",
                    "자치구, 학교, 닉네임(가명처리), 주간운동시간총합, 리그단계",
                    "해당 리그 종료 후 1년 (통계 목적 한정)",
                ],
                [
                    "위치·체크인 정보",
                    "정보주체 동의",
                    "GPS위치정보, 체크인·체크아웃 시간·장소",
                    "체크인 당일 24시간 후 자동삭제",
                ],
                [
                    "커뮤니티·후기 정보",
                    "정보주체 동의",
                    "후기내용, 별점, 추천여부",
                    "게시일로부터 5년 (민원처리 목적)",
                ],
                [
                    "알림·푸시 정보",
                    "정보주체 동의",
                    "푸시토큰, 알림수신설정",
                    "회원탈퇴 또는 알림해제 시 즉시 삭제",
                ],
            ],
        },
        { type: "subTitle", text: "3. 개인정보파일의 등록 현황" },
        {
            type: "text",
            text: "「개인정보 보호법」 제32조에 따라 등록·공개하는 개인정보파일의 처리목적·보유기간 및 처리하는 개인정보 항목은 아래와 같습니다.",
        },
        {
            type: "table",
            headers: [
                "개인정보파일의 명칭",
                "개인정보파일에 기록되는 개인정보의 항목",
            ],
            ratios: [1, 2],
            rows: [
                [
                    "회원관리 정보",
                    "(필수) 이메일, 닉네임, 학생/학부모, 자치구, 학교, 학년 (학생)키·체중",
                ],
                [
                    "운동기록 정보",
                    "체크인시간·장소, 걸음수, 셀프기록(걷기·달리기·체육수업·근력운동 등), 환산점수",
                ],
                [
                    "리그·랭킹 정보",
                    "자치구, 학교, 닉네임(가명), 주간운동시간총합, 리그단계 (출발·걷기·뛰기·모험·챔피언)",
                ],
                ["위치·체크인 정보", "GPS위치, 체크인·체크아웃 타임스탬프"],
                [
                    "커뮤니티·후기 정보",
                    "후기내용, 별점, 추천여부, 작성자 닉네임",
                ],
                ["알림·푸시 정보", "푸시토큰, 알림수신설정"],
            ],
        },

        // 4. 개인정보의 제3자 제공에 관한 사항
        { type: "subTitle", text: "4. 개인정보의 제3자 제공에 관한 사항" },
        {
            type: "text",
            text: "① 무브맵은 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n\n② 현재 무브맵은 제3자 제공을 하지 않습니다. 향후 B2G(교육청·지자체) 협력 시 통계자료(비식별화) 제공 가능성에 대해서는 별도 동의를 받습니다.",
        },

        // 5. 개인정보 처리의 위탁에 관한 사항 (표 포함)
        { type: "subTitle", text: "5. 개인정보 처리의 위탁에 관한 사항" },
        {
            type: "text",
            text: "① 무브맵은 원활한 앱 서비스 운영을 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.",
        },
        {
            type: "table",
            headers: ["수탁기관명", "위탁업무"],
            ratios: [1, 2],
            rows: [
                ["AWS Korea", "서버 호스팅 및 데이터 보관"],
                ["카카오", "소셜로그인 API 연동"],
                ["Firebase", "푸시알림 서비스"],
            ],
        },
        {
            type: "text",
            text: "② 무브맵은 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 안전성 확보조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고 있습니다.",
        },

        { type: "subTitle", text: "6. 개인정보의 파기 절차 및 방법" },
        {
            type: "text",
            text: "① 무브맵은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.\n\n② 파기절차: 개인정보 파기계획 수립 → 개인정보 보호책임자 승인 → 파기 실행\n\n③ 파기방법: 전자적 파일은 복구 불가능한 방법으로 삭제, 종이문서는 분쇄·소각",
        },

        {
            type: "subTitle",
            text: "7. 정보주체와 법정대리인의 권리·의무 및 행사방법",
        },
        {
            type: "text",
            text: "① 정보주체는 무브맵에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.",
        },

        { type: "subTitle", text: "8. 개인정보 보호책임자" },
        {
            type: "text",
            text: "movemap은 개인정보 보호와 관련한 업무를 총괄하기 위하여 개인정보 보호책임자를 지정하고 있습니다.\n\n• 개인정보 보호책임자: movemap 운영팀\n• 연락처: wemightmove2025@gmail.com\n\n본 방침과 관련한 문의·개인정보 열람 및 정정 요청은 상기 연락처로 연락하실 수 있습니다.",
        },
    ],

    LOCATION: [
        { type: "mainTitle", text: "위치정보 이용약관 동의" },
        {
            type: "text",
            text: 'MoveMap(이하 "운영자")은 「위치정보의 보호 및 이용 등에 관한 법률」 제16조에 따라 위치기반서비스 이용과 관련하여 아래 내용에 대해 동의를 받습니다.',
        },
        { type: "subTitle", text: "제1조 (위치정보의 수집·이용·제공)" },
        {
            type: "text",
            text: "1. 수집·이용 목적\n가. 현재 위치 기반 주변 체육시설 및 프로그램 검색·추천\n나. 체육시설 체크인/체크아웃 기능 제공\n다. 지역별 리그 참여 및 지역 랭킹 서비스 제공\n라. 이동 거리 및 걸음 수 측정을 통한 운동 기록 관리\n마. 서비스 품질 개선 및 통계 분석\n\n2. 수집하는 위치정보\n• GPS, Wi-Fi, 기지국 기반 위도·경도 좌표\n• 체크인한 체육시설의 위치 정보\n• 서비스 이용 중 수집된 경로 및 이동 거리 정보\n\n3. 위치정보 수집 방법\n• 모바일 기기의 GPS 칩을 통한 수집\n• Wi-Fi 네트워크 정보를 활용한 수집\n• 통신사 기지국 정보를 활용한 수집",
        },
        { type: "subTitle", text: "제2조 (위치정보의 보유 및 이용 기간)" },
        {
            type: "text",
            text: "회원 탈퇴 시까지 보유·이용합니다.\n단, 「위치정보법」 제16조 제2항에 따라 위치정보 이용·제공 사실 확인자료는 자동 기록·보존되며, 해당 자료는 6개월간 보관됩니다.",
        },
        { type: "subTitle", text: "제3조 (위치정보의 제3자 제공)" },
        {
            type: "text",
            text: "운영자는 개인위치정보를 회원이 지정한 제3자에게 제공하는 경우 매회 개인위치정보주체에게 제공받는 자, 제공일시 및 제공목적을 즉시 통보합니다.\n※ 현재 운영자는 위치정보를 제3자에게 제공하지 않습니다.",
        },
        { type: "subTitle", text: "제4조 (개인위치정보주체의 권리)" },
        {
            type: "text",
            text: "1. 회원은 언제든지 개인위치정보의 수집·이용·제공에 대한 동의를 철회할 수 있습니다.\n2. 회원은 언제든지 개인위치정보의 수집·이용·제공의 일시적 중지를 요구할 수 있습니다. (앱 설정 > 위치 권한에서 변경 가능)\n3. 회원은 다음 각 호의 자료에 대하여 열람·고지를 요구할 수 있고, 해당 자료에 오류가 있는 경우 정정을 요구할 수 있습니다.\n• 위치정보 이용·제공 사실 확인자료\n• 개인위치정보에 관한 자료",
        },
        {
            type: "subTitle",
            text: "제5조 (8세 이하 아동 등의 보호의무자 권리)",
        },
        {
            type: "text",
            text: "※ MoveMap은 만 14세 이상만 이용 가능하므로 해당 사항이 없습니다.",
        },

        { type: "subTitle", text: "제6조 (위치정보관리책임자)" },
        {
            type: "text",
            text: "운영자는 위치정보를 적절히 관리·보호하고, 회원의 불만 처리 및 피해 구제를 위하여 아래와 같이 위치정보관리책임자를 지정하여 운영하고 있습니다.\n• 위치정보관리책임자: movemap 운영팀\n• 이메일: wemightmove2025@gmail.com",
        },

        { type: "subTitle", text: "⚠️ 동의를 거부할 권리 및 거부 시 불이익" },
        {
            type: "text",
            text: "귀하는 위 위치정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.\n다만, MoveMap은 위치 기반 서비스를 핵심으로 제공하므로 동의를 거부하실 경우 다음 서비스 이용이 제한됩니다:\n• 주변 체육시설 및 프로그램 검색·추천\n• 체육시설 체크인/체크아웃 기능\n• 지역별 리그 참여 및 지역 랭킹\n• 이동 거리 및 걸음 수 측정\n\n위 제한 사항을 제외한 기타 서비스(즐겨찾기, 프로필 관리 등)는 이용 가능합니다.",
        },
    ],
};

const TYPE_MAPPING = {
    service: "TERMS",
    privacy: "PRIVACY",
    location: "LOCATION",
};

export default function AgreementDetail({ type }) {
    const route = useRoute();
    const navigation = useNavigation();
    const incomingType = type || route.params?.type;
    const dataKey = TYPE_MAPPING[incomingType] || "TERMS";
    const contentData = POLICY_DATA[dataKey] || [];
    const handleAgree = () => {
        if (route.params?.onAgree) {
            route.params.onAgree();
        }
        navigation.goBack();
    };
    const renderTable = (item, index) => (
        <S.TableContainer key={index}>
            <S.TableRow
                style={{ backgroundColor: "#f5f5f5", borderBottomWidth: 1 }}
            >
                {item.headers.map((header, i) => (
                    <S.TableCell key={i} flex={item.ratios[i]}>
                        <S.TableText isHeader>{header}</S.TableText>
                    </S.TableCell>
                ))}
            </S.TableRow>
            {item.rows.map((row, rIndex) => (
                <S.TableRow
                    key={rIndex}
                    style={{
                        borderBottomWidth:
                            rIndex === item.rows.length - 1 ? 0 : 0.5,
                    }}
                >
                    {row.map((cell, cIndex) => (
                        <S.TableCell key={cIndex} flex={item.ratios[cIndex]}>
                            <S.TableText>{cell}</S.TableText>
                        </S.TableCell>
                    ))}
                </S.TableRow>
            ))}
        </S.TableContainer>
    );

    return (
        <S.Container>
            <S.ContentsContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {contentData.map((item, index) => {
                        switch (item.type) {
                            case "mainTitle":
                                return (
                                    <S.TitleWrapper key={index}>
                                        <S.Title>{item.text}</S.Title>
                                        <S.Line />
                                    </S.TitleWrapper>
                                );
                            case "subTitle":
                                return (
                                    <S.SubTitle
                                        key={index}
                                        style={{
                                            marginTop: 25,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {item.text}
                                    </S.SubTitle>
                                );
                            case "text":
                                return (
                                    <S.Detail
                                        key={index}
                                        style={{ marginBottom: 10 }}
                                    >
                                        {item.text}
                                    </S.Detail>
                                );
                            case "table":
                                return renderTable(item, index);
                            default:
                                return null;
                        }
                    })}
                    <View style={{ height: 50 }} />
                    <Button
                        title={"내용을 확인하였으며, 동의합니다."}
                        onPress={handleAgree}
                    />
                    <View style={{ height: 50 }} />
                </ScrollView>
            </S.ContentsContainer>
        </S.Container>
    );
}
