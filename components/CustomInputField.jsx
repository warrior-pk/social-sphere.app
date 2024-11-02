import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef } from "react";

const CustomInputField = ({
  label,
  icon,
  iconSize = 20,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`mb-3 font-psemibold text-lg text-light ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`relative flex flex-row items-center justify-start rounded-2xl border border-light bg-light focus:border-[#F0EAAC] ${containerStyle}`}
          >
            {icon && (
              <Ionicons
                name={icon}
                className={`ml-4 ${iconStyle}`}
                size={iconSize}
              />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 font-psemibold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomInputField;
