import { Link } from "react-router-dom"


export function LikedSongsPreview({ context,isActive }) {
    return (
        <Link to={`/likedsongs`}>
            <div className={`${context}-station-preview ${isActive ? 'station-active' : ''}`}>
                <img src={`/imgs/likedsongs.png`}></img>
                <div className="station-preview-text">
                    <div className="station-name">Liked Songs</div>
                </div>
            </div>
        </Link>
    )
}