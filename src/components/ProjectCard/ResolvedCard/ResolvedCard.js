import React from "react";
import { Link } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const ResolvedCard = (props) => {
  const {
    date,
    time,
    title,
    description,
    _id,
    joined,
    photoURL,
    userEmail,
    displayName,
  } = props.project;

  const handleDelete = () => {
    if (window.confirm("Are you Sure?")) {
      fetch(`https://mk-manager.onrender.com/project/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          alert("Project Deletion Complete");
          window.location.reload();
        });
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="lg:flex shadow-lg rounded-lg border lg:h-48 h-full   mb-4 mx-auto transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl">
          <div>
            <div className="bg-brand-7 rounded-t-lg md:rounded-l-lg md:h-full h-20 lg:w-40 shadow-inner flex justify-center items-center md:pb-8">
              <div className="text-center ">
                <div className="text-white   md:mt-0 xl:h-12  font-bold text-6xl md:text-7xl p-1 leading-8  ">
                  <BsCheck2Circle />
                </div>
              </div>
            </div>
          </div>
          <Link className="grow" to={`/project/${_id}`}>
            <div className=" w-full grow xl:w-full px-3 bg-white py-5 lg:px-2 lg:py-2 ml-2 md:ml-5">
              <div className="flex flex-row lg:justify-start justify-center">
                <div className="w-full text-gray-700 font-medium text-sm text-center lg:text-left px-2 flex justify-between mt-2">
                  <i className="far fa-clock">{date}</i>
                  <p className="px-2 py-1 font-semibold text-gray-100 bg-brand-3 rounded hover:bg-brand-3 text-sm md:mr-10 mr-5">
                    {time}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex md:flex-row flex-col justify-center md:justify-start items-center text-center md:text-left ml-1 w-full pr-6">
                  <div className="text-blueGray-500 text-center inline-flex items-center justify-centermr-2 rounded-full bg-blue-10">
                    <img
                      className="w-12 h-12 rounded-full object-cover md:mr-4 shadow mt-2"
                      src={photoURL}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-xl text-gray-700 hover:underline ml-1 md:-ml-2 uppercase">
                      {displayName}
                    </h1>
                    <p className="font-light text-sm ml-1 md:-ml-2 -mt-1">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:mt-2 mt-5 md:ml-2 mr-2">
                <p className="text-xl text-center md:text-left md:text-2xl font-bold text-gray-700 hover:underline">
                  {title}
                </p>

                <p className="mt-2 text-gray-600 w-11/12 line-clamp-none md:line-clamp-1 hidden">
                  {description}
                </p>
              </div>
              <div className="flex flex-row lg:justify-start justify-center">
                <div className="w-full text-gray-700 font-medium text-sm text-center lg:text-left px-2 flex justify-between mt-2">
                  <i className="far fa-clock text-brand-12">Joined: </i>
                  {joined.map((employee) => (
                    <i className="far fa-clock text-brand-7">{employee.name}</i>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          <div className="ml-auto">
            <div
              onClick={handleDelete}
              className="hover:border-brand-12 hover:bg-white hover:text-brand-12 text-white bg-brand-12 border-2 rounded-b-lg md:rounded-r-lg md:h-full lg:w-40 h-20 shadow-inner flex justify-center items-center"
            >
              <div className="text-center flex md:flex-col items-center">
                <div className=" xl:h-12  font-bold md:text-7xl text-5xl p-1 leading-8">
                  <RiDeleteBinLine />
                </div>
                <p className="md:mt-8 text-lg">Remove</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolvedCard;
