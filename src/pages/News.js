import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function News() {
  return (
      <WebView
          source={{ uri: 'https://g1.globo.com/bemestar/coronavirus/?utm_source=g1&utm_medium=pirulito&utm_campaign=pirulito' }}
          renderLoading={() => <View style={{ flex: 1 }}><ActivityIndicator size='large' color='#8e0e60'></ActivityIndicator></View>}
          startInLoadingState={true}
      />
  );
}
