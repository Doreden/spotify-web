import { ReactSVG } from "react-svg"
import { deleteStation, toggleLikedSong } from "../../store/actions/user.action.js"
import Edit from "../../assets/imgs/edit.svg"
import Delete from "../../assets/imgs/delete.svg"
import Add from "../../assets/imgs/addToPlaylist.svg"
import Arrow from "../../assets/imgs/rightFullArrow.svg"
import AddToLiked from '../../assets/imgs/addToLikes.svg'
import Trash from '../../assets/imgs/trash.svg'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { stationService } from "../../services/station.service.js"


export function SongAndStationModal({ modalType, station, setStation, song, createdByUser, onEdit, onRemove, onAdd, isLikedSong, setIsLikedSong }) {

	const loggedInUser = useSelector((storeState) => storeState.userModule.user)

	function handleToggleLikedSong() {
		toggleLikedSong(loggedInUser, song)
		setIsLikedSong((prevState) => !prevState)
	}

	const navigate = useNavigate()

	async function removeSongFromPlaylist(stationId, songId) {
		const updatedStation = await stationService.removeSongFromStation(stationId, songId)
		setStation((prevStation) => updatedStation)
	}

	function DymanicModal({ modalType, station, onEdit, onRemove, onAdd }) {
		switch (modalType) {
			case 'song':
				return <SongModal station={station} />
			case 'station':
				return <StationModal onEdit={onEdit} onRemove={onRemove} />
			default:
				return null
		}
	}

	function StationModal({ onEdit, onRemove }) {
		return (
			<div className="modal">
				<li onClick={onRemove} className="menu-list delete-item">
					<div className="svg-modal">
						<ReactSVG src={Delete} />
					</div>
					<div className="text-menu">Delete Station</div>
				</li>
			</div>
		)
	}

	function SongModal({ station = [] }) {
		return (
			<div className="modal">
				<li className="menu-list add-playlist-item">
					<div className="svg-modal">
						<ReactSVG src={Add} />
					</div>
					<div className="text-menu">Add to playlist</div>
					<ul className="share-menu">
						{createdByUser?.map((station) => (
							<li className="item" key={station._id} >{station.name}</li>
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
				<DymanicModal modalType={modalType} station={station} />
			</ul>
		</div>
	)
}

