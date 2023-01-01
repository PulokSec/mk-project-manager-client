import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import ActiveCard from "../../../components/ProjectCard/ActiveCard/ActiveCard";
import Navbar from "../../../components/Navbar/Navbar";
import { adminProject } from "../../../redux/slices/projectSlice";

const AdminActiveProject = () => {
  const admin = useSelector((state) => state.data.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminProject({ email: admin.email, status: "inprogress" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeProject = useSelector((state) => state.project.activeProject);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:min-h-screen md:w-80 xl:w-96">
        <Navbar></Navbar>
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <div>
            <p className=" mt-10 mb-2 text-4xl font-base text-center uppercase">
              All Ongoing Projects
            </p>
            <div className="flex justify-center">
              <div className=" bg-brand-2 h-px w-20 mb-5"></div>
            </div>
          </div>
          {activeProject.length ? (
            activeProject?.map((project) => (
              <ActiveCard project={project}></ActiveCard>
            ))
          ) : (
            <div>
              <h1 className=" text-center text-3xl text-brand-1 opacity-50 uppercase pt-10  font-semibold ">
                No Ongoing Projects!!
              </h1>
              <div className="w-full h-full z-50">
                <div
                  className=" flex justify-center items-center mb-40"
                  style={{ height: "60vh" }}
                >
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-white h-32 w-32"></div>
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

export default AdminActiveProject;
