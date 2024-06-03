import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx"
import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview.jsx"
import { stationService } from "../../services/station.service.js"
import { useEffect, useState } from "react"
import { ContextMenu } from "./ContextMenu.jsx"
import { EditStation } from "../EditStation.jsx"
import { createNewStationByUser } from "../../store/actions/user.action.js"

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
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])


  const handleEditStation = (stationId) => {
    const station = stations.find(st => st.id === stationId)
    setCurrentStationToEdit(station)
    setIsEditModalOpen(true)
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
  
  async function handleSaveStation(updatedStation) {
    try {
      const savedStation = await stationService.save(updatedStation)
      setStations((prevStations) =>
        prevStations.map((station) =>
          station.id === savedStation.id ? savedStation : station
        )
      )
      loadStations()
    } catch (error) {
      console.error('Error saving station:', error)
    }
  }
  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  async function loadStations() {
    try {
      const stations = await stationService.query()
      setStations(stations)
    } catch (error) {
      console.log('err', err)
    }
  }

  
  const handleStationClick = (id) => {
    setIsActiveId(id)
  }

  function onUploaded(imgUrl) {
    setStations(prevStations => prevStations.map(station =>
      station.id === currentStationToEdit.id ? { ...station, imgUrl } : station
    ))
  }

  
  async function handleAddStation() {
    await createNewStationByUser(loggedInUser)
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
          {miniStations.map((station) => (
            <div key={station.id} className="preview-item" onContextMenu={(event) => handleContextMenu(event, station)} >
              <StationPreview station={station}
                onClick={handleStationClick}
                context={'sidebar'} />
            </div>
          ))}
        </div>
        {contextMenu && (<ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isActiveId={isActiveId}
          onEdit={() => handleEditStation(contextMenu.station.id)}
          onRemove={() => handleRemoveStation(contextMenu.station.id) }
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