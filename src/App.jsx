import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { lazy } from 'react';
import { fetchCurrentUser } from "@/redux/auth/operations";
import { PrivateRoute } from "@/components/PrivateRoute";
import { RestrictedRoute } from "@/components/RestrictedRoute";
import { useAuth } from "@/utilites/hooks/useAuth";
import Loader from "@/components/Loader";

import HomePage from "@/pages/HomePage";
import ContactsPage from "@/pages/ContactsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SharedLayout from "@/components/SharedLayout/SharedLayout.jsx";

// const HomePage = lazy(() => import('../pages/HomePage'));
// const ContactsPage = lazy(() => import('../pages/ContactsPage'));
// const LoginPage = lazy(() => import('../pages/LoginPage'));
// const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
// const RegisterPage = lazy(() => import('../pages/RegisterPage'));
// const SharedLayout = lazy(() => import('./SharedLayout'));

function App  () {
	const dispatch = useDispatch();
	const { isRefreshing } = useAuth();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return isRefreshing ? (
		<Loader />
	) : (
		<>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<NotFoundPage />} />
					<Route
						path="/register"
						element={
							<RestrictedRoute
								redirectTo="/contacts"
								component={RegisterPage}
							/>
						}
					/>
					<Route
						path="/login"
						element={
							<RestrictedRoute redirectTo="/contacts" component={LoginPage} />
						}
					/>
					<Route
						path="/contacts"
						element={
							<PrivateRoute redirectTo="/login" component={ContactsPage} />
						}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;
