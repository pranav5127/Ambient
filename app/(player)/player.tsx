import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Pressable,
    ActivityIndicator,
} from "react-native"
import {Gesture, GestureDetector} from "react-native-gesture-handler"
import {useRadio} from "@/context/RadioContext"
import {AntDesign, Feather} from "@expo/vector-icons"
import {useRouter} from "expo-router"

const DEFAULT_IMAGE = "https://images.pexels.com/photos/992734/pexels-photo-992734.jpeg"

const Player = () => {
    const {
        currentStation,
        playNext,
        playPrev,
        togglePlayPause,
        isPlaying,
        isBuffering,
    } = useRadio()

    const router = useRouter()

    // Swipe gesture for next/previous tracks
    const panGesture = Gesture.Pan()
        .onEnd((event) => {
            const {translationX} = event
            if (translationX < -50) playNext()
            else if (translationX > 50) playPrev()
        })
        .runOnJS(true)

    if (!currentStation) return null

    const stationImage =
        currentStation.favicon && currentStation.favicon.trim() !== ""
            ? currentStation.favicon
            : DEFAULT_IMAGE


    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.container}>
                <ImageBackground
                    source={{uri: stationImage}}
                    style={styles.background}
                    blurRadius={30}
                >
                    {/* Dark overlay */}
                    <View style={styles.overlay}/>

                    {/* Back Button */}
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Feather name="arrow-left" size={28} color="white"/>
                    </Pressable>

                    {/* Main content */}
                    <View style={styles.content}>
                        <Image source={{uri: stationImage}} style={styles.image}/>

                        <Text style={styles.text}>{currentStation.name}</Text>

                        {/* Show Loader when buffering */}
                        {isBuffering && (
                            <ActivityIndicator size="large" color="#fff" style={styles.loader}/>
                        )}

                        {/* Controls Row */}
                        <View style={styles.controls}>
                            <Pressable onPress={playPrev} disabled={isBuffering}>
                                <Feather name="skip-back" size={50} color="white"/>
                            </Pressable>

                            <Pressable
                                onPress={!isBuffering ? togglePlayPause : undefined}
                                style={[styles.playButton, isBuffering && {opacity: 0.5}]}
                                disabled={isBuffering}
                            >
                                <AntDesign
                                    name={isPlaying ? "pause-circle" : "play-circle"}
                                    size={80}
                                    color="white"
                                />
                            </Pressable>

                            <Pressable onPress={playNext} disabled={isBuffering}>
                                <Feather name="skip-forward" size={50} color="white"/>
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </GestureDetector>
    )
}

export default Player

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 6,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 20,
        marginBottom: 16
    },
    placeholder: {backgroundColor: "#333"},
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
    loader: {
        marginVertical: 20,
    },
})
