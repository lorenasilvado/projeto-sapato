import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, type ImageSource } from 'expo-image';

const PlaceholderImage = require('./assets/images/No-Image-Placeholder.png');

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}

export function Home() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
          console.log(result);
        } else {
          alert('Você não escolheu nenhuma foto!');
        }
      };
    return(
        <>
            <View style={{backgroundColor: '#F8F9FA'}}>
                <Text style={styles.titulo}>Bem Vindo!</Text>
            </View>
            <View style={styles.tela}>
                <View >
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                </View>
                <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
                    <Text style={styles.buttonText}>Incluir sapato</Text>
                </TouchableOpacity>
            </View>
        </>
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titulo:{
        marginLeft: 16,
        marginTop: 36,
        fontWeight: 'bold',
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});