import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { ExpenseRow } from './ExpenseRow';

describe('ExpenseRow', () => {
  const mockOnPress = jest.fn();
  const mockProps = {
    emoji: '💰',
    text: 'Expense',
    number: 50,
    onPress: mockOnPress,
  };

  it('renders correctly', () => {    
    render(<ExpenseRow />);
  });

  test('matches snapshot', () => {
    const tree = create(<ExpenseRow {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('displays correct props', () => {
    const { getByText } = render(<ExpenseRow {...mockProps} />);
    expect(getByText(mockProps.emoji)).toBeTruthy();
    expect(getByText(mockProps.text)).toBeTruthy();
    expect(getByText(`-$${mockProps.number}`)).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const { getByText } = render(<ExpenseRow {...mockProps} />);
    fireEvent.press(getByText(mockProps.text));
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('renders the correct emoji', () => {
    const { getByText } = render(<ExpenseRow {...mockProps} />);
    expect(getByText(mockProps.emoji)).toBeTruthy();
  });

  test('renders the correct text', () => {
    const { getByText } = render(<ExpenseRow {...mockProps} />);
    expect(getByText(mockProps.text)).toBeTruthy();
  });

  test('renders the correct number', () => {
    const { getByText } = render(<ExpenseRow {...mockProps} />);
    expect(getByText(`-$${mockProps.number}`)).toBeTruthy();
  });
});