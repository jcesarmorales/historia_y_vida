const authService = require("../services/authService");

const signIn = async (req, res) => {
  console.log(req);
  const { email , password } = req.body;
  try {
    const token = await authService.signIn({ email, password });
    res.status(200).send({ status: "OK", data: token });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  
  try {
    const updatedUser = await authService.updateOneUser(
      id,
      body
    );

    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const signUp = async (req, res) => {
  const { id,tipoDocument, username,lastName, email, password,address,phone, role } = req.body;
  try {
    const createdUser = await authService.signUp({ id,tipoDocument, username,lastName, email, password,address,phone, role  });
    res.send({ status: "OK", data: createdUser });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  signIn,
  signUp,
  updateOneUser,
};
