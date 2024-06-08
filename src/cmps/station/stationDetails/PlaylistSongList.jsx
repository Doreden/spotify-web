import { PlaylistSongPreview } from "./PlaylistSongPreview"
import { ReactSVG } from "react-svg"
import Length from '../../../assets/imgs/length.svg'

function LengthSvg() {
  return (
    <div className="length-svg-container">
      {<ReactSVG src={Length} />}
    </div>
  )
}

export function PlaylistSongList({ station, onPlayStation, isActiveSongId, onSongClick }) {
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
        <li onDoubleClick={() => onPlayStation(index)} onClick={() => onSongClick(song.id)} key={song.id}>
          <PlaylistSongPreview index={index} song={song} station={station} isActiveSongId={song.id === isActiveSongId} />
          {/* <OptionsModal modalType={'song'} entity={song} style={{top:10}} /> */}
        </li>
      ))}
    </div>
  )
}
