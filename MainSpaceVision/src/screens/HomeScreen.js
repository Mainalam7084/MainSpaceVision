import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAPOD, getRandomAPOD } from '../api/nasa';
import ImageCard from '../components/ImageCard';
import ImageViewer from '../components/ImageViewer';
import LoadingSkeleton from '../components/LoadingSkeleton';

const HomeScreen = () => {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [viewerVisible, setViewerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);

    const fetchApod = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getAPOD();
            setApod(data);
        } catch (err) {
            setError('Failed to load APOD. Please check your connection.');
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fetchRandomApod = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getRandomAPOD(1);
            setApod(data[0]);
        } catch (err) {
            setError('Failed to load random image.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApod();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchApod();
    };

    const openViewer = (url) => {
        setSelectedImage(url);
        setViewerVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Astronomy Picture of the Day</Text>
                <TouchableOpacity onPress={fetchRandomApod} style={styles.randomButton}>
                    <Ionicons name="refresh" color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
                }
            >
                {loading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={fetchApod}>
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : apod && (
                    <ImageCard
                        item={apod}
                        onPress={() => { }}
                        onImagePress={openViewer}
                    />
                )}
            </ScrollView>

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
        fontFamily: 'System',
    },
    randomButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    scrollContent: {
        padding: 20,
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    errorText: {
        color: '#ff6b6b',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#4da6ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
