import {
    ADMIN_ROUTE,
    CAR_ROUTE,
    CARRENT_ROUTE,
    CONDITIONS_ROUTE, CONTACTS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE, REVIEWS_ROUTE, TRUCK_ROUTE, TRUCKRENT_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import CarPage from "./pages/CarPage";
import CarsShop from "./pages/CarsShop";
import Conditions from "./pages/Conditions";
import Contacts from "./pages/Contacts";
import Reviews from "./pages/Reviews";
import TrucksShop from "./pages/TrucksShop";
import TruckPage from "./pages/TruckPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CAR_ROUTE + '/:id',
        Component: CarPage
    },
    {
        path: CARRENT_ROUTE,
        Component: CarsShop
    },
    {
        path: TRUCK_ROUTE + '/:id',
        Component: TruckPage
    },
    {
        path: TRUCKRENT_ROUTE,
        Component: TrucksShop
    },
    {
        path: CONDITIONS_ROUTE,
        Component: Conditions
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: REVIEWS_ROUTE,
        Component: Reviews
    },
]