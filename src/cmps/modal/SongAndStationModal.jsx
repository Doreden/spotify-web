import { ReactSVG } from "react-svg"
import { deleteStation } from "../../store/actions/user.action.js"
import Edit from "../../assets/imgs/edit.svg"
import Delete from "../../assets/imgs/delete.svg"
import Add from "../../assets/imgs/addToPlaylist.svg"
import Arrow from "../../assets/imgs/rightFullArrow.svg"
import AddToLiked from '../../assets/imgs/addToLikes.svg'
import Trash from '../../assets/imgs/trash.svg'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export function SongAndStationModal({ modalType, station, onEdit, onRemove, onAdd }) {

  const navigate = useNavigate()

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
        <li onClick={onEdit} className="menu-list edit-item">
          <div className="svg-modal">
            <ReactSVG src={Edit} />
          </div>
          <div className="text-menu">Edit details</div>
        </li>
        <li onClick={onRemove} className="menu-list delete-item">
          <div className="svg-modal">
            <ReactSVG src={Delete} />
          </div>
          <div className="text-menu">Delete</div>
        </li>
      </div>
    )
  }

  function SongModal({ station = [] }) {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    console.log(station)
    function handleDeleteStation(stationId) {
      deleteStation(loggedInUser._id, stationId)
      navigate('/')
    }

    return (
      <div className="modal">
        <li className="menu-list add-playlist-item">
          <div className="svg-modal">
            <ReactSVG src={Add} />
          </div>
          <div className="text-menu">Add to playlist</div>
          <ul className="share-menu">
            {station?.map((station) => (
              <li className="item" key={station._id} >{station.name}</li>
            ))}
          </ul>
        </li>
        <li onClick={handleDeleteStation()} className="menu-list delete-item">
          <div className="svg-modal">
            <ReactSVG src={Trash} />
          </div>
          <div className="text-menu">Remove from this playlist</div>
        </li>
        <li className="menu-list liked-item">
          <div className="svg-modal">
            <ReactSVG src={AddToLiked} />
          </div>
          <div className="text-menu">Save to your Liked Songs</div>
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

