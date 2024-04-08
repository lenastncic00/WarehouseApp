import { View, Text } from 'react-native'
import React from 'react'
import { Container } from './SignUp.style'
import Form from '../../components/SignUpPageComponenets/Form/Form.component'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
    const navigation = useNavigation()
    return (
      <Container>
        <Form/>
      </Container>
    )
}

export default SignUp