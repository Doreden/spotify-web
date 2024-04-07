import { PlaylistSongPreview } from "./PlaylistSongPreview";


export function PlaylistSongList({songs}){

    return (
        <div className="song-list">
            <div className="playlist list-header">
                <div className="song-index">#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Date Added</div>
                <div>C</div>
            </div>

            {
                songs.map((song,index) => 
                    <li key={song.id}>
                        <PlaylistSongPreview index={index+1} song={song} />
                    </li>
                )
            }
        </div>
    )
}