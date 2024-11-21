import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  console.log("🚀 ~ generateToken ~ userId:", userId)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  console.log("🚀 ~ generateToken ~ token:", token)

  return token;
};

export default generateToken;