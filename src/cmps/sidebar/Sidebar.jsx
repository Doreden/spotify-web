import { Navigation } from "./Navigation"
import { SidebarLibary } from "./SidebarLibary"
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