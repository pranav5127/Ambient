import {useEffect, useState} from "react";
import {RadioStation} from "@/models/station";
import {getStations} from "@/music/radioService";

const useRadioStations = () => {
    const [radios, setRadios] = useState<RadioStation[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchRadios = async () => {
            try {
                const radios = await getStations()
                console.table(radios)
                setRadios(radios)
            } catch (err: any) {
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetchRadios()
    }, [])

    return {radios, error, loading}
}

export default useRadioStations