import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { clearNotificationActionCreator } from '../states/notification/action';

const TOAST_CONFIG = {
  error: {
    containerClass: 'bg-white border-rose-200 text-slate-800 shadow-rose-100/50',
    iconClass: 'text-rose-500 bg-rose-50',
    icon: <FiAlertCircle className="text-xl shrink-0" />,
    badge: 'Gagal',
    badgeClass: 'bg-rose-100 text-rose-700',
  },
  warning: {
    containerClass: 'bg-white border-amber-200 text-slate-800 shadow-amber-100/50',
    iconClass: 'text-amber-500 bg-amber-50',
    icon: <FiAlertTriangle className="text-xl shrink-0" />,
    badge: 'Perhatian',
    badgeClass: 'bg-amber-100 text-amber-700',
  },
  success: {
    containerClass: 'bg-white border-emerald-200 text-slate-800 shadow-emerald-100/50',
    iconClass: 'text-emerald-500 bg-emerald-50',
    icon: <FiCheckCircle className="text-xl shrink-0" />,
    badge: 'Berhasil',
    badgeClass: 'bg-emerald-100 text-emerald-700',
  },
  info: {
    containerClass: 'bg-white border-indigo-200 text-slate-800 shadow-indigo-100/50',
    iconClass: 'text-indigo-500 bg-indigo-50',
    icon: <FiInfo className="text-xl shrink-0" />,
    badge: 'Info',
    badgeClass: 'bg-indigo-100 text-indigo-700',
  },
};

function useToast() {
  const dispatch = useDispatch();
  const notification = useSelector((states) => states.notification);

  const handleClose = () => {
    dispatch(clearNotificationActionCreator());
  };

  if (!notification) {
    return {
      notification: null,
      handleClose,
      currentConfig: null,
    };
  }

  const { type = 'error' } = notification;
  const currentConfig = TOAST_CONFIG[type] || TOAST_CONFIG.error;

  return {
    notification,
    handleClose,
    currentConfig,
  };
}

export default useToast;
