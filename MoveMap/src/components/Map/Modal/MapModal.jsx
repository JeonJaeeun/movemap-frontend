import React, { useMemo, forwardRef, useState } from "react";
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { S } from "./MapModal.style";
import EmptyH from "../../../../assets/icons/Map/heart_empty";
import FillH from "../../../../assets/icons/Map/heart_fill";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import {
    deleteFacilityBookmark,
    deleteProgramBookmark,
    postFacilityBookmark,
    postProgramBookmark,
} from "../../../api/heart";

const TypeData = [
    { label: "구기운동", value: "BALL_GAME" },
    { label: "무예", value: "MARTIAL_ARTS" },
    { label: "피트니스", value: "FITNESS" },
    { label: "댄스", value: "DANCE" },
    { label: "수영/수상", value: "AQUATIC" },
    { label: "레저", value: "LEISURE" },
    { label: "복합시설", value: "COMPLEX" },
    { label: "기타", value: "ETC" },
];

const StarIcon = ({ filled }) => (
    <Text style={{ color: filled ? "#10C838" : "#ccc", fontSize: 16 }}>★</Text>
);

export const ListItem = ({ data, onDetailPress, isSelected, selectedType }) => {
    const route = useRoute();

    const [isBookmarked, setIsBookmarked] = useState(data.isBookmarked);

    const handleToggleBookmark = async () => {
        try {
            const id = data.id;

            if (selectedType === "facilities") {
                if (isBookmarked) await deleteFacilityBookmark(id);
                else await postFacilityBookmark(id);
            } else if (selectedType === "programs") {
                if (isBookmarked) await deleteProgramBookmark(id);
                else await postProgramBookmark(id);
            }

            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.log("북마크 토글 실패:", error);
        }
    };

    return (
        <S.ListItemContainer>
            <S.InfoClickBox
                onPress={
                    route.name === "MapTab" ? () => onDetailPress(data) : null
                }
                isSelected={isSelected}
            >
                <S.TextInfoWrapper>
                    <S.TitleText>{data.name}</S.TitleText>
                    <S.SubtitleText>{data.type}</S.SubtitleText>

                    <S.RatingWrapper>
                        <S.RatingText>{data.rating}</S.RatingText>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                filled={i < Math.floor(data.rating)}
                            />
                        ))}
                        <S.ReviewCountText>
                            ({data.reviewCount})
                        </S.ReviewCountText>
                    </S.RatingWrapper>

                    <S.DistanceAddressText>
                        {data.address}
                    </S.DistanceAddressText>
                </S.TextInfoWrapper>
            </S.InfoClickBox>
            <S.IconRightWrapper>
                {route.name !== "MapTab" &&
                    (isBookmarked ? (
                        <S.IconWrapper onPress={handleToggleBookmark}>
                            <FillH />
                        </S.IconWrapper>
                    ) : (
                        <S.IconWrapper onPress={handleToggleBookmark}>
                            <EmptyH />
                        </S.IconWrapper>
                    ))}
            </S.IconRightWrapper>
        </S.ListItemContainer>
    );
};

export const ListItemContents = ({
    data,
    onDetailPress,
    selectedName,
    selectedType,
}) => {
    return (
        <S.ContentContainer>
            {data.map((item, index) => (
                <ListItem
                    key={item.id || index}
                    data={item}
                    onDetailPress={onDetailPress}
                    isSelected={selectedName === item.name}
                    selectedType={selectedType}
                />
            ))}
            <View style={{ height: 100 }} />
        </S.ContentContainer>
    );
};

const DROPDOWN_TEXT_STYLE = {
    fontSize: 12,
    marginRight: 5,
    fontFamily: "PretendardRegular",
};

export const TopSelectBar = ({
    filterState,
    setFilterState,
    selectedType,
    setSelectedType,
    isVoucherAvailable,
    setIsVoucherAvailable,
}) => {
    const isGeneralActive = !selectedType && !isVoucherAvailable;
    const handleGeneralSelect = () => {
        if (!isGeneralActive) {
            setFilterState({
                typeSelected: false,
            });
            setIsVoucherAvailable(false);
            setSelectedType(null);
        }
    };

    const handleTypeChange = (item) => {
        setSelectedType(item.value);
    };
    const handleCouponToggle = () => {
        setIsVoucherAvailable((prev) => !prev);
    };

    return (
        <S.TopSelectBarContainer>
            <S.AllButton
                isActive={isGeneralActive}
                onPress={handleGeneralSelect}
            >
                <S.AllButtonText isActive={isGeneralActive}>
                    전체
                </S.AllButtonText>
            </S.AllButton>

            <S.DropdownButton
                data={TypeData}
                labelField="label"
                valueField="value"
                placeholder={
                    selectedType
                        ? TypeData.find((d) => d.value === selectedType)?.label
                        : "시설 유형"
                }
                value={selectedType}
                onChange={handleTypeChange}
                placeholderStyle={DROPDOWN_TEXT_STYLE}
                selectedTextStyle={DROPDOWN_TEXT_STYLE}
            />

            <S.AllButton
                isActive={isVoucherAvailable}
                onPress={handleCouponToggle}
            >
                <S.AllButtonText isActive={isVoucherAvailable}>
                    스포츠강좌이용권
                </S.AllButtonText>
            </S.AllButton>
        </S.TopSelectBarContainer>
    );
};

export const MapModal = forwardRef(
    (
        {
            data,
            onDetailPress,
            onChange,
            index,
            selectedType,
            setSelectedType,
            isVoucherAvailable,
            setIsVoucherAvailable,
        },
        ref
    ) => {
        const insets = useSafeAreaInsets();
        const snapPoints = useMemo(() => ["50%", "100%"], []);
        const [filterState, setFilterState] = useState({
            typeSelected: false,
            couponSelected: false,
        });

        return (
            <BottomSheet
                ref={ref}
                index={index}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: "#ccc", width: 40 }}
                onChange={onChange}
                style={{ marginTop: insets.top }}
            >
                <TopSelectBar
                    filterState={filterState}
                    setFilterState={setFilterState}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    isVoucherAvailable={isVoucherAvailable}
                    setIsVoucherAvailable={setIsVoucherAvailable}
                />
                <ScrollView>
                    <BottomSheetScrollView style={{ paddingBottom: 400 }}>
                        {data.map((item, index) => (
                            <ListItem
                                key={index}
                                data={item}
                                onDetailPress={onDetailPress}
                            />
                        ))}
                        <View style={{ height: 100 }} />
                    </BottomSheetScrollView>
                </ScrollView>
            </BottomSheet>
        );
    }
);
