import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserModel from "../models/User.js";
  

export const registration = async (req,res) =>{
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        
        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            roles: "USER", 
            password: hash,
            imageUrl: req.body.imageUrl
        })

        const user = await doc.save()
        
        const token = jwt.sign({ 
            _id: user._id,
        }, 
        "qwerty",
        {
            expiresIn: "30d",
        }
        ) 
        
        const {passwordHash, ...userData} = user._doc

        res.s
 
        res.json({...userData, token})
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегестрироваться"
        })
    }
}

export const login = async (req, res) =>{
    try{
        const user = await UserModel.findOne({username: req.body.username})

        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден",
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password)

        if(!isValidPass){
            return res.status(400).json({
                message: "Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 
        "qwerty",
        {
            expiresIn: "30d",
        }
        )

        const {password, ...userData} = user._doc

        res.json({...userData, token})

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось войти"
        })
    }
}


export const getAll = async (req, res) =>{
    try{
        res.json({
            message: "Good"
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Bad"
        }) 
    }
}

export const getMe = async (req, res) =>{
    try {
            const user = await UserModel.findById(req.userId)

            if(!user){
                return res.status(404).json({
                    message: "Юзер не найден"
                })
            }
            const {password, ...userData} = user._doc

            res.json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        })
    }
}