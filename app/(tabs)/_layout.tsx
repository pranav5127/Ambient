import { Tabs, useRouter, usePathname } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MusicBar from "@/components/music/musicBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const showMusicBar = !pathname.startsWith("/(player)");

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    headerShown: true,
                    headerStyle: { height: 70 },
                    headerTitleStyle: { marginLeft: 10 },
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: { position: "absolute" },
                        default: {},
                    }),
                }}
            >
                <Tabs.Screen
                    name="radioStationList"
                    options={{
                        title: "Stations",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="radio" size={24} color={color} />
                        ),
                    }}
                />
            </Tabs>

            {/* Floating Music Bar */}
            {showMusicBar && (
                <View style={[styles.musicBarWrapper, { bottom: insets.bottom + 40 }]}>
                    <MusicBar onPress={() => router.push("/(player)/player")} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    musicBarWrapper: {
        position: "absolute",
        left: 10,
        right: 10,
    },
});
