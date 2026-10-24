import React from "react";
import {Route, Routes} from "react-router";
import {authRoutes, publicRoutes} from "../routes";

const AppRouter = () => {
	return (
		<Routes>
			{localStorage.getItem('username') && authRoutes.map(route =>
				<Route key={route.path} path={route.path} element={<route.component/>} />
			)}
			{publicRoutes.map(route =>
				<Route key={route.path} path={route.path} element={<route.component/>} />
			)}
		</Routes>
	)
}

export default AppRouter