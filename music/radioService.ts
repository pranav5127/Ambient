import {RadioStation} from "@/models/station";

const API_URL = "https://de2.api.radio-browser.info/json/stations/bytag/lofi"

export const getStations = async (): Promise<RadioStation[]> => {

    const radioStations = await fetch(API_URL)
    if (!radioStations.ok) {
        throw new Error(`Failed to fetch radios ${radioStations.status}`)
    }
    return radioStations.json()
}


