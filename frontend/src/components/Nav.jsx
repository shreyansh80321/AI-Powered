import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";



import { IoCartOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/authContext';




function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let {serverURL} = useContext(authDataContext);
  let [showsearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();
  const handleLogout = async () => { 
    try {
      const result = await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-screen h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img src={logo} alt="" className="w-[30px]" />
        <h1 className="text-[25px] text-[black] font-sans">QuickCart</h1>
      </div>
      <div className="w-[40%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-full">
            HOME
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-full">
            COLLECTIONS
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-full">
            ABOUT
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-full">
            CONTACT
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        {!showsearch && 
          <IoSearchCircleOutline
            className="w-[33px] h-[33px] text-[#000000] cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        }
        {showsearch && 
          <IoSearchCircle
            className="w-[33px] h-[33px] text-[#000000] cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        }
        {!userData && 
          <FaUserCircle
            className="w-[28px] h-[28px] text-[#000000] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        }

        {userData && 
          <div
            className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        }
        <IoCartOutline
          className="w-[28px] h-[28px] text-[#000000] cursor-pointer hidden md:block"
        />
        <p className="absolute flex items-center justify-center w-[18px] h-[18px] bg-red-600 text-white rounded-full text-[9px] top-[16px] right-[339px] size-[10px] hidden md:block">
          10
        </p>
      </div>
      {showsearch && 
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]"
            placeholder="Search Here"
          />
        </div>
      }
      {showProfile && 
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] list-none">
            {!userData && 
              <li
                className="w-[100%] hover:bg-[#2f2f2f] px-[15px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            }
            {userData && 
              <li
                className="w-[100%] hover:bg-[#2f2f2f] px-[15px] cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                LogOut
              </li>
            }
            <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] cursor-pointer">
              Orders
            </li>
            <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] cursor-pointer">
              About
            </li>
          </ul>
        </div>
      }
      <div className="w-[100vw] h-[90px] flex items-center fixed bottom-0 left-0 justift-between px-[20px] bg-[#191818] md:hidden">
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px]">Home</button>

      </div>
     
    </div>
  );
}

export default Nav