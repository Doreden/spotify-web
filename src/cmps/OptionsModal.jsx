import { useEffect, useRef } from "react"
import { stationService } from "../services/station.service"
import { deleteStation } from '../store/actions/user.action'
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export function OptionsModal({ modalType, buttonPosition, station, song, isOpen, onClose }) {

    const modalRef = useRef()
    const navigate = useNavigate()

    const loggedInUser = useSelector((storeState) => storeState.userModule.user)

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


    const modalPosition = {
        buttonPosition: 'fixed',
        top: buttonPosition.top - 130,
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
                {/* {(() => {
                    switch (modalType) {
                        case ('song'):
                            return <SongOptions />
                        case ('station'):
                            return <StationOptions />
                        default:
                            return
                    }
                })} */}
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
                <li>Add To Liked Songs</li>
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
