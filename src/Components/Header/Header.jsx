import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import useMessagesListener from "../AdminLogin/MessageListener";
import { BiChat } from "react-icons/bi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin=localStorage.getItem("isAdmin")==="true";
  const currentUserId=isAdmin?"admin123":localStorage.getItem("employeeId");
const { unreadCount, latestMessage } = useMessagesListener(currentUserId);

  useEffect(() => {
    if (latestMessage) {
      console.log("New message received:", latestMessage.message);
    }
  }, [latestMessage]);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* ✅ Left side - Logo & Title */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
            className="h-10 sm:h-12"
            alt="Company Logo"
          />
          <span className="self-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            HR Feedback Admin Panel
          </span>
        </Link>

        {/* ✅ Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>

        {/* ✅ Right side */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto items-center transition-all duration-300`}
        >
        <ul
  className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg 
    bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent 
    dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 md:items-center w-full"
>
  <li className="flex flex-col sm:flex-row sm:gap-3 mt-3 sm:mt-0 relative w-full md:w-auto">
    <Link to="/admin-login" onClick={handleNavLinkClick}>
      <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition mb-2 sm:mb-0 w-full sm:w-auto">
        Admin
      </button>
    </Link>
    <div className="relative ">
      <button className="relative p-2 ">
        <FaBell className="text-2xl" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
          {latestMessage ? unreadCount : 0}
        </span>
      </button>
    </div>
    <Link to="/" onClick={handleNavLinkClick}>
      <button className="p-2 sm:p-3 rounded-sm bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white transition duration-300 shadow-sm w-full sm:w-auto">
        <RxAvatar className="text-base sm:text-lg sm:text-center" />
      </button>
    </Link>
    <Link to="/chat" onClick={handleNavLinkClick}>
      <button className="p-2 sm:p-3 rounded-sm bg-gray-100 text-gray-700 hover:bg-gray-800 hover:text-white transition duration-300 shadow-sm w-full sm:w-auto">
        <BiChat className="text-base sm:text-lg sm:text-center" />
      </button>
    </Link>
  </li>
</ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
