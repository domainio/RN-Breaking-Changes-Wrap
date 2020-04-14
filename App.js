import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import TextInput from './src/components/core/TextInput';


const App: () => React$Node = () => {

  const [value, setValue] = useState('');

  const onTextInput = (event) => {
    console.log('onTextInput: ', event);
  }

  const onChangeText = (text) => {
    console.log('onChangeText: ', text);
    setValue(text)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.container}>
          <View style={Styles.body}>
            <Text style={Styles.text}>Wrapped TextInput</Text>
            <TextInput
              onTextInput={onTextInput}
              onChangeText={onChangeText}
              value={value}
              placeholder={'type text...'}
              style={Styles.textInput}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
  body: {
    flex: 1
  },
  text: {
    color: 'blue'
  },
  textInput: {
    borderColor: 'green',
    borderWidth: 1
  }
});

export default App;
