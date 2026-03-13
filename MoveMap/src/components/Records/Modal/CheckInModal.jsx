// CheckInModal.jsx
import React, { useMemo, forwardRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { S } from "./CheckInModal.style";
import CustomText from "../../common/CustomText";

export const CheckInModal = forwardRef(
  ({ facilityList = [], loading, onDetailPress }, ref) => {
    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(() => ["66%", "95%"], []);

    const [query, setQuery] = useState("");

    const filtered = facilityList.filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase())
    );

    const clearQuery = () => setQuery("");

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: "#C4C4C4", width: 40 }}
        style={{ marginTop: insets.top }}

        // 🔥 키보드 대응
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        {/* 헤더 */}
        <View style={S.headerBox}>
          <CustomText style={S.headerTitle}>내 반경 200m 체크인 가능 장소</CustomText>
        </View>

        {/* 검색창 */}
        <View style={S.searchWrapper}>
          <TextInput
            style={S.searchInput}
            placeholder="시설 이름 검색"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity style={S.clearBtn} onPress={clearQuery}>
              <CustomText style={S.clearText}>×</CustomText>
            </TouchableOpacity>
          )}
        </View>

        <BottomSheetScrollView>
          {/* 🔥 로딩 UI — 이미지/ActivityIndicator 둘 다 가능 */}
          {loading ? (
            <View style={S.loadingBox}>
              <ActivityIndicator size="large" color="#10c838" />

              {/* 또는 gif 사용 가능 */}
              {/* 
              <Image
                source={require("../../../../assets/loading.gif")}
                style={{ width: 60, height: 60, marginTop: 10 }}
              />
              */}
            </View>
          ) : filtered.length === 0 ? (
            <View style={S.emptyBox}>
              <CustomText style={S.emptyText}>조회된 시설이 없습니다</CustomText>
            </View>
          ) : (
            filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={S.listItemContainer}
                onPress={() => onDetailPress(item)}
              >
                <View style={S.textInfoWrapper}>
                  <CustomText style={S.titleText}>{item.name}</CustomText>
                  <CustomText style={S.subtitleText}>
                    {item.facilitySubtype || item.facilityType}
                  </CustomText>
                  <CustomText style={S.distanceAddressText}>
                    {(item.distanceMeters / 1000).toFixed(1)}km · {item.address}
                  </CustomText>
                </View>
              </TouchableOpacity>
            ))
          )}

          <View style={{ height: 80 }} />
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);
