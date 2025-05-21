import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSapatosStore } from './src/store/useSapatosStore';
import { Image } from 'expo-image';

export function Home() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>()
    const { sapatos } = useSapatosStore();
    return (
        <View style={styles.container}>
            {sapatos.length === 0 ?
                <Text>Ainda não contém nenhum sapato!</Text> :
                <ScrollView>
                    {sapatos.map((sapato, index) =>
                    (
                        <View key={index}>
                            <Image source={sapato.imagens[0]} style={styles.image} />
                            <Text>Preço Custo: {sapato.precoCusto}</Text>
                            <Text>Preço Venda: {sapato.precoVenda}</Text>
                        </View>
                    )
                    )}
                </ScrollView>
            }
            <TouchableOpacity style={styles.button} onPress={() => navigation.push('Incluir')}>
                <Text style={styles.buttonText}>Adicionar sapato</Text>
            </TouchableOpacity>
        </View>
    )
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
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 340,
        borderRadius: 18,
        margin: 5,
    },
})