import { useEffect, useMemo } from "react";
import { View, Animated, Easing } from "react-native";

// Helper function to generate star positions
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const randomX = Math.random() * 100; // Random x position as a percentage
    const randomY = Math.random() * 3000; // Random y position within 2000px height
    stars.push({ left: `${randomX}%`, top: randomY });
  }
  return stars;
};

const StarBackground = ({
  starCount = 150,
  layer1Duration = 40000,
  layer2Duration = 60000,
}) => {
  const scrollY1 = useMemo(() => new Animated.Value(0), []);
  const scrollY2 = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    // Looping upward animations for two star layers
    Animated.loop(
      Animated.timing(scrollY1, {
        toValue: -2000, // Move stars upwards by 2000px
        duration: layer1Duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(scrollY2, {
        toValue: -2000,
        duration: layer2Duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [scrollY1, scrollY2, layer1Duration, layer2Duration]);

  const starLayer1 = generateStars(starCount); // Generate stars for the first layer
  const starLayer2 = generateStars(starCount / 2); // Generate stars for the second layer

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      {/* First Layer of Stars */}
      <Animated.View
        style={{
          transform: [{ translateY: scrollY1 }],
          position: "absolute",
          width: "100%",
          height: 2000,
        }}
      >
        {starLayer1.map((star, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              backgroundColor: "#fff", // Color of the star
              width: 1, // Star size
              height: 1, // Star size
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </Animated.View>

      {/* Second Layer of Stars */}
      <Animated.View
        style={{
          transform: [{ translateY: scrollY2 }],
          position: "absolute",
          width: "100%",
          height: 2000,
        }}
      >
        {starLayer2.map((star, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              backgroundColor: "#fff", // Color of the star
              width: 2, // Bigger stars
              height: 2, // Bigger stars
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default StarBackground;
