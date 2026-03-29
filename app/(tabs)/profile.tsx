import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <ThemedView className="flex-1 justify-center items-center p-5">
      <ThemedText type="title">{t("tabs.profile")}</ThemedText>
      <ThemedText className="opacity-60 mt-2">Coming soon...</ThemedText>
    </ThemedView>
  );
}
