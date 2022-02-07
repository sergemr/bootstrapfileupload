import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UploadMessage from './UploadMessage';

describe('<UploadMessage />', () => {
  test('it should mount', () => {
    render(<UploadMessage />);
    
    const uploadMessage = screen.getByTestId('UploadMessage');

    expect(uploadMessage).toBeInTheDocument();
  });
});