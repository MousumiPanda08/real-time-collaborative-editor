# REAL-TIME COLLABORATIVE DOCUMENT EDITOR

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: MOUSUMI PANDA

*INTERN ID*: CITS0D641

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTHOSH

*DESCRIPTION* 

In today’s digital-first world, collaboration is key. Inspired by tools like Google Docs, I developed a Real-Time Collaborative Text Editor that allows multiple users to simultaneously edit the same document, see each other’s changes live, and work together seamlessly from anywhere.

This project was built as part of a full-stack task, combining React.js, Socket.IO, Express.js, and MongoDB Atlas. The aim was to create an intuitive, responsive, and real-time application where users can join a shared document space, make edits collaboratively, and even see when others are typing — all in real-time.

#live project link

https://editor-fron.vercel.app/

 **Technologies Used**
Frontend:

React.js: Used to build a dynamic, component-based user interface.

Quill.js: A powerful WYSIWYG editor that supports rich text formatting.

Socket.IO Client: To establish a persistent WebSocket connection with the backend for real-time updates.

CSS (custom styles): For clean and professional UI design.

Backend:

Node.js with Express: Handles routing and WebSocket communication via Socket.IO.

Socket.IO Server: Facilitates real-time, bi-directional communication between users.

MongoDB Atlas: Stores and retrieves document content for persistence.

Mongoose: Provides a schema-based solution to model document data.

**Deployment:**

Frontend: Deployed using Vercel for fast, static delivery.

Backend: Deployed using Render, with a CORS policy to securely allow communication with the frontend.

UptimeRobot: Configured to ping the backend every 5 minutes and keep it alive.

How the Website Was Built
Step 1: Project Setup
I created separate folders for the client and server:

The client folder holds the React frontend.

The server folder contains the backend logic using Express and MongoDB.

Step 2: Editor Component
Using Quill.js, I created a fully functional text editor in React. The editor was wrapped inside a component that communicates with the backend using Socket.IO. A unique documentId identifies each shared document.

Step 3: WebSocket Integration
Socket.IO was set up to:

Broadcast text changes to other users in the same room.

Persist data every few seconds to MongoDB.

Handle typing indicators and active user lists.

Step 4: MongoDB Integration
MongoDB Atlas was used to store each document’s content so users could resume editing even after disconnecting. The backend uses findOrCreateDocument() to either retrieve or create a document when a user joins.

Step 5: Styling
I added custom styles to make the app visually clean and modern. Styling includes input fields for usernames and document IDs, a responsive toolbar for editing, and real-time feedback like “User is typing...”.

Step 6: Deployment
Backend was deployed to Render using Node.

Frontend was deployed on Vercel.

** Real-World Applications (Day-to-Day Uses)**
This project has several practical applications:

Education: Teachers and students can co-write and edit study material or notes in real-time.

Remote Teams: Ideal for collaborative content writing, note-taking during meetings, or brainstorming.

Live Demos or Interviews: Share editable documents during live coding interviews or demo sessions.

Freelancers & Agencies: Edit proposals or contracts collaboratively with clients.

Documentation Teams: Multiple developers can co-author internal or API documentation efficiently.

The ability to have multiple people type at once, track activity, and work live makes this editor a powerful productivity tool.

Conclusion
Building this real-time collaborative editor was an excellent way to apply full-stack development skills in a real-world scenario. It showcases how modern technologies like React, WebSockets, and MongoDB can be combined to build interactive and dynamic web applications. With the ability to store document content and allow multi-user interaction in real-time, this project stands as a fully functional collaborative tool. It’s fast, responsive, and scalable — and can be extended with features like user authentication, version history, or document sharing with permissions.

#OUTPUT


