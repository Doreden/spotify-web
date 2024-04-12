import { PlaylistSongPreview } from "./PlaylistSongPreview";
import { ReactSVG } from "react-svg";
import Length from '../../../assets/imgs/length.svg'
import { OptionsModal } from "../../OptionsModal";

function LengthSvg(){
  return (
    <div className="length-svg-container">
      {<ReactSVG src={Length}/>}
    </div>
  )
}

export function PlaylistSongList({ songs }) {
  return (
    <div className="song-list">
      <div className="list-header columns secondary">
        <div className="song-index">#</div>
        <div className="song-details">Title</div>
        <div className="song-album">Album</div>
        <div className="date-added">Date Added</div>
        <div className="song-length">{LengthSvg()}</div>
      </div>

      {songs.map((song, index) => (
        <li key={song.id}>
          <PlaylistSongPreview index={index + 1} song={song} />
          <OptionsModal modalType={'song'} entity={song} />
        </li>
      ))}
    </div>
  );
}
