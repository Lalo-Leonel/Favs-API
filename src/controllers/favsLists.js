const FavList = require("../models/favsLists");
const Fav = require("../models/favs");
const User = require("../models/users");

exports.create = async (req, res) => {
  try {
    const {
      body: { nombre, favoritos },
      userId,
    } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario invalido");
    }

    const favList = await FavList.create({ nombre, user: userId });

    for (let index = 0; index < favoritos.length; index++) {
      const element = favoritos[index];
      const { _id } = await Fav.create(element);
      favList.favoritos.push(_id);
    }

    const favsLists = await FavList.findOneAndUpdate(
      { _id: favList._id, user: userId },
      favList,
      { new: true }
    );
    res.status(201).json({ message: "Elemento creado", favsLists });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { userId } = req;
    const favsLists = await FavList.find({ user: userId });
    res
      .status(200)
      .json({
        message: `${favsLists.length} elementos encontrados`,
        favsLists,
      });
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const favList = await FavList.findById(id).populate("favoritos");
    if (!favList) {
      throw new Error("Elemento no encontrado");
    }
    res.status(200).json({ message: "Elemento encontrado", favList });
  } catch (error) {
    res
      .status(400)
      .json({ message: `El elemento con id: ${id} no fue encontrado` });
  }
};

exports.destroy = async (req, res) => {
  try {
    const {
      params: { id },
      userId,
    } = req;
    const favs = await FavList.findOneAndDelete({ _id: id, user: userId });
    if (!favs) {
      res.status(403).json({ message: "El elemento no pudo ser eliminado" });
      return;
    }
    res.status(200).json({ message: "El elemento fue borrado", favs });
  } catch (error) {
    res.status(400).json({ message: "El elemento no pudo ser borrado" });
  }
};
