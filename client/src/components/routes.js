import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"
import HomePage from "./pages/HomePage"
import Shop from "./pages/Shop"
import { ADMIT_ROUTE, BASKET_ROUTE, GOODS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes =[
{
        path: ADMIT_ROUTE,
        Component: Admin,
        protected: true,
        roleRequired: 'ADMIN'
},
{
    path: BASKET_ROUTE,
    Component: Basket,
    protected: false
}
]



export const publicRoutes =[
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: GOODS_ROUTE + '/:id',
        Component: GoodsPage
    }
]
    
