import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppPadding } from '../../constants/commonStyle';
import { Header } from '@react-navigation/elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AppSafeView = (props) => {

	const { bounces, color, disableBottom } = props;
	const paddingTop = Platform.select({
		ios: { paddingTop: 0 },
		android: { paddingTop: AppPadding._20 }
	});

	return (
		<SafeAreaView style={[{ flex: 1, backgroundColor: color ? color : Colors.background }, paddingTop]}>
			<KeyboardAvoidingView
				style={{ flex: 1, marginBottom: disableBottom ? 0 : hp(8) }}
				contentContainerStyle={{}}
				keyboardVerticalOffset={Platform.select({ ios: 20, android: Header.HEIGHT + 20 })}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				{props.children}
			</KeyboardAvoidingView>
		</SafeAreaView >
	);
}

export default AppSafeView;
