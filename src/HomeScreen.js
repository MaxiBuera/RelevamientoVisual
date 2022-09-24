import { React } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/qr_background.png');
const imageOK = require('../assets/ok.png');

export function HomeScreen() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation();

    const signOutUser = async () => {
        try {
            signOut(auth).then(function () {
            //Sign out
                navigation.navigate('Login');
                console.log('saliendo...');
            }).catch(function (error) {
                console.log(error);
            });
        }
        catch(err) {
            console.log(err);
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Button
                    title="Cierre de sesión"
                    color="black"
                    onPress={signOutUser}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
});
  