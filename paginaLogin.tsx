import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
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
            <Text style={{textAlign: 'center',fontWeight: 'bold', paddingBottom: 6,}}>Qual seu login e senha?</Text>
            <TextInput style={styles.input} placeholder="Login:" ></TextInput>
            <TextInput style={styles.input} placeholder="Senha:" ></TextInput>
            <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Home')}>
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
    loginSenha:{
        paddingTop: 10,
        marginTop: 100,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        elevation: 2, // sombra Android
        shadowColor: '#000', // sombra iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input:{
        borderWidth: 1,
        padding: 12,
        marginRight: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#2D6A4F',
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
      nomeEmpresa:{
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center',
        color: '#2D6A4F',
        marginBottom: 20,
      },
});