import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";

const ProjectDetails = () => {
	const { _id } = useParams();
	const navigate = useNavigate();

	const projects = useSelector((state) => state.project.allProject);
	const singleProject = projects.find((project) => project._id === _id);

	return (
		<div className='flex flex-col md:flex-row'>
			<div className='md:min-h-screen md:w-80 xl:w-96'>
				<Navbar></Navbar>
			</div>

			<div className='flex flex-col justify-between w-full'>
				<div className=' h-full container mx-auto mt-20'>
					<div className='xl:flex  block justify-around mt-10'>
						<div className='  md:w-4/5 mx-auto text-gray-600 text-center'>
							<h2 className='text-2xl font-bold uppercase'>{singleProject?.date}</h2>
							<h2 className='text-2xl'> {singleProject?.time}</h2>
							<h2 className='text-4xl  uppercase font-bold text-orange-400'>
								{singleProject?.title}
							</h2>
							<h2 className='text-gray-400  '>{singleProject?.description}</h2>
							<button
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-2 mb-4'
								onClick={() => navigate(-1)}
							>
								Go Back
							</button>
						</div>
					</div>
					{singleProject.status === "inprogress" && (
						<div>
							<p className=' mt-10 mb-2 text-4xl font-base text-center uppercase'>
								Chat
							</p>
							<div className='flex justify-center'>
								<div className=' bg-brand-2 h-px w-20 mb-5'></div>
							</div>
						</div>
					)}
					<div className=' h-full'>
						{singleProject.status === "inprogress" && <Chat></Chat>}
					</div>
				</div>
				<Footer></Footer>
			</div>
		</div>
	);
};

export default ProjectDetails;
