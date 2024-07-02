import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { IScrollableChipItem } from "./interface";
import Separator from "./separator";

const ScrollableChips: React.FC<{
  scrollChipsData: IScrollableChipItem[];
  onPress: (id: number) => void;
  selectedChip: number;
}> = ({ scrollChipsData, onPress, selectedChip }) => {
  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        contentContainerStyle={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={[{ id: 0, name: "All" }, ...scrollChipsData]}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item.id)}
            activeOpacity={0.65}
            style={[
              styles.chip,
              selectedChip === item.id && styles.chipSelected,
            ]}
          >
            <Text style={styles.chipText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ScrollableChips;
