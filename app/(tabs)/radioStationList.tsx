import React from "react";
import {
    FlatList,
    StyleSheet,
    ImageBackground,
    View,
    ActivityIndicator,
    Text
} from "react-native";
import { useRadio } from "@/context/RadioContext";
import RadioListItem from "@/components/music/radioListItem";

const RadioStationList = () => {
    const { radios, error, loading } = useRadio();

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading stations...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={{ uri: "https://images.pexels.com/photos/2337927/pexels-photo-2337927.jpeg" }}
            style={styles.background}
            blurRadius={20}
        >
            <View style={styles.overlay} />
            <FlatList
                data={radios}
                renderItem={({ item }) => <RadioListItem station={item} />}
                keyExtractor={(item) => item.stationuuid}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                initialNumToRender={6}
                showsVerticalScrollIndicator={false}
            />
        </ImageBackground>
    );
};

export default RadioStationList;

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: "#000" },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.75)" },
    row: { justifyContent: "space-evenly", marginBottom: 16 },
    listContent: { paddingVertical: 20, paddingHorizontal: 10 },
    centeredContainer: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
    loadingText: { color: "#fff", marginTop: 10, fontSize: 16 },
    errorText: { color: "red", fontSize: 16, marginTop: 10 }
});
