import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp"
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-[#6e8bc9] to-[#ef959d]">
      <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-[#1E3A8A] font-bold">
              CourseCognito
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-xs md:text-lg md:py-2 md:px-4 p-2 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-orange-500 text-white text-xs md:text-lg md:py-2 md:px-4 p-2 "
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-orange-500 text-white text-xs md:text-lg md:py-2 md:px-4 p-2 "
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-[#1E3A8A]">
            CourseCognito
          </h1>

          <br />
          <p className="text-gray-800 font-[ font-family: fredoka,sans-serif]">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"https://www.youtube.com/@faisalnaik1605"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
        </section>
        <section className="p-10 bg-amber-300">
          <Slider className="" {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4 ">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105 ">
                  <div className=" rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course.image.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-gray-800 m-1.5 font-[ font-family: fredoka,sans-serif] ">
                        {course.title}
                      </h2>
                      <Link to={`/buy/${course._id}`} className="mt-8 bg-orange-500 text-white py-2 px-5 rounded-full hover:bg-blue-500 duration-300">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <hr />
        {/* Footer */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-blue-800 font-bold">
                  CourseCognito
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2 text-gray-800 font-bold">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-900 duration-300 text-gray-600" />
                  </a>
                  <a href="https://www.instagram.com/_faisa1x/?hl=en " target="_blank">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300 text-gray-600" />
                  </a>
                  <a href="https://x.com/FaisalN98680092" target="_blank">
                    <FaTwitter className="text-2xl hover:text-blue-900 duration-300 text-gray-600" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4 text-gray-800">connects</h3>
              <ul className=" space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  youtube- learn from faisal
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  telegram- learn from faisal
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  Github- learn from faisal
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                copyrights &#169; 2024
              </h3>
              <ul className=" space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-gray-600">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;



