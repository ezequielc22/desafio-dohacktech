import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TypewriterText from '../index';

jest.useFakeTimers();

describe('TypewriterText', () => {
  it('should render the complete text after the specified duration', async() => {
    const style = { color: 'red', opacity: 0 };
    const { getByTestId } = render(<TypewriterText testID="typewriter" text="Hello" duration={100} style={style} />);
    await waitFor(()=>{
        jest.advanceTimersByTime(100); // Después de 100ms, debería mostrar 'H'
        expect(getByTestId('typewriter').children[0]).toBe('H');
        jest.advanceTimersByTime(100); // Después de otros 100ms, debería mostrar 'He'
        expect(getByTestId('typewriter').children[0]).toBe('He');
        jest.advanceTimersByTime(100); // Después de otros 100ms, debería mostrar 'Hel'
        expect(getByTestId('typewriter').children[0]).toBe('Hel');
        jest.advanceTimersByTime(100); // Después de otros 100ms, debería mostrar 'Hell'
        expect(getByTestId('typewriter').children[0]).toBe('Hell');
        jest.advanceTimersByTime(100); // Después de otros 100ms, debería mostrar 'Hello'
        expect(getByTestId('typewriter').children[0]).toBe('Hello');
    });
  });
});
