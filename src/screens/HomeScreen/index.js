import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { Fonts, FontSize } from "../../assets";
import { AppSafeView, AppText } from "../../components/Custom";
import AddTodoModal from "../../components/Custom/AddTodoModal";
import TodoCard from "../../components/Custom/TodoCard";
import {
  AppContainer,
  AppMargin,
  AppPadding,
} from "../../constants/commonStyle";
import OptionsModal from "../../components/Custom/OptionModal";
import FilterModal from "../../components/Custom/FilterModal";

const HomeScreen = ({ navigation, dispatchData, ...props }) => {
  const todoList = useSelector((state) => state.TodoReducer.todo);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOptionVisible, setOptionVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectTodo, setSelectTodo] = useState(null);
  const [datePicked, setDatePicked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isFiltervisible, setFiltervisible] = useState(false);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const dispatch = useDispatch();
  const generateRandomStatus = () => {
    if (Math.random() >= 0.7) {
      setStatus("Completed");
    } else {
      setStatus("Pending");
    }
  };

  useEffect(() => {
    generateRandomStatus();
    let filteredArray = todoList;

    if (selectedFilter === "Completed") {
      filteredArray = todoList.filter((item) => item.status === "Completed");
      setFiltervisible(false);
    } else if (selectedFilter === "Pending") {
      filteredArray = todoList.filter((item) => item.status === "Pending");
      setFiltervisible(false);
    } else if (selectedFilter === "All") {
      setFilteredTodoList(filteredArray);
      setFiltervisible(false);
    }
    setFilteredTodoList(filteredArray);
    setFiltervisible(false);
  }, [todoList, selectedFilter]);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleCheckbox = (item) => {
    if (selectedIds.includes(item.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== item.id));
    } else {
      setSelectedIds([...selectedIds, item.id]);
    }
  };

  const calendarOpen = () => {
    setOpen(true);
  };
  const calendarClose = () => {
    setOpen(false);
  };

  const handleAddButtonPress = () => {
    setDatePicked(false);
    setText("");
    setStatus(status);
    setEditing(false);
    setModalVisible(true);
  };

  const onOptionChange = (item) => {
    setSelectTodo(item);
    setOptionVisible(true);
  };
  const handleAddPress = () => {
    const dateString = date.toISOString();

    if (editing === true) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id: selectTodo.id,
          text: text,
          date: dateString,
          status: status,
        },
      });
      setSelectTodo({
        ...selectTodo,
        text,
        date: dateString,
        status,
      });
      setOptionVisible(false);
      setEditing(false);
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: todoList ? todoList.length : 0,
          text,
          date: dateString,
          status,
        },
      });
    }
    setStatus(status);
    setModalVisible(false);
  };

  const onDuplicateTask = (selectTodo) => {
    const newId = todoList.length;
    const clonedItem = { ...selectTodo, id: newId };
    dispatch({
      type: "ADD_TODO",
      payload: clonedItem,
    });
    setOptionVisible(false);
    setEditing(false);
  };

  const removeSelectedTodo = () => {
    selectedIds.forEach((id) => {
      dispatch({
        type: "REMOVE_TODO",
        payload: {
          id: id,
        },
      });
    });
    setSelectedIds([]);
  };

  const onCalenderConfirm = (date) => {
    setDatePicked(true);
    setOpen(false);
    setDate(date);
  };

  const onEditPress = (item) => {
    setModalVisible(true);
    setEditing(true);
  };

  const onDeletePress = (selectTodo) => {
    dispatch({
      type: "DELETE_TODO",
      payload: selectTodo.id,
    });
    setOptionVisible(false);
  };

  const filterIconStyle = {
    left: moderateScale(80),
  };

  const onFilterIconPress = () => {
    setFiltervisible(true);
  };
  return (
    <AppSafeView>
      <View style={[AppContainer]}>
        <View style={styles.headerContainer}>
          <AppText
            color={"black"}
            fontFamily={Fonts.BOLD}
            fontSize={FontSize._33}
            label={"ToDo"}
          />
          {todoList.length > 0 && (
            <TouchableOpacity
              style={filterIconStyle}
              onPress={onFilterIconPress}
            >
              <Icon
                name={"filter-alt"}
                size={moderateScale(24)}
                color={"black"}
              />
            </TouchableOpacity>
          )}

          {selectedIds.length > 0 ? (
            <TouchableOpacity onPress={removeSelectedTodo}>
              <Icon name={"delete"} size={moderateScale(24)} color={"red"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAddButtonPress}>
              <Icon
                name={"add-circle"}
                size={moderateScale(24)}
                color={"black"}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <FlatList
            data={filteredTodoList}
            keyExtractor={(item, index) => {
              return item.id + index;
            }}
            style={{
              paddingTop: AppPadding._20,
              paddingBottom: AppPadding._50,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={true}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: AppPadding._50 }}
            renderItem={({ item, index }) => {
              selectedElement = item;
              return (
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                  key={index}
                >
                  <TodoCard
                    title={item.text}
                    handleCheckbox={() => handleCheckbox(item, index)}
                    date={item.date}
                    isSelected={selectedIds.includes(item.id)}
                    status={item.status}
                    removeTodo={() => onOptionChange(item)}
                  />
                </View>
              );
            }}
          />
          <AddTodoModal
            date={date}
            setCalenderOpen={calendarOpen}
            open={open}
            text={text}
            visible={isModalVisible}
            onConfirm={onCalenderConfirm}
            setText={setText}
            handleDateChange={handleDateChange}
            handleAddPress={handleAddPress}
            onCancel={calendarClose}
            onDateChange={(date) => setDate(date)}
            editing={editing}
            datePicked={datePicked}
          />
          <OptionsModal
            isOptionVisible={isOptionVisible}
            onEditPress={onEditPress}
            onDeletePress={() => onDeletePress(selectTodo)}
            onDuplicateTask={() => onDuplicateTask(selectTodo)}
          />
          <FilterModal
            isFiltervisible={isFiltervisible}
            selectedFilter={selectedFilter}
            handleFilterSelect={handleFilterSelect}
          />
        </ScrollView>
      </View>
    </AppSafeView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: AppMargin._10,
    alignItems: "center",
  },
});

export default HomeScreen;
