import { useState, useEffect, useRef } from "react";
import { utilService } from "../../../services/util.service";
import { ReactSVG } from "react-svg";

import { OptionsModal } from "../../OptionsModal";

import Play from '../../../assets/imgs/play.svg'
import AddToLiked from '../../../assets/imgs/addToLikes.svg'

export function PlaylistSongPreview({ index, song, station }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({top:0,left:0})
  const buttonRef = useRef(null)

  useEffect(() => {
    function updateButtonPosition(){
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: buttonRect.top + buttonRect.height,
        left: buttonRect.left
      });
    }
    updateButtonPosition(); // Initial position
    window.addEventListener('resize', updateButtonPosition);

    return () => {
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);



  function handleOptionsClick(event){
    // const buttonRect = event.target.getBoundingClientRect();
    // setButtonPosition((prevPosition) => ({
    //   top: buttonRect.top + buttonRect.height + window.scrollY,
    //   left: buttonRect.left + window.scrollX
    // }))
    setIsModalOpen(true)
  }


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

  function onClose(){
    setIsModalOpen((prevState) => false)
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
          <button className="song-options" ref={buttonRef} onClick={handleOptionsClick}>•••</button>
          {isModalOpen && (
            <OptionsModal modalType={'song'} entity={song} station={station} isOpen={isModalOpen} onClose={onClose} buttonPosition={buttonPosition}/>
          )}
        </div>
      </div>
    </>
  );
}
