import React, { Component } from 'react';
import { KeyboardAvoidingView, View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage } from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';

export default class Chat extends Component {
    state = {
        messages: [],
        messageInput: '',
        namePeopleLog: ''
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('/messages');
        this.setState({ messages: response.data });

        AsyncStorage.getItem('nameLogin').then(nameLogin => {
            if (nameLogin) {
                this.setState({ namePeopleLog: nameLogin });
            }
        })
    }

    registerToSocket = () => {
        const socket = io('http://192.168.100.54:5000');

        socket.on('novaMensagem', post => {
            this.setState({ messages: [... this.state.messages, post] })
        });
    }

    sendMessage = async () => {
        if (this.state.messageInput === '')
            Alert.alert('Nenhuma mensagem digitada')

        await api.post('/messages', {
            author: this.state.namePeopleLog,
            message: this.state.messageInput
        });

        this.setState({ messageInput: '' });
      }

    render() {
        return (
            <KeyboardAvoidingView behavior="position" style={styles.containerChat}>
                <View style={styles.boxCommunication}>
                    <FlatList 
                        data={this.state.messages}
                        keyExtractor={message => message._id}
                        renderItem={({ item }) => (
                            <View style={styles.listMessages}>
                            {item.author === this.state.namePeopleLog &&
                                <View style={styles.msgAuthor}>
                                    <Text style={styles.txtMessageAuthor}>{item.author}</Text>
                                    <Text style={styles.txtMessageAuthorMessage}>{item.message}</Text>
                                </View>
                            }
                            {item.author !== this.state.namePeopleLog &&
                                <View style={styles.otherPeople}>
                                    <Text style={styles.txtMessageAuthor}>{item.author}</Text>
                                    <Text style={styles.txtMessagePeopleMessage}>{item.message}</Text>
                                </View>
                            }
                            </View>
                        )}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite uma mensagem"
                        placeholderTextColor="#444"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={true}
                        value={this.state.messageInput}
                        onChangeText={messageInput => this.setState({ messageInput })}
                    />
                </View>
    
                <TouchableOpacity onPress={this.sendMessage} style={styles.btnSend}>
                    <Text style={styles.textButton}>Enviar mensagem</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerChat: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#8e0e60'
    },
    boxCommunication: {
        backgroundColor: '#fff',
        height: 400,
        borderRadius: 4,
        marginHorizontal: 12,
        borderRadius: 4
    },
    input: {
        marginTop: 6,
        paddingHorizontal: 10,
        borderTopWidth: 0.8,
        borderColor: '#666',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#fff',
        height: 40
    },
    btnSend: {
        marginTop: 10,
        height: 42,
        backgroundColor: '#008000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginHorizontal: 12
    },
    textButton: {
        fontSize: 16,
        color: '#fff'
    },
    listMessages: {
        paddingHorizontal: 10,
        paddingTop: 5
    },
    msgAuthor: {
        alignItems: 'flex-end',
        marginLeft: 40
    },
    txtMessageAuthor: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    txtMessageAuthorMessage: {
        fontSize: 14,
        textAlign: 'justify',
        backgroundColor: '#e3fbe3',
        padding: 5,
        borderRadius: 4
    },
    otherPeople: {
        alignItems: 'flex-start',
        marginRight: 40
    },
    txtMessagePeopleMessage: {
        fontSize: 14,
        textAlign: 'justify',
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 4
    },
});
