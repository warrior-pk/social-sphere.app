import { Pressable, Text } from "react-native";

export default function CustomButton({
  buttonStyle = "",
  textStyle = "",
  onPress,
  title,
  ...props
}) {
  const buttonClass = "items-center justify-center px-2 py-3 " + buttonStyle;
  const textClass = `font-pregular text-lg text-dark` + textStyle;

  return (
    <Pressable className={buttonClass} onPress={onPress} {...props}>
      <Text className={textClass}>{title}</Text>
    </Pressable>
  );
}
