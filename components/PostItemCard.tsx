import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text
} from 'react-native';
import Animated, {
  FadeInDown,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PostItemProps {
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
  index: number;
}

export default function PostItemCard({ post, index }: PostItemProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
      style={[styles.postItem, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.postTitle} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.postBody} numberOfLines={3}>
        {post.body}
      </Text>
      <Text style={styles.postId}>Post #{post.id}</Text>
    </AnimatedPressable>
  );
}
const styles = StyleSheet.create({
  
  postItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 0,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  postTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  postBody: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 12,
  },
  postId: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3b82f6',
  },
});