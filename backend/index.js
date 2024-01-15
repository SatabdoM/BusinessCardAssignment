const express = require("express");
const userRouter = require("./routes/user");
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use("/user", userRouter);


const port = 4000;
app.listen(port, () => {
  console.log("Express Server Running on Port:", port);
});

