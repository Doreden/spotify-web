import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { stationService } from "../services/station.service"
import { StationIndexHeader } from "../cmps/header/StationIndexHeader"

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
        <div className="station-header">
          <StationIndexHeader />
        </div>
        <StationList stations={stations} listTitle={'Recommended Playlists'} />
        <StationList stations={stations} listTitle={'Hot In Israel'} />

      </section>
    </>
  )
}
