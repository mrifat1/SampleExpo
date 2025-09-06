import { navigationRef } from '@/navigation/navigationRef';
import { ArrowLeft, Shield } from 'lucide-react-native';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeInUp.duration(400)}
        style={styles.header}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigationRef.goBack()}
        >
          <ArrowLeft size={24} color="#6b7280" />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.iconContainer}
        >
          <View style={styles.iconBackground}>
            <Shield size={32} color="#3b82f6" />
          </View>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            We are committed to protecting your personal information and your right to privacy.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.sectionText}>
            We collect information you provide directly to us, such as when you create or modify your account, 
            request customer support, or otherwise communicate with us.
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>• Profile information (name, email, phone)</Text>
            <Text style={styles.bulletText}>• Usage data and analytics</Text>
            <Text style={styles.bulletText}>• Device and technical information</Text>
            <Text style={styles.bulletText}>• Push notification tokens</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.sectionText}>
            We use the information we collect to provide, maintain, and improve our services.
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>• Provide and maintain the app</Text>
            <Text style={styles.bulletText}>• Send you notifications and updates</Text>
            <Text style={styles.bulletText}>• Improve our services and user experience</Text>
            <Text style={styles.bulletText}>• Respond to your requests and provide support</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(800).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.sectionText}>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(1000).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Third-Party Services</Text>
          <Text style={styles.sectionText}>
            Our app may use third-party services that have their own privacy policies:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletText}>• Expo Push Notification Service</Text>
            <Text style={styles.bulletText}>• JSONPlaceholder API (demo data)</Text>
            <Text style={styles.bulletText}>• Platform-specific analytics (iOS/Android)</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(1200).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions about this Privacy Policy, please contact us:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: privacy@yourapp.com</Text>
            <Text style={styles.contactText}>Website: www.yourapp.com</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(1400).duration(600)}
          style={styles.lastUpdated}
        >
          <Text style={styles.lastUpdatedText}>
            Last updated: January 2025
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  iconBackground: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    marginTop: 8,
  },
  bulletText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 4,
  },
  contactInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginBottom: 4,
  },
  lastUpdated: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  lastUpdatedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
});