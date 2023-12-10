import {
	ADMIN_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	PROFILE_ROUTE,
	QUIZ_ITEM_ROUTE,
	REGISTRATION_ROUTE
} from "./consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";

export const routes = [
	{
		path: ADMIN_ROUTE,
		component: Admin
	},
	{
		path: LOGIN_ROUTE,
		component: Auth
	},
	{
		path: REGISTRATION_ROUTE,
		component: Auth,
        layout: true
    },
	{
		path: MAIN_ROUTE,
		component: Main
	},
	{
		path: QUIZ_ITEM_ROUTE,
		component: QuizPage
	},
	{
		path: PROFILE_ROUTE,
		component: Profile,
	}
]

export const authRoutes = [
	{
		path: PROFILE_ROUTE,
		component: Profile,
	},
	{
		path: ADMIN_ROUTE,
		component: Admin
	}
]

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		component: Auth
	},
	{
		path: REGISTRATION_ROUTE,
		component: Auth,
		layout: true
	},
	{
		path: MAIN_ROUTE,
		component: Main
	},
	{
		path: QUIZ_ITEM_ROUTE,
		component: QuizPage
	},
]