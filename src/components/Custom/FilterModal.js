import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const FilterModal = ({
  isFiltervisible,
  handleFilterSelect,
  selectedFilter,
}) => {
  return (
    <Modal visible={isFiltervisible} animationType="none">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedFilter === "All" && styles.selectedFilterOption,
          ]}
          onPress={() => handleFilterSelect("All")}
        >
          <Icon name="list-outline" size={24} color="#555" />
          <Text style={styles.filterOptionTitle}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedFilter === "Pending" && styles.selectedFilterOption,
          ]}
          onPress={() => handleFilterSelect("Pending")}
        >
          <Icon name="hourglass-outline" size={24} color="#555" />
          <Text style={styles.filterOptionTitle}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedFilter === "Completed" && styles.selectedFilterOption,
          ]}
          onPress={() => handleFilterSelect("Completed")}
        >
          <Icon name="checkmark-done-outline" size={24} color="#555" />
          <Text style={styles.filterOptionTitle}>Completed</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: hp("30%"),
    padding: 20,
    backgroundColor: "#fff",
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  filterOptionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  selectedFilterOption: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default FilterModal;
