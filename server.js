import express from "express";
import { fetchUserController, loginController, registerController, updateDOBController } from "./controllers.js";
import { authenticate } from "./middleware.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json())
const port = 3000;

app.post('/api/register', registerController);
app.post('/api/login', loginController);
app.get('/api/profile', authenticate, fetchUserController);
app.put('/api/profile/dob', authenticate, updateDOBController)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
