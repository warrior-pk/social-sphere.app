import { Text, View, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-root-toast";
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots and underscores",
    )
    .regex(/^\S+$/, "Username must not contain spaces"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol",
    ),
});

const SignIn = () => {
  const [isMale, setIsMale] = useState(null);
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isMale === true) {
      setValue("gender", "male");
    } else if (isMale === false) {
      setValue("gender", "female");
    }
  }, [isMale]);

  const onSubmit = async (data) => {
    try {
      console.log("Sign In", data);
    } catch (e) {}
  };

  if (errors) {
    Toast.show("Invalid credentials", {
      position: Toast.positions.BOTTOM,
      duration: Toast.durations.LONG,
      backgroundColor: "#FF8A8A",
    });
  }

  return (
    <SafeAreaView>
      <View className="mx-auto my-12 w-full px-2 md:w-5/6">
        <Text className="font-pextrabold text-3xl text-light">Sign In</Text>
      </View>
      <ScrollView className="mx-auto w-full px-2 md:w-5/6">
        <View className="form">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInputField
                label="Username"
                placeholder="john_doe"
                icon="at"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInputField
                label="Password"
                placeholder="********"
                icon="lock-closed-outline"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title="Sign In"
          buttonStyle={`w-full rounded-2xl bg-primary my-6 ${isSubmitting ? "bg-sky-500" : ""}`}
          disabled={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
