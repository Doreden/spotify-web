import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { stationService } from "../services/station.service"
import { StationIndexHeader } from "../cmps/header/StationIndexHeader"

// import moodsList from '../assets/data/Moods.json' assert { type: 'json' }
// import recommendedList from '../assets/data/Recommended.json' assert { type: 'json' }
// import israelList from '../assets/data/HotInIsrael.json' assert { type: 'json' }
// import eleconicList from '../assets/data/Electronic.json' assert { type: 'json' }



export function StationIndex() {

  const [stations, setStations] = useState(stationService.getIndexStations())

  stationService.getIndexStations()


  useEffect(() => {
    loadStations()
    console.log(stations)

  }, [])

  // async function loadStations() {
  //   const stations = await stationService.query()
  //   setStations((prevStations) => stations)
  // }

  function loadStations() {
    const indexStations = stationService.getIndexStations()
    console.log(indexStations)
    setStations(() => indexStations)
  }



  return (
    <>
      <section className="station-index page">
        <div className="station-header">
          <StationIndexHeader />
        </div>
        {stations &&
          <>
            <StationList stations={stations.moodsList} listTitle={'Moods'} />
            <StationList stations={stations.eleconicList} listTitle={'Electronic Music'} />
            <StationList stations={stations.recommendedList} listTitle={'Recommended For You'} />
            <StationList stations={stations.israelList} listTitle={'Hot In Israel'} />
          </>

        }

      </section>
    </>
  )
}
