const ActionType = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
};

let notificationTimeoutId = null;

function setNotificationActionCreator({ message, type = 'error' }) {
  return {
    type: ActionType.SET_NOTIFICATION,
    payload: {
      notification: {
        message,
        type,
      },
    },
  };
}

function clearNotificationActionCreator() {
  return {
    type: ActionType.CLEAR_NOTIFICATION,
  };
}

function asyncShowNotification({ message, type = 'error', duration = 5000 }) {
  return (dispatch) => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
    }

    dispatch(setNotificationActionCreator({ message, type }));

    notificationTimeoutId = setTimeout(() => {
      dispatch(clearNotificationActionCreator());
      notificationTimeoutId = null;
    }, duration);
  };
}

export {
  ActionType,
  setNotificationActionCreator,
  clearNotificationActionCreator,
  asyncShowNotification,
};
