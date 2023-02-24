import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

class AppScrollView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { enabled = true } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: 20,
          android: Header.HEIGHT + 20,
        })}
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={enabled}
        >
          {this.props.children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default AppScrollView;
