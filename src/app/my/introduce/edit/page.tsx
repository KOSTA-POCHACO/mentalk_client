"use client";

import { useUserContext } from "@/context/UserContext";
import styles from "../introduce.module.scss";
import useIntroduceData from "@/hook/useIntroduce";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Toolbar from "@/components/toolbar";

const Introduce: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user, userType, isLogin, checkAccessToken } = useUserContext();

  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const router = useRouter();

  // hook에서 불러옴 현재 로그인한 아이디로
  const introduceData = useIntroduceData();

  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    onConfirmClick: () => {},
    onCancelClick: () => {},
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "제목",
    content: "내용",
  });

  useEffect(() => {
    // 토큰 검증
    checkAccessToken();

    // 로그인 안 되어있으면
    if (!isLogin) {
      setModalData({
        title: "잘못된 접근입니다",
        content: "경로가 올바르지 않습니다.",
        onConfirmClick: () => router.push("/login"),
        onCancelClick: () => router.back(),
      });
      setIsModalOpen(true);
    }

    // 멘티면 튕겨냄
    if (userType === "mentee") {
      setModalData({
        title: "잘못된 접근입니다",
        content: "경로가 올바르지 않습니다.",
        onConfirmClick: () => router.push("/my"),
        onCancelClick: () => router.push("/my"),
      });
      setIsModalOpen(true);
    }

    if (introduceData) {
      setFormData(introduceData);

      console.log("introduceData");
      console.log(introduceData);
      setContent(introduceData.content);
    } else {
    }
  }, [introduceData]);

  function handleSubmit() {
    const data = {
      introduce_title: formData.title,
      introduce_content: formData.content,
    };

    axios
      .put(`${API_URL}/introduce/${user?.id}`, data)
      .then((result) => {
        console.log(result);
        setModalData({
          title: "소개글 등록",
          content: result.data.message,
          onConfirmClick: () => router.push("/my/introduce"),
          onCancelClick: () => router.push("/my/introduce"),
        });
        setIsModalOpen(true);
      })
      .catch((error) => {
        setModalData({
          title: "소개글 등록",
          content: error.data.message,
          onConfirmClick: () => router.push("/my/introduce"),
          onCancelClick: () => router.push("/my/introduce"),
        });
      })
      .finally(() => {});
  }

  function handleClickInit() {
    setModalData({
      title: "소개글 초기화",
      content: "작성된 소개글이 초기화됩니다. 진행하시겠습니까?",
      onConfirmClick: () => {
        setFormData((prevState) => ({
          ...prevState,
          content: "",
        }));
        setIsModalOpen(false);
      },
      onCancelClick: () => setIsModalOpen(false),
    });

    setIsModalOpen(true);
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  }

  if (!isLogin) {
    return (
      <>
        {isModalOpen ? (
          <Modal
            title={modalData.title}
            content={modalData.content}
            onConfirmClick={modalData.onConfirmClick}
            onCancelClick={modalData.onCancelClick}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <>
      {isModalOpen ? (
        <Modal
          title={modalData.title}
          content={modalData.content}
          onConfirmClick={modalData.onConfirmClick}
          onCancelClick={modalData.onCancelClick}
        />
      ) : (
        ""
      )}

      {
        // 멘티가 접근하면 화면 안 띄움
        userType === "mentor" ? (
          <div className={styles.wrap}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={formData.title}
                name="title"
                onChange={handleChange}
                placeholder="제목을 입력해주세요"
              />
              <textarea
                value={formData.content}
                name="content"
                onChange={handleChange}
                placeholder="내용을 입력해주세요"
              ></textarea>
            </div>
            <div className={styles.buttonContainer}>
              <CustomButton content="수정" onClick={handleSubmit} />
              <CustomButton
                content="취소"
                backgroundColor={"var(--secondary-color)"}
                color="black"
                onClick={() => {
                  router.push("/my/introduce");
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )
      }
    </>
  );
};

export default Introduce;
