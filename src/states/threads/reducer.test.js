/**
 * Test scenario for threadsReducer:
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with updated upVotesBy when given by TOGGLE_VOTE_THREAD action (upvote)
 *  - should neutralize vote when user upvotes a thread they already upvoted (voteType: 0)
 *  - should rollback thread votes when given by SET_THREAD_VOTES action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Isi thread pertama',
            category: 'General',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Isi thread kedua',
      category: 'Redux',
      createdAt: '2023-05-29T08:55:52.266Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should return the threads with updated upVotesBy when given by TOGGLE_VOTE_THREAD action (upvote)', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1,
      },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ]);
  });

  it('should neutralize vote when user upvotes a thread they already upvoted (voteType: 0)', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 0,
      },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it('should rollback thread votes when given by SET_THREAD_VOTES action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread pertama',
        category: 'General',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'users-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const originalVotes = {
      threadId: 'thread-1',
      upVotesBy: [],
      downVotesBy: ['user-2'],
    };
    const action = {
      type: ActionType.SET_THREAD_VOTES,
      payload: originalVotes,
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: ['user-2'],
      },
    ]);
  });
});
