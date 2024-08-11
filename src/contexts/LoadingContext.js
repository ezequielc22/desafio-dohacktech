import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  return (
    <LoadingContext.Provider value={{ loader, setLoader }}>
      {children}
      {loader && <LoadingIndicator />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

// Componente LoadingIndicator
const LoadingIndicator = () => {
  const scaleValue = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.7,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate();
  }, [scaleValue]);

  return (
    <View style={styles.loading}>
      <Animated.Image
        source={require('../assets/PortalIndicator.png')}
        style={[
          styles.image,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});
