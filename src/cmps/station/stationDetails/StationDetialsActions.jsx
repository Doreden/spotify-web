import { ReactSVG } from "react-svg";
import Play from '../../../assets/imgs/play2.svg'
import { OptionsModal } from "../../OptionsModal";
import { useEffect, useRef, useState } from "react";
export function StationDetailsActions({station}){

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
        setIsModalOpen(true)
      }

    function onClose(){
        setIsModalOpen((prevState) => false)
      }

    return(
        <>
            <div className="station-details-actions-container">
                <div className="station-details-actions">
                    <div className="station-play-button-container">
                        <button className="station-play-button">
                            <div className="play-svg-container">
                                <ReactSVG src={Play} />
                            </div>
                        </button>
                    </div>

                    <button ref={buttonRef} onClick={() => handleOptionsClick(station)} className="more-actions">•••</button>
                    {isModalOpen && (
                        <>
                            <OptionsModal modalType={'station'} entity={station} isOpen={isModalOpen} onClose={onClose} buttonPosition={buttonPosition}/>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}