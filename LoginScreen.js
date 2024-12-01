import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ users, setActiveScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      setLoginError('이메일과 비밀번호가 일치하지 않습니다.');
    } else {
      setLoginError('');
      setActiveScreen('TabBar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>한눈에 영수증</Text>
      <Text style={styles.subtitle}>로그인</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디 입력"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => setActiveScreen('SignUpScreen')}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: "#333",
    fontSize: 20,
    fontWeight: '800',
    marginTop: 100,
    marginBottom: 30,
  },
  subtitle: {
    color: "#333",
    fontSize: 15,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#9b9b9b',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
