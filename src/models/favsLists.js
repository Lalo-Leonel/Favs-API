const { Schema, model } = require("mongoose");

const favsListsSchema = new Schema(
  {
    nombre: String,
    favoritos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fav",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavList = model("FavList", favsListsSchema);

module.exports = FavList;
