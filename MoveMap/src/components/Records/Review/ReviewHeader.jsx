// components/Records/Review/ReviewHeader.jsx

import React from "react";
import { S } from "./ReviewHeader.style";
import { MapDropdownComponent } from "../../common/Dropdown";

const ITEM_TYPES = {
    FACILITIES: "facilities",
    PROGRAMS: "programs",
};

export default function ReviewHeader({
    selectedType,
    setSelectedType,
}) {

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    return (
        <S.Container>
            <S.TypeSelectorWrapper>

                {/* 유형 선택 */}
                <S.TypeButton onPress={() => handleTypeSelect(ITEM_TYPES.FACILITIES)}>
                    <S.TypeText isSelected={selectedType === ITEM_TYPES.FACILITIES}>
                        시설
                    </S.TypeText>
                </S.TypeButton>

                <S.TypeButton onPress={() => handleTypeSelect(ITEM_TYPES.PROGRAMS)}>
                    <S.TypeText isSelected={selectedType === ITEM_TYPES.PROGRAMS}>
                        프로그램
                    </S.TypeText>
                </S.TypeButton>

            </S.TypeSelectorWrapper>
        </S.Container>
    );
}
