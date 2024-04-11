import { useState } from "react";
import { utilService } from "../../../services/util.service";
import { ReactSVG } from "react-svg";

import Play from '../../../assets/imgs/play.svg'
import AddToLiked from '../../../assets/imgs/addToLikes.svg'

export function PlaylistSongPreview({ index, song }) {

  const [isHover, setIsHover] = useState(false)

  function handleHover(){
    setIsHover(() => true)
  }
  function handleHoverEnded(){
    setIsHover(() => false)
  }

  function displayPlayButton(){
    return(
      isHover? 
      <div className="preview-play-svg-container"><ReactSVG src={Play}/></div> : index
    )
  }

  function displayAddToLikedButton(){
    return(
      isHover? 
      <button className="add-to-liked-songs-btn">
        <div className="add-to-liked-svg-container">
          <ReactSVG src={AddToLiked}/>
        </div>
      </button>
       : ''
    )
  }

  return (
    <>
      <div className="song-preview columns" onMouseEnter={handleHover} onMouseLeave={handleHoverEnded}>
        <div className="song-index">{displayPlayButton()}</div>
        <div className="song-details">
          {/* <img></img> */}
          <div className="title-and-artist">
            <div className="song-title">{song.title}</div>
            <div className={`song-artist  ${isHover? '' : 'secondary'}`}>{song.artist}</div>
          </div>
        </div>
        <div className={`song-album ${isHover? '' : 'secondary'}`}>{song.album}</div>
        <div className="date-added secondary">Nov 11</div>
        <div className="song-length secondary">
          {displayAddToLikedButton()}
          {utilService.formatSongLength(song.lengthInSeconds)}
        </div>
      </div>
    </>
  );
}
