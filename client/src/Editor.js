import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "image"],
  ["clean"],
];

const Editor = ({ documentId }) => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [userName, setUserName] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const s = io("https://editorsback.onrender.com"); // Replace with your backend URL
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
      socket.emit("user-typing", userName);
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [socket, quill, userName]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => quill.updateContents(delta);
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("active-users", (users) => setActiveUsers(users));
    socket.on("user-typing", (name) => {
      setTyping(name);
      setTimeout(() => setTyping(""), 1000);
    });
  }, [socket]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  const handleLogin = () => {
    if (socket && userName) socket.emit("new-user", userName);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
        />
        <button onClick={handleLogin}>Join</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }}
        >
          Share Link
        </button>
      </div>
      <p className="typing">{typing && `${typing} is typing...`}</p>
      <div className="users">Active Users: {activeUsers.join(", ")}</div>
      <div className="editor" ref={wrapperRef}></div>
    </div>
  );
};

export default Editor;
