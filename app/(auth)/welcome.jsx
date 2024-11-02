import { View, Image, Text } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const handleSignIn = () => {
    router.push("/(auth)/sign-in");
  };
  const handleSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <SafeAreaView>
      <View className="flex h-full items-center justify-center">
        <View className="flex flex-1 items-center justify-center gap-2">
          <Image
            source={require("@/assets/images/logo.png")}
            className="h-32 w-32"
            resizeMode="contain"
          />
          <Text className="font-pextrabold text-4xl text-light">Sphere</Text>
        </View>

        <View className="mb-16 w-full items-center gap-6">
          <CustomButton
            title={"Create Account"}
            onPress={handleSignUp}
            buttonStyle={"w-5/6 md:w-3/6 rounded-2xl bg-primary"}
            textStyle={"text-dark"}
          />
          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            buttonStyle={"w-5/6 md:w-3/6 rounded-2xl bg-light"}
            textStyle={"text-dark"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
