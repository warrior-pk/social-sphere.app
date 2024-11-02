import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StarBackground from "@/components/StarBackground";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#000000", "#010101", "#090a0f", "#1b2735"]}
        style={styles.gradient}
        start={[0, 0]}
        end={[0, 1]}
      >
        <StarBackground starCount={150} />
        <Slot />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Ensures gradient fills the whole screen
  },
});

export default Layout;
