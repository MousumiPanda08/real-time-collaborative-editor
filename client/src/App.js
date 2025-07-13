import React, { useState } from "react";
import Editor from "./Editor";
import "./styles.css";

function App() {
  const [documentId, setDocumentId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documentId.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="app-container">
      {!submitted ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className="title">Real-Time Collaborative Editor</h1>
          <input
            type="text"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            placeholder="Enter document name"
            className="doc-input"
          />
          <button type="submit" className="btn-submit">
            Start Editing
          </button>
        </form>
      ) : (
        <Editor documentId={documentId} />
      )}
    </div>
  );
}

export default App;
