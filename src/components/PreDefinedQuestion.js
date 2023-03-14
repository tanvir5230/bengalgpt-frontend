import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PredefinedQuestions = ({setInputText}) => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  //   const domains = ['Engineering', 'Medical', 'Finance'];
  const domains = ['বাংলাদেশ', 'পদার্থবিজ্ঞান', 'রসায়ন', 'Coding'];
  const questions = {
    বাংলাদেশ: [
      'বাংলাদেশের মুক্তিযুদ্ধ সম্পর্কে সংক্ষেপে বর্ণনা করো',
      '1952 সালে বাংলাদেশে শহীদ দিবস সম্পর্কে বর্ণনা করো',
      'শেখ মুজিবুর রহমান সম্পর্কে সংক্ষেপে বর্ণনা করো',
      'বাংলাদেশের সবচেয়ে আকর্ষণীয় জায়গা সম্পর্কে বলো',
    ],
    পদার্থবিজ্ঞান: [
      'পদার্থবিজ্ঞানে কাজের শক্তি এবং শক্তির গুরুত্বপূর্ণ তত্ত্বসমূহ',
      'পদার্থবিজ্ঞানে মেকানিক্স এবং স্ট্যাটিকের গুরুত্বপূর্ণ তত্ত্বসমূহ',
      'পদার্থবিজ্ঞানের electricity সম্পর্কে বর্ণনা করো',
      'পদার্থবিজ্ঞানের আলো সম্পর্কে বর্ণনা করো',
    ],
    রসায়ন: [
      'রসায়নে জৈব যৌগ সম্পর্কে বর্ণনা করো',
      'অজৈব যৌগ সম্পর্কে বর্ণনা করো',
    ],
    Coding: [
      'Write a code in python to print Fibonacci series',
      'Write a code in C to find A prime number',
      'Write a function in Javascript to find String Palindrome',
      'Write a function in Java to find  Armstrong number',
      'Write a code to find in python Factorial',
    ],
  };

  const handleDomainSelect = domain => {
    setSelectedDomain(domain);
  };

  const handleQuestionSelect = question => {
    setInputText(question);
    setSelectedDomain(null);
  };

  const handleBackButtonPress = () => {
    setSelectedDomain(null);
  };

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        {selectedDomain ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackButtonPress}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}

        {selectedDomain
          ? questions[selectedDomain].map(question => (
              <TouchableOpacity
                key={question}
                onPress={() => handleQuestionSelect(question)}>
                <Text style={styles.questionBtnTxt}>{question}</Text>
              </TouchableOpacity>
            ))
          : domains.map(domain => (
              <TouchableOpacity
                key={domain}
                onPress={() => handleDomainSelect(domain)}>
                <Text style={styles.domainBtnTxt}>{domain}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    minWidth: '100%',
    height: 40,
    marginBottom: 5,
  },
  backButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
  domainBtnTxt: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: '#CCC',
    borderRadius: 5,
  },
  questionBtnTxt: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: '#CCC',
    borderRadius: 5,
  },
});

export default PredefinedQuestions;
