import { navigate } from '@/navigation/navigationRef';
import Constants from 'expo-constants';
import {
    ChevronRight,
    Info,
    MessageCircle,
    Share,
    Shield
} from 'lucide-react-native';
import React from 'react';
import {
    Linking,
    Platform,
    Pressable,
    ScrollView,
    Share as ShareRN,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  index: number;
}

function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showChevron = true, 
  index 
}: SettingsItemProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(index * 100).springify()}
      style={[styles.settingsItem, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.settingsIcon}>{icon}</View>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingsSubtitle}>{subtitle}</Text>
        )}
      </View>
      {showChevron && (
        <ChevronRight size={20} color="#9ca3af" />
      )}
    </AnimatedPressable>
  );
}

export default function SettingsScreen() {
  const handlePrivacyPolicy = () => {
    console.log('navigate to privacy policy screen')
    navigate('PrivacyPolicyScreen')
  };

  const handleAbout = () => {
    if (Platform.OS === 'web') {
      alert(`App Version: ${Constants.expoConfig?.version || '1.0.0'}\nExpo SDK: ${Constants.expoConfig?.sdkVersion || 'N/A'}`);
    }
  };

  const handleFeedback = () => {
      Linking.openURL('mailto:mahmudrifat200@gmail.com?subject=App Feedback');
  };

  const handleShare = async () => {
    try {
      const result = await ShareRN.share({
        message:
          "Check out this awesome app! 🚀 Download it here: https://play.google.com/store/apps/details?id=com.yourapp",
        url: "https://play.google.com/store/apps/details?id=com.yourapp", // iOS support
        title: "My App",
      });

      if (result.action === ShareRN.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("App shared successfully");
        }
      } else if (result.action === ShareRN.dismissedAction) {
        console.log("User dismissed share dialog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const settingsData = [
    {
      icon: <Shield size={24} color="#3b82f6" />,
      title: 'Privacy Policy',
      subtitle: 'View our privacy policy and data handling',
      onPress: handlePrivacyPolicy,
    },
    {
      icon: <Info size={24} color="#10b981" />,
      title: 'About',
      subtitle: 'App version and information',
      onPress: handleAbout,
    },
    {
      icon: <MessageCircle size={24} color="#8b5cf6" />,
      title: 'Send Feedback',
      subtitle: 'Share your thoughts and suggestions',
      onPress: handleFeedback,
    },
    {
      icon: <Share size={24} color="#06b6d4" />,
      title: 'Share App',
      subtitle: 'Tell your friends about this app',
      onPress: handleShare,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={Platform.OS === 'ios' ? ['top'] : ['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.settingsSection}>
          {settingsData.map((item, index) => (
            <SettingsItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              index={index}
            />
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.delay(500)}
          style={styles.versionInfo}
        >
          <Text style={styles.versionText}>
            Version {Constants.expoConfig?.version || '1.0.0'}
          </Text>
          <Text style={styles.buildText}>
            Built with Expo SDK {Constants.expoConfig?.sdkVersion || 'Latest'}
          </Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  appInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  appIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingsIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    marginRight: 16,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  settingsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginBottom: 4,
  },
  buildText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 2,
  },
});