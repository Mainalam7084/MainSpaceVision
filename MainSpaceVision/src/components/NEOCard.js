import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NEOCard = ({ item }) => {
    const isHazardous = item.is_potentially_hazardous_asteroid;
    const diameter = item.estimated_diameter.kilometers;
    const closeApproach = item.close_approach_data[0];

    return (
        <View style={[styles.card, isHazardous && styles.hazardousCard]}>
            <View style={styles.header}>
                <Text style={styles.name}>{item.name}</Text>
                {isHazardous && (
                    <View style={styles.hazardBadge}>
                        <Ionicons name="warning" color="#fff" size={14} />
                        <Text style={styles.hazardText}>HAZARDOUS</Text>
                    </View>
                )}
            </View>

            <View style={styles.row}>
                <View style={styles.infoItem}>
                    <Ionicons name="resize" color="#4da6ff" size={16} />
                    <Text style={styles.label}>Diameter</Text>
                    <Text style={styles.value}>
                        {diameter.estimated_diameter_min.toFixed(2)} - {diameter.estimated_diameter_max.toFixed(2)} km
                    </Text>
                </View>

                <View style={styles.infoItem}>
                    <Ionicons name="speedometer" color="#4da6ff" size={16} />
                    <Text style={styles.label}>Velocity</Text>
                    <Text style={styles.value}>
                        {parseFloat(closeApproach.relative_velocity.kilometers_per_second).toFixed(2)} km/s
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.date}>
                    Approach: {new Date(closeApproach.close_approach_date_full).toLocaleString()}
                </Text>
                <Text style={styles.distance}>
                    Miss Distance: {parseFloat(closeApproach.miss_distance.kilometers).toLocaleString()} km
                </Text>
            </View>

            {/* Visual size representation */}
            <View style={styles.sizeBarContainer}>
                <View
                    style={[
                        styles.sizeBar,
                        {
                            width: Math.min(diameter.estimated_diameter_max * 50, 100) + '%',
                            backgroundColor: isHazardous ? '#ff4444' : '#4da6ff'
                        }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    hazardousCard: {
        borderColor: '#ff4444',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    hazardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    hazardText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    infoItem: {
        flex: 1,
    },
    label: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
    value: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 10,
        marginBottom: 10,
    },
    date: {
        color: '#ccc',
        fontSize: 12,
        marginBottom: 4,
    },
    distance: {
        color: '#ccc',
        fontSize: 12,
    },
    sizeBarContainer: {
        height: 4,
        backgroundColor: '#333',
        borderRadius: 2,
        marginTop: 5,
    },
    sizeBar: {
        height: '100%',
        borderRadius: 2,
    },
});

export default NEOCard;
