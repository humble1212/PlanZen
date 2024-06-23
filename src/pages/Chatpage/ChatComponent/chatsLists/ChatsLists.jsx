import "./ChatsLists.css";

import { BsCameraVideo } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function ChatsLists() {
  return (
    <section className="chatList--container">
      <Userinfo />
      <ChatSearch />
      <div className=" list-container">
        <ListContainer />
        <ListContainer />
        <ListContainer />
        <ListContainer />
        <ListContainer />
        <ListContainer />
      </div>
    </section>
  );
}

function Userinfo() {
  return (
    <div className="user-info">
      <img
        src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
        alt="Avatar"
      />
      <strong>Christopher</strong>
      <div className="icons">
        <button type="button">
          <BsCameraVideo />
        </button>
        <button type="button">
          <IoCallOutline />
        </button>
        <button type="button">
          <IoIosMore />
        </button>
      </div>
    </div>
  );
}

function ChatSearch() {
  return (
    <div className="searchBar">
      <div className="search">
        <label htmlFor="chat-search" className=" rounded-e-full ">
          <FaSearch className="icons" />
        </label>
        <input type="text" id="chat-search" placeholder="Search.. " />
      </div>
      <button type="button" className="add-button">
        <IoMdAdd />
      </button>
    </div>
  );
}

function ListContainer() {
  return (
    <div className="chat-list-Item">
      <img
        src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
        alt="Avatar"
      />
      <div className=" flex-1 flex flex-col">
        <p className="w-full flex items-center justify-between">
          <strong>Dorothy chats</strong>
          <span className="text-xs">10:30pm</span>
        </p>
        <span className="text-sm">hello there</span>
      </div>
    </div>
  );
}
