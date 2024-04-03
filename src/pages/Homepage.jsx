import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { stationService } from "../services/station.service"

export function Homepage(){
    
    useEffect(() => {
        console.log('1')
        loadStations()
        console.log('2')
    }, [])

    const stations = useSelector((storeState) => {return storeState.stations})
    const dispach = useDispatch()

    async function loadStations(){
        try {
            const newStations = await stationService.query()
            dispach({type: 'LOAD_STATIONS', newStations})
            console.log(stations)
        } catch {
            console.log('Could not load stations')
        }
    }

    return (
        <>
            <section className="homepage page">
                {JSON.stringify(stations)}
            </section>
            
        </>
    )
}