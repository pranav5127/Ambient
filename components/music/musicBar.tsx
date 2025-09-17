import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRadio } from "@/context/RadioContext";
import { BlurView } from "expo-blur";

const MusicBar = ({ onPress }: { onPress: () => void }) => {
    const { currentStation, playNext, playPrev, togglePlayPause, isPlaying } = useRadio();

    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
            const { translationX } = event
            if (translationX < -50) playNext()
            else if (translationX > 50) playPrev()
        })
        .runOnJS(true);

    if (!currentStation) return null

    return (
        <GestureDetector gesture={swipeGesture}>
            <Pressable style={styles.wrapper} onPress={onPress}>
                <BlurView
                    intensity={40}
                    tint="dark"
                    style={styles.container}
                    experimentalBlurMethod="dimezisBlurView"
                >
                    {currentStation.favicon ? (
                        <Image source={{ uri: currentStation.favicon }} style={styles.cover} />
                    ) : (
                        <View style={[styles.cover, styles.placeholder]} />
                    )}
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={1}>
                            {currentStation.name || "Unknown Station"}
                        </Text>
                    </View>
                    <Pressable onPress={togglePlayPause} style={styles.playPauseButton}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
                    </Pressable>
                </BlurView>
            </Pressable>
        </GestureDetector>
    )
}

export default MusicBar;

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#818080",
        overflow: "hidden",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    cover: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
    placeholder: { backgroundColor: "#333" },
    info: { flex: 1, marginRight: 10 },
    title: { color: "#fff", fontSize: 14, fontWeight: "bold" },
    playPauseButton: { paddingHorizontal: 5 },
});
