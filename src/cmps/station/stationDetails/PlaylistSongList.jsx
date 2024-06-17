import { PlaylistSongPreview } from "./PlaylistSongPreview"
import { ReactSVG } from "react-svg"
import Length from '../../../assets/imgs/length.svg'
import { useEffect } from "react"
import { loadUserStations } from "../../../store/actions/user.action"
import { useSelector } from "react-redux"


export function PlaylistSongList({ station, setStation, onPlayStation, isActiveSongId, setIsActiveSongId, is }) {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

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

  function handleSongClick(songId) {
    setIsActiveSongId((prevState) => songId)
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
        <li onClick={() => handleSongClick(song.id)} onDoubleClick={() => onPlayStation(index)} key={is === 'liked-songs' ? song.id : song.objectId}>
          <PlaylistSongPreview index={index} song={song} station={station} setStation={setStation} isActiveSongId={song.id === isActiveSongId} handleSongClick={handleSongClick} />
          {/* <OptionsModal modalType={'song'} entity={song} style={{top:10}} /> */}
        </li>
      ))}
    </div>
  )
}
