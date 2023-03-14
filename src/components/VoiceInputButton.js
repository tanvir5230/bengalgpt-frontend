import {faMicrophone, faStop} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {
  banglaLangCode,
  defaultMicTextBn,
  defaultMicTextEng,
  englishLangCode,
} from '../constant';

export default function VoiceInputButton({setInputText, disable}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [language, setLanguage] = useState(banglaLangCode);

  useEffect(() => {
    // Set up voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      // Clean up voice recognition when component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = event => {
    setRecognizedText(event.value[0]);
    setIsRecognizing(false);
  };

  const onSpeechError = event => {
    console.error(event.error);
    setIsRecognizing(false);
  };

  const startRecognition = async () => {
    try {
      if (!isRecognizing) {
        setIsRecognizing(true);
        await Voice.start(language);
      } else {
        setIsRecognizing(false);
        Voice.destroy().then(Voice.removeAllListeners);
      }
    } catch (error) {
      console.error(error);
      setIsRecognizing(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.voiceInputButton}
        disabled={disable}
        onPress={() => {
          setIsModalVisible(true);
        }}>
        <FontAwesomeIcon icon={faMicrophone} size={25} color={'white'} />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        statusBarTranslucent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.mode}>
            <Text style={styles.instructionText}>
              Speaking Mode: {language === banglaLangCode ? 'বাংলা' : 'English'}
            </Text>
            <TouchableOpacity
              style={styles.langActiveBtn}
              onPress={() =>
                Alert.alert(
                  'এই বাটনটি চাপ দিয়ে ধরে রেখে ভাষা পরিবর্তন করতে পারবে।',
                )
              }
              onLongPress={() =>
                setLanguage(
                  language === banglaLangCode
                    ? englishLangCode
                    : banglaLangCode,
                )
              }>
              <Text style={{color: 'white'}}>
                {language === banglaLangCode
                  ? 'Switch to English'
                  : 'Switch to Bangla'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={startRecognition}>
            <View
              style={[
                styles.microphoneIcon,
                isRecognizing && styles.glowingIcon,
              ]}>
              {isRecognizing && (
                <FontAwesomeIcon icon={faStop} size={40} color={'white'} />
              )}
              {!isRecognizing && (
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size={40}
                  color={'white'}
                />
              )}
            </View>
          </TouchableOpacity>
          {recognizedText.length > 0 && (
            <Text style={styles.recognizedText}>{recognizedText}</Text>
          )}
          {recognizedText.length === 0 && language === banglaLangCode && (
            <Text style={styles.recognizedText}>{defaultMicTextBn}</Text>
          )}
          {recognizedText.length === 0 && language === englishLangCode && (
            <Text style={styles.recognizedText}>{defaultMicTextEng}</Text>
          )}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              setIsModalVisible(false);
              Voice.destroy().then(Voice.removeAllListeners);
              setIsRecognizing(false);
              recognizedText !== defaultMicTextBn &&
                setInputText(recognizedText);
            }}>
            <Text style={styles.closeBtnTxt}>
              {recognizedText.length > 0 &&
                language === banglaLangCode &&
                'কথা বলা শেষ'}
              {recognizedText.length > 0 &&
                language === englishLangCode &&
                'Done Talking'}
              {recognizedText.length === 0 && 'close'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#060047',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mode: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  instructionText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  langActiveBtn: {
    padding: 5,
    marginLeft: 10,
    height: 40,
    backgroundColor: '#6495ed',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  microphoneIcon: {
    marginVertical: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowingIcon: {
    borderColor: '#ff7f50',
    shadowColor: '#dc143c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 5,
  },
  microphoneText: {
    color: 'white',
    fontSize: 20,
  },
  recognizedText: {
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
  },
  closeBtn: {
    paddingVertical: 5,
    width: '100%',
    backgroundColor: '#ffa07a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeBtnTxt: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
