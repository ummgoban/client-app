import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../types/StackParamList';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    navigation.navigate('Home', {screen: 'Feed'});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Signup"
        onPress={() => navigation.navigate('Register', {screen: 'Signup'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
