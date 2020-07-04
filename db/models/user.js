const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword: {
        type: String,
    },
    token: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }, ],
});

userSchema.virtual("password");
//antes de ejecutar las validaciones se hace la encriptacion
userSchema.pre("validate", async function() {
    if (this.password === undefined) return;

    try {
        const hash = await bcrypt.hash(this.password, 10);
        console.log(hash, this.password);
        this.hashedPassword = hash;
    } catch (err) {
        console.log(err);
        throw err;
    }
});

module.exports = mongoose.model("User", userSchema);