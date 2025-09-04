import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Pressable,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useRadio } from "@/context/RadioContext";
import { AntDesign, Feather } from "@expo/vector-icons";

const Player = () => {
    const {
        currentStation,
        playNext,
        playPrev,
        togglePlayPause,
        isPlaying,
    } = useRadio();

    // Swipe gesture for next/previous tracks
    const panGesture = Gesture.Pan()
        .onEnd((event) => {
            const { translationX } = event;
            if (translationX < -50) playNext();
            else if (translationX > 50) playPrev();
        })
        .runOnJS(true);

    if (!currentStation) return null;

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: currentStation.favicon }}
                    style={styles.background}
                    blurRadius={30}
                >
                    {/* Dark overlay */}
                    <View style={styles.overlay} />

                    {/* Main content */}
                    <View style={styles.content}>
                        {currentStation.favicon ? (
                            <Image source={{ uri: currentStation.favicon }} style={styles.image} />
                        ) : (
                            <View style={[styles.image, styles.placeholder]} />
                        )}

                        <Text style={styles.text}>{currentStation.name}</Text>

                        {/* Controls Row */}
                        <View style={styles.controls}>
                            <Pressable onPress={playPrev}>
                                <Feather name="skip-back" size={50} color="white" />
                            </Pressable>

                            <Pressable onPress={togglePlayPause} style={styles.playButton}>
                                <AntDesign
                                    name={isPlaying ? "pausecircle" : "play"}
                                    size={80}
                                    color="white"
                                />
                            </Pressable>

                            <Pressable onPress={playNext}>
                                <Feather name="skip-forward" size={50} color="white" />
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </GestureDetector>
    );
};

export default Player;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { width: 220, height: 220, borderRadius: 20, marginBottom: 16 },
    placeholder: { backgroundColor: "#333" },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 40,
        marginTop: 20,
    },
    playButton: {
        marginHorizontal: 20,
    },
});
