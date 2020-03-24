
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('should render', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-container')).toBeDefined();
});