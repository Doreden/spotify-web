import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StationList } from "../cmps/StationList"
import { stationService } from "../services/station.service"
export function StationIndex() {

  const [stations, setStations] = useState([])

  useEffect(() => {
    loadStations()
  }, [])

  async function loadStations() {
    const stations = await stationService.query()
    console.log(stations)
    setStations((prevStations) => stations)
  }

  return (
    <>
      <section className="station-index page">
        <StationList stations={stations} />
      </section>
    </>
  )
}
