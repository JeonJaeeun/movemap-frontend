import React, { useState } from "react";
import { S } from "./SearchBar.style";
import BackIcon from "../../../../assets/icons/Map/back.svg";
import LocationIcon from "../../../../assets/icons/Map/location.svg";
import XIcon from "../../../../assets/icons/Map/X.svg";
import { useEffect } from "react";

function SearchBar({ onLocationClick, onSearch }) {
    const [text, setText] = useState("");

    const deleteText = () => {
        setText("");
        onSearch("");
    };

    return (
        <S.Container>
            <S.SearchInputWrapper>
                <S.SearchInput
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={() => onSearch(text)}
                />
                <S.LocationIconWrapper onPress={onLocationClick}>
                    <LocationIcon />
                </S.LocationIconWrapper>
                <S.CloseIconWrapper onPress={deleteText}>
                    <XIcon />
                </S.CloseIconWrapper>
            </S.SearchInputWrapper>
        </S.Container>
    );
}

export { SearchBar };
