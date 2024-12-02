import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ users, addUser, setActiveScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [formError, setFormError] = useState('');

  const checkEmailDuplicate = () => {
    if (users.some((user) => user.email === email)) {
      setEmailMessage('이미 등록된 이메일입니다.');
    } else {
      setEmailMessage('사용 가능한 이메일입니다.');
    }
  };

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setFormError('모든 필드가 입력되지 않았습니다.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setFormError('');
    addUser({ email, password });
    setActiveScreen('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.emailInput, styles.flexGrow]}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.checkButton} onPress={checkEmailDuplicate}>
          <Text style={styles.checkButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      {emailMessage ? (
        <Text style={[emailMessage.includes('이미') ? styles.errorText : styles.successText, styles.emailMessage]}>
          {emailMessage}
        </Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {formError ? <Text style={[styles.errorText, styles.message]}>{formError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveScreen('LoginScreen')}>
        <Text style={styles.linkText}>로그인 화면으로</Text>
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
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 20,
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10
  },
  emailInput: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginTop: 70,
    marginBottom: 0
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
  linkText: {
    color: '#333',
    marginTop: 10,
    textAlign: 'left'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  flexGrow: {
    flex: 1,
    marginRight: 10
  },
  checkButton: {
    backgroundColor: '#9b9b9b',
    marginTop: 70,
    padding: 15,
    borderRadius: 25,
  },
  checkButtonText: { color: '#fff'},
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
    marginLeft: 20,
  },
  successText: {
    color: 'green',
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
    marginLeft: 20,
  },
  emailMessage: { marginTop: 0, marginBottom: 10 },
  message: { marginTop: 0, marginBottom: 5 },
});

export default SignUpScreen;