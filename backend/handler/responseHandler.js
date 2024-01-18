exports.resPattern = (message, code) => {
  if (code == 200)
    return {
      data: message,
    };
  else
    return {
      code,
      message,
    };
};
