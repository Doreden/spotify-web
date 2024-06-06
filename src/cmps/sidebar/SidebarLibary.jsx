import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx"
import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview.jsx"
import { stationService } from "../../services/station.service.js"
import { useEffect, useState } from "react"
import { ContextMenu } from "./ContextMenu.jsx"
import { EditStation } from "../EditStation.jsx"
import { createNewStationByUser, updateStation } from "../../store/actions/user.action.js"
import { LikedSongsPreview } from "./LikedSongsPreview.jsx"

export function SidebarLibary() {

  const [isActiveId, setIsActiveId] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentStationToEdit, setCurrentStationToEdit] = useState(null)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  const miniStations = loggedInUser ? loggedInUser.likedStations : null

  // console.log(miniStations)

  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])

  const handleEditStation = (stationId) => {
    const station = miniStations.find(st => st.id === stationId)

    setCurrentStationToEdit(station)
    setIsEditModalOpen(true)
  }

  async function handleSaveStation(updatedStation) {
    try {
      // Updates station in DB
      // Updates stations in Store
      // TODO - update user
      updateStation(miniStations, updatedStation)

    } catch (error) {
      console.error('Error saving station:', error)
    }
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }
  const handleStationClick = (id) => {
    setIsActiveId(id)
  }

  function onUploaded(imgUrl) {

  }



  async function handleAddStation() {
    await createNewStationByUser(loggedInUser)
  }

  const handleContextMenu = (event, station) => {
    event.preventDefault()
    setContextMenu({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
      station: station,
    })
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
        <SidebarLibaryHeader loggedInUser={loggedInUser} handleAddStation={handleAddStation} />

        <div className="libary-station-list">

          <LikedSongsPreview context={'sidebar'} />
          {miniStations.map((station) => (
            <div key={station.id} className="preview-item" onContextMenu={(event) => handleContextMenu(event, station)} >
              <StationPreview station={station}
                OnStationClick={handleStationClick}
                context={'sidebar'} />
            </div>
          ))}
        </div>
        {contextMenu && (<ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isActiveId={isActiveId}
          onEdit={() => handleEditStation(contextMenu.station.id)}
          onRemove={() => handleRemoveStation(contextMenu.station._id)}
          onAdd={() => handleAddStation()}

        />)}
        {isEditModalOpen && (
          <EditStation
            show={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            station={currentStationToEdit}
            onSave={handleSaveStation}
            onUploaded={onUploaded}
          />
        )}
      </div>
    </>
  )
}