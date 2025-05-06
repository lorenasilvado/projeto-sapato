import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image} from 'expo-image';

type Props = {
    selectedImage?: string;
    key: number;
};

function ImageViewer({ selectedImage, key }: Props) {
    const imageSource = { uri: selectedImage };
    return <Image key={key} source={imageSource} style={styles.image} />;
}

export function IncluirSapato() {
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setSelectedImages(result.assets);
            console.log(result);
        } else {
            alert('Você não escolheu nenhuma foto!');
        }
    };
    return (
        <View style={styles.tela}>
            <ScrollView horizontal>
                {selectedImages.map((selectedImage, index) =>
                    <ImageViewer key={index} selectedImage={selectedImage.uri} />)}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
                <Text style={styles.buttonText}>Incluir sapato</Text>
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titulo: {
        marginLeft: 16,
        marginTop: 36,
        fontWeight: 'bold',
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
        margin: 5,
    },
});