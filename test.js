delete user._doc.password;
const token = jwt.sign({ user }, JWT_PASSWORD, { expiresIn: JWT_EXPIRESIN })
res.cookie('app-user', token, { expries: new Date(Date.now + 900000) })