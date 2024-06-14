import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { stationService } from "../services/station.service"

export function StationIndex() {

  const [stations, setStations] = useState([])

  useEffect(() => {
    loadStations()
  }, [])

  async function loadStations() {
    const stations = await stationService.query()
    setStations((prevStations) => stations)
  }

  return (
    <>
      <section className="station-index page">
        <StationList stations={stations} listTitle={'Recommended Playlists'} />
        <StationList stations={stations} listTitle={'Hot In Israel'} />

      </section>
    </>
  )
}
