import { Navigation } from "./sidebar/Navigation"
import { SidebarLibary } from "./sidebar/SidebarLibary"
export function Sidebar() {


    return(
        <>
            <div className="sidebar">
                <Navigation/>
                <SidebarLibary/>
            </div>
        </>
    )
}