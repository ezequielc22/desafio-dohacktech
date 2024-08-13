import React from 'react';
import { render, screen } from '@testing-library/react-native';
import EmptyState from '../index';

describe('EmptyState', () => {
  it('should render message correctly', () => {
    const message = 'No data available';
    const iconName = 'info';
    render(<EmptyState message={message} iconName={iconName} />);

    const text = screen.getByText(message);
    expect(text).toBeTruthy();
    expect(text).toHaveTextContent(message);
  });
  it('should render the iconcorrectly', () => {
    const message = 'No data available';
    const iconName = 'info';
    const customSize = 50;
    const customColor = 'red';
    render(
      <EmptyState
        message={message}
        iconName={iconName}
        iconSize={customSize}
        iconColor={customColor}
      />
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
  });
});
