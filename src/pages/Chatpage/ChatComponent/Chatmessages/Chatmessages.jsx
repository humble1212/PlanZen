import "./Chatmessages.css";
import { FaInfo } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { BsCameraVideo } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";

import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

export default function Chatmessages() {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="chatmessages--container">
      <MessageHeader />
      <div className="conversation-container">
        <div className="conversations">
          <div className="receiver">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
            />
            <div className="receiver-text">
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
              />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
          <div className="receiver sender">
            <div className=" flex-1 flex flex-col">
              <div className=" receiver-text">
                <img
                  src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                  alt="Avatar"
                />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
        <div className="conversations">
          <div className="receiver">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
            />
            <div className="receiver-text">
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
              />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
          <div className="receiver sender">
            <div className=" flex-1 flex flex-col">
              <div className=" receiver-text">
                <img
                  src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                  alt="Avatar"
                />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
        <div className="conversations">
          <div className="receiver">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
            />
            <div className="receiver-text">
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
              />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
          <div className="receiver sender">
            <div className=" flex-1 flex flex-col">
              <div className=" receiver-text">
                <img
                  src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                  alt="Avatar"
                />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
        <div className="conversations">
          <div className="receiver">
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
            />
            <div className="receiver-text">
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
              />
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
          <div className="receiver sender">
            <div className=" flex-1 flex flex-col">
              <div className=" receiver-text">
                <img
                  src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                  alt="Avatar"
                />
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis iste hic omnis non incidunt perspiciatis atque iure
                libero, facilis similique eius facere neque, earum illum,
                sapiente ipsam natus nobis commodi at voluptates quo autem. Modi
                earum totam adipisci, perspiciatis illum beatae consequuntur
                ratione deleniti nisi vel, praesentium nulla nemo dignissimos!
              </p>
              <span className=" rounded p-1 text-xs">
                {moment().format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <ChatForm />
    </section>
  );
}

function MessageHeader() {
  return (
    <header className="chatmessages--header">
      <div className="chatmessages--header--left">
        <div className="chatmessages--header--left--avatar">
          <img
            src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
            alt="Avatar"
          />
        </div>
        <div className="chatmessages--header--left--name">
          <h2>Name</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="chatmessages--header--right">
        <button type="button">
          <BsCameraVideo />
        </button>
        <button type="button">
          <IoCallOutline />
        </button>
        <button type="button">
          <FaInfo />
        </button>
      </div>
    </header>
  );
}

function ChatForm() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <form className="chatmessages--form">
      <div className="chatmessages--form--input">
        <span>
          <FaRegImage />
        </span>
        <span>
          <FaCamera />
        </span>
        <span>
          <FaMicrophone />
        </span>
      </div>
      <input
        type="text"
        value={text}
        placeholder="Type a message ..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="chatmessages--form--buttons">
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
          }}>
          😄
        </button>
        <button type="button">
          <IoSendSharp />
        </button>
      </div>
      <div className=" absolute bottom-14 right-0 ">
        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
      </div>
    </form>
  );
}
