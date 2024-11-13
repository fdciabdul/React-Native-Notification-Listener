import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notificationHandler = async (notification) => {
    try {
      console.log('Notification received:', notification);
      const parsedNotification = JSON.parse(notification.notification);
  
      const existingData = await AsyncStorage.getItem('notifications');
      const notifications = existingData ? JSON.parse(existingData) : [];
  
      if (parsedNotification.title) {
        notifications.push({
          app: parsedNotification.app, 
          title: parsedNotification.title,
          text: parsedNotification.text || '',
          icon: parsedNotification.icon,
          time: format_time(Date.now()),
        });
  
        await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
        console.log('Notification saved:', parsedNotification);
      }
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };
  
  function format_time(s) {
    const dtFormat = new Intl.DateTimeFormat('id-ID', {
      timeStyle: 'medium',
      timeZone: 'Asia/Jakarta'
    });
  
    return dtFormat.format(new Date(s));
  }

  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => notificationHandler,
  );

AppRegistry.registerComponent(appName, () => App);
