import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import App from './App';

describe('<App />', () => {
    it('renders correctly', () => {    
        render(<App />);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
      });

    it('has 2 children', async () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(2);
    });    
});
  