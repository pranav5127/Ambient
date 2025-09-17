import { Tabs, useRouter, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MusicBar from "@/components/music/musicBar";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const showMusicBar = !pathname.startsWith("/(player)");

    return (
        <SafeAreaView style={styles.container}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    headerShown: false,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: {
                        display: "none"
                    }
                }}
            >
            </Tabs>

            {/* Floating Music Bar */}
            {showMusicBar && (
                <View style={[styles.musicBarWrapper, { bottom: insets.bottom  }]}>
                    <MusicBar onPress={() => router.push("/(player)/player")} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    musicBarWrapper: {
        position: "absolute",
        left: 5,
        right: 5,
    },
    container: {
        flex: 1
    }
});
