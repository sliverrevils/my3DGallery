import UserInfoPage from "../pages/auth/userInfoPage"
import UserMainPage from "../pages/auth/userMainPage"
import GuestPage from "../pages/quest/questPage"

export const authRoutes=[
    {path:'/',element:<UserMainPage/>},
    {path:'/info',element:<UserInfoPage/>}
  ]

export  const questRoutes=[
    {path:'/',element:<GuestPage/>},
  ]
