import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"
import Shop from "./pages/Shop"
import { ADMIT_ROUTE, BASKET_ROUTE, GOODS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes =[
{
        path: ADMIT_ROUTE,
        Component: Admin
},
{
    path: BASKET_ROUTE,
    Component: Basket
}
]



export const publicRoutes =[
    {
        path: SHOP_ROUTE,
        Component: Shop
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
    
