# How to survive breaking-changes of major React-Native release
> A realistic assumption is that a new RN version contains breaking-changes, which is anew struggling for developers, especially when it's unpredicted -  headache (!). Facing the upgrade dilemma, there's a simple but efficient solution  -  find it inside the [Medium article](https://medium.com/p/2464374a1ded/edit)

## TL;DR
> ### In order to reduce the risk of breaking-changes, we should find a way to reduce the friction between react-native API to our app code-base.
* De-coupling is ensuring that two different components are not tightly dependent on one another.
* Encapsulation is hiding the inner functionality of a component behind a defined interface.

**import and wrap a certain component from react-native package, and use this wrapped component as a source for all code-base.**

### Showcase
Inspect this [breaking-chage](https://github.com/facebook/react-native/commit/3f7e0a2c9601fc186f25bfd794cd0008ac3983ab): removing ```<TextInput>```'s ```onTextInput``` event
