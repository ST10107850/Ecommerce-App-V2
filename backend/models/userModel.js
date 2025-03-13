import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    profileImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true],
    },
    lastName: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
    },
    idNumber: {
      type: Number,
    },
    address: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        street: {
          type: String,
          required: true,
        },
        town: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: Number,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.omitFields = function (fields) {
  const user = this.toObject();

  const fieldsToOmit = Array.isArray(fields) ? fields : [fields];

  fieldsToOmit.forEach((field) => {
    delete user[field];
  });
  return user;
};
const Users = mongoose.model("Users", userSchema);

export default Users;
