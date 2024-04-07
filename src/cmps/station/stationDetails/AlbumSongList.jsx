import { AlbumSongPreview } from "./AlbumSongPreview";

export function AlbumSongList({ songs }) {
  return (
    <div className="song-list">
      <div className="album list-header">
        <div className="song-index">#</div>
        <div className="song-details">Title</div>
        <div className="song-length">L</div>
      </div>
      {songs.map((song, index) => (
        <li key={song.id}>
          <AlbumSongPreview index={index + 1} song={song} />
        </li>
      ))}
    </div>
  );
}
