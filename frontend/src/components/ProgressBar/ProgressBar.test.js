import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgressBar from './ProgressBar';

describe('<ProgressBar />', () => {
  test('it should mount', () => {
    render(<ProgressBar />);
    
    const progressBar = screen.getByTestId('ProgressBar');

    expect(progressBar).toBeInTheDocument();
  });
});