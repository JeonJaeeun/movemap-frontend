import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { SmallTwoOptionSelector } from "../../../components/common/TwoOptionSelector";
import { Title } from "../../../components/Settings/Title";
import { S } from "./WishListScreen.style";
import { ScrollView } from "react-native";
import { ListItemContents } from "../../../components/Map/Modal/MapModal";
import { getFacilityWishList, getProgramWishList } from "../../../api/heart";

export default function WishListScreen() {
    const Type = {
        FACILITY: "facilities",
        PROGTAM: "program",
    };

    const Type_Option = [
        { value: Type.FACILITY, label: "시설" },
        { value: Type.PROGTAM, label: "프로그램" },
    ];
    const [currentType, setCurrentType] = useState(Type.FACILITY);
    const [wishlist, setWishlist] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    const fetchWishlist = async () => {
        try {
            let result;
            const data = {
                cursor: null,
                size: 100,
            };

            if (currentType === Type.FACILITY) {
                result = await getFacilityWishList(data);

                setWishlist(
                    result.content.map((item) => ({
                        id: item.facilityId,
                        name: item.facilityName,
                        type: item.facilitySubtype || item.facilityType,
                        address: item.address,
                        rating: item.avgRating,
                        reviewCount: item.reviewCount,
                        isBookmarked: true,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }))
                );
            } else {
                result = await getProgramWishList(data);

                setWishlist(
                    result.programs.map((item) => ({
                        id: item.programId,
                        name: item.name,
                        type: item.facilitySubtype || item.facilityType,
                        address: item.address,
                        rating: item.avgRating,
                        reviewCount: item.reviewCount,
                        isBookmarked: true,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }))
                );
            }
        } catch (e) {
            console.error("찜 목록 불러오기 실패:", e);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [currentType]);

    return (
        <S.Container>
            <S.TopBarContainer>
                <Title label="찜 목록" />
                <SmallTwoOptionSelector
                    options={Type_Option}
                    currentValue={currentType}
                    onSelect={setCurrentType}
                    style={{ paddingBottom: 30 }}
                />
            </S.TopBarContainer>
            <ScrollView>
                <S.ListContainter>
                    <ListItemContents
                        data={wishlist}
                        onDetailPress={() => {}}
                        selectedName={null}
                        selectedType={currentType}
                    />
                </S.ListContainter>
            </ScrollView>
        </S.Container>
    );
}
