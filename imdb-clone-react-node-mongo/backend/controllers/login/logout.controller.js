const logoutController = async (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send({result: "User logged out"});
  };


  module.exports = logoutController;
