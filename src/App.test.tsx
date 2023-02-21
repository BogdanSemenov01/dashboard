import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render correct', () => {
  render(<App />)
    let title = screen.getByText(/Projects/i)
  expect(title).toBeInTheDocument()
});
