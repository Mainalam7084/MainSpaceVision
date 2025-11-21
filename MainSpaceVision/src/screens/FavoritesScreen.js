import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../hooks/useFavorites';
import ImageCard from '../components/ImageCard';
import ImageViewer from '../components/ImageViewer';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const FavoritesScreen = () => {
    const { favorites, removeFavorite, loading } = useFavorites();
    const [viewerVisible, setViewerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openViewer = (url) => {
        setSelectedImage(url);
        setViewerVisible(true);
    };

    const handleExport = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'favorites_backup.json';
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(favorites));

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Error', 'Sharing is not available on this device');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to export favorites');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favorites</Text>
                <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
                    <Ionicons name="download-outline" color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <ImageCard
                        item={item}
                        onPress={() => { }}
                        onImagePress={openViewer}
                    />
                )}
                keyExtractor={(item, index) => (item.id || item.date || index).toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No favorites yet.</Text>
                        <Text style={styles.emptySubText}>Save images from Home, Mars, or Search screens.</Text>
                    </View>
                }
            />

            <ImageViewer
                visible={viewerVisible}
                imageUrl={selectedImage}
                onClose={() => setViewerVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    exportButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    listContent: {
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
        padding: 20,
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptySubText: {
        color: '#ccc',
        textAlign: 'center',
    },
});

export default FavoritesScreen;
