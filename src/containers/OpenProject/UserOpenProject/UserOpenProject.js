import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import UserOpenCard from "../../../components/ProjectCard/UserOpenCard/UserOpenCard";
import Navbar from "../../../components/Navbar/Navbar";
import { allProjects } from "../../../redux/slices/projectSlice";

const UserOpenProject = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(allProjects());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const allProject = useSelector((state) => state.project.allProject);
	const openProjects = allProject?.filter((project) => project.status === 'open');
	console.log(openProjects);
	
	return (
		<div className='flex flex-col md:flex-row'>
			<div className='md:min-h-screen md:w-80 xl:w-96'>
				<Navbar></Navbar>
			</div>

			<div className='flex flex-col justify-between w-full'>
				<div>
					<div>
						<p className=' mt-10 mb-2 text-4xl font-base text-center uppercase'>All Open Projects</p>
						<div className='flex justify-center'>
							<div className=' bg-brand-2 h-px w-20 mb-5'></div>
						</div>
					</div>
					{openProjects.length ? (
						openProjects?.map((project) => <UserOpenCard project={project}></UserOpenCard>)
					) : (
						<div>
							<h1 className=' text-center text-3xl text-brand-1 opacity-50 uppercase pt-10  font-semibold '>
								No Open Projects!!
							</h1>
							<div className='w-full h-full z-50'>
								<div className=' flex justify-center items-center mb-40' style={{ height: "60vh" }}>
									<div className='loader ease-linear rounded-full border-8 border-t-8 border-white h-32 w-32'></div>
								</div>
							</div>
						</div>
					)}
				</div>
				<Footer></Footer>
			</div>
		</div>
	);
};

export default UserOpenProject;
