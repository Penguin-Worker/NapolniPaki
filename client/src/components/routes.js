import  Rating  from "./pages/Rating"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"
import HomePage from "./pages/HomePage"
import Shop from "./pages/Shop"
import AdminReport from "./Reports/AdminReport"
import { ADMIN_REPORT,USER_REPORT, ADMIT_ROUTE, BASKET_ROUTE, GOODS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, RATING_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, DISCOUNT_ROUTE, FAQ_ROUTE } from "./utils/consts"
import UserBasketReport from "./Reports/UserBasketReport"
import DiscountsPage from "./pages/DiscountPage"
import FAQPage from "./pages/FAQPage"

export const authRoutes =[
{
        path: ADMIT_ROUTE,
        Component: Admin,
        protected: false,
        roleRequired:'ADMIN'
},
{
    path: ADMIN_REPORT,
    Component: AdminReport,
    protected: false,
    roleRequired:'ADMIN'
},
{
    path: BASKET_ROUTE,
    Component: Basket,
    protected: false
},
{
    path: USER_REPORT,
    Component: UserBasketReport,
    protected: false
},
{
    path: RATING_ROUTE + '/:id',
    Component: Rating,
    protected: false
},
{
    path: DISCOUNT_ROUTE,
    Component: DiscountsPage,
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
        path: FAQ_ROUTE,
        Component: FAQPage
    },
    {
        path: GOODS_ROUTE + '/:id',
        Component: GoodsPage
    }
]
    
