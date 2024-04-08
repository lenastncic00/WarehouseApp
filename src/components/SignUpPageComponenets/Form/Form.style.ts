import styled from 'styled-components/native';
import { TextInputProps, ViewProps } from 'react-native';

export const FormComponent = styled.View`
	margin-top: 50px;
	width: 84%;
	background-color: #fff;
`;

export const Label = styled.Text`
	color: #0e7817;
	font-size: 16px;
	margin-top: 25px;
`;

interface InputProps extends TextInputProps {
	isFocused: boolean;
}

export const Input = styled.TextInput.attrs({
	autoCapitalize: 'none',
	autoCorrect: false,
})<InputProps>`
	border-width: 1px;
	border-radius: 5px;
	height: 50px;
	color: #0e7817;
	font-size: 13px;
	padding: 10px;
`;

export const PasswordInputWrapper = styled.View<
	ViewProps & { isFocused: boolean }
>`
	flex-direction: row;
	align-items: center;
	border-width: 1px;
	border-color: ${(props) => (props.isFocused ? '#67e04f' : '#28bd2a')};
	border-radius: 5px;
	background-color: ${(props) => (props.isFocused ? '#fff' : 'transparent')};
`;

export const InputErrorText = styled.Text`
	color: red;
	font-size: 15px;
	margin-top: 5px;
`;

export const CheckboxContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	widht: 90%;
	margin-top: 20px;
`;

export const CheckboxText = styled.Text`
	color: #fff;
	margin-left: 10px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
	margin-top: 60px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.5;
	shadow-radius: 20px;
	elevation: 8;
	width: 100%;
	height: 60px;
	align-self: center;
`;

export const CreateAccountButtonText = styled.Text`
	color: #fff;
	font-size: 18px;
	text-align: center;
	margin: 10px;
`;

export const ConfirmationInput = styled.TextInput`
	width: 40px;
	height: 50px;
	margin: 0 5px;
	border: 1px solid #0e7817;
	border-radius: 5px;
	text-align: center;
	color: #0e7817;
	font-size: 24px;
	font-weight: bold;
`;

export const VerifyButton = styled.TouchableOpacity`
	width: 100%;
	height: 50px;
	border-radius: 8px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.5;
	shadow-radius: 20px;
	elevation: 8;
`;

export const VerifyAccountButtonText = styled.Text`
	font-size: 16px;
	color: #fff;
	text-align: center;
	line-height: 50px;
`;