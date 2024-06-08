import { Link } from "react-router-dom"


export function LikedSongsPreview({ context, currentLocation }) {
    return (
        <Link to={`/likedsongs`}>
            <div className={`${context}-station-preview ${currentLocation === '/likedsongs' ? 'station-active' : ''}`}>
                <img src={`/imgs/likedsongs.png`}></img>
                <div className="station-preview-text">
                    <div className="station-name">Liked Songs</div>
                </div>
            </div>
        </Link>
    )
}