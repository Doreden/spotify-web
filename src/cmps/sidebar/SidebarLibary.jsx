import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx"
import { useDispatch, useSelector } from "react-redux"
import { StationPreview } from "./StationPreview.jsx"
import { OptionsModal } from "../OptionsModal.jsx"
import { stationService } from "../../services/station.service.js"
import { useEffect, useState } from "react"
import { ContextMenu } from "./ContextMenu.jsx"
import { EditStation } from "../EditStation.jsx"

export function SidebarLibary() {
  const [stations, setStations] = useState([])
  const [isActiveId, setIsActiveId] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentStationToEdit, setCurrentStationToEdit] = useState(null)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  const miniStations = loggedInUser ? loggedInUser.likedStations : null

  console.log(miniStations)

  useEffect(() => {
    loadStations()
  },[])

  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])

  async function loadStations(){
    try {
      const stations = await stationService.query()
      setStations(stations)
      console.log(stations)
    } catch (error) {
      console.log('err',err)
    }
  }

  const handleEditStation = (stationId) => {
    const station = stations.find(st => st._id === stationId)
    setCurrentStationToEdit(station)
    setIsEditModalOpen(true)
  }

  async function handleSaveStation (updatedStation) {
    try {
      const savedStation = await stationService.save(updatedStation)
      setStations(prevStations => prevStations.map(station => station._id === savedStation._id ? savedStation : station));
    } catch (error) {
      console.error('Error saving station:', error)
    }
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

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }
  const handleStationClick = (id) => {
    setIsActiveId(id)
  }

  function onUploaded(imgUrl) {
    setStations(prevStations => prevStations.map(station => 
        station._id === currentStationToEdit._id ? { ...station, imgUrl } : station
    ))
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
                onClick={handleStationClick}
                context={'sidebar'} />
            </div>
          ))}
        </div>
        {contextMenu && (<ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isActiveId={isActiveId}
          onEdit={() => handleEditStation(contextMenu.station._id)}
          onRemove={() => handleRemoveStation(contextMenu.station._id)}
          onAdd={() => onAddStation()}

        />)}
        {isEditModalOpen && (
          <EditStation
          show = {isEditModalOpen}
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