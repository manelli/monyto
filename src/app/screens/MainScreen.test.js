import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MainScreen } from './MainScreen'; // Adjust the import path as needed

jest.mock('@react-navigation/native', () => ({
  useEffect: jest.fn(),
  useFocusEffect: jest.fn(),
}));

jest.mock('../utils', () => ({
  multiGetData: jest.fn(() => Promise.resolve({ expenses: [], categories: [] })),
  groupByDate: jest.fn(),
  transformCategories: jest.fn(),
}));

jest.mock('../components/ExpenseRow', () => ({
  ExpenseRow: jest.fn(() => null),
}));

describe('MainScreen', () => {
  test('renders correctly', () => {
    const { toJSON } = render(<MainScreen navigation={{}} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
