import { SongPreview } from "./SongPreview";


export function SongList({songs}){

    return (
        <div className="song-list">
            {
                songs.map(song => 
                    <li key={song.id}>
                        <SongPreview song={song} />
                    </li>
                )
            }
        </div>
    )
}