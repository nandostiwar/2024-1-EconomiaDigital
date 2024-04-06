import User from "@models/user"
import bcrypt from 'bcrypt';
import { type Response, type Request } from "express"
import { ObjectId } from "mongodb"

export class UserController {

  static async getBasedOnName(name: string) {
    // retrieve user based on ID
    let user = await User.findOne({ "name": name }).exec()

    // check if user data is correct
    if (user !== null && !(user.name && user.password && user.role)) {
      return null
    }

    // return user
    return user
  }

  static async getAll(_: Request, res: Response) {
    // get all users
    let users = await User.find()

    // return users
    return res.status(200).json(users)
  }


  static async authUser(req: Request, res: Response) {
    try {
      // get credentials from body
      const { name, password } = req.body;

      const user = await UserController.getBasedOnName(name);

      // Verify user existance
      if (!user || !user.password || !password || !user.active) {
        return res.status(401).json({ error: "Finding user with this data wasn't possible" });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Wrong credentials" });
      }

      // If the credentials are valid, create a JWT token
      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        throw new Error("Secret key not found in environment variables.");
      }

      // If credentials valid, return user data
      let userData = user

      // remove password from data
      delete user.password

      // return data to user
      return res.status(200).json({ data: userData });

    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async createOne(req: Request, res: Response) {
    // get request body with data
    let reqBody = req.body

    // create instance of user
    let user = new User(reqBody)

    // check if body format is correct
    if (!(user.name && user.password && user.role)) {
      return res.status(401).json({
        document: user,
        is_stored: false
      })
    }

    // activate user
    user.active = true

    // Hash the password
    const saltRounds = 10; // you can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    // save user into DB
    user.save()

    // return response with success status and request body
    return res.status(201).json({
      document: user,
      is_stored: true
    })
  }

  static async getOne(req: Request, res: Response) {
    // get id from url
    const { id } = req.params

    // build id
    const idObject = new ObjectId(id)

    // get one user from DB 
    const user = await User.findOne({ '_id': idObject })

    // check if user was found
    if (!user) {
      return res.status(404).json({ error: "User wasn't found" })
    }

    // store user data to other variable
    let userData = user

    // remove password from data
    delete userData.password

    // return data
    return res.status(200).json(userData)
  }


  static async getOneName(req: Request, res: Response) {
    // get id from url
    const { name } = req.params

    // get one user from DB 
    const user = await UserController.getBasedOnName(name)

    // check if user was found
    if (!user) {
      return res.status(404).json({ error: "User wasn't found" })
    }

    // store user data to other variable
    let userData = user

    // remove password from data
    delete userData.password

    // return data
    return res.status(200).json(userData)
  }
}

export default UserController
