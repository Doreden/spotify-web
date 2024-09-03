import { ReactSVG } from 'react-svg'
import AddToLiked from '../assets/imgs/addToLikes.svg'
import SongLiked from '../assets/imgs/LikedSong.svg'

export function ToggleLikedStationButton({ isLikedStation, handleLikeStation }) {

  return (
    <button onClick={handleLikeStation} className="add-to-liked-stations-btn">
      {isLikedStation ?
        <div className="station-is-liked-svg-container">
          <ReactSVG src={SongLiked} />
        </div>
        :
        <div className="add-to-liked-stations-svg-container">
          <ReactSVG src={AddToLiked} />
        </div>
      }
    </button>
  )
}