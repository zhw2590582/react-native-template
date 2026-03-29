import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

import { usePosts } from "@/api";
import { FormInput, ThemedText, ThemedView } from "@/components/ui";
import {
  changeLanguage,
  getCurrentLanguage,
  supportedLanguages,
  type LanguageCode,
} from "@/locales";
import { useAppStore, useCounterStore } from "@/store";
import { mmkvStorage, toast } from "@/utils";

// 表单验证 Schema
const formSchema = z.object({
  username: z.string().min(1, "usernameRequired").min(2, "usernameMin"),
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
});

type FormData = z.infer<typeof formSchema>;

export default function HomeScreen() {
  const { t } = useTranslation();

  // Zustand store
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();
  const { themeMode, setThemeMode, isLoading, setLoading } = useAppStore();

  // React Query
  const { data: posts, isLoading: postsLoading, error, refetch } = usePosts(3);

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    toast.success(t("home.form.submitSuccess"));
    resetForm();
  };

  // Storage Demo
  const STORAGE_KEY = "demo_value";
  const [storageInput, setStorageInput] = useState("");
  const [storedValue, setStoredValue] = useState<string | undefined>(
    mmkvStorage.getString(STORAGE_KEY),
  );

  const handleSave = () => {
    if (storageInput.trim()) {
      mmkvStorage.setString(STORAGE_KEY, storageInput);
      setStoredValue(storageInput);
      toast.success(t("home.storage.saveSuccess"));
    }
  };

  const handleLoad = () => {
    const value = mmkvStorage.getString(STORAGE_KEY);
    setStoredValue(value);
    if (value) {
      setStorageInput(value);
      toast.success(t("home.storage.loadSuccess"));
    }
  };

  const handleClear = () => {
    mmkvStorage.delete(STORAGE_KEY);
    setStoredValue(undefined);
    setStorageInput("");
    toast.info(t("home.storage.clearSuccess"));
  };

  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <ThemedView className="mb-8 px-5 pt-16">
        <ThemedText type="title">{t("home.title")}</ThemedText>
        <ThemedText className="opacity-60 mt-1">
          {t("home.subtitle")}
        </ThemedText>
      </ThemedView>

      {/* Zustand Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.zustand.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.zustand.description")}
        </ThemedText>

        {/* Counter Demo */}
        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.counter")}
          </ThemedText>
          <ThemedText className="text-5xl font-bold text-center my-4">
            {count}
          </ThemedText>

          <View className="flex-row gap-3 mb-3">
            <Pressable
              className="py-2.5 px-5 rounded-lg flex-1 bg-blue-600"
              onPress={decrement}
            >
              <ThemedText className="text-white font-semibold">-1</ThemedText>
            </Pressable>
            <Pressable
              className="py-2.5 px-5 rounded-lg flex-1 bg-blue-600"
              onPress={increment}
            >
              <ThemedText className="text-white font-semibold">+1</ThemedText>
            </Pressable>
            <Pressable
              className="py-2.5 px-5 rounded-lg flex-1 bg-blue-600"
              onPress={() => incrementBy(10)}
            >
              <ThemedText className="text-white font-semibold">+10</ThemedText>
            </Pressable>
          </View>

          <Pressable
            className="py-2.5 px-5 rounded border border-blue-500"
            onPress={reset}
          >
            <ThemedText className="font-semibold text-blue-500">
              {t("common.reset")}
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Theme Mode Demo */}
        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.theme")}
          </ThemedText>
          <ThemedText className="opacity-70 mt-1 mb-4">
            {t("home.zustand.themeCurrent")}:{" "}
            {themeMode === "system"
              ? t("home.zustand.themeSystem")
              : themeMode === "dark"
                ? t("home.zustand.themeDark")
                : t("home.zustand.themeLight")}
          </ThemedText>

          <View className="flex-row gap-3">
            {(["system", "light", "dark"] as const).map((mode) => (
              <Pressable
                key={mode}
                className="py-2 px-4 rounded border"
                style={{
                  borderColor: "rgb(13, 110, 253)",
                  backgroundColor:
                    themeMode === mode ? "rgb(13, 110, 253)" : "transparent",
                }}
                onPress={() => setThemeMode(mode)}
              >
                <ThemedText
                  className="font-semibold text-sm"
                  style={{
                    color: themeMode === mode ? "#fff" : "rgb(13, 110, 253)",
                  }}
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
        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <ThemedText type="defaultSemiBold">
            {t("home.zustand.loading")}
          </ThemedText>
          <ThemedText className="opacity-70 my-4">
            {t("home.zustand.loadingStatus")}:{" "}
            {isLoading
              ? t("home.zustand.loadingBusy")
              : t("home.zustand.loadingIdle")}
          </ThemedText>

          <Pressable
            className="py-2.5 px-5 rounded w-fit bg-blue-600"
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            <ThemedText className="text-white font-semibold">
              {t("home.zustand.simulateLoading")}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      {/* React Query Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.reactQuery.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.reactQuery.description")}
        </ThemedText>

        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <View className="flex-row justify-between items-center mb-3">
            <ThemedText type="defaultSemiBold">
              {t("home.reactQuery.postList")}
            </ThemedText>
            <Pressable
              className="py-1.5 px-3 rounded border border-blue-500"
              onPress={() => refetch()}
            >
              <ThemedText className="text-xs font-semibold text-blue-500">
                {t("common.refresh")}
              </ThemedText>
            </Pressable>
          </View>

          {postsLoading ? (
            <View className="flex-row items-center gap-2 py-5">
              <ActivityIndicator size="small" color="rgb(13, 110, 253)" />
              <ThemedText className="opacity-70">
                {t("common.loading")}
              </ThemedText>
            </View>
          ) : error ? (
            <ThemedText className="text-red-500 py-3">
              加载失败: {error.message}
            </ThemedText>
          ) : (
            <View className="gap-2 mb-3">
              {posts?.map((post) => (
                <View
                  key={post.id}
                  className="p-3 rounded border border-neutral-300 dark:border-neutral-600"
                >
                  <ThemedText type="defaultSemiBold" numberOfLines={1}>
                    {post.id}. {post.title}
                  </ThemedText>
                  <ThemedText
                    className="opacity-70 text-sm mt-1"
                    numberOfLines={2}
                  >
                    {post.body}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}

          <ThemedText className="text-xs opacity-60 text-center">
            {t("home.reactQuery.features")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* i18n Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.i18n.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.i18n.description")}
        </ThemedText>

        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <ThemedText type="defaultSemiBold">
            {t("home.i18n.switchLang")}
          </ThemedText>
          <ThemedText className="opacity-70 my-4">
            {t("home.i18n.currentLang")}:{" "}
            {supportedLanguages[getCurrentLanguage()].nativeName}
          </ThemedText>

          <View className="flex-row gap-3">
            {(Object.keys(supportedLanguages) as LanguageCode[]).map((lang) => (
              <Pressable
                key={lang}
                className="py-2 px-4 rounded border"
                style={{
                  borderColor: "rgb(13, 110, 253)",
                  backgroundColor:
                    getCurrentLanguage() === lang
                      ? "rgb(13, 110, 253)"
                      : "transparent",
                }}
                onPress={() => changeLanguage(lang)}
              >
                <ThemedText
                  className="font-semibold text-sm"
                  style={{
                    color:
                      getCurrentLanguage() === lang
                        ? "#fff"
                        : "rgb(13, 110, 253)",
                  }}
                >
                  {supportedLanguages[lang].nativeName}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <ThemedText className="text-base font-semibold mt-3 text-center text-blue-500">
            {t("home.i18n.greeting")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Toast Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.toast.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.toast.description")}
        </ThemedText>

        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <View className="flex-row gap-3 mb-3">
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-green-500"
              onPress={() => toast.success(t("home.toast.successMsg"))}
            >
              <ThemedText className="text-white font-semibold text-center">
                {t("home.toast.success")}
              </ThemedText>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-red-500"
              onPress={() => toast.error(t("home.toast.errorMsg"))}
            >
              <ThemedText className="text-white font-semibold text-center">
                {t("home.toast.error")}
              </ThemedText>
            </Pressable>
          </View>

          <View className="flex-row gap-3 mb-3">
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-amber-500"
              onPress={() => toast.warning(t("home.toast.warningMsg"))}
            >
              <ThemedText className="text-white font-semibold text-center">
                {t("home.toast.warning")}
              </ThemedText>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-blue-500"
              onPress={() => toast.info(t("home.toast.infoMsg"))}
            >
              <ThemedText className="text-white font-semibold text-center">
                {t("home.toast.info")}
              </ThemedText>
            </Pressable>
          </View>

          <Pressable
            className="py-2.5 px-5 rounded bg-blue-600"
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
            <ThemedText className="text-white font-semibold">
              {t("home.toast.promise")}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>

      {/* Form Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.form.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.form.description")}
        </ThemedText>

        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label={t("home.form.username")}
                placeholder={t("home.form.usernamePlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={
                  errors.username
                    ? t(`home.form.${errors.username.message}`)
                    : undefined
                }
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label={t("home.form.email")}
                placeholder={t("home.form.emailPlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={
                  errors.email
                    ? t(`home.form.${errors.email.message}`)
                    : undefined
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Pressable
            className="py-2.5 px-5 rounded bg-blue-600"
            onPress={handleSubmit(onSubmit)}
          >
            <ThemedText className="text-white font-semibold text-center">
              {t("home.form.submit")}
            </ThemedText>
          </Pressable>

          <ThemedText className="text-xs opacity-60 text-center mt-2">
            {t("home.form.features")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Storage Demo */}
      <ThemedView className="mb-8 px-5">
        <ThemedText type="subtitle">{t("home.storage.title")}</ThemedText>
        <ThemedText className="opacity-70 mt-1 mb-4">
          {t("home.storage.description")}
        </ThemedText>

        <ThemedView className="p-4 rounded-lg mb-3 border border-neutral-300 dark:border-neutral-600">
          <ThemedText type="defaultSemiBold">
            {t("home.storage.currentValue")}:{" "}
            <ThemedText className="text-blue-500">
              {storedValue ?? t("home.storage.empty")}
            </ThemedText>
          </ThemedText>

          <TextInput
            className="border border-neutral-300 dark:border-neutral-600 rounded-lg py-3 px-4 text-base my-3 text-black dark:text-white\"
            value={storageInput}
            onChangeText={setStorageInput}
            placeholder={t("home.storage.placeholder")}
            placeholderTextColor="#ccc"
          />

          <View className="flex-row gap-3 mb-3">
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-green-500"
              onPress={handleSave}
            >
              <ThemedText className="text-white font-semibold text-center text-sm">
                {t("home.storage.save")}
              </ThemedText>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-blue-600"
              onPress={handleLoad}
            >
              <ThemedText className="text-white font-semibold text-center text-sm">
                {t("home.storage.load")}
              </ThemedText>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 px-5 rounded bg-red-500"
              onPress={handleClear}
            >
              <ThemedText className="text-white font-semibold text-center text-sm">
                {t("home.storage.clear")}
              </ThemedText>
            </Pressable>
          </View>

          <ThemedText className="text-xs opacity-60 text-center">
            {t("home.storage.features")}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Roadmap */}
      <ThemedView className="mb-8 px-5 pb-10">
        <ThemedText type="subtitle">{t("home.roadmap.title")}</ThemedText>
        <ThemedView className="py-2">
          <ThemedText>• {t("home.roadmap.auth")}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
