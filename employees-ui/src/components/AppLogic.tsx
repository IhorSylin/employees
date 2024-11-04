import { Link, Outlet } from "react-router-dom";

export function AppLogic() {
    return (
        <>
        <div className="sideBar">
            <div className="sideBarLinkButtonsContainer">
                <Link to={'/'} className="sideBarLinkButton">Home</Link>
                <Link to={'/'} className="sideBarLinkButton">Employees</Link>
                <Link to={'/'} className="sideBarLinkButton">Tribes</Link>
                <Link to={'/'} className="sideBarLinkButton">Report</Link>
            </div>
        </div>
        <div className="outletContainer">
            <Outlet />
        </div>
        </>
    );
}