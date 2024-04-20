// // import api from "./apiConfig";

// // const login = async (data) => {
// //   try {
// //     const response = await api.post('/auth/signin', data.data, {
// //       headers: {
// //         "Content-Type":"application/json"
// //       }
// //     });
// //     const userData = response.data;
// //     console.log("userData",userData);
// //     // localStorage.setItem('token', JSON.stringify(token));
// //     // localStorage.setItem('user', JSON.stringify(userData));
// //     return userData;
// //   } catch (error) {
// //     throw new Error('Login failed');
// //   }
// // };

// // const authService = {
// //   login,
// // };

// // export default authService;

// import Api from 'axios';

// const authService = async (email, password) => {
//     try {
//         const data = {
//             email: email,
//             password: password
//         };

//         // Gửi yêu cầu đăng nhập và lấy phản hồi
//         const response = await Api.post("/auth/signin", data, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         // Kiểm tra xem phản hồi có chứa token không
//         if (response && response.token) {
//             // Lưu token vào LocalStorage hoặc bất kỳ nơi nào phù hợp
//             localStorage.setItem('CHIEN', response.token);
//             // Trả về phản hồi từ yêu cầu đăng nhập
//             return response;
//         } else {
//             throw new Error("Không thể lấy token từ phản hồi đăng nhập.");
//         }
//     } catch (error) {
//         throw new Error("Đã xảy ra lỗi khi đăng nhập: " + error.message);
//     }
// };

// // export
// export default authService;
