import { useNotificationStore } from '@/stores/useNotificationStore';
import * as Notifications from 'expo-notifications';
import { Bell, BellRing, CircleCheck as CheckCircle, Send, Trash2, Circle as XCircle } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
    FlatList,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function NotificationsScreen() {
  const {
    expoPushToken,
    permissionGranted,
    registerForPushNotifications,
    sendTestNotification,
    clearNotifications,
    notifications
  } = useNotificationStore();

  console.log("storeNotifications",notifications);
  

//   const [notifications, setNotifications] = useState<Notifications.Notification[]>(storeNotifications);
  const sendButtonScale = useSharedValue(1);
  const clearButtonScale = useSharedValue(1);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const sendButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendButtonScale.value }],
  }));

  const clearButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: clearButtonScale.value }],
  }));

  const handleSendTest = async () => {
    sendButtonScale.value = withSpring(0.95, {}, () => {
      sendButtonScale.value = withSpring(1);
    });
    await sendTestNotification();
  };

  const handleClearAll = () => {
    clearButtonScale.value = withSpring(0.95, {}, () => {
      clearButtonScale.value = withSpring(1);
    });
    // setNotifications([]);
    clearNotifications();
  };

  const renderNotification = ({ item, index }: { item: Notifications.Notification; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      layout={Layout.springify()}
      style={styles.notificationItem}
    >
      <View style={styles.notificationIcon}>
        <BellRing size={20} color="#3b82f6" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>
          {item.request.content.title}
        </Text>
        <Text style={styles.notificationBody}>
          {item.request.content.body}
        </Text>
        <Text style={styles.notificationTime}>
          {new Date(item.date).toLocaleTimeString()}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={Platform.OS === 'ios' ? ['top'] : ['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {/* <View style={styles.headerActions}>
          <Pressable style={styles.headerButton}>
            <Settings size={24} color="#6b7280" />
          </Pressable>
        </View> */}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.delay(100)}
          style={styles.statusCard}
        >
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Notification Status</Text>
            <View style={styles.statusIndicator}>
              {permissionGranted ? (
                <CheckCircle size={20} color="#10b981" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )}
            </View>
          </View>
          <Text style={styles.statusText}>
            {permissionGranted
              ? 'Push notifications are enabled'
              : 'Push notifications are disabled'}
          </Text>
          
          {expoPushToken && (
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenLabel}>Expo Push Token:</Text>
              <Text style={styles.tokenText} numberOfLines={2}>
                {expoPushToken}
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.actionsCard}
        >
          <Text style={styles.cardTitle}>Test Notifications</Text>
          <Text style={styles.cardSubtitle}>
            Send yourself a test notification to see how they work
          </Text>

          <View style={styles.buttonRow}>
            <AnimatedPressable
              style={[styles.actionButton, styles.primaryButton, sendButtonStyle]}
              onPress={handleSendTest}
              disabled={!permissionGranted}
            >
              <Send size={20} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Send Test</Text>
            </AnimatedPressable>

            <AnimatedPressable
              style={[styles.actionButton, styles.secondaryButton, clearButtonStyle]}
              onPress={handleClearAll}
            >
              <Trash2 size={20} color="#6b7280" style={styles.buttonIcon} />
              <Text style={styles.secondaryButtonText}>Clear All</Text>
            </AnimatedPressable>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.historyCard}
        >
          <View style={styles.historyHeader}>
            <Text style={styles.cardTitle}>Recent Notifications</Text>
            <Text style={styles.notificationCount}>
              {notifications.length} notifications
            </Text>
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Bell size={32} color="#d1d5db" />
              <Text style={styles.emptyStateText}>
                No notifications yet
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Send a test notification to see it appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item, index) => `${item.request.identifier}-${index}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFFF',

  },
  header: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    width: '92%',
    alignSelf:'center',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 10
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  listContent:{
    // ...Platform.select({
    //   ios: {
    //     paddingBottom:80, 
    //   },
    //   android: {
    //     paddingBottom: 20, 
    //   },
    // }),
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 16,
  },
  tokenContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  tokenLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  actionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 30
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
});