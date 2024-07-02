import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.backdrop,
    // borderColor: colors.white,
    // borderWidth: 1,
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    marginBottom: 20,
    opacity: 0.9,
    paddingVertical: 10,
  },
  posterImg: {
    height: 240,
    marginBottom: 20,
    marginRight: 20,
    width: "47%",
  },
  title: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
