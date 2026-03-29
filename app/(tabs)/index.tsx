import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { usePosts } from "@/api";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppStore, useCounterStore } from "@/store";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Zustand store
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();
  const { themeMode, setThemeMode, isLoading, setLoading } = useAppStore();

  // React Query
  const { data: posts, isLoading: postsLoading, error, refetch } = usePosts(3);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">RN Template</ThemedText>
        <ThemedText style={styles.subtitle}>
          企业级 React Native 模板
        </ThemedText>
      </ThemedView>

      {/* Zustand Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">📦 Zustand 状态管理</ThemedText>
        <ThemedText style={styles.description}>
          轻量级、简洁的状态管理方案
        </ThemedText>

        {/* Counter Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">计数器示例</ThemedText>
          <ThemedText style={styles.countText}>{count}</ThemedText>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={decrement}
            >
              <ThemedText style={styles.buttonText}>-1</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={increment}
            >
              <ThemedText style={styles.buttonText}>+1</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={() => incrementBy(10)}
            >
              <ThemedText style={styles.buttonText}>+10</ThemedText>
            </Pressable>
          </View>

          <Pressable
            style={[styles.resetButton, { borderColor: colors.tint }]}
            onPress={reset}
          >
            <ThemedText
              style={[styles.resetButtonText, { color: colors.tint }]}
            >
              重置
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Theme Mode Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">主题模式</ThemedText>
          <ThemedText style={styles.description}>
            当前:{" "}
            {themeMode === "system"
              ? "跟随系统"
              : themeMode === "dark"
                ? "深色"
                : "浅色"}
          </ThemedText>

          <View style={styles.buttonRow}>
            {(["system", "light", "dark"] as const).map((mode) => (
              <Pressable
                key={mode}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor:
                      themeMode === mode ? colors.tint : "transparent",
                    borderColor: colors.tint,
                  },
                ]}
                onPress={() => setThemeMode(mode)}
              >
                <ThemedText
                  style={[
                    styles.themeButtonText,
                    { color: themeMode === mode ? "#fff" : colors.tint },
                  ]}
                >
                  {mode === "system"
                    ? "系统"
                    : mode === "light"
                      ? "浅色"
                      : "深色"}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        {/* Loading State Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">全局 Loading 状态</ThemedText>
          <ThemedText style={styles.description}>
            状态: {isLoading ? "加载中..." : "空闲"}
          </ThemedText>

          <Pressable
            style={[
              styles.button,
              { backgroundColor: colors.tint, alignSelf: "flex-start" },
            ]}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            <ThemedText style={styles.buttonText}>模拟加载 (2s)</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      {/* React Query Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🔄 React Query + Axios</ThemedText>
        <ThemedText style={styles.description}>
          强大的数据获取和缓存方案
        </ThemedText>

        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <View style={styles.cardHeader}>
            <ThemedText type="defaultSemiBold">
              文章列表 (JSONPlaceholder)
            </ThemedText>
            <Pressable
              style={[styles.refreshButton, { borderColor: colors.tint }]}
              onPress={() => refetch()}
            >
              <ThemedText
                style={[styles.refreshButtonText, { color: colors.tint }]}
              >
                刷新
              </ThemedText>
            </Pressable>
          </View>

          {postsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.tint} />
              <ThemedText style={styles.loadingText}>加载中...</ThemedText>
            </View>
          ) : error ? (
            <ThemedText style={styles.errorText}>
              加载失败: {error.message}
            </ThemedText>
          ) : (
            <View style={styles.postList}>
              {posts?.map((post) => (
                <View
                  key={post.id}
                  style={[styles.postItem, { borderColor: colors.icon }]}
                >
                  <ThemedText type="defaultSemiBold" numberOfLines={1}>
                    {post.id}. {post.title}
                  </ThemedText>
                  <ThemedText style={styles.postBody} numberOfLines={2}>
                    {post.body}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          <ThemedText style={styles.featureList}>
            ✓ 自动缓存 · ✓ 自动重试 · ✓ Loading 状态 · ✓ 错误处理
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Roadmap */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">🚀 即将添加</ThemedText>
        <ThemedView style={styles.roadmapItem}>
          <ThemedText>• i18n - 国际化</ThemedText>
        </ThemedView>
        <ThemedView style={styles.roadmapItem}>
          <ThemedText>• Toast - 消息提示</ThemedText>
        </ThemedView>
        <ThemedView style={styles.roadmapItem}>
          <ThemedText>• Form - 表单验证</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  description: {
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  countText: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  resetButtonText: {
    fontWeight: "600",
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeButtonText: {
    fontWeight: "600",
    fontSize: 13,
  },
  roadmapItem: {
    paddingVertical: 8,
  },
  // React Query Demo styles
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  refreshButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  refreshButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  loadingText: {
    opacity: 0.7,
  },
  errorText: {
    color: "#ef4444",
    paddingVertical: 12,
  },
  postList: {
    gap: 8,
    marginBottom: 12,
  },
  postItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  postBody: {
    opacity: 0.7,
    fontSize: 13,
    marginTop: 4,
  },
  featureList: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});
