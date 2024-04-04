import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stationService } from "../../services/station.service";

export function StationIndex() {
  useEffect(() => {
    loadStations();
  }, []);

  const stations = useSelector((storeState) => {
    return storeState.stations;
  });
  const dispatch = useDispatch();

  async function loadStations() {
    try {
      const newStations = await stationService.query();
      dispatch({ type: "LOAD_STATIONS", newStations });
    } catch {
      console.log("Could not load stations");
    }
  }

  return (
    <>
      <section className="station-index page">
        {JSON.stringify(stations)}
      </section>
    </>
  );
}
