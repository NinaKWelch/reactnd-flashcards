import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

// storage key
const NOTIFICATION_KEY = 'localnotifications'

// notification content
const appNotification = {
  title: 'Check Flashcards',
  body: 'Don\'t forget to stydy today!',
  ios: {
    sound: true,
    _displayInForeground: true
  },
  android: {
    sound: true,
    sticky: false,
  },
}

// check if notifications are permitted by the user
async function askPermissions() {
  try {
    // check permission status
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // if permission has not been given, ask for it
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // if permission was denied, abort
    if (finalStatus !== 'granted') {
        return false;
    }

    // if permission was granted, proceed
    return true;
  } catch(err) {
    console.log('ERROR: ', err)
  }
}

// clear scheduled notification 
export async function clearLocalNotification() {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    Notifications.cancelAllScheduledNotificationsAsync()
  } catch(err) {
    console.log('ERROR: ', err)
  }
}

// reschedule the daily notification
// to appear 6pm the next day
export async function setLocalNotification() {
  // check that previous notification has been deleted
  const notification = await AsyncStorage.getItem(NOTIFICATION_KEY);

  if (notification === null) {
    // check permissions
    const status = await askPermissions();
    
    if (Constants.isDevice && status) {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(18);
      tomorrow.setMinutes(0);

      // schedule next notification date
      Notifications.scheduleLocalNotificationAsync(
        appNotification,
        {
          time: tomorrow,
          repeat: 'day',
        }
      )
    }
  }
}
