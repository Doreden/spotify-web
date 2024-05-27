import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { StationPreview } from "./StationPreview.jsx";
import { OptionsModal } from "../OptionsModal.jsx";
import { useEffect, useState } from "react";
import { ContextMenu } from "./ContextMenu.jsx";

export function SidebarLibary() {
  // const [station, setStation] = useState([])
  const [isActiveId, setIsActiveId] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])


  const handleContextMenu = (event, station) => {
    event.preventDefault()
    setContextMenu({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
      station: station,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }
  const handleStationClick = (id) => {
    setIsActiveId(id)
  }

  return (
    <>
      <div className="sidebar-libary">
        <SidebarLibaryHeader />

        <div className="libary-station-list">
          {stations.map((station) => (
            <div key={station.id} className="preview-item" onContextMenu={(event) => handleContextMenu(event, station)} >
              <StationPreview station={station} 
              isActiveId={station.id === isActiveId}
              onClick={handleStationClick} />
            </div>
          ))}
        </div>
        {contextMenu && (<ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isActiveId={isActiveId}
          onEdit={() => handleEditStation(contextMenu.station.id)}
          onRemove={() => handleRemoveStation(contextMenu.station.id)}
          onAdd={() => onAddStation()}

      />) }
      </div>
    </>
  );
}
