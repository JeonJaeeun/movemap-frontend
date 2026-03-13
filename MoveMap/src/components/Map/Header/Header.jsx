import React, { useEffect, useState } from "react";
import { S } from "./Header.style";
import { MapDropdownComponent } from "../../common/Dropdown";
import { TextInput, TouchableOpacity, View } from "react-native";
import { getMember } from "../../../api/user";
import {
    FINAL_ADDRESS_DATA,
    RAW_ADDRESS_DATA,
} from "../../../data/addressData";

const ITEM_TYPES = {
    FACILITIES: "facilities",
    PROGRAMS: "programs",
};

const initialCityData = FINAL_ADDRESS_DATA.map((city) => ({
    label: city.label,
    value: city.value,
}));

function Header({
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict,
    onAddressChange,
    selectedType,
    setSelectedType,
}) {
    const [districtData, setDistrictData] = useState([]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        if (selectedCity && selectedDistrict) {
            const allAddresses = RAW_ADDRESS_DATA.flatMap((item) => item.data);

            const foundLocation = allAddresses.find(
                (item) =>
                    item.시도명 === selectedCity &&
                    item.시군구명 === selectedDistrict
            );

            if (foundLocation && onAddressChange) {
                onAddressChange({
                    latitude: foundLocation.latitude,
                    longitude: foundLocation.longitude,
                });
            }
        }
    }, [selectedCity, selectedDistrict]);

    return (
        <S.Container>
            <S.TypeSelectorWrapper>
                <S.TypeButton
                    onPress={() => handleTypeSelect(ITEM_TYPES.FACILITIES)}
                >
                    <S.TypeText
                        isSelected={selectedType === ITEM_TYPES.FACILITIES}
                    >
                        시설
                    </S.TypeText>
                </S.TypeButton>

                <S.TypeButton
                    onPress={() => handleTypeSelect(ITEM_TYPES.PROGRAMS)}
                >
                    <S.TypeText
                        isSelected={selectedType === ITEM_TYPES.PROGRAMS}
                    >
                        프로그램
                    </S.TypeText>
                </S.TypeButton>
                <S.AddressSelectorWrapper>
                    <MapDropdownComponent
                        cityValue={selectedCity}
                        districtValue={selectedDistrict}
                        onChangeCity={(value) => {
                            setSelectedCity(value);
                            setSelectedDistrict(null);
                        }}
                        onChangeDistrict={(value) => {
                            setSelectedDistrict(value);
                        }}
                    />
                </S.AddressSelectorWrapper>
            </S.TypeSelectorWrapper>
        </S.Container>
    );
}

export { Header };
