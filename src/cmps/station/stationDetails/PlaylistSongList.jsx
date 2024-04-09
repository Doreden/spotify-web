import { PlaylistSongPreview } from "./PlaylistSongPreview";

export function PlaylistSongList({ songs }) {
  return (
    <div className="song-list">
      <div className="list-header columns secondary">
        <div className="song-index">#</div>
        <div className="song-details">Title</div>
        <div className="song-album">Album</div>
        <div className="date-added">Date Added</div>
        <div className="song-length">Len</div>
      </div>

      {songs.map((song, index) => (
        <li key={song.id}>
          <PlaylistSongPreview index={index + 1} song={song} />
        </li>
      ))}
    </div>
  );
}
