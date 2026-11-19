/**
 * Test scenario for detailThread action:
 *
 * - asyncReceiveDetailThread thunk
 *  - should dispatch receiveDetailThread action when fetching thread detail success
 *  - should dispatch action and show notification when fetching thread detail failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveDetailThread,
  clearDetailThreadActionCreator,
  receiveDetailThreadActionCreator,
} from './action';
import { setNotificationActionCreator } from '../notification/action';

const fakeDetailThreadResponse = {
  id: 'thread-1',
  title: 'Thread 1',
  body: 'Body detail 1',
  createdAt: '2023-05-29T07:55:52.266Z',
  owner: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeErrorResponse = new Error('Diskusi tidak ditemukan');

describe('asyncReceiveDetailThread thunk', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;
    delete api._getDetailThread;
  });

  it('should dispatch receiveDetailThread action when fetching thread detail success', async () => {
    // Arrange
    api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);
    const dispatch = vi.fn();

    // Act
    await asyncReceiveDetailThread('thread-1')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveDetailThreadActionCreator(fakeDetailThreadResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and show notification when fetching thread detail failed', async () => {
    // Arrange
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn((action) => {
      if (typeof action === 'function') {
        action(dispatch);
      }
    });

    // Act
    await asyncReceiveDetailThread('thread-1')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      setNotificationActionCreator({
        message: fakeErrorResponse.message,
        type: 'error',
      })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
