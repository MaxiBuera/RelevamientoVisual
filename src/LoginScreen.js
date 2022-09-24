import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, BackHandler, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const adminImage = require('../assets/admin.png');
const testImage = require('../assets/test.png');
const guestImage = require('../assets/guest.png');

export function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    /*useEffect(() => {
        //Evita ir para atras(boton del celu)
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => backHandler.remove();
    }, []);*/
      
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation();

    const handleCreateAccount = () => {

        try {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/.test(email)) {
                throw new Error('Bad email');
            }
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Acount created');
                const user = userCredential.user;
            //console.log(user);
                navigation.navigate('Home');
            })
            .catch(err => {
                if (email == '' || password == '') {
                    console.log('MENSAJE DE ERROR');
                    setModalVisible(!modalVisible);
                }
                console.log(err);
            })
        } catch(err) {
            console.log(err);
            setModalVisible(!modalVisible);
        }
    }

    const handleSignInAccount = () => {

        try {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/.test(email)) {
                throw new Error('Bad email');
            }
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Signed in created');
                const user = userCredential.user;
                //console.log(user);
                navigation.navigate('Home');
            })
            .catch(err => {
                if (email == '' || password != '') {
                    console.log('MENSAJE DE ERROR');
                    setModalVisible(!modalVisible);
                }
                console.log(err);
            })
        } catch(err) {
            console.log(err);
            setModalVisible(!modalVisible);
        }
    }

    const signInPreDefinedUser = user => {

        if(user == 1) {
            setEmail('admin@admin.com');
            setPassword('111111');
        } else if(user == 2) {
            setEmail('tester@tester.com');
            setPassword('555555');
        } else if(user == 3) {
            setEmail('invitado@invitado.com');
            setPassword('222222');
        } else {
            setEmail('');
            setPassword('');
        }
        
    }

    const AppButton = ({ onPress, title, buttonColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, {backgroundColor: buttonColor}]}>
          <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const UsersButton = ({ onPress, title, buttonColor, image }) => (
        <TouchableOpacity onPress={onPress} style={[styles.usersAppButtonContainer, {backgroundColor: buttonColor, alignItems: 'center'}]}>
            <Image source={image} style={styles.tinyLogo2}/>
            <Text style={styles.usersAppButtonText}>{title}</Text>
        </TouchableOpacity>
    );

//validaciones a los campos
//mensajes de error. no alert
//funcional con firebase
//3 botones de acceso rapido. usuarios diferentes
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={{fontSize: 40, fontWeight: "bold", textAlign: "center"}}>Bienvenido</Text>
                <Text style={{fontSize: 20, textAlign: "center"}}>Ingresa con usuarios predeterminados</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <UsersButton onPress={handleSignInAccount} title="Administrador" buttonColor='white' image={adminImage} size="sm" backgroundColor="#007bff" />
                    <UsersButton onPress={handleSignInAccount} title="Tester" buttonColor='white' image={testImage} size="sm" backgroundColor="#007bff" />       
                    <UsersButton onPress={handleSignInAccount} title="Invitado" buttonColor='white' image={guestImage} size="sm" backgroundColor="#007bff" />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{borderTopWidth: 10}}></View>
                    <Text style={{fontSize: 30, fontWeight: "bold", textAlign: "center"}}>o</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{marginHorizontal: 40, marginTop: 10}}>
                    <View style={{height: '35%', marginTop: 30}}>
                        <TextInput style={{ flex: 0.8, borderRadius: 10, borderWidth: 2 , borderColor: '#9b9b9b' , fontSize: 20}} placeholder="Correo electrónico" value={email} onChangeText={(email) => setEmail(email)}/>
                        <View style={{marginTop: 30}}></View>
                        <TextInput style={{ flex: 0.8, borderRadius: 10, borderWidth: 2, borderColor: '#9b9b9b', fontSize: 20}} placeholder="Clave" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)}/>                         
                    </View>
                    <View style={{marginTop: 20, height: '30%', display: 'flex', justifyContent: 'space-evenly'}}>
                        <AppButton onPress={handleSignInAccount} title="Login" buttonColor='#033631' size="sm" backgroundColor="#007bff" />
                        <AppButton onPress={handleCreateAccount} title="Create Account" buttonColor='#F05A46' size="sm" backgroundColor="#007bff" />
                    </View>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../assets/error.png')}
                                />
                                <Text style={{fontSize: 30, marginTop: 10, fontWeight: 'bold', color: '#F15249'}}>Error</Text>
                                <Text style={{fontSize: 20, marginVertical: 18}}>Correo o clave no válido</Text>
                                <AppButton onPress={() => setModalVisible(!modalVisible)} title="Cerrar" buttonColor='black' buttonStyle={styles.appButtonContainer} size="sm" backgroundColor="#007bff" />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
    },
    tinyLogo2: {
        width: 40,
        height: 40,
    },
    top: {
        paddingTop: 60,
        backgroundColor: '#F4F1EB',
        height: '37%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    bottom:{
        backgroundColor: 'white',
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    usersAppButtonContainer:{
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    usersAppButtonText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});
  