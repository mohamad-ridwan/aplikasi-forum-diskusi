/**
 * Test scenario for threads action:
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when creating thread success
 *  - should dispatch notification when creating thread failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncAddThread, addThreadActionCreator } from './action';
import { setNotificationActionCreator } from '../notification/action';

const fakeCreatedThread = {
  id: 'thread-new',
  title: 'Judul Baru',
  body: 'Konten Diskusi Baru',
  category: 'React',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Gagal membuat thread');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when creating thread success', async () => {
    // Arrange
    api.createThread = () => Promise.resolve(fakeCreatedThread);
    const dispatch = vi.fn();

    // Act
    const result = await asyncAddThread({
      title: 'Judul Baru',
      body: 'Konten Diskusi Baru',
      category: 'React',
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeCreatedThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: false, thread: fakeCreatedThread });
  });

  it('should dispatch notification when creating thread failed', async () => {
    // Arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn((action) => {
      if (typeof action === 'function') {
        action(dispatch);
      }
    });

    // Act
    const result = await asyncAddThread({
      title: 'Judul Baru',
      body: 'Konten Diskusi Baru',
      category: 'React',
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setNotificationActionCreator({
        message: fakeErrorResponse.message,
        type: 'error',
      })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: true, message: fakeErrorResponse.message });
  });
});
