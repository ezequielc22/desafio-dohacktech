import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CharacterCard = React.memo(({ item, isFavorite, onToggleFavorite }) => {
    const [rotation] = useState(new Animated.Value(0));
    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        // Animar la rotación de la pistola
        Animated.sequence([
            Animated.timing(rotation, {
                toValue: 15,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotation, {
                toValue: -15,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotation, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Navegar a la pantalla de detalles solo después de la animación
            navigation.navigate('CharacterDetail', { characterId: item.id });
        });
    }, [navigation, rotation, item.id]);

    const rotationStyle = {
        transform: [
            {
                rotate: rotation.interpolate({
                    inputRange: [0, 15],
                    outputRange: ['0deg', '15deg'],
                }),
            },
        ],
    };

    return (
        <TouchableOpacity testID='character-card' onPress={handlePress} style={styles.itemContainer}>
            <Image role='image' source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.species}>Species: {item.species}</Text>
            </View>
            <Animated.Image
                source={require('../../assets/PortalGun.png')}
                style={[styles.portalGun, rotationStyle]}
            />
            <TouchableOpacity testID='fav-button' style={styles.favoriteButton} onPress={()=> onToggleFavorite(item.id)}>
                <Icon
                    testID='fav-icon'
                    name={isFavorite ? 'star' : 'star-o'}
                    size={20}
                    color={isFavorite ? '#FFD700' : '#CCCCCC'}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: 'gray',
    },
    species: {
        fontSize: 14,
        color: 'gray',
    },
    portalGun: {
        width: 50,
        height: 30,
        marginLeft: 10,
    },
    favoriteButton: {
        marginLeft: 10,
    },
});

export default CharacterCard;
