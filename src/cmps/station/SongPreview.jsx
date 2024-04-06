

export function SongPreview({song}){

    return (
        <>
            <div className="song-preview">
                <div className="song-name">{song.title}</div>
                <div className="artist-name">{song.artist}</div>
            </div>
        </>
    )
}