# 🎬 Movie Project

## ⚙️ Built with the MERN Stack

To speed up development and take advantage of ready-to-use features, feel free to explore the [official documentation](https://www.npmjs.com/) of the npm packages used in this project.

- For validating and sanitizing inputs effectively, check out the [express-validator documentation](https://express-validator.github.io/docs/).  
- To securely handle cryptographic functions, visit the [Node.js Crypto API documentation](https://nodejs.org/api/crypto.html).  
- For handling authentication and generating JWT tokens, refer to the [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken).  
- For logging HTTP requests in your application, check out the [Morgan documentation](https://www.npmjs.com/package/morgan).  
- To manage environment variables securely, refer to the [dotenv documentation](https://www.npmjs.com/package/dotenv).  
- To easily use icons in your React project, check out the [react-icons documentation](https://www.npmjs.com/package/react-icons).  
- For client-side routing and navigation, refer to the [React Router documentation](https://reactrouter.com/).  
- For making HTTP requests from the client or server, see the [Axios documentation](https://www.npmjs.com/package/axios).  
- To enable Cross-Origin Resource Sharing (CORS), refer to the [cors documentation](https://www.npmjs.com/package/cors).  
- To handle file uploads in Node.js applications, refer to the [multer documentation](https://www.npmjs.com/package/multer).  
- To upload and manage media assets in the cloud, refer to the [Cloudinary Node.js documentation](https://cloudinary.com/documentation/node_integration).

---

## 🎨 Design Figma  
- [Login/Register UI/UX](https://www.figma.com/design/OJWmizhxJhMDLWtYYJXAPS/Movies-(Authentication-UI%2FUX)?node-id=0-1&t=B9QR6zwAqXCNsRxZ-1)

---

## 🎞️ Trailer Upload Flow

The trailer upload process in this project follows a multi-step architecture between the frontend, backend, cloud storage, and database. The full flow is illustrated below:

![Trailer Upload Flow](./flow.png)

**Steps Overview:**

1. **Frontend (React)** sends the trailer file via `FormData` to the **Backend API (Node/Express)**.
2. The backend uploads the trailer to **Cloudinary** (cloud storage).
3. Cloudinary returns a **video URL**.
4. The backend sends this URL back to the frontend.
5. The frontend then sends a final request with metadata and video URL.
6. The backend saves the movie data in **MongoDB**.
