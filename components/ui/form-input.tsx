import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function FormInput({
  label,
  error,
  containerStyle,
  style,
  ...props
}: FormInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#f5f5f5",
            color: colors.text,
            borderColor: error ? "#ef4444" : colors.icon,
          },
          style,
        ]}
        placeholderTextColor={colors.icon}
        {...props}
      />
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
});
