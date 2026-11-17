import { ActionType } from './action';

function notificationReducer(notification = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_NOTIFICATION:
    return action.payload.notification;
  case ActionType.CLEAR_NOTIFICATION:
    return null;
  default:
    return notification;
  }
}

export default notificationReducer;
