import {faRobot} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TypingAnimation from './TypingAnimation';

export default function ChatPageLoading({question, text}) {
  return (
    <View>
      <View style={styles.userMessage}>
        <FontAwesomeIcon icon={faUser} size={20} color={'white'} />
        <Text style={styles.messageText}>{question}</Text>
      </View>
      <View style={styles.botMessage}>
        <FontAwesomeIcon icon={faRobot} size={25} color={'white'} />
        <TypingAnimation
          text={text}
          delay={200}
          stylingObj={styles.loadingMessageText}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#323232',
    alignSelf: 'flex-start',
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '90%',
  },
  botMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'darkslategrey',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    width: '90%',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  loadingMessageText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
  },
});
