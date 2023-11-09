import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    selectAllNotifications,
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const notificationIds = Object.keys(notifications.entities);
    const numUnreadNotifications = notificationIds.filter((n: any) => !n.read).length;

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications() as any);
    };

    let unreadNotificationsBadge;

    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = (
            <span className="badge">{numUnreadNotifications}</span>
        );
    }

    return (
        <div></div>
        // <nav>
        //     <section>
        //         <h1>As Similiar Twitter</h1>

        //         <div className="navContent">
        //             <div className="navLinks">
        //                 <Link to="/" data-testid="nav-post-link" className="button button1">Posts</Link>
        //                 <Link to="/users" className="button button1">Users</Link>
        //                 <Link to="/notifications" className="button button1">Notifications {unreadNotificationsBadge}</Link>
        //             </div>
        //             <button className="button" onClick={fetchNewNotifications}>
        //                 Refresh Notifications
        //             </button>
        //         </div>
        //     </section>
        // </nav>
    );
};
