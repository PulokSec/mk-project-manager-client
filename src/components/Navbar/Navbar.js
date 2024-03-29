import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/mk-logo.png";
import { Transition } from "@headlessui/react";
import { BiUser } from "react-icons/bi";
import "./Navbar.css";
import useFirebase from "../../hooks/useFirebase";
import { useSelector } from "react-redux";
import { NavLink as BaseNavLink } from "react-router-dom";

const NavLink = React.forwardRef(({ activeClassName, activeStyle, ...props }, ref) => {
	return (
		<BaseNavLink
			ref={ref}
			{...props}
			className={({ isActive }) =>
				[props.className, isActive ? activeClassName : null].filter(Boolean).join(" ")
			}
			style={({ isActive }) => ({
				...props.style,
				...(isActive ? activeStyle : null),
			})}
		/>
	);
});

const Navbar = () => {
	const { logOut } = useFirebase();
	const user = useSelector((state) => state.data.user);
	const admin = useSelector((state) => state.data.user?.role === "admin");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='md:min-h-screen md:w-96'>
			<div className='bg-brand-2 md:min-h-screen md:w-80 xl:w-96 md:fixed z-50'>
				<nav className='relative z-20'>
					<div className='container mx-auto'>
						<div className='text-black flex flex-col items-center'>
							<NavLink to='/home'>
								<img className='h-8 md:h-16 md:mt-32 md:my-10 my-5' src={logo} alt='logo' />
							</NavLink>

							<div className='flex items-end justify-center'>
								<div>
									{/* <!-- Header Icons --> */}
									{(user?.displayName || user?.name) ? (
										<div className=' hidden md:flex items-center justify-center mb-5'>
											<div className='h-24 mb-5'>
												<Link to='/mytours'>
													<div className='flex w-44 items-center justify-center h-8 mr-2'>
														<div className='w-5 h-5 m-1 text-xl border-bra mt-4'>
															<BiUser className='text-white text-xl h-5 w-5' />
														</div>
														<p className='font-semibold text-white  py-1 transition duration-300 ease-in-out text-left pl-1 mt-4'>
															{user?.displayName ? (user?.displayName?.toUpperCase()?.length > 12
																? user.displayName?.split(" ")[0].toUpperCase()
																: user?.displayName) : (user?.name?.toUpperCase()?.length > 12 ? user.name?.toUpperCase().split(" ")[0] : user.name?.toUpperCase()) }
																
														</p>
													</div>
												</Link>
												<div
													onClick={logOut}
													className='cursor-default font-semibold text-brand-1 px-2 py-2 transition duration-300 ease-in-out hover:bg-brand-1 hover:text-white bg-white mb-10 uppercase border-2 shadow-xl mt-5 border-white text-center'
												>
													Sign Out
												</div>
											</div>
										</div>
									) : (
										<div className='hidden md:flex justify-center items-end'>
											{" "}
											<NavLink
												to='/login'
												className='font-semibold text-brand-1 px-8 py-2 transition duration-300 ease-in-out hover:bg-brand-1  hover:text-white bg-white mb-10 uppercase border-2 shadow-xl border-white'
												activeStyle={{
													backgroundColor: "#FFFFFF",
													color: "#1e1e1e",
													width: "full",
												}}
											>
												Sign In
											</NavLink>
										</div>
									)}
									<div className='hidden md:flex flex-col md:w-80 xl:w-96 uppercase text-sm lg:text-base text-center'></div>
									{(user?.displayName || user?.name) && (
										<div>
											{admin ? (
												<div className='hidden md:flex flex-col md:w-80 xl:w-96 uppercase text-sm lg:text-base text-center'>
													<NavLink
														to='/admin/analytics'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Project Analytics
													</NavLink>
													<NavLink
														to='/admin/add-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Create Project
													</NavLink>
													<NavLink
														to='/open-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Open projects
													</NavLink>
													<NavLink
														to='/active-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Ongoing projects
													</NavLink>
													<NavLink
														to='/resolved-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Finished Projects
													</NavLink>
												</div>
											) : (
												<div className='hidden md:flex flex-col md:w-80 xl:w-96 uppercase text-sm lg:text-base text-center'>
													<NavLink
														to='/open-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Open Projects
													</NavLink>
													<NavLink
														to='/active-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Ongoing projects
													</NavLink>
													<NavLink
														to='/resolved-project'
														className='font-base text-brand-1transition duration-500 ease-in-out hover:text-black link hover:font-bold link-underline-black px-3 lg:px-6 py-4 border-b border-white bg-brand-11 text-sm'
														style={{
															fontWeight: "500",
														}}
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Finished Projects
													</NavLink>
												</div>
											)}
										</div>
									)}
								</div>
							</div>

							<div className='-mr-2 md:hidden flex absolute right-5 top-2'>
								<button
									onClick={() => setIsOpen(!isOpen)}
									type='button'
									className='bg-white inline-flex items-center justify-center p-1 rounded-xl text-brand-1 transition duration-300 ease-in-out hover:text-white border-2 border-white hover:bg-brand-1 focus:outline-none mt-2 '
									aria-controls='mobile-menu'
									aria-expanded='false'
								>
									<span className='sr-only'>Open main menu</span>
									{!isOpen ? (
										<svg
											className='block h-6 w-6'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M4 6h16M4 12h16M4 18h16'
											/>
										</svg>
									) : (
										<svg
											className='block h-6 w-6'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>

					<Transition
						show={isOpen}
						enter='transition ease-out duration-100 transform'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='transition ease-in duration-75 transform'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						{(ref) => (
							<div className='md:hidden ' id='mobile-menu'>
								<div ref={ref} className=' pt-2   text-center mx-auto bg-brand-1'>
									{(user?.displayName || user?.name) ? (
										<div className='pt-2   text-center mx-auto bg-brand-1'>
											{admin ? (
												<div className='flex items-center flex-col'>
													<NavLink
														to='/user/add-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3   text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Create project
													</NavLink>
													<NavLink
														to='/open-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Open projects
													</NavLink>
													<NavLink
														to='/active-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Ongoing projects
													</NavLink>
													<NavLink
														to='/resolved-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Finished project
													</NavLink>
												</div>
											) : (
												<div className='flex items-center flex-col'>
													<NavLink
														to='/admin/analytics'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3   text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Project Analytics
													</NavLink>
													<NavLink
														to='/open-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Open Projects
													</NavLink>
													<NavLink
														to='/active-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Ongoing projects
													</NavLink>
													<NavLink
														to='/resolved-project'
														className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
														activeStyle={{
															backgroundColor: "#FFFFFF",
															color: "#000000",
															fontWeight: "600",
															backgroundSize: "100% 0px",
														}}
													>
														Finished project
													</NavLink>
												</div>
											)}

											<button
												onClick={logOut}
												className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3  text-base w-full border-b border-brand-2 py-3'
											>
												Log Out
											</button>
											<div className='flex items-center justify-center h-8  py-6 bg-brand-1 w-full mr-5'>
												<div className='w-5 h-5 m-1 text-xl border-bra '>
													<BiUser className='text-white text-xl h-5 w-5' />
												</div>
												<p className='font-semibold text-white  py-1 transition duration-300 ease-in-out text-left pl-1 text-lg uppercase'>
													{user.displayName}
												</p>
											</div>
										</div>
									) : (
										<div className='flex items-center flex-col'>
											{" "}
											<NavLink
												to='/login'
												className='font-semibold text-white hover:bg-white hover:text-brand-2 block px-3 py-2  text-base w-full uppercase'
											>
												Login
											</NavLink>
										</div>
									)}
								</div>
							</div>
						)}
					</Transition>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
