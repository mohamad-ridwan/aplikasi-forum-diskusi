/**
 * Test scenario for detailThreadReducer:
 *
 * - detailThreadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by RECEIVE_DETAIL_THREAD action
 *  - should return null when given by CLEAR_DETAIL_THREAD action
 *  - should return detailThread with added comment when given by ADD_COMMENT action
 *  - should toggle vote on a comment when given by TOGGLE_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';
import { ActionType } from './action';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = detailThreadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // Arrange
    const initialState = null;
    const fakeDetailThread = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: fakeDetailThread,
      },
    };

    // Act
    const nextState = detailThreadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(fakeDetailThread);
  });

  it('should return null when given by CLEAR_DETAIL_THREAD action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_DETAIL_THREAD,
    };

    // Act
    const nextState = detailThreadReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should return detailThread with added comment when given by ADD_COMMENT action', () => {
    // Arrange
    const commentA = {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: { id: 'users-1', name: 'User 1' },
      upVotesBy: [],
      downVotesBy: [],
    };
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [commentA],
    };
    const commentB = {
      id: 'comment-2',
      content: 'Komentar kedua',
      createdAt: '2023-05-29T08:55:52.266Z',
      owner: { id: 'users-2', name: 'User 2' },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: commentB,
      },
    };

    // Act
    const nextState = detailThreadReducer(initialState, action);

    // Assert
    expect(nextState.comments).toEqual([commentB, commentA]);
  });

  it('should toggle vote on a comment when given by TOGGLE_VOTE_COMMENT action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Title',
      body: 'Thread Body',
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar pertama',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-123',
        voteType: 1,
      },
    };

    // Act
    const nextState = detailThreadReducer(initialState, action);

    // Assert
    expect(nextState.comments[0].upVotesBy).toEqual(['user-123']);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });
});
