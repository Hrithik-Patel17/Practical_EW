import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { moderateScale, scale } from "react-native-size-matters";
import moment from "moment";

const TodoCard = ({
  title,
  date,
  status,
  removeTodo,
  isSelected,
  handleCheckbox,
}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={handleCheckbox}>
        <Icon
          name={isSelected ? "check-square-o" : "square-o"}
          size={moderateScale(24)}
          color={isSelected ? "green" : "black"}
        />
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{moment(date).format("L")}</Text>
      </View>
      <View style={styles.cardStatusContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardStatus}>
          {status}
        </Text>
      </View>
      <TouchableOpacity onPress={removeTodo}>
        <Icon name="ellipsis-v" size={moderateScale(24)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
  },
  cardDetails: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(8),
  },
  cardTitle: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    marginBottom: moderateScale(10),
  },
  cardDate: {
    fontSize: moderateScale(14),
    color: "gray",
  },
  cardStatusContainer: {
    flex: 1,
    marginRight: moderateScale(10),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cardStatus: {
    fontSize: moderateScale(14),
    color: "black",
  },
});

export default TodoCard;
