import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { StationDetailsHeader } from "./StationDetailsHeader";
import { StationDetailsActions } from "./StationDetialsActions";

import { stationService } from "../../services/station.service";
import { SongList } from "./SongList";

export function StationDetails() {
  const [station, setStation] = useState();
  const params = useParams();

  useEffect(() => {
    console.log("Station Details");
    loadStation();
  }, []);

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId);
      setStation(station);
    } catch (err) {
      console.log(err);
    }
  }

  if (!station) return <></>;
  return (
    <>
      <section className="station-details page">
        <StationDetailsHeader station={station} />
        <StationDetailsActions station={station} />
        <SongList songs={station.songs} />
      </section>
    </>
  );
}
