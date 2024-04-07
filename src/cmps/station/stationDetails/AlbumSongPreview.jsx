import { utilService } from "../../../services/util.service";

export function AlbumSongPreview({ index, song }) {
  return (
    <>
      <div className="album song-preview">
        {/* Col 1 */}
        <div className="song-index">{index}</div>
        {/* Col 2 */}
        <div className="song-details">
          {/* <img></img> */}
          <div className="title-and-artist">
            <div className="song-title">{song.title}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
        </div>
        {/* Col 3 */}
        <div className="song-length">
          {utilService.formatSongLength(song.lengthInSeconds)}
        </div>
      </div>
    </>
  );
}
