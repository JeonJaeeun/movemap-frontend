import React, { useState, useEffect } from "react";
import { S } from "./TextInput.style";
import { FINAL_ADDRESS_DATA } from "../../data/addressData";
import { getMember } from "../../api/user";

const initialCityData = FINAL_ADDRESS_DATA.map((city) => ({
    label: city.label,
    value: city.value,
}));

const reasonData = [
    { label: "더 이상 서비스가 필요하지 않아서", value: "No" },
    { label: "서비스 이용이 불편해서", value: "No" },
    { label: "원하는 기능을 제공하지 않아서", value: "NotFun" },
    { label: "제공 정보가 충분하지 않아서", value: "NotNeeded" },
    { label: "기타 (팀 ‘움직일 지도’에 문의하기)", value: "NotFun" },
];

function AdressDropDownComponent({
    label,
    cityValue,
    districtValue,
    onChangeCity,
    onChangeDistrict,
}) {
    const [districtData, setDistrictData] = useState([]);

    useEffect(() => {
        if (!cityValue) {
            setDistrictData([]);
            return;
        }

        const cityInfo = FINAL_ADDRESS_DATA.find(
            (city) => city.value === cityValue
        );

        if (cityInfo) {
            setDistrictData(cityInfo.districts);
        } else {
            setDistrictData([]);
        }

        const exists = cityInfo?.districts.some(
            (d) => d.value === districtValue
        );

        if (!exists) {
            onChangeDistrict("");
        }
    }, [cityValue]);

    const dropdownItemStyle = {
        paddingVertical: 17,
        fontWeight: 500,
        paddingHorizontal: 19,
    };

    const placeholderStyle = {
        fontSize: 14,
        fontWeight: 500,
        color: "#b7b7b7",
    };
    const selectedTextStyle = {
        fontSize: 14,
        fontWeight: 500,
        color: "#121212",
    };

    return (
        <S.Container>
            <S.Text>{label}</S.Text>
            <S.DropdownContainer>
                <S.Dropdown
                    style={dropdownItemStyle}
                    placeholderStyle={placeholderStyle}
                    selectedTextStyle={selectedTextStyle}
                    data={initialCityData}
                    labelField="label"
                    valueField="value"
                    placeholder="시/도 선택"
                    value={cityValue}
                    onChange={(item) => onChangeCity(item.value)}
                />

                <S.Dropdown
                    style={dropdownItemStyle}
                    placeholderStyle={placeholderStyle}
                    selectedTextStyle={selectedTextStyle}
                    data={districtData}
                    labelField="label"
                    valueField="value"
                    placeholder={
                        !cityValue
                            ? "시/도를 먼저 선택해주세요"
                            : "시/군/구 선택"
                    }
                    value={districtValue}
                    onChange={(item) => onChangeDistrict(item.value)}
                    disable={!cityValue}
                />
            </S.DropdownContainer>
        </S.Container>
    );
}

function ReasonDropDownComponent() {
    const [selectedReason, setSelectedReason] = useState(null);
    const dropdownItemStyle = {
        paddingVertical: 17,
        paddingHorizontal: 19,
    };

    const placeholderStyle = {
        fontSize: 14,
        fontWeight: 500,
        color: "#b7b7b7",
    };
    const selectedTextStyle = {
        fontSize: 14,
        fontWeight: 500,
        color: "#121212",
    };

    return (
        <S.DropdownContainer>
            <S.ResonDropdownContainer
                style={dropdownItemStyle}
                placeholderStyle={placeholderStyle}
                selectedTextStyle={selectedTextStyle}
                data={reasonData}
                labelField="label"
                valueField="value"
                placeholder="이유를 선택해주세요!"
                value={selectedReason}
                onChange={(item) => setSelectedReason(item.value)}
            />
        </S.DropdownContainer>
    );
}

function MapDropdownComponent({
    cityValue,
    districtValue,
    onChangeCity,
    onChangeDistrict,
}) {
    const [districtData, setDistrictData] = useState([]);

    useEffect(() => {
        if (cityValue) {
            const cityInfo = FINAL_ADDRESS_DATA.find(
                (city) => city.value === cityValue
            );

            if (cityInfo) {
                setDistrictData(cityInfo.districts);
            } else {
                setDistrictData([]);
            }
        } else {
            setDistrictData([]);
        }
    }, [cityValue]);

    const dropdownItemStyle = {
        paddingVertical: 5,
        paddingHorizontal: 10,
    };

    const placeholderStyle = {
        fontSize: 12,
        color: "#009900",
    };
    const selectedTextStyle = {
        fontSize: 12,
        color: "#009900",
    };

    return (
        <S.MapDropdownContainer>
            <S.MapDropdown
                style={dropdownItemStyle}
                placeholderStyle={placeholderStyle}
                selectedTextStyle={selectedTextStyle}
                data={initialCityData}
                labelField="label"
                valueField="value"
                placeholder="시/도"
                value={cityValue}
                onChange={(item) => onChangeCity(item.value)}
            />

            <S.MapDropdown
                style={dropdownItemStyle}
                placeholderStyle={placeholderStyle}
                selectedTextStyle={selectedTextStyle}
                data={districtData}
                labelField="label"
                valueField="value"
                placeholder="구/군"
                value={districtValue}
                onChange={(item) => onChangeDistrict(item.value)}
                disable={!cityValue}
            />
        </S.MapDropdownContainer>
    );
}

export {
    AdressDropDownComponent,
    ReasonDropDownComponent,
    MapDropdownComponent,
};
