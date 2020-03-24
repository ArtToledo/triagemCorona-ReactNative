import React, {useState, useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import News from './pages/News';

const Stack = createStackNavigator();

function Routes() {
    const [token, setToken] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                setToken(token);
            }
        })
    });

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ 
                                headerStyle: { backgroundColor: '#8e0e60' }, 
                                headerTintColor: '#fff' 
                            }}>
                {token ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
                        <Stack.Screen name="News" component={News} options={{ title: 'Notícias' }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ title: '', headerTransparent: true }} />
                        <Stack.Screen name="Register" component={Register} 
                            options={{ 
                                headerTransparent: false, 
                                title: 'Criar conta' 
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;