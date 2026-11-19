/**
 * Test scenario for Button component:
 *
 * - Button component
 *  - should render button with children text correctly
 *  - should trigger onClick handler when clicked
 *  - should be disabled and not trigger onClick when disabled prop is true
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('should render button with children text correctly', () => {
    // Arrange
    render(<Button>Kirim Data</Button>);

    // Assert
    expect(screen.getByRole('button', { name: /Kirim Data/i })).toBeInTheDocument();
  });

  it('should trigger onClick handler when clicked', async () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Kirim Data</Button>);
    const button = screen.getByRole('button', { name: /Kirim Data/i });

    // Act
    await userEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled and not trigger onClick when disabled prop is true', async () => {
    // Arrange
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Kirim Data
      </Button>
    );
    const button = screen.getByRole('button', { name: /Kirim Data/i });

    // Act
    await userEvent.click(button);

    // Assert
    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
