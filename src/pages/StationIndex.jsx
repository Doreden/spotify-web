import { useEffect } from "react"
import { useSelector } from "react-redux"
import { stationService } from "../services/station.service"

export function StationIndex() {

  const stations = useSelector((storeState) => {
    return storeState.stationModule.stations
  })

  return (
    <>
      <section className="station-index page">
        {JSON.stringify(stations)}
      </section>
    </>
  )
}
