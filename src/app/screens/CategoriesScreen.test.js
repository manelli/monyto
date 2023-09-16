import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { CategoriesScreen } from './CategoriesScreen';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('CategoriesScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CategoriesScreen />);
    expect(getByText('Add category')).toBeDefined();
  });

  it('displays modal when "Add category" button is pressed', () => {
    const { getByText, queryByTestId } = render(<CategoriesScreen />);
    const addButton = getByText('Add category');
    fireEvent.press(addButton);
    expect(queryByTestId('modal')).toBeDefined();
  });

  it('displays error alert if category name and symbol are empty', () => {
    const { getByText } = render(<CategoriesScreen />);
    const addButton = getByText('Add category');
    fireEvent.press(addButton);

    const addCategoryButton = getByText('Add');
    fireEvent.press(addCategoryButton);

    expect(Alert.alert).toHaveBeenCalledWith('Category name and symbol must be set')
  });

  it('closes the modal when "Close" button is pressed', () => {
    const { getByText, queryByTestId } = render(<CategoriesScreen />);
    const addButton = getByText('Add category');
    fireEvent.press(addButton);

    const modal = queryByTestId('modal');
    expect(modal).toBeDefined();

    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    const closedModal = queryByTestId('modal');
    expect(closedModal).toBeNull();
  });

});
