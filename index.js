const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");


const app = express();

app.use(express.json());
app.use(cors());

async function connectToDB() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// Routes
const { role } = require("./routes/roleRoute");
app.use("/role", role);

const { stuff } = require("./routes/stuffRoute");
app.use("/stuff", stuff);

const { stuff_role } = require("./routes/stuff_roleRoute");
app.use("/stuff_role", stuff_role);

const { stage } = require("./routes/stageRoute");
app.use("/stage", stage);

const { branch } = require("./routes/branchRoute");
app.use("/branch", branch);

const { group } = require("./routes/groupRoute");
app.use("/group", group);

const { student_lesson } = require("./routes/student_lessonRoute");
app.use("/student_lesson", student_lesson);

const { student_group } = require("./routes/student_groupRoute");
app.use("/student_group", student_group);

const { students } = require("./routes/studentsRoute");
app.use("/students", students);

const { reason_lid } = require("./routes/reason_lidRoute");
app.use("/reason_lid", reason_lid);

const { payment } = require("./routes/paymentRoute");
app.use("/payment", payment);

const { lid_status } = require("./routes/lid_statusRoute");
app.use("/lid_status", lid_status);

const { lid } = require("./routes/lidRoute");
app.use("/lid", lid);

const { lesson } = require("./routes/lessonRoute");
app.use("/lesson", lesson);

const { group_stuff } = require("./routes/group_stuffRoute");
app.use("/group_stuff", group_stuff);



const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Api",
      version: "1.0.0",
      description: "API Documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  console.error(err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});