import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './firebase';

const SignUpScreen = ({ setActiveScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // 이메일 중복 확인
  const checkEmailDuplicate = async () => {
    if (!email) {
      setEmailMessage('이메일을 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setEmailMessage('이미 등록된 이메일입니다.');
      } else {
        setEmailMessage('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      setEmailMessage('유효하지 않은 이메일 형식이거나 서버 오류입니다.');
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setFormError('모든 필드를 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setFormError('');
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setActiveScreen('LoginScreen'); // 회원가입 성공 시 로그인 화면으로 이동
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setFormError('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setFormError('유효하지 않은 이메일 형식입니다.');
      } else if (error.code === 'auth/weak-password') {
        setFormError('비밀번호는 최소 6자 이상이어야 합니다.');
      } else {
        setFormError('회원가입 실패. 다시 시도하세요.');
      }
    } finally {
      setLoading(false);
    }
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
        <TouchableOpacity style={styles.checkButton} onPress={checkEmailDuplicate} disabled={loading}>
          <Text style={styles.checkButtonText}>{loading ? '확인 중...' : '중복확인'}</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>회원가입</Text>}
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
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  emailInput: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    marginTop: 70,
    marginBottom: 0,
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
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  flexGrow: {
    flex: 1,
    marginRight: 10,
  },
  checkButton: {
    backgroundColor: '#9b9b9b',
    marginTop: 70,
    padding: 15,
    borderRadius: 25,
  },
  checkButtonText: { color: '#fff' },
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
