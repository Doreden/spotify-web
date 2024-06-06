import { useEffect, useRef, useState } from "react"
import { UserService } from "../services/user.service"
import { stationService } from "../services/station.service"
import { deleteStation, toggleLikedSong } from '../store/actions/user.action'
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export function OptionsModal({ modalType, buttonPosition, station, song, isOpen, onClose, handleToggleLikedSongs }) {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)

    // Are these needed?:
    const [optionMenu, setOptionMenu] = useState(null)
    const [isActiveId, setIsActiveId] = useState(null)
    const [stations, setStations] = useState([])
    const [isSecondaryModalVisible, setSecondaryModalVisible] = useState(false)
    const [isSongLiked, setIsSongLiked] = useState(UserService.isSongLiked(loggedInUser, song))
    const modalRef = useRef()
    const navigate = useNavigate()


    useEffect(() => {
        loadStations()
    }, [])

    async function loadStations() {
        try {
            const stations = await stationService.query()
            setStations(stations)
        } catch (error) {
            console.log('err', err)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    // useEffect(() => {
    //     document.addEventListener('click', handleCloseOptionMenu)
    //     return () => {
    //         document.removeEventListener('click', handleCloseOptionMenu)
    //     }
    // }, [])

    // const handleContextMenu = (event, station) => {
    //     event.preventDefault()
    //     setContextMenu({
    //         isVisible: true,
    //         x: event.clientX,
    //         y: event.clientY,
    //         station: station,
    //     })
    // }

    // const handleCloseOptionMenu = () => {
    //     setContextMenu(null)
    // }

    // const handleStationClick = (id) => {
    //     setIsActiveId(id)
    // }


    const modalPosition = {
        buttonPosition: 'fixed',
        top: buttonPosition.top - 150,
        left: buttonPosition.left - 80
    }

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose()
        }
    };

    function handleDeleteSong(stationId, songId) {
        stationService.removeSongFromStation(stationId, songId)
    }

    function handleDeleteStation(stationId) {
        deleteStation(loggedInUser.id, stationId)
        navigate("/")
    }

    return (
        <div className="options-modal" ref={modalRef} style={modalPosition}>
            <ul className="options-list">
                <DymanicModalCmp modalType={modalType} />
            </ul>
        </div>
    )

    function DymanicModalCmp({ modalType }) {

        function getCmp(modalType) {
            switch (modalType) {
                case ('song'):
                    return <SongOptions />
                case ('station'):
                    return <StationOptions />
                default:
                    return
            }
        }
        return getCmp(modalType)
    }

    function SongOptions() {
        return (
            <>
                <li onClick={() => handleDeleteSong(station.id, song.id)}>Delete Song</li>
                <li onClick={handleToggleLikedSongs}>{`${isSongLiked ? 'Remove From' : 'Add To'} Liked Songs`}</li>
                <li onMouseEnter={() => setSecondaryModalVisible(true)} onMouseLeave={() => setSecondaryModalVisible(false)}>
                    Add to plalist
                    {isSecondaryModalVisible && <SecondaryModal station={stations} song={song} />}
                </li>
            </>
        )
    }

    function StationOptions() {
        return (
            <>
                <li onClick={() => handleDeleteStation(station.id)}>Delete Station</li>
                <li>Edit Details</li>
            </>
        )
    }
}
function SecondaryModal({ station, song }) {

    function addToStation(station, song) {
        stationService.addSongToStation(station, song)
    }
    return (
        <div>
            <div className="secondary-modal">
                <input type="text" id="find-playlist" placeholder="Find a playlist" />
                <ul>
                    {station?.map((station) => (
                        <li key={station.id} onClick={() => addToStation(station, song)} >{station.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
