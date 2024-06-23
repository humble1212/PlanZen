import { BiDownload } from "react-icons/bi";
import "./Details.css";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
export default function Details() {
  return (
    <section className="chatdetails--container">
      <div className="user-profile-info">
        <div className="user-profile-image">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt=""
          />
        </div>
        <div className="user-profile-name">
          <strong>Emily Brown</strong>
          <p>christophereshun91@gmail.com</p>
        </div>
      </div>
      <div className="chat--settings">
        <div className="chat--settings-icon">
          <span>settings</span>
          <i className="fas fa-cog">
            <MdExpandLess />
          </i>
        </div>
        <div className="chat--settings-icon">
          <span>privacy & help</span>
          <i className="fas fa-ellipsis-h">
            <MdExpandLess />
          </i>
        </div>
        <div className="chat--settings-icon">
          <span>Shared media</span>
          <i className="fas fa-trash">
            <MdExpandLess />
          </i>
        </div>
        <div className="chat--settings-icon">
          <span>Shared document</span>
          <i className="fas fa-user-plus">
            <MdExpandMore />
          </i>
        </div>
      </div>

      <div className="shared--media">
        <div className="media--info">
          <div className=" flex items-center justify-start gap-2">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt=""
            />
            <p>details come here</p>
          </div>
          <i className="fas fa-ellipsis-h">
            <BiDownload />
          </i>
        </div>
        <div className="media--info">
          <div className=" flex items-center justify-start gap-2">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt=""
            />
            <p>details come here</p>
          </div>
          <i className="fas fa-ellipsis-h">
            <BiDownload />
          </i>
        </div>
        <div className="media--info">
          <div className=" flex items-center justify-start gap-2">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt=""
            />
            <p>details come here</p>
          </div>
          <i className="fas fa-ellipsis-h">
            <BiDownload />
          </i>
        </div>
        <div className="media--info">
          <div className=" flex items-center justify-start gap-2">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt=""
            />
            <p>details come here</p>
          </div>
          <i className="fas fa-ellipsis-h">
            <BiDownload />
          </i>
        </div>
        <div className="media--info">
          <div className=" flex items-center justify-start gap-2">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt=""
            />
            <p>details come here</p>
          </div>
          <i className="fas fa-ellipsis-h">
            <BiDownload />
          </i>
        </div>

        <button type="button" className=" bg-orange-600">
          Block User
        </button>
        <button type="button" className=" bg-blue-600">
          Logout
        </button>
      </div>
    </section>
  );
}
