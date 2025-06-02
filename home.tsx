import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { getSapatos, removeSapato, Sapato } from './src/store/useSapatosStore';

export function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [sapatos, setSapatos] = useState<Sapato[]>([]);

  async function carregarSapatos() {
    const data = await getSapatos();
    setSapatos(data);
  }

  async function excluirSapato(index: number) {
    await removeSapato(index);
    carregarSapatos();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarSapatos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {sapatos.length === 0 ? (
        <Text>Ainda não contém nenhum sapato!</Text>
      ) : (
        <ScrollView>
          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Sapatos disponíveis</Text>
          </View>
          {sapatos.map((sapato, index) => (
            <View key={index} style={styles.informacaoTela}>
              <Text>Nome do sapato: {sapato.nome}</Text>
              <Image source={sapato.imagens[0]} style={styles.image} />
              <Text>Preço Custo: R${sapato.precoCusto},00</Text>
              <Text>Preço Venda: R${sapato.precoVenda},00</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => excluirSapato(index)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('Incluir')}>
        <Text style={styles.buttonText}>Adicionar sapato</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2D6A4F',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 112,
        marginBottom: 12,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F8F9FA',
    },
    viewTitulo: {
        marginTop: 30,
        alignItems: 'center',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        width: 220,
        height: 240,
        borderRadius: 18,
        margin: 5,
    },
    informacaoTela: {
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    deleteButton: {
        backgroundColor: '#E63946',
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})