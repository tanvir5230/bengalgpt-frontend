import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

const TypingAnimation = ({text, delay = 100, stylingObj}) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let interval;

    const startInterval = () => {
      interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setCurrentText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          currentIndex = 0;
          startInterval();
        }
      }, delay);
    };

    startInterval();

    return () => clearInterval(interval);
  }, [text, delay]);

  return <Text style={stylingObj}>{currentText}</Text>;
};

export default TypingAnimation;
