"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./chattingPage.module.scss";
import { io, Socket } from "socket.io-client";
import { useUserContext } from "@/context/UserContext";
import { useParams } from "next/navigation";
import axios from "axios";

interface Chat {
  userId: string;
  message: string;
  time: string;
}

const ChattingPage: React.FC = () => {
  // 스크롤 시 필요
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chattingBoardRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const { user } = useUserContext();

  const [coffeechatState, setCoffeechatState] = useState<string>("");
  const { coffeechatId } = useParams<{ coffeechatId: string }>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [socket, setSocket] = useState<Socket | null>(null);

  const [message, setMessage] = useState<string>("");

  const [beforeChatLog, setBeforeChatLog] = useState<Chat[]>([]);
  const [chatLog, setChatLog] = useState<Chat[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  /** 메시지 전송 */
  function handleSend() {
    const trimMessage = message.trim();

    if (trimMessage) {
      socket?.emit("message", {
        coffeechatId,
        message: trimMessage,
        userId: user?.id,
      });
      setMessage(""); // 입력창 초기화
    }
  }

  /** 엔터키 눌렀을 때 -> shift랑 같이 누르면 엔터 허용 */
  function handleEnterPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing == false
    ) {
      e.preventDefault(); // 기본 Enter 줄바꿈 방지
      handleSend();
      setMessage("");
    }
  }

  /** 메시지 수신될 때 로그에 저장 */
  function getMessageFromSocket(data: any) {
    const newMessage = {
      userId: data.user_id,
      message: data.message,
      time: timestampToLocale(data.createdAt),
    };
    setChatLog((prevMessages) => [...prevMessages, newMessage]);
  }

  /** 스크롤 됐을 때 맨 아래인지 확인 */
  function handleScroll() {
    const container = chattingBoardRef.current;
    if (container) {
      // 오차 범위 5px 허용
      setIsBottom(
        container.scrollHeight - container.scrollTop - container.clientHeight <=
          5,
      );

      // TODO : 만약 맨 아래가 아니라면 하단에 맨 아래로 이동할 수 있는 팝업 띄워야함
    }
  }

  /** 스크롤 맨 아래로 */
  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  /** 타임스탬프를 오전/오후 포맷으로 변경 */
  function timestampToLocale(timestamp: string) {
    const date = new Date(timestamp);

    return date.toLocaleString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  useEffect(() => {
    // TODO : 여기 나중에 백엔드랑 합의 보고 포트 결정
    const newSocket = io("http://localhost:8081");

    setSocket(newSocket);

    // 채팅방에 입장
    newSocket.emit("joinRoom", coffeechatId);

    // 메시지 수신
    newSocket.on("message", (data: any) => {
      getMessageFromSocket(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 이전 채팅 목록 불러옴
  useEffect(() => {
    if (coffeechatId) {
      axios.get(`${API_URL}/chat/${coffeechatId}`).then((result) => {
        const beforeChatLog: Chat[] = [];

        result.data.data.map((beforeChat: any) => {
          const chat = {
            userId: beforeChat.user_id,
            message: beforeChat.message,
            time: timestampToLocale(beforeChat.createdAt),
          };

          beforeChatLog.push(chat);
        });

        setBeforeChatLog(beforeChatLog);
        setChatLog(beforeChatLog);
      });
    }
  }, [coffeechatId]);

  // 커피챗 상태 불러옴
  useEffect(() => {
    if (coffeechatId) {
      axios.get(`${API_URL}/coffeechat/${coffeechatId}`).then((result) => {});
    }
  }, [coffeechatId]);

  // 새로운 메시지 추가될 때(송수신) 스크롤
  useEffect(() => {
    if (isBottom) {
      scrollToBottom();
    }
  }, [chatLog]);

  // 이전 챗로그 불러오면 맨 밑으로 스크롤
  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [beforeChatLog]);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.profileContainer}></div>
        <div
          ref={chattingBoardRef}
          className={styles.chattingBoard}
          onScroll={handleScroll}
        >
          {chatLog.map((chat) => {
            return (
              <>
                <div
                  className={`${styles.messageWrap} ${chat.userId === user?.id ? styles.right : styles.left}`}
                >
                  {chat.userId === user?.id ? (
                    <>
                      <p className={styles.messageTime}>{chat.time}</p>
                      <div
                        className={`${styles.message} ${chat.userId === user?.id ? styles.myMessage : ""}`}
                      >
                        {chat.message}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`${styles.message} ${chat.userId === user?.id ? styles.myMessage : ""}`}
                      >
                        {chat.message}
                      </div>
                      <p className={styles.messageTime}>{chat.time}</p>
                    </>
                  )}
                </div>
                <div ref={chatEndRef}></div>
              </>
            );
          })}
        </div>

        <form
          className={styles.inputForm}
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <textarea
            className={styles.input}
            placeholder="메시지 입력"
            value={message}
            onChange={handleChange}
            onKeyDown={handleEnterPress}
          />
          <button type="submit" className={styles.sendBtn}>
            보내기
          </button>
        </form>
      </div>
    </>
  );
};

export default ChattingPage;
