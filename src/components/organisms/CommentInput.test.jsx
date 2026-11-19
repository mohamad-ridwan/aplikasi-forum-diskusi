/**
 * Test scenario for CommentInput component:
 *
 * - CommentInput component
 *  - should render textarea and submit button correctly
 *  - should handle text typing in comment textarea
 *  - should call onAddComment when submit button clicked with valid text
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

const fakeAuthUser = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://generated-image-url.jpg',
};

describe('CommentInput component', () => {
  it('should render textarea and submit button correctly', () => {
    // Arrange
    render(
      <MemoryRouter>
        <CommentInput authUser={fakeAuthUser} onAddComment={() => {}} />
      </MemoryRouter>
    );

    // Assert
    expect(
      screen.getByPlaceholderText('Tuliskan komentar atau tanggapan Anda...')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Kirim Komentar/i })
    ).toBeInTheDocument();
  });

  it('should handle text typing in comment textarea', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <CommentInput authUser={fakeAuthUser} onAddComment={() => {}} />
      </MemoryRouter>
    );
    const textarea = screen.getByPlaceholderText('Tuliskan komentar atau tanggapan Anda...');

    // Act
    await userEvent.type(textarea, 'Ini komentar pengujian otomatis.');

    // Assert
    expect(textarea).toHaveValue('Ini komentar pengujian otomatis.');
  });

  it('should call onAddComment when submit button clicked with valid text', async () => {
    // Arrange
    const handleAddComment = vi.fn();
    render(
      <MemoryRouter>
        <CommentInput authUser={fakeAuthUser} onAddComment={handleAddComment} />
      </MemoryRouter>
    );
    const textarea = screen.getByPlaceholderText('Tuliskan komentar atau tanggapan Anda...');
    const submitButton = screen.getByRole('button', { name: /Kirim Komentar/i });

    // Act
    await userEvent.type(textarea, 'Komentar baru yang valid');
    await userEvent.click(submitButton);

    // Assert
    expect(handleAddComment).toHaveBeenCalledWith('Komentar baru yang valid');
    expect(textarea).toHaveValue('');
  });
});
