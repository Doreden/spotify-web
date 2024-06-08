// TODO

import { ReactSVG } from 'react-svg'
import AddToLiked from '../assets/imgs/addToLikes.svg'
import SongLiked from '../assets/imgs/LikedSong.svg'

export function ToggleLikedStationButton({ isLikedSong, handleToggleLikedSongs }) {

  return (
    <button onClick={handleToggleLikedSongs} className="add-to-liked-songs-btn">
      {isLikedSong ?
        <div className="song-is-liked-svg-container">
          <ReactSVG src={SongLiked} />
        </div>
        :
        <div className="add-to-liked-svg-container">
          <ReactSVG src={AddToLiked} />
        </div>
      }
    </button>
  )
}