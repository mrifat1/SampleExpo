import PostItemCard from '@/components/PostItemCard';
import { usePostStore } from '@/stores/usePostStore';
import { Loader as Loader2, RefreshCw } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const { posts, loading, error, fetchPosts, refreshData } = usePostStore();
  const refreshIconRotation = useSharedValue(0);

  const refreshIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${refreshIconRotation.value}deg` }],
  }));

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = async () => {
    refreshIconRotation.value = withSpring(360, { duration: 1000 });
    await refreshData();
    refreshIconRotation.value = 0;
  };

  const renderPost = ({ item, index }: { item: any; index: number }) => (
    <PostItemCard post={item} index={index} />
  );

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchPosts}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={Platform.OS === 'ios' ? ['top'] : ['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latest Posts</Text>
        <Pressable onPress={handleRefresh} style={styles.refreshButton}>
          <Animated.View style={refreshIconStyle}>
            <RefreshCw size={24} color="#3b82f6" />
          </Animated.View>
        </Pressable>
      </View>

      {loading && posts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Animated.View
            entering={FadeInDown.springify()}
            style={styles.loadingContent}
          >
            <Loader2 size={32} color="#3b82f6" />
            <Text style={styles.loadingText}>Loading posts...</Text>
          </Animated.View>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor="#3b82f6"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    width: '91%',
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
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
  },
  listContent: {
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        paddingBottom:80, 
      },
      android: {
        paddingBottom: 20, 
      },
    }),
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});