import { navigate } from '@/navigation/navigationRef';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { create } from 'zustand';


interface NotificationStore {
  expoPushToken: string | null;
  notifications: Notifications.Notification[];
  permissionGranted: boolean;
  registerForPushNotifications: () => Promise<void>;
  sendTestNotification: () => Promise<void>;
  clearNotifications: () => void;
  initNotificationListeners: () => void
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  expoPushToken: null,
  notifications: [],
  permissionGranted: false,

  registerForPushNotifications: async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        set({ permissionGranted: false });
        return;
      }
      
      set({ permissionGranted: true });

      const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      
      const token = await Notifications.getExpoPushTokenAsync({
        projectId
      });
      
      set({ expoPushToken: token.data });
      console.log("expoPushToken",token.data);
      
    // const result: PushNotificationResult | undefined = await registerForPushNotificationsAsync();
    // if (result) {
    //   set({ expoPushToken: result.expoPushToken, permissionGranted: result.permissionGranted === 'granted' });
    // }
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  },

  sendTestNotification: async () => {
    const { expoPushToken } = get();
    if (!expoPushToken) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification 📬",
        body: "This is a test notification from your Expo app!",
        data: { type: 'navigate_to_profile', testData: 'Goes here' },
      },
      trigger: { seconds: 2 },
    });
  },

  clearNotifications: () => {
    set({ notifications: [] });
    if (Platform.OS !== 'web') {
      Notifications.dismissAllNotificationsAsync();
    }
  },

  initNotificationListeners: () => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      console.log("Notification tapped:", data?.type);

      // Example navigation handler
      if (data?.type === 'navigate_to_notifications') {
        navigate('notification', { fromPush: true });
      } else if (data?.type === 'navigate_to_profile') {
        navigate('Profile', { data });
      }
    });

    Notifications.addNotificationReceivedListener((notification) => {
      // App is foreground, push to local store
      set((state) => ({
        notifications: [...state.notifications, notification],
      }));
    });
  },
}));