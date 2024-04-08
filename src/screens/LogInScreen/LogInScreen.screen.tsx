import { View, Text } from 'react-native'
import React from 'react'
import { Container } from './LogInScreen.style'
import { useNavigation } from '@react-navigation/native'
import Form from '../../components/LogInComponents/Form/Form.component'

const LogInScreen = () => {
  const navigation = useNavigation()
  return (
    <Container>
      <Form />
    </Container>
  )
}

export default LogInScreen