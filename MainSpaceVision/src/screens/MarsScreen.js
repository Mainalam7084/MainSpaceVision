import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getMarsPhotos } from '../api/nasa';
import ImageCard from '../components/ImageCard';
import ImageViewer from '../components/ImageViewer';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ROVERS = ['curiosity', 'opportunity', 'spirit'];
const CAMERAS = ['all', 'fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'];

const MarsScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rover, setRover] = useState('curiosity');
    const [camera, setCamera] = useState('all');
    const [sol, setSol] = useState(1000);
    const [viewerVisible, setViewerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const data = await getMarsPhotos({ rover, sol, camera });
            setPhotos(data.photos || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [rover, camera, sol]);

    const openViewer = (url) => {
        setSelectedImage(url);
        setViewerVisible(true);
    };

    const renderFilterModal = () => (
        <Modal visible={filterVisible} transparent={true} animationType="slide" onRequestClose={() => setFilterVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter Mars Photos</Text>

                    <Text style={styles.sectionTitle}>Rover</Text>
                    <View style={styles.optionsRow}>
                        {ROVERS.map(r => (
                            <TouchableOpacity
                                key={r}
                                style={[styles.optionButton, rover === r && styles.optionSelected]}
                                onPress={() => setRover(r)}
                            >
                                <Text style={[styles.optionText, rover === r && styles.optionTextSelected]}>{r.toUpperCase()}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Camera</Text>
                    <View style={styles.optionsRow}>
                        <FlatList
                            data={CAMERAS}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionButton, camera === item && styles.optionSelected]}
                                    onPress={() => setCamera(item)}
                                >
                                    <Text style={[styles.optionText, camera === item && styles.optionTextSelected]}>{item.toUpperCase()}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item}
                        />
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={() => setFilterVisible(false)}>
                        <Text style={styles.closeButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mars Rovers</Text>
                <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.filterButton}>
                    <Filter color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.listContent}>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </View>
            ) : (
                <FlatList
                    data={photos}
                    renderItem={({ item }) => (
                        <ImageCard
                            item={item}
                            onPress={() => { }}
                            onImagePress={openViewer}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>No photos found for these filters.</Text>}
                />
            )}

            <ImageViewer
                visible={viewerVisible}
                imageUrl={selectedImage}
                onClose={() => setViewerVisible(false)}
            />

            {renderFilterModal()}
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
    filterButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    listContent: {
        padding: 20,
    },
    emptyText: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#1a1a2e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: 300,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        color: '#4da6ff',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    optionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10,
        marginBottom: 10,
    },
    optionSelected: {
        backgroundColor: '#4da6ff',
        borderColor: '#4da6ff',
    },
    optionText: {
        color: '#ccc',
        fontSize: 12,
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#4da6ff',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MarsScreen;
