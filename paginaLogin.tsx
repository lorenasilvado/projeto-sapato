import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Empregado', value: 'empregado' },
    { label: 'Empregador', value: 'empregador' },
  ]);

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (value !== 'empregador') {
    Alert.alert('Acesso restrito', 'Apenas empregadores podem acessar esta área.');
    return;
  }
    if (login === 'Adm' && senha === 'Adm123') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Login ou senha inválidos.');
    }
  };

  const isFormValid = login !== '' && senha !== '';

  return (
    <View style={styles.picker}>
      <Text style={styles.nomeEmpresa}>Sicalth</Text>
      <Text style={styles.pickerText}>Quem está se conectando?</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Escolha quem é você"
      />
      <View style={styles.loginSenha}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: 6 }}>Qual seu login e senha?</Text>
        <TextInput
          style={styles.input}
          placeholder="Login:"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha:"
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isFormValid ? '#2D6A4F' : '#aaa' }]}
          onPress={handleLogin}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  pickerText: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  loginSenha: {
    paddingTop: 10,
    marginTop: 100,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nomeEmpresa: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#2D6A4F',
    marginBottom: 20,
  },
});
