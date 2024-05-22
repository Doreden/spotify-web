import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx";
import { useSelector } from "react-redux";
import { StationPreview } from "./StationPreview.jsx";
import { OptionsModal } from "../OptionsModal.jsx";

export function SidebarLibary() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  return (
    <>
      <div className="sidebar-libary">
        <SidebarLibaryHeader />

        <div className="libary-station-list">
          {stations.map((station) => (
            <div key={station.id} className="preview-item">
              <StationPreview station={station} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
