import { useTranslation } from "react-i18next";
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
import {
  changeLanguage,
  getCurrentLanguage,
  supportedLanguages,
  type LanguageCode,
} from "@/locales";
import { useAppStore, useCounterStore } from "@/store";
import { toast } from "@/utils";

export default function HomeScreen() {
  const { t } = useTranslation();
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
        <ThemedText type="title">{t("home.title")}</ThemedText>
        <ThemedText style={styles.subtitle}>{t("home.subtitle")}</ThemedText>
      </ThemedView>

      {/* Zustand Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">{t("home.zustand.title")}</ThemedText>
        <ThemedText style={styles.description}>
          {t("home.zustand.description")}
        </ThemedText>

        {/* Counter Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.counter")}
          </ThemedText>
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
              {t("common.reset")}
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Theme Mode Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.theme")}
          </ThemedText>
          <ThemedText style={styles.description}>
            {t("home.zustand.themeCurrent")}:{" "}
            {themeMode === "system"
              ? t("home.zustand.themeSystem")
              : themeMode === "dark"
                ? t("home.zustand.themeDark")
                : t("home.zustand.themeLight")}
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
                    ? t("home.zustand.themeSystem")
                    : mode === "light"
                      ? t("home.zustand.themeLight")
                      : t("home.zustand.themeDark")}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        {/* Loading State Demo */}
        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.loading")}
          </ThemedText>
          <ThemedText style={styles.description}>
            {t("home.zustand.loadingStatus")}:{" "}
            {isLoading
              ? t("home.zustand.loadingBusy")
              : t("home.zustand.loadingIdle")}
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
            <ThemedText style={styles.buttonText}>
              {t("home.zustand.simulateLoading")}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      {/* React Query Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">{t("home.reactQuery.title")}</ThemedText>
        <ThemedText style={styles.description}>
          {t("home.reactQuery.description")}
        </ThemedText>

        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <View style={styles.cardHeader}>
            <ThemedText type="defaultSemiBold">
              {t("home.reactQuery.postList")}
            </ThemedText>
            <Pressable
              style={[styles.refreshButton, { borderColor: colors.tint }]}
              onPress={() => refetch()}
            >
              <ThemedText
                style={[styles.refreshButtonText, { color: colors.tint }]}
              >
                {t("common.refresh")}
              </ThemedText>
            </Pressable>
          </View>

          {postsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.tint} />
              <ThemedText style={styles.loadingText}>
                {t("common.loading")}
              </ThemedText>
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
            {t("home.reactQuery.features")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* i18n Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">{t("home.i18n.title")}</ThemedText>
        <ThemedText style={styles.description}>
          {t("home.i18n.description")}
        </ThemedText>

        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <ThemedText type="defaultSemiBold">
            {t("home.i18n.switchLang")}
          </ThemedText>
          <ThemedText style={styles.description}>
            {t("home.i18n.currentLang")}:{" "}
            {supportedLanguages[getCurrentLanguage()].nativeName}
          </ThemedText>

          <View style={styles.buttonRow}>
            {(Object.keys(supportedLanguages) as LanguageCode[]).map((lang) => (
              <Pressable
                key={lang}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor:
                      getCurrentLanguage() === lang
                        ? colors.tint
                        : "transparent",
                    borderColor: colors.tint,
                  },
                ]}
                onPress={() => changeLanguage(lang)}
              >
                <ThemedText
                  style={[
                    styles.themeButtonText,
                    {
                      color:
                        getCurrentLanguage() === lang ? "#fff" : colors.tint,
                    },
                  ]}
                >
                  {supportedLanguages[lang].nativeName}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <ThemedText style={[styles.greeting, { color: colors.tint }]}>
            {t("home.i18n.greeting")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Toast Demo */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">{t("home.toast.title")}</ThemedText>
        <ThemedText style={styles.description}>
          {t("home.toast.description")}
        </ThemedText>

        <ThemedView style={[styles.card, { borderColor: colors.icon }]}>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: "#22c55e" }]}
              onPress={() => toast.success(t("home.toast.successMsg"))}
            >
              <ThemedText style={styles.buttonText}>
                {t("home.toast.success")}
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#ef4444" }]}
              onPress={() => toast.error(t("home.toast.errorMsg"))}
            >
              <ThemedText style={styles.buttonText}>
                {t("home.toast.error")}
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: "#f59e0b" }]}
              onPress={() => toast.warning(t("home.toast.warningMsg"))}
            >
              <ThemedText style={styles.buttonText}>
                {t("home.toast.warning")}
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#3b82f6" }]}
              onPress={() => toast.info(t("home.toast.infoMsg"))}
            >
              <ThemedText style={styles.buttonText}>
                {t("home.toast.info")}
              </ThemedText>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.button,
              { backgroundColor: colors.tint, alignSelf: "flex-start" },
            ]}
            onPress={() => {
              const promise = new Promise((resolve) =>
                setTimeout(resolve, 2000),
              );
              toast.promise(promise, {
                loading: t("home.toast.loadingMsg"),
                success: t("home.toast.promiseSuccess"),
                error: t("home.toast.promiseError"),
              });
            }}
          >
            <ThemedText style={styles.buttonText}>
              {t("home.toast.promise")}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      {/* Roadmap */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">{t("home.roadmap.title")}</ThemedText>
        <ThemedView style={styles.roadmapItem}>
          <ThemedText>• {t("home.roadmap.form")}</ThemedText>
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
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
});
