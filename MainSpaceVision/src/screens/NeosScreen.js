import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getNEOFeed } from '../api/nasa';
import { getTodayDate, getFutureDate } from '../utils/date';
import NEOCard from '../components/NEOCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const NeosScreen = () => {
    const [neos, setNeos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchNeos = async () => {
        try {
            setError(null);
            setLoading(true);
            const startDate = getTodayDate();
            const endDate = getFutureDate(7);
            const data = await getNEOFeed(startDate, endDate);

            // Flatten the object of arrays into a single array
            const allNeos = Object.values(data.near_earth_objects).flat();
            // Sort by close approach date
            allNeos.sort((a, b) => {
                return new Date(a.close_approach_data[0].close_approach_date) - new Date(b.close_approach_data[0].close_approach_date);
            });

            setNeos(allNeos);
        } catch (err) {
            setError('Failed to load NEO data.');
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchNeos();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchNeos();
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Near Earth Objects</Text>
                <Text style={styles.subtitle}>Next 7 Days</Text>
            </View>

            {loading ? (
                <View style={styles.listContent}>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </View>
            ) : error ? (
                <View style={styles.center}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={neos}
                    renderItem={({ item }) => <NEOCard item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
                    }
                />
            )}
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
    subtitle: {
        color: '#4da6ff',
        fontSize: 14,
        marginTop: 5,
    },
    listContent: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#ff6b6b',
    },
});

export default NeosScreen;
