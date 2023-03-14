import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
export default function SubmitButton({handleSendMessage, text, disable}) {
  return (
    <TouchableOpacity disabled={disable} onPress={handleSendMessage}>
      <FontAwesomeIcon
        style={disable ? styles.disableStyle : styles.normalStyle}
        icon={faPaperPlane}
        size={25}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  normalStyle: {
    color: 'white',
  },
  disableStyle: {
    color: '#888',
  },
});
