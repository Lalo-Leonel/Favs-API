const User = require("../models/users");

exports.list = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: `${users.length} elementos encontrados`, users });
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Elemento no encontrado");
    }
    res.status(200).json({ message: "Elemento encontrado", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: `El elemento con id: ${user} no fue encontrado` });
  }
};
