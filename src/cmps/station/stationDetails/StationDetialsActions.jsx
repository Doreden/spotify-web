import { ReactSVG } from "react-svg"
import Play from '../../../assets/imgs/play2.svg'
import dots from '../../../assets/imgs/dots.svg'

import { OptionsModal } from "../../OptionsModal"
import { useEffect, useRef, useState } from "react"
import { ToggleLikedStationButton } from "../../ToggleLikedStationButton"
import { stationService } from "../../../services/station.service"
import { useSelector } from "react-redux"
import { UserService } from "../../../services/user.service"
import { toggleLikedStation } from "../../../store/actions/user.action"
import { SongAndStationModal } from "../../modal/SongAndStationModal"
import { EditStation } from "../../EditStation"
import { DeleteStation } from "../../DeleteStation"
import { createNewStationByUser, updateStation, deleteStation, loadUserStations } from "../../../store/actions/user.action.js"


export function StationDetailsActions({ station, onPlayStation, is }) {


  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const userStations = useSelector((storeState) => storeState.userModule.stations)

  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
  const [isLikedStation, setIsLikedStation] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentStationToEdit, setCurrentStationToEdit] = useState(null)
  const [currentStationToDelete, setCurrentStationToDelete] = useState(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    loadIsLikedStationState()
  }, [])

  useEffect(() => {
    const handleCloseModalMenu = () => setIsModalOpen(false)
    document.addEventListener('click', handleCloseModalMenu)
    return () => {
      document.removeEventListener('click', handleCloseModalMenu)
    }
  }, [])



  function loadIsLikedStationState() {
    if (is !== 'liked-songs') {
      const isLiked = UserService.isStationLiked(loggedInUser, station)
      setIsLikedStation((prevState) => isLiked)
    }
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

  async function handleLikeStation() {
    toggleLikedStation(loggedInUser, station)
    setIsLikedStation((prevState) => !prevState)
  }

  function handleRemoveStation(stationId) {
    deleteStation(loggedInUser.id, stationId)
    // navigate("/")
  }

  async function handleAddStation() {
    await createNewStationByUser(loggedInUser)
  }

  // useEffect(() => {
  //   function updateButtonPosition() {
  //     const buttonRect = buttonRef.current.getBoundingClientRect()
  //     setButtonPosition({
  //       top: buttonRect.top + buttonRect.height,
  //       left: buttonRect.left
  //     })
  //   }
  //   updateButtonPosition()
  //   window.addEventListener('resize', updateButtonPosition)

  //   return () => {
  //     window.removeEventListener('resize', updateButtonPosition)
  //   }
  // }, [])

  function handleOptionsClick(event) {
    event.stopPropagation()
    setIsModalOpen(true)
  }

  function onClose() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="station-details-actions-container">
        <div className="station-details-actions">
          {
            station.songs.length > 0 &&
            <div className="station-play-button-container">
              {/* TOASK : Why it only works with arrow function? Does it has anything to do with default argument */}
              <button onClick={() => onPlayStation()} className="station-play-button">
                <div className="play-svg-container">
                  <ReactSVG src={Play} />
                </div>
              </button>
            </div>
          }

          {!(is === 'liked-songs') && loggedInUser && (station.createdBy._id !== loggedInUser?._id) &&
            <ToggleLikedStationButton isLikedStation={isLikedStation} handleLikeStation={handleLikeStation} />
          }

          <button ref={buttonRef} onClick={handleOptionsClick} className="more-actions">
            <ReactSVG src={dots} />
          </button>
          {isModalOpen && (
            <SongAndStationModal
              modalType={'station'}
              onClose={onClose}
              station={station}
              isLikedStation={isLikedStation}
              setIsLikedStation={setIsLikedStation}
              handleLikeStation={handleLikeStation}
            />
          )}
        </div>
      </div>
    </>
  )
}
