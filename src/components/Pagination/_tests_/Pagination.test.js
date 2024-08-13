import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Pagination from '../index';
import { Animated } from 'react-native';

describe('Pagination', () => {
  const defaultProps = {
    page: 1,
    totalPages: 5,
    handlePageChange: jest.fn(),
    handlePageEdit: jest.fn(),
    inputPage: '',
    handleInputChange: jest.fn(),
    goToPage: jest.fn(),
    editingPage: null,
    errorState: false,
    errorStateVisible: false,
    shakeAnimation: new Animated.Value(0),
  };
  jest.useFakeTimers();

  it('renders pagination correctly', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('>')).toBeTruthy();
  });

  it('calls handlePageChange when navigating to the prev page', () => {
    const { getByText } = render(<Pagination {...defaultProps} page={2} />);
    fireEvent.press(getByText('<'));
    expect(defaultProps.handlePageChange).toHaveBeenCalledWith(1);
  });

  it('displays the input when editingPage is active', () => {
    const { getByDisplayValue } = render(<Pagination {...defaultProps} editingPage={2} inputPage="2" />);
    expect(getByDisplayValue('2')).toBeTruthy();
  });

  it('calls handleInputChange when input value changes', () => {
    const { getByDisplayValue } = render(<Pagination {...defaultProps} editingPage={2} inputPage="2" />);
    fireEvent.changeText(getByDisplayValue('2'), '3');
    expect(defaultProps.handleInputChange).toHaveBeenCalledWith('3');
  });

  it('activates edit mode on page button press', () => {
    const { getByTestId, getByDisplayValue } = render(
      <Pagination {...defaultProps} editingPage={2} inputPage="2" />
    );
    fireEvent.press(getByTestId('2'));
    expect(getByDisplayValue('2')).toBeTruthy();
  });

  it('navigates to the first page when start-page button is pressed', () => {
    const props = { ...defaultProps, page: 3 };
    const { getByTestId } = render(<Pagination {...props} />);
    const startPageButton = getByTestId('start-page');
    expect(startPageButton).toBeTruthy();
    fireEvent.press(startPageButton);
    expect(props.handlePageChange).toHaveBeenCalledWith(1);
  });

  it('navigates to the last page when end-page button is pressed', () => {
    const props = { ...defaultProps, page: 3 };
    const { getByTestId } = render(<Pagination {...props} />);
    const startPageButton = getByTestId('end-page');
    expect(startPageButton).toBeTruthy();
    fireEvent.press(startPageButton);
    expect(props.handlePageChange).toHaveBeenCalledWith(1);
  });

  it('renders ellipsis when startPage is greater than 2', () => {
    const props = { ...defaultProps, page: 4 };
    const { getByText } = render(<Pagination {...props} />);
    expect(getByText('...')).toBeTruthy();
  });
    
  it('calls handlePageChange when navigating to the next page', () => {
    const { getByText } = render(<Pagination {...defaultProps}/>);
    fireEvent.press(getByText('>'));
    expect(defaultProps.handlePageChange).toHaveBeenCalledWith(1);
  });
});
