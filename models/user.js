const { createHmac, randomBytes } = require("crypto");
const { default: mongoose, Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    pincode: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "Admin"],
      default: "user",
    },
    profileImageURL: {
      type: String,
      default: "images/userimg.png",
    },
    familyMembers: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", function (email, password) {
  const user = this.findOne({ email });
  if (!user) throw new Error("User not found!");

const salt = user.salt;
const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    if(hashedPassword !== userProvidedHash){
       throw new Error("Incorrect Password");
    }
    return { ...user,password:undefined,salt:undefined };
});

const User = model("user", userSchema);
module.exports = User;
