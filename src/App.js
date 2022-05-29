import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminActiveProject from "./containers/ActiveProject/AdminActiveProject/AdminActiveProject";
import UserActiveProject from "./containers/ActiveProject/UserActiveProject/UserActiveProject";
import AddProject from "./containers/AddProject/AddProject";
import Analytics from "./containers/Analytics/Analytics";
import Home from "./containers/Home/Home";
import ProjectDetails from "./containers/ProjectDetails/ProjectDetails";
import Login from "./containers/Login/Login";
import AdminOpenProject from "./containers/OpenProject/AdminOpenProject/AdminOpenProject";
import UserOpenProject from "./containers/OpenProject/UserOpenProject/UserOpenProject";
import Register from "./containers/Register/Register";
import AdminResolvedProject from "./containers/ResolvedProject/AdminResolvedProject/AdminResolvedProject";
import UserResolvedProject from "./containers/ResolvedProject/UserResolvedProject/UserResolvedProject";

function App() {
	const admin = useSelector((state) => state.data.admin);
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<Navigate replace to='/open-project' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/home' element={<Home />} />
					<Route
						path='/admin/analytics'
						element={
							<AdminRoute>
								<Analytics />
							</AdminRoute>
						}
					/>
					<Route
						path='/admin/add-project'
						element={
							<AdminRoute>
								<AddProject />
							</AdminRoute>
						}
					/>
					<Route
						path='/open-project'
						element={
							admin ? (
								<AdminRoute>
									<AdminOpenProject />
								</AdminRoute>
							) : (
								<PrivateRoute>
									<UserOpenProject />									
								</PrivateRoute>
							)
						}
					/>
					<Route
						path='/active-project'
						element={
							admin ? (
								<AdminRoute>
									<AdminActiveProject />
								</AdminRoute>
							) : (
								<PrivateRoute>
									<UserActiveProject />
								</PrivateRoute>
							)
						}
					/>
					<Route
						path='/resolved-project'
						element={
							admin ? (
								<AdminRoute>
									<AdminResolvedProject />
								</AdminRoute>
							) : (
								<PrivateRoute>
									<UserResolvedProject />
								</PrivateRoute>
							)
						}
					/>
					<Route
						path='project/:_id'
						element={
							admin ? (
								<AdminRoute>
									<ProjectDetails />
								</AdminRoute>
							) : (
								<PrivateRoute>
									<ProjectDetails />
								</PrivateRoute>
							)
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
