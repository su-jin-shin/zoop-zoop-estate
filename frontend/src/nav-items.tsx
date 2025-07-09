
import { ReactElement } from "react";
import Index from "@/pages/Index";
import MyPage from "@/pages/MyPage";
import Favorites from "@/pages/Favorites";
import Reviews from "@/pages/Reviews";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProfileEdit from "@/pages/ProfileEdit";
import PropertyDetail from "@/pages/PropertyDetail";
import PropertyListPage from "@/pages/PropertyListPage";
import MapSearch from "@/pages/MapSearch";
import Chat from "@/pages/Chat";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Withdraw from "@/pages/Withdraw";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import PasswordChange from "@/pages/PasswordChange";
import InterestAreas from "@/pages/InterestAreas";
import Notifications from "@/pages/Notifications";
import NotificationSettings from "@/pages/NotificationSettings";
import NotificationHistory from "@/pages/NotificationHistory";
import RegisteredNotifications from "@/pages/RegisteredNotifications";
import AgencyDetail from "@/pages/AgencyDetail";
import AgencyReviews from "@/pages/AgencyReviews";

export interface NavItem {
  to: string;
  page: ReactElement;
}

export const navItems: NavItem[] = [
  {
    to: "/",
    page: <Index />,
  },
  {
    to: "/mypage",
    page: <MyPage />,
  },
  {
    to: "/favorites",
    page: <Favorites />,
  },
  {
    to: "/reviews",
    page: <Reviews />,
  },
  {
    to: "/notifications",
    page: <Notifications />,
  },
  {
    to: "/notification-settings",
    page: <NotificationSettings />,
  },
  {
    to: "/notifications/history",
    page: <NotificationHistory />,
  },
  {
    to: "/notifications/registered",
    page: <RegisteredNotifications />,
  },
  {
    to: "/login",
    page: <Login />,
  },
  {
    to: "/register", 
    page: <Register />,
  },
  {
    to: "/profile-edit",
    page: <ProfileEdit />,
  },
  {
    to: "/password-change",
    page: <PasswordChange />,
  },
  {
    to: "/interest-areas",
    page: <InterestAreas />,
  },
  {
    to: "/property/:id",
    page: <PropertyDetail />,
  },
  {
    to: "/agency/:id",
    page: <AgencyDetail />,
  },
  {
    to: "/agency/:id/reviews",
    page: <AgencyReviews />,
  },
  {
    to: "/properties",
    page: <PropertyListPage />,
  },
  {
    to: "/search",
    page: <MapSearch />,
  },
  {
    to: "/chat",
    page: <Chat />,
  },
  {
    to: "/terms",
    page: <Terms />,
  },
  {
    to: "/privacy",
    page: <Privacy />,
  },
  {
    to: "/withdraw",
    page: <Withdraw />,
  },
  {
    to: "/settings",
    page: <Settings />,
  },
  {
    to: "/help",
    page: <Help />,
  },
  {
    to: "*",
    page: <NotFound />,
  },
];
