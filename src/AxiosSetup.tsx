import axios from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://localhost:7160",
});

const userInforFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : undefined;
const token = userInforFromStorage ? userInforFromStorage.token : "";
console.log(token);
// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.common.Authorization = `Bearer ${token}`;

// axios.interceptors.request.use(
//   () => {
//     if (!instance.defaults.headers.common["Authorization"]) {
//       const userInforFromStorage = localStorage.getItem("userInfo")
//         ? JSON.parse(localStorage.getItem("userInfo")!)
//         : undefined;
//       const { token } = userInforFromStorage;

//       if (token) {
//         instance.defaults.headers.common.Authorization = `Bearer ${token}`;
//       }
//     }

//     return instance;
//   },
//   (error) => Promise.reject(error),
// );
export default instance;
