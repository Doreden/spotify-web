import { PlaylistSongPreview } from "./PlaylistSongPreview"
import { ReactSVG } from "react-svg"
import Length from '../../../assets/imgs/length.svg'
import { useEffect } from "react"
import { loadUserStations } from "../../../store/actions/user.action"
import { useSelector } from "react-redux"


export function PlaylistSongList({ station, onPlayStation, isActiveSongId, handleSongClick }) {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const userLibary = useSelector((storeState) => storeState.userModule.stations)
  const createdByUser = userLibary.filter((station) => station.createdBy._id === loggedInUser._id)
  console.log(userLibary)

  useEffect(() => {
    loadUserLibary()
  }, [])

  async function loadUserLibary() {
    if (!loggedInUser) return
    loadUserStations(loggedInUser)
  }

  function LengthSvg() {
    return (
      <div className="length-svg-container">
        {<ReactSVG src={Length} />}
      </div>
    )
  }






  return (
    <div className="song-list">
      <div className="list-header playlist-columns secondary">
        <div className="song-index">#</div>
        <div className="song-details">Title</div>
        <div className="song-album">Album</div>
        <div className="date-added">Date Added</div>
        <div className="song-length">{LengthSvg()}</div>
      </div>

      {station.songs.map((song, index) => (
        <li onDoubleClick={() => onPlayStation(index)} onClick={() => handleSongClick(song.id)} key={song.objectId}>
          <PlaylistSongPreview createdByUser={createdByUser} index={index} song={song} station={station} isActiveSongId={song.id === isActiveSongId} />
          {/* <OptionsModal modalType={'song'} entity={song} style={{top:10}} /> */}
        </li>
      ))}
    </div>
  )
}
