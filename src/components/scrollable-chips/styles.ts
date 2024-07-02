import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  chip: {
    backgroundColor: colors.fuscousGray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipSelected: {
    backgroundColor: colors.amaranth,
  },
  chipText: {
    color: colors.white,
    fontSize: 14,
  },
  container: {
    backgroundColor: colors.shark,
    marginBottom: 20,
    paddingBottom: 14,
  },
  flatlist: {
    paddingHorizontal: 16,
  },
  separator: { width: 10 },
});
