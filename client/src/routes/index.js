import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignUp from '../pages/Signup'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import MessagePage from '../pages/MessagePage'
import MessagePager from '../components/MessagePager'
import MessageHome from '../pages/MessageHome'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            }, {
                path: 'signup',
                element: <SignUp />
            }, {
                path: 'login',
                element: <Login />
            }, {
                path: 'register',
                element: <Register />
            }, {
                path: '/message',
                element: <MessageHome />,
                children: [
                    {
                        path: ':userId',
                        element: <MessagePager />
                    }
                ]

            },
            {
                path: '*',
                element: <NotFound />,

            }
        ]
    }
])

export default router