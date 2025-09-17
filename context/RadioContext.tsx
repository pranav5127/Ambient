import React, {createContext, useState, useEffect, useContext} from "react"
import { useAudioPlayer, useAudioPlayerStatus} from "expo-audio"
import {RadioStation} from "@/models/station"

import {getStations} from "@/music/radioService"

type RadioContextType = {
    radios: RadioStation[],
    loading: boolean,
    error: string | null
    currentStation: RadioStation | null
    playNext: () => void
    playPrev: () => void
    togglePlayPause: () => void
    isPlaying: boolean
    isBuffering: boolean
    setCurrentStation: (station: RadioStation) => void
}

const RadioContext = createContext<RadioContextType | undefined>(undefined)

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [radios, setRadios] = useState<RadioStation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(-1)

    // Initialize the music player
    const player = useAudioPlayer()
    const status = useAudioPlayerStatus(player)

    // Fetch the radio stations
    useEffect(() => {
        (async () => {
            try {
                const stations = await getStations()
                setRadios(stations)
            } catch (err: any) {
                setError(err?.message ?? "something went wrong")
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    // WhenEver currentIndex (or radios) changes, replace the player's source and play

    useEffect(() => {
        if (currentIndex >= 0 && radios[currentIndex]) {
            try {
                const source = {uri: radios[currentIndex].url}
                player.replace(source)
                player.play()
            } catch (e) {
                setError("Audio player replace/play error")
            }
        }
    }, [currentIndex, radios])

    const setCurrentStation = (station: RadioStation) => {
        const idx = radios.findIndex((r) => r.stationuuid === station.stationuuid)
        if (idx >= 0) setCurrentIndex(idx)
    }

    const playNext = () => setCurrentIndex((prev) => (prev < radios.length - 1 ? prev + 1 : prev))
    const playPrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))

    const togglePlayPause = () => {
        if (!status?.isLoaded) return
        if (status.playing) player.pause()
        else player.play()
    }

    const currentStation = currentIndex >= 0 ? radios[currentIndex] : null

    return (
        <RadioContext.Provider value={{
            radios,
            loading,
            error,
            currentStation,
            playNext,
            playPrev,
            togglePlayPause,
            isPlaying: !!status?.playing,
            isBuffering: !!status?.isBuffering,
            setCurrentStation
        }}>
            {children}
        </RadioContext.Provider>
    )
}

export const useRadio = () => {
    const ctx = useContext(RadioContext)
    if (!ctx) throw new Error("useRadio must be used inside RadioProvider")
    return ctx
}
