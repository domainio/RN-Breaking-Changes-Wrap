import React, { useState } from 'react';
import { TextInput } from 'react-native';
import _ from 'lodash';

const AppTextInput = ({ onChangeText, onTextInput, onSelectionChange, ...rest }) => {

  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const _onSelectionChange = (event) => {
    const { nativeEvent: { selection } } = event;
    setSelection(selection);
    if (_.isFunction(onSelectionChange)) {
      return onSelectionChange(event);
    }
  }

  _onChangeText = (newText) => {
    const { value: previousText } = rest;
    const diiText = _.difference((newText || '').split(''), (previousText || '').split('')).join('');
    if (_.isFunction(onTextInput)) {
      onTextInput({
        nativeEvent: {
          text: diiText,
          previousText,
          range: { ...selection }
        }
      });
    }
    if (_.isFunction(onChangeText)) {
      return onChangeText(newText);
    }
  }

  return (
    <TextInput
      {...rest}
      onChangeText={_onChangeText}
      onSelectionChange={_onSelectionChange}
    />
  )
};

export default AppTextInput;