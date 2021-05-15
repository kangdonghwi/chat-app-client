import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { socket } from "../socket";

const Header = styled.header`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1.5rem;
  padding: 1rem;
  color: white;
`;

const ChatForm = styled.form`
  width: 100%;
  height: 50px;
  justify-self: flex-end;
  border: 3px solid black;
  display: grid;
  grid-template-columns: 10fr 1fr;
  position: absolute;
  bottom: 0px;
`;

const MessageInput = styled.input`
  padding: 0 1rem;
`;

const SubmitBtn = styled.input`
  cursor: pointer;
  box-shadow: -3px 0px 19px 0px #3c3c3c;
  font-weight: 900;
  color: white;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
`;

const ChatList = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 0.5rem 2rem;
  position: absolute;
  top: 50px;
  bottom: 50px;
`;

const ChatMessage = styled.div`
  font-size: 1rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.id === "You"
      ? "flex-start"
      : "flex-end"};
  animation-name: ${props =>
    props.id === "You"
      ? "fadeInFromLeft"
      : "fadeInFromRight"};
`;

const ChatContainer = styled.div`
  display: inline-flex;
  padding: 0.5rem;
  color: black;
  background-color: white;
  border-radius: 10px;
  border-top-right-radius: ${props =>
    props.id === "You" ? "0px" : undefined};
  border-top-left-radius: ${props =>
    props.id === "You" ? "0px" : undefined};
`;

const Name = styled.span`
  font-weight: 900;
  white-space: pre;
`;

const Message = styled.div``;


function Chat({ userName }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const messagesEnd = useRef({});
  const scrollToBottom = () => {
    messagesEnd.current.scrollTo({
      top: messagesEnd.current.scrollHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    socket.emit("new user", userName);
  },[]);

  useEffect(() => {
    scrollToBottom();
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    },[messageList]);
  });

  const sendMessage = async () => {
    let messageContent = {
      content: {
        author: userName,
        message: message,
      },
    };



    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };


  return (
    <>
      <Header>
        <HeaderTitle>☂️ rainy day ☂️</HeaderTitle>
      </Header>
      <ChatList ref={messagesEnd}>
        {messageList.map((val, index) => (
          <ChatMessage id={val.author == userName ? "You" : "Other"} key={index}>
            <ChatContainer id={val.author == userName ? "You" : "Other"} >
                <Name>{val.author}</Name>
                <Message>{val.message}</Message>
            </ChatContainer>
          </ChatMessage>
        ))}
      </ChatList>
      <ChatForm
       onSubmit={(e) => {
        e.preventDefault();
        const postMessage = message.trim();
        if (postMessage) {
          const { id } = socket;
          socket.emit("post message", { userName, message, id });
          setMessage("");
        }
      }}>
        <MessageInput
          type="text"
          name="message"
          autoFocus
          value={message}
          placeholder="🙋‍♂️ 당신의 이야기를 들려주세요"
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />
        <SubmitBtn onClick={sendMessage} type="submit" value="보내기" />
      </ChatForm>
    </>
  );
}

export default Chat;
