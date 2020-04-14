# How to survive breaking-changes of major React-Native release
> A realistic assumption is that a new RN version contains breaking-changes, which is anew struggling for developers, especially when it's unpredicted -  headache (!). Facing the upgrade dilemma, there's a simple but efficient solution  -  find it inside the [Medium article](https://medium.com/p/2464374a1ded/edit)

## TL;DR
> ### In order to reduce the risk of breaking-changes, we should find a way to reduce the friction between react-native API to our app code-base.
* **De-coupling** is ensuring that two different components are not tightly dependent on one another.
* **Encapsulation** is hiding the inner functionality of a component behind a defined interface.

**i.e. import and wrap a certain component from react-native package, and use this wrapped component as a source for all code-base.**

### Showcase
Inspect this [breaking-chage](https://github.com/facebook/react-native/commit/3f7e0a2c9601fc186f25bfd794cd0008ac3983ab): removing ```<TextInput>```'s ```onTextInput``` event

**Wrap and reconsile the breaking-chage:**

```
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
```
