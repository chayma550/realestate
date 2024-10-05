import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNotificationStore } from '../lib/notificationStore';

const NotificationComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const fetchNotifications = useNotificationStore((state) => state.fetch);

  useEffect(() => {
    if (currentUser) {
      fetchNotifications(currentUser.accessToken);
    }
  }, [currentUser, fetchNotifications]);

  // Render your component based on notifications
  return <div>Notifications: {useNotificationStore((state) => state.number)}</div>;
};

export default NotificationComponent;
