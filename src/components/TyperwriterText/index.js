// TypewriterText.js
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const TypewriterText = ({ testID, text, duration = 100, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textAnim] = useState(new Animated.Value(0));

  // Configura el intervalo de tiempo para mostrar caracter por caracter

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex += 1;

      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [text, duration]);

  // Configura la animacion del texto

  useEffect(() => {
    Animated.timing(textAnim, {
      toValue: 1,
      duration: text.length * duration,
      useNativeDriver: true,
    }).start();
  }, [textAnim, text.length, duration]);

  return (
    <Animated.Text testID={testID} style={[style, { opacity: textAnim }]}>
      {displayedText}
    </Animated.Text>
  );
};

export default TypewriterText;
