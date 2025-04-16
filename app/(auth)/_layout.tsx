import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isUser = false;

  if (isUser) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
