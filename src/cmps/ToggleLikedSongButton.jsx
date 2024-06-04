import { ReactSVG } from 'react-svg'
import AddToLiked from '../assets/imgs/addToLikes.svg'
import SongLiked from '../assets/imgs/LikedSong.svg'
import { toggleLikedSong } from '../store/actions/user.action'
import { UserService } from '../services/user.service'
import { useEffect, useState } from 'react'


export function ToggleLikedSongButton({ loggedInUser, song }) {

  const [isLikedSong, setIsLikedSong] = useState(UserService.isSongLiked(loggedInUser, song))

  useEffect(() => {
    console.log(isLikedSong)
  }, [isLikedSong])

  function handleToggleLikedSongs() {
    toggleLikedSong(loggedInUser, song)
    setIsLikedSong((prevState) => !prevState)
  }

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