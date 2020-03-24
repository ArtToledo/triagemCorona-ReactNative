import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Alert, TextInput, AsyncStorage } from 'react-native';

import api from '../services/api';

import patientImage from '../../assets/patient.jpg';
import doctorImage from '../../assets/doctor.jpg';

export default function Register() {
  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState();
  const [numberRegister, setNumberRegister] = useState();
  const [uf, setUF] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeUser, setTypeUser] = useState('');

  function selectPatient() {
    setTypeUser('patient');
    setPatient(true);
  }

  function selectDoctor() {
    setTypeUser('doctor');
    setDoctor(true);
  }

  async function handleSumitRegister() {
    const data = {};

    data.name = name;
    data.cpf = cpf;
    data.email = email;
    data.password = password;
    data.typeUser = typeUser;
    
    if (typeUser === 'doctor') {
      data.numberRegister = numberRegister;
      data.uf = uf;
    }

    const response = await api.post('/auth/register', data);

    console.log(response.data);

    if (response.data.error) {
      Alert.alert(response.data.error);
    }

    const { _id, name } = await response.data.user;
    var { token } = await response.data;

    token = ('Bearer '+token);
        
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('nameLogin', name);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {doctor &&
        <View style={styles.form}>
          <Text style={styles.label}>NOME COMPLETO *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>CPF *</Text>
          <TextInput
            style={styles.input}
            placeholder="Apenas números"
            placeholderTextColor="#999"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            value={cpf}
            onChangeText={setCpf}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.label}>REGISTRO (CRM) *</Text>
              <TextInput
                style={styles.input}
                placeholder="Apenas números"
                placeholderTextColor="#999"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                value={numberRegister}
                onChangeText={setNumberRegister}
              />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.label}>UF *</Text>
              <TextInput
                style={styles.input}
                placeholder="Exemplo: MG, DF"
                placeholderTextColor="#999"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                value={uf}
                onChangeText={setUF}
              />
            </View>
          </View>

          <Text style={styles.label}>SEU E-MAIL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
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

          <TouchableOpacity onPress={handleSumitRegister} style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      }

      {patient &&
        <View style={styles.form}>
          <Text style={styles.label}>NOME COMPLETO *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>CPF *</Text>
          <TextInput
            style={styles.input}
            placeholder="Apenas números"
            placeholderTextColor="#999"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            value={cpf}
            onChangeText={setCpf}
          />

          <Text style={styles.label}>SEU E-MAIL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
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

          <TouchableOpacity onPress={handleSumitRegister} style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      }

      {!doctor && !patient &&
        <View style={styles.boxCheck}>
          <Text style={styles.titleBoxCheck}>Escolha o tipo de usuário abaixo</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={selectPatient}>
              <Image source={patientImage} style={styles.usersImage} />
            </TouchableOpacity>

            <Text> ou </Text>

            <TouchableOpacity onPress={selectDoctor}>
              <Image source={doctorImage} style={styles.usersImage} />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>Obs: Os dados solicitados serão armazenados de forma segura para garantir a confiabilidade da relação entre paciente e doutor (a)</Text>
        </View>
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e0e60'
  },
  boxCheck: {
    backgroundColor: '#fff',
    width: '90%',
    height: '60%',
    borderRadius: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  titleBoxCheck: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20
  },
  usersImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  description: {
    fontSize: 14,
    textAlign: 'justify'
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30
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
  }
});


