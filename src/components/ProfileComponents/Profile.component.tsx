import React from 'react'
import { StyleSheet } from 'react-native';
import { ProfileContainer, Title, Value } from './Profile.style'
import { LinearGradient } from 'expo-linear-gradient';


const Profile = ({ email, fullName} ) => {
  return (
   <ProfileContainer>
      <Title>Email:</Title>
      <Value>{email}</Value>
      <Title>Full name:</Title>
      <Value style={{ marginBottom: 16 }}>{fullName}</Value>
   </ProfileContainer>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
      borderRadius: 8, 
      width: '100%',
      alignItems: 'center'
  }
});

export default Profile