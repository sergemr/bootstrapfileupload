import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileUpload from './FileUpload';

describe('<FileUpload />', () => {
  test('it should mount', () => {
    render(<FileUpload />);
    
    const fileUpload = screen.getByTestId('FileUpload');

    expect(fileUpload).toBeInTheDocument();
  });
});