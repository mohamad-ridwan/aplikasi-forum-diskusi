/**
 * Test scenario for Input component:
 *
 * - Input component
 *  - should render input field with label and placeholder correctly
 *  - should handle typing event correctly
 *  - should display error message when error prop is provided
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input component', () => {
  it('should render input field with label and placeholder correctly', () => {
    // Arrange
    render(
      <Input
        id="email"
        label="Alamat Email"
        placeholder="nama@email.com"
        value=""
        onChange={() => {}}
      />
    );

    // Assert
    expect(screen.getByLabelText(/Alamat Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('nama@email.com')).toBeInTheDocument();
  });

  it('should handle typing event correctly', async () => {
    // Arrange
    const handleOnChange = vi.fn();
    render(
      <Input
        id="username"
        label="Username"
        placeholder="Masukkan username"
        value=""
        onChange={handleOnChange}
      />
    );
    const inputElement = screen.getByPlaceholderText('Masukkan username');

    // Act
    await userEvent.type(inputElement, 'dicoding');

    // Assert
    expect(handleOnChange).toHaveBeenCalled();
  });

  it('should display error message when error prop is provided', () => {
    // Arrange
    render(
      <Input
        id="email"
        label="Alamat Email"
        placeholder="nama@email.com"
        value=""
        onChange={() => {}}
        error="Email tidak valid"
      />
    );

    // Assert
    const errorMessage = screen.getByText('Email tidak valid');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-rose-500');
  });
});
