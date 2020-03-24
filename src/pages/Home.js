import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentDots, faNewspaper } from '@fortawesome/free-regular-svg-icons'

import cvPeoples from '../../assets/conversaApp.png';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>#JuntosSomosImbatíveis</Text>
      <Image source={cvPeoples} style={styles.imgCvPeoples} />
      <Text style={styles.description}>Nesse momento é extremamente importante que nos juntemos para amenizar os danos do corona vírus (Covid-19), caso você esteja com alguma suspeita e queira conversar com um profissional de saúde para tirar suas dúvidas, clique no botão abaixo para entrar em um bate papo ao vivo. Caso você seja um médico (a), ajude o próximo e nossos hospitais com seu conhecimento, clique no botão abaixo para sanar as dúvidas do pessoal.</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.buttonChat}>
        <View style={styles.viewButton}>
          <Text style={styles.textButton}>Entrar no chat ao vivo</Text>
          <FontAwesomeIcon icon={faCommentDots} color="#fff" marginLeft={10} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('News')} style={styles.buttonNews}>
        <View style={styles.viewButton}>
          <Text style={styles.textButton}>Ultimas notícias</Text>
          <FontAwesomeIcon icon={faNewspaper} color="#fff" marginLeft={10} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e0e60'
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40
  },
  imgCvPeoples: {
    height: 200,
    resizeMode: 'contain'
  },
  description: {
    fontSize: 15,
    textAlign: 'justify',
    marginTop: 2,
    paddingHorizontal: 12,
    color: '#ddd'
  },
  buttonChat: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 220,
    backgroundColor: '#FF8B7D',
    borderRadius: 4
  },
  textButton: {
    fontSize: 18,
    color: '#fff'
  },
  buttonNews: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    width: 220,
    backgroundColor: '#69089C',
    borderRadius: 4
  },
  viewButton: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
});
