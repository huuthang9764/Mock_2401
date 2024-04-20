export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getIdUser = () => {
  const maTaiKhoan =  sessionStorage.getItem("savedUserId") ||localStorage.getItem("savedUserId");
  return maTaiKhoan;
};


export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
