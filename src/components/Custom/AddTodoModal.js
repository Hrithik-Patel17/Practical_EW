import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import DatePicker from "react-native-date-picker";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import { Fonts, FontSize } from "../../assets";
import moment from "moment";

const AddTodoModal = ({
  onDateChange,
  onCancel,
  visible,
  onClose,
  handleDateChange,
  date,
  handleAddPress,
  text,
  setText,
  setCalenderOpen,
  open,
  onConfirm,
  editing,
  datePicked,
}) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.appTitle}>
            <AppText
              color={"black"}
              fontFamily={Fonts.MEDIUM}
              fontSize={FontSize._20}
              label={editing === true ? "Edit Task" : "Enter Task"}
            />
          </View>

          <TextInput
            numberOfLines={3}
            style={styles.input}
            value={text}
            onChangeText={setText}
            maxLength={300}
            textAlignVertical="top"
            placeholder={editing === true ? text : "Enter text here"}
          />

          <TouchableOpacity
            onPress={setCalenderOpen}
            style={styles.datePickerButton}
          >
            <Icon
              name={"calendar"}
              size={moderateScale(20)}
              color={"black"}
              style={styles.calendarImage}
            />
            <AppText
              color={"black"}
              fontFamily={Fonts.MEDIUM}
              fontSize={FontSize._16}
              label={
                datePicked === true
                  ? moment(date).format("L")
                  : "Select due date"
              }
            />
          </TouchableOpacity>
          {open && (
            <DatePicker
              style={styles.datePicker}
              date={date}
              mode="date"
              modal
              androidVariant="nativeAndroid"
              textColor="black"
              locale="en"
              open={open}
              onConfirm={onConfirm}
              onCancel={onCancel}
              onDateChange={onDateChange}
            />
          )}

          <TouchableOpacity onPress={handleAddPress} style={styles.button}>
            <Text style={styles.buttonText}>
              {editing === true ? "EDIT" : "ADD"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    alignSelf: "flex-start",
    marginBottom: moderateScale(10),
  },
  input: {
    height: verticalScale(150),
    width: "100%",
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "gray",
    padding: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  datePicker: {
    width: 400,
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: moderateScale(10),
    width: "100%",
    borderRadius: moderateScale(5),
    justifyContent: "center",
    marginTop: moderateScale(10),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  datePickerButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginVertical: moderateScale(10),
  },
  calendarImage: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(10),
  },
});
export default AddTodoModal;
