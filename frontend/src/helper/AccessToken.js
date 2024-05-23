exports.getCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "token") {
      return cookieValue;
    }
  }
  return null;
};
