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
  const [precoCusto, setPrecoCusto] = useState<string>(''); 
  const [precoVenda, setPrecoVenda] = useState<string>(''); 
  const { addSapatos } = useSapatosStore();

  const addSapato = () => {
    const imagens = selectedImages.map((selectedImage) => selectedImage.uri)
    const custo = Number(precoCusto)
    const venda = Number(precoVenda)
    addSapatos({precoCusto: custo, precoVenda: venda, imagens: imagens})
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
      <ScrollView horizontal>
        {selectedImages.map((selectedImage, index) => (
          <View key={index} style={styles.imageContainer}>
            <ImageViewer key ={index} selectedImage={selectedImage.uri} />
            {index === 0 && (
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Preço de custo"
                  value={precoCusto}
                  onChangeText={setPrecoCusto}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Preço á venda"
                  value={precoVenda}
                  onChangeText={setPrecoVenda}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
    marginTop: 24,
    paddingHorizontal: 112,
  },
  buttonFinalizar:{
    backgroundColor: '#2D6A4F',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 136,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    marginTop: 100,
    width: 320,
    height: 440,
    borderRadius: 18,
    margin: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  input: {
    width: 135,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});