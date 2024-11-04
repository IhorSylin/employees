import { Link, Outlet } from "react-router-dom";

export function AppLogic() {
    return (
        <div className="pageContainer">
            <div className="sideBar">
                <div className="sideBarLinkButtonsContainer">
                    <Link to={''} className="sideBarLinkButton">Home</Link>
                    <Link to={'employees'} className="sideBarLinkButton">Employees</Link>
                    <Link to={'tribes'} className="sideBarLinkButton">Tribes</Link>
                    <Link to={'report'} className="sideBarLinkButton">Report</Link>
                </div>
            </div>
            <div className="outletContainer">
                <Outlet />
            </div>
        </div>
    );
}