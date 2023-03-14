import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {inputPlaceholder} from '../constant';

export default function UserTextInput({message, setMessage}) {
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder={inputPlaceholder}
        placeholderTextColor={'#666'}
        autoCorrect
      />
      {message.length > 0 && (
        <TouchableOpacity onPress={() => setMessage('')}>
          <FontAwesomeIcon icon={faClose} size={20} color={'#ddd'} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 8,
  },
  input: {
    width: '95%',
    minHeight: 40,
    color: 'white',
    fontSize: 14,
  },
});
