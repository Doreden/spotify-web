import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StationDetailsHeader } from "../cmps/station/stationDetails/StationDetailsHeader";
import { StationDetailsActions } from "../cmps/station/stationDetails/StationDetialsActions";
import { PlaylistSongList } from "../cmps/station/stationDetails/PlaylistSongList";
import { NavHeader } from "../cmps/header/NavHeader";
import { stationService } from "../services/station.service";

export function StationDetails() {
  const [station, setStation] = useState();
  const params = useParams();

  useEffect(() => {
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
        <div className="song-list-container">
            <PlaylistSongList songs={station.songs} />
        </div>
      </section>
    </>
  );
}
