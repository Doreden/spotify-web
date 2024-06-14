import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx"
import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview.jsx"
import { useEffect, useState } from "react"
import { ContextMenu } from "./ContextMenu.jsx"
import { EditStation } from "../EditStation.jsx"
import { createNewStationByUser, updateStation, loadUserStations } from "../../store/actions/user.action.js"
import { LikedSongsPreview } from "./LikedSongsPreview.jsx"
import { deleteStation } from '../../store/actions/user.action.js'
import { useNavigate } from "react-router"
import { DeleteStation } from "../DeleteStation.jsx"
import { stationService } from "../../services/station.service.js"

export function SidebarLibary({ currentLocation }) {

  const [isActiveId, setIsActiveId] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentStationToEdit, setCurrentStationToEdit] = useState(null)
  const [currentStationToDelete, setCurrentStationToDelete] = useState(null)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const userStations = useSelector((storeState) => storeState.userModule.stations)
  const navigate = useNavigate()

  // const miniStations = loggedInUser ? loggedInUser.likedStations : null

  console.log(userStations)

  useEffect(() => {
    loadUserLibary()
  }, [loggedInUser])

  useEffect(() => {
    document.addEventListener('click', handleCloseContextMenu)
    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])

  async function loadUserLibary() {
    if (!loggedInUser) return

    loadUserStations(loggedInUser)

    // if (!loggedInUser) return
    // console.log(loggedInUser)
    // const stations = await stationService.query({ txt: '', userId: loggedInUser._id })

  }

  const handleEditStation = (stationId) => {
    const station = userStations.find(st => st._id === stationId)
    setCurrentStationToEdit(station)
    setIsEditModalOpen(true)
  }
  const handleDeleteStation = (stationId) => {
    const station = userStations.find(st => st._id === stationId)
    setCurrentStationToDelete(station)
    setIsDeleteModalOpen(true)
  }

  async function handleSaveStation(updatedStation) {
    try {
      // Updates station in DB
      // Updates stations in Store
      // TODO - update user
      updateStation(userStations, updatedStation)

    } catch (error) {
      console.error('Error saving station:', error)
    }
  }

  function handleRemoveStation(stationId) {
    deleteStation(loggedInUser.id, stationId)
    navigate("/")
  }
  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }
  const handleStationClick = (id) => {
    setIsActiveId(id)
  }

  const handleLikedSongsClick = () => {
    setIsActiveId(null)
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

  if (!userStations) {
    return null
  }

  return (
    <>
      <div className="sidebar-libary">
        <SidebarLibaryHeader loggedInUser={loggedInUser} handleAddStation={handleAddStation} />

        <div className="libary-station-list">
          <div className="preview-item" onClick={handleLikedSongsClick}>
            <LikedSongsPreview context={'sidebar'} currentLocation={currentLocation} />
          </div>
          {userStations.map((station) => (
            <div key={station._id} className="preview-item" onContextMenu={(event) => handleContextMenu(event, station)}>
              <StationPreview
                station={station}
                OnStationClick={handleStationClick}
                currentLocation={currentLocation}
                context={'sidebar'}
              />
            </div>
          ))}
        </div>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            isActiveId={isActiveId}
            onEdit={() => handleEditStation(contextMenu.station._id)}
            onRemove={() => handleDeleteStation(contextMenu.station._id)}
            onAdd={() => handleAddStation()}
          />
        )}
        {isEditModalOpen && (
          <EditStation
            show={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            station={currentStationToEdit}
            onSave={handleSaveStation}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteStation
            show={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            station={currentStationToDelete}
            onDelete={handleRemoveStation}
          />
        )}
      </div>
    </>
  )
}