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


export function SongAndStationModal({ modalType, station, setStation, song, createdByUser, onEdit, onRemove, onAdd, isLikedSong, setIsLikedSong, isLikedStation, setIsLikedStation, handleLikeStation }) {

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)
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

	function SongModal({ createdByUser }) {
		return (
			<div className="modal">
				<li className="menu-list add-playlist-item">
					<div className="svg-modal">
						<ReactSVG src={Add} />
					</div>
					<div className="text-menu">Add to playlist</div>
					<ul className="share-menu">
						{createdByUser?.map((userCreatedStation) => (
							<li className="item" key={userCreatedStation._id} >{userCreatedStation.name}</li>
						))}
					</ul>
				</li>
				<li onClick={() => removeSongFromPlaylist(station._id, song.id)} className="menu-list delete-item">
					<div className="svg-modal">
						<ReactSVG src={Trash} />
					</div>
					<div className="text-menu">Remove from this playlist</div>
				</li>
				<li className="menu-list liked-item">
					<div className="svg-modal">
						<ReactSVG src={AddToLiked} />
					</div>
					<div onClick={handleToggleLikedSong} className="text-menu">{isLikedSong ? 'Remove From Liked Songs' : 'Save to your Liked Songs'}</div>
				</li>
			</div>
		)
	}

	return (
		<div className="wrapper-modal">
			<ul className="menu">
				<DymanicModal modalType={modalType} />
			</ul>
		</div>
	)
}

