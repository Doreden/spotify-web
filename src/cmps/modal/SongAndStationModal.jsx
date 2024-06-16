import { ReactSVG } from "react-svg"
import { deleteStation, toggleLikedSong, toggleLikedStation } from "../../store/actions/user.action.js"
import Edit from "../../assets/imgs/edit.svg"
import Delete from "../../assets/imgs/delete.svg"
import Add from "../../assets/imgs/addToPlaylist.svg"
import Arrow from "../../assets/imgs/rightFullArrow.svg"
import AddToLiked from '../../assets/imgs/addToLikes.svg'
import Trash from '../../assets/imgs/trash.svg'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { stationService } from "../../services/station.service.js"
import { useRef, useState } from "react"


export function SongAndStationModal({ modalType, station, setStation, song, createdByUser, onRemove, isLikedSong, setIsLikedSong, isLikedStation, setIsLikedStation }) {

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)
	const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
	const closeModalTimeoutRef = useRef(null)

	const navigate = useNavigate()

	function handleToggleLikedSong() {
		toggleLikedSong(loggedInUser, song)
		setIsLikedSong((prevState) => !prevState)
	}
	function handleDeleteStation() {
		deleteStation(station._id)
		navigate('/')
	}

	function handleToggleLikeStation() {
		toggleLikedStation(loggedInUser, station)
		setIsLikedStation((prevState) => !prevState)
	}

	async function removeSongFromPlaylist(stationId, songId) {
		const updatedStation = await stationService.removeSongFromStation(stationId, songId)
		setStation((prevStation) => updatedStation)
	}

	console.log(createdByUser)

	function handleMouseEnter() {
		if (closeModalTimeoutRef.current) {
			clearTimeout(closeModalTimeoutRef.current)
		}
		setIsSecondModalOpen(true)
	}

	function handleMouseLeave() {
		closeModalTimeoutRef.current = setTimeout(() => {
			setIsSecondModalOpen(false)
		}, 300)
	}

	async function handleAddSongToChosenStation(chosenStation) {
		console.log("try!!")
		const updatedStation = stationService.addSongToStation(chosenStation, song)
		// Maybe cause re-render?
	}

	function SongModal() {
		return (
			<div className="modal">

				<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="menu-item add-playlist-item">
					<div className="svg-modal">
						<ReactSVG src={Add} />
					</div>
					<div className="text-menu">Add to playlist</div>



					{isSecondModalOpen &&
						<div className="second-modal-container">

							<ul className="share-menu">
								{createdByUser.map((userCreatedStation) =>
									<li onClick={() => handleAddSongToChosenStation(userCreatedStation)} className="add-to-playlist-preview" key={userCreatedStation._id} >
										<div className="img-container">
											<img className="add-to-playlist-img" src={userCreatedStation.imgUrl} ></img>
										</div>
										{userCreatedStation.name}
									</li>
								)}
							</ul>
						</div>

					}
				</li>

				<li className="menu-item delete-item" onClick={() => removeSongFromPlaylist(station._id, song.id)}>
					<div className="svg-modal">
						<ReactSVG src={Trash} />
					</div>
					<div className="text-menu">Remove from this playlist</div>
				</li>
				<li className="menu-item liked-item">
					<div className="svg-modal">
						<ReactSVG src={AddToLiked} />
					</div>
					<div onClick={handleToggleLikedSong} className="text-menu">{isLikedSong ? 'Remove From Liked Songs' : 'Save to your Liked Songs'}</div>
				</li>
			</div>
		)
	}


	function StationModal() {
		return (
			<div className="modal">
				<li onClick={onRemove} className="menu-list delete-item">
					<div className="svg-modal">
						<ReactSVG src={Delete} />
					</div>
					{station.createdBy._id === loggedInUser._id ?
						<div onClick={handleDeleteStation} className="text-menu">Delete Station</div>
						:
						<div onClick={handleToggleLikeStation} className="text-menu">Remove From Libary</div>

					}
				</li>
			</div>
		)
	}



	function DymanicModal() {
		switch (modalType) {
			case 'song':
				return <SongModal />
			case 'station':
				return <StationModal />
			default:
				return null
		}
	}

	return (
		<div className="wrapper-modal">
			<ul className="menu">
				<DymanicModal modalType={modalType} />
			</ul>
		</div>
	)
}

