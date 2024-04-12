import { useState } from "react"
import { removeStation } from '../store/actions/station.action'

export function OptionsModal({modalType, entity}){

    const [isOpen,setIsOpen] = useState(false)

    function handleDeleteSong(){

    }

    function handleDeleteStation(stationId){
        removeStation(stationId)
    }

    return (
        <div className="options-modal">
            <ul className="options-list">
                {(() => {
                    switch(modalType){
                        case ('song'):
                            return <SongOptions song={entity}/>
                        case ('station'):
                            return <StationOptions station={entity}/>
                        default:
                            return
                    }
                })()}
            </ul>
        </div>
    )

    
    function SongOptions({song}){
        return (
            <>
                <div>Song</div>
                <div>{song.title}</div>
                <button>Delete Song</button>
            </>
        )
    }
    function StationOptions({station}){
        return (
            <>
                <div>Station</div>
                <div>{station.name}</div>
                <button onClick={() => handleDeleteStation(station.id)}>Delete Station</button>
    
            </>
        )
    }
}
