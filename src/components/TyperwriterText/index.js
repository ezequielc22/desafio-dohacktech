// TypewriterText.js
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const TypewriterText = ({ text, duration = 100, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textAnim] = useState(new Animated.Value(0));

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

  useEffect(() => {
    Animated.timing(textAnim, {
      toValue: 1,
      duration: text.length * duration,
      useNativeDriver: true,
    }).start();
  }, [textAnim, text.length, duration]);

  return (
    <Animated.Text style={[style, { opacity: textAnim }]}>
      {displayedText}
    </Animated.Text>
  );
};

export default TypewriterText;
