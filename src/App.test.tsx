import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render correct', () => {
  render(<App />)
    let title = screen.findAllByText(/Projects/i)
  expect(title).toBeInTheDocument
});
