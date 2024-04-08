import { ReactSVG } from "react-svg";

export function StationDetailsActions({ station }) {
  return (
    <>
      <div className="station-details-actions-container">
        <div className="station-details-actions">
          <div className="station-play-button-container">
            <button className="station-play-button"></button>
          </div>

          <button className="more-actions">•••</button>
        </div>
      </div>
    </>
  );
}
