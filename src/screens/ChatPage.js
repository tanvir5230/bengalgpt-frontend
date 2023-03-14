import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import UserTextInput from '../components/UserTextInput';
import SubmitButton from '../components/SubmitButton';
import VoiceInputButton from '../components/VoiceInputButton';
import ChatPageLoading from '../components/ChatPageLoadin';
import {userContext} from '../../App';
import AuthPage from './AuthPage';
import HeaderOfChatPage from '../components/HeaderOfChatPage';

import {
  amarDevK,
  amiK,
  apiEndpoints,
  appVersion,
  loadingTextChatPage,
  nothingWrittenInInputBox,
  sentenceNotMeaningFul,
  serverName,
  submitBtnTxtBeforePress,
  whoAmI,
  whoDevYouRegExp,
} from '../constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsisVertical,
  faRobot,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {faComment, faUser} from '@fortawesome/free-regular-svg-icons';
import PredefinedQuestions from '../components/PreDefinedQuestion';
import {useNavigation} from '@react-navigation/native';

export default function ChatPage() {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const {user, setUser} = useContext(userContext);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputDisable, setInputDisable] = useState(false);
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPredefined, setShowPredefined] = useState(false);

  const handleSendMessage = () => {
    if (inputText.length === 0) {
      Alert.alert(nothingWrittenInInputBox);
    } else if (inputText.length < 5) {
      Alert.alert(sentenceNotMeaningFul);
    } else if (
      whoDevYouRegExp.test(inputText.toLowerCase()) ||
      amarDevK.test(inputText.toLowerCase())
    ) {
      navigation.navigate('TeamInfo');
    } else if (
      whoAmI.test(inputText.toLowerCase()) ||
      amiK.test(inputText.toLowerCase())
    ) {
      navigation.navigate('AppInfo');
    } else {
      setQuestion(inputText);
      setIsLoading(true);
      setInputDisable(true);
      axios
        .post(`${serverName}/${apiEndpoints.generateText}`, {
          prompt: inputText.trim(),
          email: user.email,
          appVersion: appVersion,
        })
        .then(response => {
          const data = response.data;
          setResponseText(data.generated_text);
          setMessages([
            ...messages,
            {
              id: Date.now(),
              question: inputText,
              answer: data.generated_text,
            },
          ]);
          setInputText('');
          setIsLoading(false);
          setInputDisable(false);
          setUser({
            ...user,
            conversations: [
              ...user.conversations,
              {
                id: Date.now(),
                question: inputText,
                answer: data.generated_text,
              },
            ],
            tokenLimit: data.tokenLimit,
            tokenUsed: data.tokenUsed,
          });
        })
        .catch(error => {
          Alert.alert('error occured!');
          setIsLoading(false);
          setInputDisable(false);
        });
    }
  };

  const handleScroll = event => {
    const currentPos = event.nativeEvent.contentOffset.y;
    if (currentPos <= -5) {
      // fetchFiveMessages(user.email);
    }
  };

  useEffect(() => {
    if (user) {
      setMessages([...user.conversations]);
    }
  }, [user]);

  useEffect(() => {
    if (question && responseText) {
      const newChatWithAns = {
        id: Date.now(),
        question: question,
        answer: responseText,
      };
      setUser({
        ...user,
        conversations: [...user.conversations, newChatWithAns],
      });
      setQuestion('');
      setResponseText('');
    }
  }, [question, responseText, user, setUser]);

  return (
    <>
      <StatusBar backgroundColor={'#131313'} />
      <HeaderOfChatPage />
      {!user && <AuthPage />}
      <ImageBackground
        source={require('../../assets/images/chatbg.jpg')}
        style={styles.backgroundImage}>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          style={styles.scrollViewContainer}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          <View style={styles.container}>
            {user &&
              messages.length > 0 &&
              messages.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <View>
                      <View style={styles.userMessage}>
                        <FontAwesomeIcon
                          icon={faUser}
                          size={20}
                          color={'white'}
                        />
                        <Text style={styles.messageText}>{item.question}</Text>
                      </View>
                      <View style={styles.botMessage}>
                        <FontAwesomeIcon
                          icon={faRobot}
                          size={25}
                          color={'white'}
                        />
                        <Text style={styles.messageText}>
                          {item.answer.trim()}
                        </Text>
                      </View>
                    </View>
                  </React.Fragment>
                );
              })}
            {!isLoading && user && messages.length === 0 && (
              <View style={styles.noChatContainer}>
                <FontAwesomeIcon icon={faComment} size={30} color={'white'} />
                <Text style={styles.noChatText}>
                  তোমার পূর্ববর্তী কোন কথোপকথন জমা নেই।
                </Text>
              </View>
            )}

            {isLoading && (
              <ChatPageLoading text={loadingTextChatPage} question={question} />
            )}
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            disabled={inputText.length !== 0}
            onPress={() => setShowPredefined(!showPredefined)}>
            <FontAwesomeIcon
              icon={!showPredefined ? faEllipsisVertical : faXmark}
              size={25}
              color={inputText.length === 0 ? 'white' : 'darkgray'}
            />
          </TouchableOpacity>
          <UserTextInput message={inputText} setMessage={setInputText} />
          {inputText.length > 0 && (
            <SubmitButton
              text={submitBtnTxtBeforePress}
              handleSendMessage={handleSendMessage}
              disable={inputDisable}
            />
          )}
          {inputText.length === 0 && (
            <VoiceInputButton
              disable={inputDisable}
              setInputText={setInputText}
            />
          )}
        </View>
        <View>
          {showPredefined && inputText.length === 0 && (
            <PredefinedQuestions setInputText={setInputText} />
          )}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noChatText: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
  },
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
    borderTopLeftRadius: 0,
  },
  botMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'darkslategrey',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '90%',
    borderTopRightRadius: 0,
  },
  messageIcon: {
    marginRight: 8,
  },
  messageText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  inputContainer: {
    // backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
