import { Dimensions, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  flatlist: {
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  flatlistContainer: {
    flexGrow: 1,
    height: "100%",
  },
  item: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
  loading: {
    alignItems: "center",
    bottom: "10%",
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  sectionHeader: {
    color: colors.white,
    fontFamily: "semiBold",
    fontSize: 20,
    paddingVertical: 10,
  },
});
