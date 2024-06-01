import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { StationPreview } from "./StationPreview.jsx";
import { OptionsModal } from "../OptionsModal.jsx";
import { useEffect, useState } from "react";
import { ContextMenu } from "./ContextMenu.jsx";

export function SidebarLibary() {
  const [isActiveId, setIsActiveId] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  console.log(loggedInUser)
 
  const miniStations = loggedInUser ? loggedInUser.likedStations : null
  
  console.log(miniStations)
  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])


  const handleContextMenu = (event, station) => {
    // event.preventDefault()
    // setContextMenu({
    //   isVisible: true,
    //   x: event.clientX,
    //   y: event.clientY,
    //   station: station,
    // })
  }

  const handleCloseContextMenu = () => {
    // setContextMenu(null)
  }
  const handleStationClick = (id) => {
    // setIsActiveId(id)
  }
  if (!loggedInUser) {
    return "Log in to create and share playlists"
  }

  if (!miniStations) {
    return null
  }

  return (
    <>
      <div className="sidebar-libary">
        <SidebarLibaryHeader loggedInUser={loggedInUser} />

        <div className="libary-station-list">
          {miniStations.map((station) => (
            <div key={station.id} className="preview-item" onContextMenu={(event) => handleContextMenu(event, station)} >
              <StationPreview station={station} 
              isActiveId={station.id === isActiveId}
              onClick={handleStationClick} />
            </div>
          ))}
        </div>
        {/* {contextMenu && (<ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isActiveId={isActiveId}
          onEdit={() => handleEditStation(contextMenu.station.id)}
          onRemove={() => handleRemoveStation(contextMenu.station.id)}
          onAdd={() => onAddStation()}

      />) } */}
      </div>
    </>
  )
}
