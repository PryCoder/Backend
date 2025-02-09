import mongoose,{Schema}from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        email: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        fullname: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        avatar: {
            type:String,   //cloudray api
            required: true,
            
        },
        coverImage:{
            type:String,
            
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password:{
            type:String,
            required: [true, "PAssword is must"],

        },
        refreshToken:{
            type:String,

        }




}
,{
    timestamps:true,

}
)
userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))  return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User",userSchema)