import {SidebarLibaryHeader} from './SidebarLibaryHeader.jsx'
import { store } from '../../store/store.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StationPreview } from './StationPreview.jsx'

export function SidebarLibary(){

    const stations = useSelector((storeState) => storeState.stationModule.stations)

    console.log(stations)

    return (
        <>
            <div className="sidebar-libary">
                <SidebarLibaryHeader/>
                
                <div className="libary-station-list">
                    {stations.map((station) => (
                        <StationPreview key={station.id} station={station}/>
                    ))}

                </div>

            </div>
        </>
    )
}