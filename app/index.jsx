import { Redirect } from "expo-router";

export default function Index() {
  const loggedIn = false;
  if (loggedIn) return <Redirect href="/home" />;

  return <Redirect href="/welcome" />;
}
