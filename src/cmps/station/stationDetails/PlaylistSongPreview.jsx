import { utilService } from "../../../services/util.service";

export function PlaylistSongPreview({ index, song }) {
  return (
    <>
      <div className="song-preview columns">
        <div className="song-index">{index}</div>
        <div className="song-details">
          {/* <img></img> */}
          <div className="title-and-artist">
            <div className="song-title">{song.title}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
        </div>
        <div className="song-album">{song.album}</div>
        <div className="date-added">Nov 11</div>
        <div className="song-length">
          {utilService.formatSongLength(song.lengthInSeconds)}
        </div>
      </div>
    </>
  );
}
