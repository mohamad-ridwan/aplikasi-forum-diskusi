/**
 * Test scenario for authUser action:
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action and store token correctly when login success
 *  - should dispatch notification action when login failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { setNotificationActionCreator } from '../notification/action';

const fakeAuthUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Invalid credentials');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action and store token correctly when login success', async () => {
    // Arrange
    api.login = () => Promise.resolve('fake-token');
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    const dispatch = vi.fn();

    // Act
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual({ error: false });
  });

  it('should dispatch notification action when login failed', async () => {
    // Arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    const dispatch = vi.fn((action) => {
      if (typeof action === 'function') {
        action(dispatch);
      }
    });

    // Act
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'wrong-password',
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
