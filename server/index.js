const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Document = require("./models/Document");
require("dotenv").config(); // Make sure to include this

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const defaultValue = {
  content: "",
};

// 🔄 Active users array
let activeUsers = [];

// Socket.IO Event Handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle new user joining
  socket.on("new-user", (userName) => {
    socket.userName = userName;
    if (!activeUsers.includes(userName)) {
      activeUsers.push(userName);
    }
    io.emit("active-users", activeUsers);
  });

  // Typing event
  socket.on("user-typing", (userName) => {
    socket.broadcast.emit("user-typing", userName);
  });

  // Document logic
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user !== socket.userName);
    io.emit("active-users", activeUsers);
    console.log("Client disconnected:", socket.id);
  });
});

// API Route
app.get("/", (req, res) => {
  res.send("CodTech Editor Backend is running and connected to MongoDB Atlas.");
});

// Dynamic port for deployment
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper to find or create a document
async function findOrCreateDocument(id) {
  if (!id) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: defaultValue });
}
