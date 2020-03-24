import React, { useState } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, Text, Alert, StyleSheet, Image, ImageBackground, TextInput } from 'react-native';

import api from '../services/api';

import imageBackground from '../../assets/backgroudLogin.jpg';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitLogin() {
    if (email === '' | password === '')
      Alert.alert('Preencha os campos para realizar login!');

    const response = await api.post('/auth/login', {
      email: email,
      password: password
    });

    if (response.data.error) {
      Alert.alert(response.data.error);
    }
    
    const { _id, name } = await response.data.user;
    var { token } = await response.data;

    token = ('Bearer '+token);

    console.log(token, _id)
        
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('nameLogin', name);
  }

  function redirectCreateAccount() {
    navigation.navigate('Register');
  }

  return (
    <ImageBackground source={imageBackground} style={{ width: '100%', height: '100%' }}>

      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <Image source={logo} />

        <View style={styles.form}>
          <Text style={styles.label}>SEU E-MAIL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>SENHA *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a sua senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={handleSubmitLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.createAndRecuperate}>
              <TouchableOpacity onPress={redirectCreateAccount}>
                <Text style={styles.createAndRecuperateText}>Criar conta</Text>
              </TouchableOpacity>
              <Text style={styles.createAndRecuperateText}>/</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.createAndRecuperateText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  form: {
      alignSelf: 'stretch',
      paddingHorizontal: 30,
      marginTop: 30,
  },
  label: {
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
  },
  input: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 20,
      borderRadius: 2
  },
  button: {
      height: 42,
      backgroundColor: '#FF8B7D',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16
  },
  createAndRecuperate: {
    paddingTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }, 
  createAndRecuperateText: {
    paddingHorizontal: 2,
    color: '#f5f5f5',
    fontWeight: 'bold',
    fontSize: 16
  }
});