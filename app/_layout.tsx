import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RadioProvider } from "@/context/RadioContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <RadioProvider>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <Stack>
                        {/* Tabs navigation */}
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        {/* Player stack */}
                        <Stack.Screen name="(player)" options={{ headerShown: false }} />
                        {/* Not Found */}
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </RadioProvider>
        </GestureHandlerRootView>
    );
}
