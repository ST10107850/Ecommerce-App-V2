import mongoose from "mongoose";

const whishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    require: true,
  },
});

const Wishlist = mongoose.model("Wishlist", whishlistSchema);

export default Wishlist;
