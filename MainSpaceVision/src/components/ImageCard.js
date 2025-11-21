import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Share2, Maximize2 } from 'lucide-react-native';
import { useFavorites } from '../hooks/useFavorites';

const blurhash = 'L00000fQfQfQfQfQfQfQfQfQfQfQ';

const ImageCard = ({ item, onPress, onImagePress }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(item);

    const handleFavorite = () => {
        if (favorite) {
            removeFavorite(item);
        } else {
            addFavorite(item);
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this space image: ${item.title || 'NASA Image'} - ${item.url || item.img_src}`,
                url: item.url || item.img_src,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const imageUrl = item.url || item.img_src || (item.links && item.links[0]?.href);
    const title = item.title || (item.data && item.data[0]?.title) || `Mars Rover - ${item.camera?.name}`;
    const date = item.date || (item.data && item.data[0]?.date_created) || item.earth_date;
    const description = item.explanation || (item.data && item.data[0]?.description);

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onImagePress && onImagePress(imageUrl)}>
                <Image
                    style={styles.image}
                    source={imageUrl}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={500}
                />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleFavorite}>
                        <Heart color={favorite ? '#e91e63' : '#fff'} fill={favorite ? '#e91e63' : 'transparent'} size={24} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
                {description && (
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                )}

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                        <Share2 color="#4da6ff" size={20} />
                        <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#333',
    },
    image: {
        width: '100%',
        height: 250,
    },
    overlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    iconButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
        marginLeft: 10,
    },
    content: {
        padding: 15,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        color: '#4da6ff',
        fontSize: 12,
        marginBottom: 10,
    },
    description: {
        color: '#ccc',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: '#4da6ff',
        marginLeft: 5,
        fontSize: 14,
    },
});

export default ImageCard;
