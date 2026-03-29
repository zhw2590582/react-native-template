import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

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
    <View style={containerStyle} className="mb-4">
      {label && (
        <ThemedText className="text-sm font-semibold mb-1.5">
          {label}
        </ThemedText>
      )}
      <TextInput
        className="h-12 rounded border px-3.5 text-base"
        style={[
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
      {error && (
        <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>
      )}
    </View>
  );
}
