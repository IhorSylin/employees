import { Link, Outlet } from "react-router-dom";

export function AppLogic() {
    return (
        <div className="pageContainer">
            <div className="sideBar">
                <Link to={''} className="smallName">AMADEUS</Link>
                <div className="sideBarLine"></div>
                <div className="sideBarLinkButtonsContainer">
                    <Link to={'employees'} className="sideBarLinkButton">Employees</Link>
                    <Link to={'tribes'} className="sideBarLinkButton">Tribes</Link>
                    <Link to={'report'} className="sideBarLinkButton">Report</Link>
                </div>
                <div className="sideBarLine" ></div>
            </div>
            <div className="outletContainer">
                <Outlet />
            </div>
        </div>
    );
}