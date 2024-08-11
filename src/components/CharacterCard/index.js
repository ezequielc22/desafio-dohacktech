import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CharacterCard = React.memo(({ item, isFavorite, onToggleFavorite }) => {
    const [rotation] = useState(new Animated.Value(0));
    const navigation = useNavigation();

    const handlePress = () => {
        // Animar la rotación de la pistola
        Animated.sequence([
            Animated.timing(rotation, {
                toValue: 15, // Rotar 15 grados
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotation, {
                toValue: -15, // Regresar a -15 grados
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(rotation, {
                toValue: 0, // Regresar a la posición original
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            navigation.navigate('CharacterDetail', { characterId: item.id });
        }, 600); // Asegura que la redirección espere a que la animación termine
    };

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
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                <Text style={styles.species}>Species: {item.species}</Text>
            </View>
            <Animated.Image
                source={require('../../assets/PortalGun.png')}
                style={[styles.portalGun, rotationStyle]}
            />
            <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                <Icon name={isFavorite ? 'star' : 'star-o'} size={20} color={isFavorite ? '#FFD700' : '#CCCCCC'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F5F5F5', // Color de fondo de la tarjeta
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1, // Para Android
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
