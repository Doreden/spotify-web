import { useLocation } from "react-router"
import { Navigation } from "./Navigation"
import { SidebarLibary } from "./SidebarLibary"
import { useEffect, useState } from "react"
export function Sidebar() {

    const location = useLocation()
    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    console.log(currentLocation)

    useEffect(() => {
        setCurrentLocation((prevPath) => location.pathname)
    }, [location])

    return (
        <>
            <div className="sidebar">
                <Navigation currentLocation={currentLocation} />
                <SidebarLibary currentLocation={currentLocation} />
            </div>
        </>
    )
}