import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { s } from "react-native-size-matters";

const OptionsModal = ({
  isOptionVisible,
  onRequestClose,
  onEditPress,
  onDeletePress,
  onDuplicateTask,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Modal
      visible={isOptionVisible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Options</Text>
          </View>
          <View
            style={{ width: "100%", height: 1, backgroundColor: "black" }}
          />
          <TouchableOpacity style={styles.itemContainer} onPress={onEditPress}>
            <Icon name="pencil-outline" size={s(18)} color="#333" />
            <Text style={styles.itemText}>Edit Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={onDuplicateTask}
          >
            <Icon name="duplicate-outline" size={s(18)} color="#333" />
            <Text style={styles.itemText}>Duplicate Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.itemContainer,
              { borderBottomWidth: 0, marginBottom: 10 },
            ]}
            onPress={onDeletePress}
          >
            <Icon name="trash-outline" size={s(18)} color="#333" />
            <Text style={styles.itemText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: s(300),
    backgroundColor: "#fff",
    borderRadius: s(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(20),
    paddingVertical: s(15),
  },
  headerSeparator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#333",
    opacity: 0.2,
  },
  headerText: {
    fontSize: s(18),
    fontWeight: "bold",
    color: "#333",
    marginRight: s(10),
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#333",
    opacity: 0.2,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: s(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomStartRadius: s(35),
    borderBottomEndRadius: s(35),
    borderBottomColor: "#333",
    padding: s(20),
  },
  itemText: {
    fontSize: s(14),
    color: "#333",
    marginLeft: s(10),
  },
});

export default OptionsModal;
