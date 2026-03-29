import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const typeClassName = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-3xl font-bold leading-8",
    subtitle: "text-xl font-bold",
    link: "text-base leading-7.5 text-cyan-700",
  }[type || "default"];

  return (
    <Text
      className={`${typeClassName} ${className || ""}`}
      style={[{ color }, style]}
      {...rest}
    />
  );
}
