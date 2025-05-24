import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { useSapatosStore } from './src/store/useSapatosStore';

type Props = {
  selectedImage?: string;
  key: number;
};

function ImageViewer({ selectedImage }: Props) {
  const imageSource = { uri: selectedImage };
  return <Image source={imageSource} style={styles.image} />;
}

export function IncluirSapato() {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [nome, setNome] = useState<string>('');
  const [precoCusto, setPrecoCusto] = useState<string>('');
  const [precoVenda, setPrecoVenda] = useState<string>('');
  const { addSapatos } = useSapatosStore();

  const addSapato = () => {
    const imagens = selectedImages.map((selectedImage) => selectedImage.uri)
    const custo = Number(precoCusto)
    const venda = Number(precoVenda)
    addSapatos({ nome: nome, precoCusto: custo, precoVenda: venda, imagens: imagens })
    navigation.goBack()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets);
      setPrecoCusto('');
      setPrecoVenda('');
      console.log(result);
    } else {
      alert('Você não escolheu nenhuma foto!');
    }
  };

  return (
    <View style={styles.tela}>
      {selectedImages.length > 0 && (
        <View>
          <TextInput
              style={styles.nomeInput}
              placeholder="Nome do sapato"
              value={nome}
              onChangeText={setNome}
            />
          <ScrollView horizontal style={styles.scrollView}>
            {selectedImages.map((selectedImage, index) => (
              <View key={index} style={styles.imageContainer}>
                <ImageViewer key={index} selectedImage={selectedImage.uri} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Preço de custo"
                value={precoCusto}
                onChangeText={setPrecoCusto}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Preço à venda"
                value={precoVenda}
                onChangeText={setPrecoVenda}
                keyboardType="numeric"
              />
            </View>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
        <Text style={styles.buttonText}>Incluir imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFinalizar} onPress={addSapato}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  button: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 112,
    marginTop: -80,
  },
  buttonFinalizar: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 136,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    margin: 5,
  },
  imageContainer: {
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 135,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    marginBottom: 120,
    backgroundColor: '#fff',
  },
  nomeInput: {
    marginTop: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginTop: 12,
  },
});