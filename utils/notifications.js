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
    } catch {
        console.log('ERROR: ', err)
    }
}

/**
 * reschedule the daily notification
 * to appear 6pm the next day
 * when user takes the first quiz */
export async function setLocalNotification() {
    // check that previous notification has been deleted
    const notification = await AsyncStorage.getItem(NOTIFICATION_KEY);

    if (notification === null) {
        // check permissions
        const status = await askPermissions();
       
        if (Constants.isDevice && status) {
            // set date for next notificatiom
            const date = new Date().getDate() + 1;

            // set daily notification schedule
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
            
            // store the date, when new notification was set
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(date));
            console.log('NEW NOTIFICATION SET')
        }
    }
}

// check if and when notification was set
export async function getLocalNotification() {
    try {
        const notification = await AsyncStorage.getItem(NOTIFICATION_KEY);
        return notification !== null ? JSON.parse(notification) : null;
        
    } catch(err) {
        console.log('ERROR: ', err)
    }
}

// clear scheduled notification 
export async function clearLocalNotification() {
    try {
        await AsyncStorage.removeItem(NOTIFICATION_KEY);
        Notifications.cancelAllScheduledNotificationsAsync()
        console.log('OLD NOTIFICATION CLEARED')
    } catch(err) {
        console.log('ERROR: ', err)
    }
}
