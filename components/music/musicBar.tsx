import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRadio } from "@/context/RadioContext";

const MusicBar = ({ onPress }: { onPress: () => void }) => {
    const { currentStation, playNext, playPrev, togglePlayPause, isPlaying } = useRadio();

    // Swipe gesture: left → next, right → previous
    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
            const { translationX } = event;
            if (translationX < -50) playNext();
            else if (translationX > 50) playPrev();
        })
        .runOnJS(true); // Ensures JS functions run in the JS thread

    if (!currentStation) return null;

    return (
        <GestureDetector gesture={swipeGesture}>
            <Pressable style={styles.container} onPress={onPress}>
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
            </Pressable>
        </GestureDetector>
    );
};

export default MusicBar;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "rgba(5,11,65,0.95)",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 2 },
    },
    cover: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
    placeholder: { backgroundColor: "#333" }, // fallback if favicon missing
    info: { flex: 1, marginRight: 10 },
    title: { color: "#fff", fontSize: 14, fontWeight: "bold" },
    playPauseButton: { paddingHorizontal: 5 },
});
