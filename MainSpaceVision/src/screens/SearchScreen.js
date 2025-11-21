import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { searchNASAImages } from '../api/nasa';
import ImageCard from '../components/ImageCard';
import ImageViewer from '../components/ImageViewer';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewerVisible, setViewerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            setLoading(true);
            const data = await searchNASAImages(query);
            const items = data.collection.items.map(item => ({
                ...item,
                img_src: item.links ? item.links[0].href : null,
                title: item.data[0].title,
                description: item.data[0].description,
                date: item.data[0].date_created,
                id: item.data[0].nasa_id,
            })).filter(item => item.img_src); // Filter out items without images

            setResults(items);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openViewer = (url) => {
        setSelectedImage(url);
        setViewerVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Search NASA Images</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search (e.g., 'Apollo 11', 'Nebula')"
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <SearchIcon color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#4da6ff" />
                </View>
            ) : (
                <FlatList
                    data={results}
                    renderItem={({ item }) => (
                        <ImageCard
                            item={item}
                            onPress={() => { }}
                            onImagePress={openViewer}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        !loading && results.length === 0 && query ? (
                            <Text style={styles.emptyText}>No results found.</Text>
                        ) : null
                    }
                />
            )}

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
        padding: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        borderRadius: 10,
        padding: 15,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#333',
    },
    searchButton: {
        backgroundColor: '#4da6ff',
        padding: 15,
        borderRadius: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default SearchScreen;
