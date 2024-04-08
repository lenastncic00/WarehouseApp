import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Profile from '../../components/ProfileComponents/Profile.component';
import { Container } from './ProfileScreen.style'
import { useNavigation } from '@react-navigation/native';
import { useClerk } from "@clerk/clerk-react";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const userInfo = useSelector((state: RootState) => state.auth);
    const { signOut } = useClerk();

    const handleLogout = async () => {
        try {
            await signOut();
            navigation.navigate('Onboarding' as never);
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return (
        <Container>
            <Profile email={userInfo.emailAddress} fullName={userInfo.fullName} />
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        borderRadius: 8,
        backgroundColor: 'green',
        width: '50%',
        marginTop: 20,
        marginBottom: 20,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
}); 
