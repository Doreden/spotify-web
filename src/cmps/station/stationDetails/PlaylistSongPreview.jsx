import { useState } from "react";
import { utilService } from "../../../services/util.service";
import { ReactSVG } from "react-svg";

import Play from '../../../assets/imgs/play.svg'

export function PlaylistSongPreview({ index, song }) {

  const [isHover, setIsHover] = useState(false)

  function handleHover(){
    setIsHover(() => true)
  }
  function handleHoverEnded(){
    setIsHover(() => false)
  }
  return (
    <>
      <div className="song-preview columns" onMouseEnter={handleHover} onMouseLeave={handleHoverEnded}>
        <div className="song-index">{isHover? <div className="svg-container"><ReactSVG src={Play} style={{color:'white'}}/></div> : index}</div>
        <div className="song-details">
          {/* <img></img> */}
          <div className="title-and-artist">
            <div className="song-title">{song.title}</div>
            <div className={`song-artist  `}>{song.artist}</div>
          </div>
        </div>
        <div className={`song-album ${isHover? '' : 'secondary'}`}>{song.album}</div>
        <div className="date-added secondary">Nov 11</div>
        <div className="song-length secondary">
          {utilService.formatSongLength(song.lengthInSeconds)}
        </div>
      </div>
    </>
  );
}
