import { TouchableHighlight, View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { RadioStation } from "@/models/station"
import { useRadio } from "@/context/RadioContext"
import { router } from "expo-router"

const RadioListItem = ({ station }: { station: RadioStation }) => {
    const { setCurrentStation } = useRadio()

    return (
        <TouchableHighlight
            onPress={() => {
                setCurrentStation(station)
                router.push("/player")
            }}
        >
            <View style={styles.card}>
                <Image
                    source={{
                        uri: station.favicon?.trim() ? station.favicon : "https://images.pexels.com/photos/6368899/pexels-photo-6368899.jpeg"

                    }}
                    style={styles.image}
                    contentFit="cover"
                />
                <Text style={styles.text} numberOfLines={1}>
                    {station.name}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default RadioListItem

const styles = StyleSheet.create({
       card: { width: 150, marginRight: 5, alignItems: "center" },
    image: { width: 170, height: 170, padding: 10, borderRadius: 12 },
    text: { color: "#fff", marginTop: 8, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 15, fontSize: 14, fontWeight: "bold", textAlign: "center" }
})
