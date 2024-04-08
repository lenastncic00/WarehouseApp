import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Alert, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import {
  FormComponent,
  Label, Input, PasswordInputWrapper, InputErrorText, CheckboxContainer,
  CheckboxText, CreateAccountButtonText, ConfirmationInput, VerifyButton, VerifyAccountButtonText, CreateAccountButton
} from './Form.style'
import Icon from 'react-native-vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient'
import { useSignUp } from '@clerk/clerk-expo'
import { doc, setDoc } from 'firebase/firestore'
import db from '../../../../firbase.config'
import { useDispatch } from 'react-redux'
import { selectAuthType, selectAuthenticated, selectEmailAddress, selectFullName } from '../../../../redux/reducers/Auth'
import { useNavigation } from '@react-navigation/native'

const Form = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { isLoaded, signUp, setActive } = useSignUp()

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const [isFocusedEmail, setIsFocusedEmail] = useState(false)
  const [isFocusedFullName, setIsFocusedFullName] = useState(false)
  const [isFocusedPassword, setIsFocusedPassword] = useState(false)

  const [emailInputError, setEmailInputError] = useState('')
  const [fullNameInputError, setFullNameInputError] = useState('')
  const [passwordInputError, setPasswordInputError] = useState('')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState(['','','','','',''])

  function validateData() {
		const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		const fullNamePattern = /^[a-zA-Z\s]+$/;
		let valid = true;

		if (!emailPattern.test(email)) {
			setEmailInputError('Invalid email format');
			valid = false;
		}

		if (!fullNamePattern.test(fullName)) {
			setFullNameInputError(
				'Fullname must contain only letters'
			);
			valid = false;
		}

		if (password.length < 8) {
			setPasswordInputError('Password must be at least 8 characters long');
			valid = false;
		}

		return valid;
	}

	const onSignUpPress = async () => {
		if (!validateData()) {
			console.log("Data are not vlaid")
			return;
		}

		if (!isLoaded) {
			console.log("Nesto nije ucitano")

			return;
		}

		try {
			await signUp.create({
			   emailAddress: email,
			  password,
			});
		  
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
		  
			setPendingVerification(true);
		  } catch (error) {
			console.error('Unexpected error during sign-up:', error);
			console.log('In try-catch block, something went wrong');
		  }
	};

	const onPressVerify = async () => {
		const completeSignUp = await signUp?.attemptEmailAddressVerification({
			code: code.join(''),
		});

		if (setActive) {
			await setActive({ session: completeSignUp?.createdSessionId });
			setPendingVerification(false);
		} else {
			return;
		}

		await setDoc(doc(db, 'users', email), {
			fullName,
			emailAddress: email,
			username: '',
			profileImgUrl: '',
			authType: 'email',
			creationDate: new Date(),
		});

		dispatch(selectAuthType('email'));
		dispatch(selectAuthenticated(true));
		dispatch(selectEmailAddress(email));
		dispatch(selectFullName(fullName));

		navigation.navigate('Main' as never);
	};

  return (
    <FormComponent>
      <Label>Email</Label>
      <Input
      editable={!pendingVerification}
      value={email}
      onChangeText={(email: string) => setEmail(email)}
      placeholder='artist@gmail.com'
      placeholderTextColor='#4d4f49'
      onFocus={() => setIsFocusedEmail(true)}
      onBlur={() => setIsFocusedEmail(false)}
      isFocused={true}
      style={{
        borderColor: isFocusedEmail ? '#67e04f' : '#28bd2a',
        backgroundColor: isFocusedEmail ? '#fff' : 'transparent'
      }} /> 
      {emailInputError && <InputErrorText>{emailInputError}</InputErrorText>}
      <Label>Full Name</Label>
      <Input 
      editable={!pendingVerification}
      value={fullName}
      onChangeText={(fullName: string) => setFullName(fullName)}
      placeholder='Jonh Walker'
      placeholderTextColor='#4d4f49'
      onFocus={() => setIsFocusedFullName(true)}
      onBlur={() => setIsFocusedFullName(false)}
      isFocused={false}
      style={{
        borderColor: isFocusedFullName ? '#67e04f' : '#28bd2a',
        backgroundColor: isFocusedFullName ? '#fff' : 'transparent'
      }} />
      {fullNameInputError && <InputErrorText>{fullNameInputError}</InputErrorText>}
      <Label>Password</Label>
      <PasswordInputWrapper isFocused={isFocusedPassword}>
      <Input 
      editable={!pendingVerification}
      value={password}
      onChangeText={(password: string) => setPassword(password)}
      placeholder='Test.123'
      placeholderTextColor='#4d4f49'
      onFocus={() => setIsFocusedPassword(true)}
      onBlur={() => setIsFocusedPassword(false)}
      isFocused={false}
      style={{
        flex:1,
        borderColor:'transparent',
        backgroundColor: 'transparent',
        marginTop: 0
      }} />
      <TouchableOpacity style={{ padding: 10 }}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Icon 
          name={isPasswordVisible ? 'eye-with-line' : 'eye'}
          color='#000'
          size={26}
        />

      </TouchableOpacity>
      </PasswordInputWrapper>
      {passwordInputError && <InputErrorText>{passwordInputError}</InputErrorText>}
      {pendingVerification ? (
				<View
					style={{
						marginTop: 20,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View style={{ flexDirection: 'row', marginBottom: 20 }}>
						{code.map((codePart, index) => (
							<ConfirmationInput
								key={index}
								value={codePart}
								keyboardType='numeric'
								maxLength={1}
								onChangeText={(text: string) => {
									const newCode = [...code];
									newCode[index] = text;
									setCode(newCode);
									if (text && index < code.length - 1) {
										(
											this?.[`input${index + 1}`] as unknown as TextInput
										)?.focus();
									} else if (text === '' && index > 0) {
										(
											this?.[`input${index - 1}`] as unknown as TextInput
										)?.focus();
									}
								}}
								onKeyPress={({
									nativeEvent,
								}: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
									if (nativeEvent.key === 'Backspace' && codePart === '') {
										if (index > 0) {
											const newCode = [...code];
											newCode[index - 1] = '';
											setCode(newCode);
											(
												this?.[`input${index - 1}`] as unknown as TextInput
											)?.focus();
										}
									}
								}}
								// @ts-ignore
								ref={(ref: any) => ((this as any)[`input${index}`] = ref)}
							/>
						))}
					</View>
					<VerifyButton onPress={onPressVerify}>
						<LinearGradient
							colors={['#0e7817', '#67e04f']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								borderRadius: 8,
								flex: 1,
								justifyContent: 'center',
							}}
						>
							<VerifyAccountButtonText>Verify email</VerifyAccountButtonText>
						</LinearGradient>
					</VerifyButton>
				</View>
			) : (
				<CreateAccountButton onPress={onSignUpPress}>
					<LinearGradient
						colors={['#0e7817', '#67e04f']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							borderRadius: 8,
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<CreateAccountButtonText>Create account</CreateAccountButtonText>
					</LinearGradient>
				</CreateAccountButton>
			)}
    </FormComponent>
  )
}

export default Form