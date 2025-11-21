import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const LoadingSkeleton = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imagePlaceholder, { opacity }]} />
            <View style={styles.content}>
                <Animated.View style={[styles.textPlaceholder, { width: '80%', height: 20, opacity }]} />
                <Animated.View style={[styles.textPlaceholder, { width: '40%', height: 15, marginTop: 10, opacity }]} />
                <Animated.View style={[styles.textPlaceholder, { width: '100%', height: 60, marginTop: 15, opacity }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        backgroundColor: '#333',
    },
    content: {
        padding: 15,
    },
    textPlaceholder: {
        backgroundColor: '#333',
        borderRadius: 4,
    },
});

export default LoadingSkeleton;
