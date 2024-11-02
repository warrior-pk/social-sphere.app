import { Text, View, ScrollView, Pressable, ToastAndroid } from "react-native";
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
const schema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters")
    .regex(/^[A-Za-z\s]+$/, "Fullname must only contain alphabets"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots and underscores",
    )
    .regex(/^\S+$/, "Username must not contain spaces"),
  email: z.string().email("Invalid email address").max(100, "Email too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol",
    ),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
});

const SignUp = () => {
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
      fullName: "",
      username: "",
      email: "",
      password: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (isMale === true) {
      setValue("gender", "male");
    } else if (isMale === false) {
      setValue("gender", "female");
    }
  }, [isMale]);

  const onSubmit = (data) => {
    console.log("Sign Up", data);
  };
  if (errors) {
    console.log("errors", errors);
    ToastAndroid.show(
      "Please fill all the required fields.",
      ToastAndroid.SHORT,
    );
  }
  return (
    <SafeAreaView>
      <View className="mx-auto my-12 w-full px-2 md:w-5/6">
        <Text className="font-pextrabold text-3xl text-light">Sign Up</Text>
      </View>
      <ScrollView className="mx-auto w-full px-2 md:w-5/6">
        <View className="form">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInputField
                label="Full Name"
                placeholder="John Doe"
                icon="person-outline"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
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
          <View className="gender-box">
            <Text className={`mb-3 font-psemibold text-lg text-light`}>
              Gender
            </Text>
            <View className="flex flex-row gap-3">
              <Pressable
                className={`flex items-center justify-start rounded-2xl border border-light ${isMale === true ? "bg-[#FF8A8A]" : "bg-[#fcfbef]"} `}
                onPress={() => setIsMale((isMale) => (!isMale ? true : isMale))}
              >
                <Ionicons name="male" size={45} />
              </Pressable>
              <Pressable
                className={`flex items-center justify-start rounded-2xl border border-light ${isMale === false ? "bg-[#FF8A8A]" : "bg-[#fcfbef]"}`}
                onPress={() =>
                  setIsMale((isMale) =>
                    isMale || isMale === null ? false : isMale,
                  )
                }
              >
                <Ionicons name="female" size={45} />
              </Pressable>
            </View>
          </View>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInputField
                label="Email"
                placeholder="john@doe.com"
                icon="mail-outline"
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
          title="Sign Up"
          buttonStyle={`w-full rounded-2xl bg-primary my-6 ${isSubmitting ? "bg-sky-500" : ""}`}
          disabled={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
