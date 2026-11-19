/**
 * Test scenario for VoteButton component:
 *
 * - VoteButton component
 *  - should render upvote and downvote count properly
 *  - should call onUpVote callback when upvote button clicked
 *  - should highlight active upvote button when isUpVoted is true
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  it('should render upvote and downvote count properly', () => {
    // Arrange
    render(
      <VoteButton
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-4"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    // Assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should call onUpVote callback when upvote button clicked', async () => {
    // Arrange
    const handleUpVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={handleUpVote}
        onDownVote={() => {}}
      />
    );
    const upVoteButton = screen.getByRole('button', { name: /upvote/i });

    // Act
    await userEvent.click(upVoteButton);

    // Assert
    expect(handleUpVote).toHaveBeenCalledWith(1);
  });

  it('should highlight active upvote button when isUpVoted is true', () => {
    // Arrange
    render(
      <VoteButton
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );
    const upVoteButton = screen.getByRole('button', { name: /upvote/i });

    // Assert
    expect(upVoteButton).toHaveClass('text-emerald-600');
  });
});
