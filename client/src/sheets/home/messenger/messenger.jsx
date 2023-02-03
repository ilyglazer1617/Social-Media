import "./messenger.css";
import NavBar from "./../../../components/navBar/navBar";
import Conversation from "../../../components/conversations/conversation";
import Message from "../../../components/message/message";
import ChatOnline from "../../../components/chatOnline/chatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./../../../context/AuthContext";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Messenger = () => {
  const navigae = useNavigate();
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef(); //! connect to socket port

  //!connct to socket
  useEffect(() => {
    socket.current = io("ws://localhost:4040");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //! arrivel message
  useEffect(() => {
    arrivalMessage &&
      currentChat?.member.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    try {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  //! get Conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/conversations/" + user._id
        );
        // console.log(res);
        setConversation(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getConversations();
  }, [user]);

  //! get Messages

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/messages/" + currentChat._id
        );
        setMessages(res.data);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // ! send a new message
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const message = {
  //     sender: user._id,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };

  //   const receiverId = currentChat.member.find((member) => member !== user._id);
  //   socket.current.emit("sendMessage", {
  //     senderId: user._id,
  //     receiverId,
  //     text: newMessage,
  //   });
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:4000/api/messages",
  //       message
  //     );
  //     setMessages([...messages, res.data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.member.find((member) => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  //! auto scroll down
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="serch for friends"
              className="chatMenuInput"
            />
            {conversation.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        key={m._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write something"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a chat{" "}
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user ? user._id : navigae("/")}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
