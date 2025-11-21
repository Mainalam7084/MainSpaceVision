import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const ImageViewer = ({ visible, imageUrl, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <X color="#fff" size={30} />
                </TouchableOpacity>

                <Image
                    style={styles.image}
                    source={imageUrl}
                    contentFit="contain"
                    enableLiveTextInteraction={false}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    image: {
        width: width,
        height: height,
    },
});

export default ImageViewer;
