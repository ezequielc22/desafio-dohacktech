import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useState, useEffect, useRef } from 'react';

export const triggerShake = (shakeAnimation, setErrorState) => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  
  Animated.sequence([
    Animated.timing(shakeAnimation, { toValue: 10, duration: 75, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: -10, duration: 75, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 10, duration: 75, useNativeDriver: true }),
    Animated.timing(shakeAnimation, { toValue: 0, duration: 75, useNativeDriver: true }),
  ]).start(() => setErrorState(false));
};

// Custom hook to simulate a typing effect
export const useTypingAnimation = (text, delay = 5) => {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef(text);
  const indexRef = useRef(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    textRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
  }, [text]);

  useEffect(() => {
    const animate = () => {
      const text = textRef.current;
      const index = indexRef.current;

      if (index < text.length) {
        setDisplayedText(prev => prev + text[index]);
        indexRef.current = index + 1;
        animationFrameId.current = requestAnimationFrame(() => {
          setTimeout(() => {
            animate();
          }, delay);
        });
      }
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [delay]);

  return displayedText;
};
