import Product from "@models/product"
import { type Response, type Request } from "express"
import { ObjectId } from "mongodb"

export class ProductController {

  static async getBasedOnName(name: string) {
    // retrieve product based on ID
    let product = await Product.findOne({ "name": name }).exec()

    // check if product data is correct
    if (product !== null) {
      return null
    }

    // return product
    return product
  }

  static async getAll(_: Request, res: Response) {
    // get all products
    let products = await Product.find()

    // return products
    return res.status(200).json(products)
  }

  static async createOne(req: Request, res: Response) {
    // get request body with data
    let reqBody = req.body

    // create instance of product
    let product = new Product(reqBody)

    // check if body format is correct
    if (!(product.name)) {
      return res.status(401).json({
        document: product,
        is_stored: false
      })
    }

    // activate product
    product.active = true

    // save product into DB
    product.save()

    // return response with success status and request body
    return res.status(201).json({
      document: product,
      is_stored: true
    })
  }

  static async getOne(req: Request, res: Response) {
    // get id from url
    const { id } = req.params

    // build id
    const idObject = new ObjectId(id)

    // get one product from DB 
    const product = await Product.findOne({ '_id': idObject })

    // check if product was found
    if (!product) {
      return res.status(404).json({ error: "Product wasn't found" })
    }

    // return data
    return res.status(200).json(product)
  }

  static async getOneName(req: Request, res: Response) {
    // get id from url
    const { name } = req.params

    // get one product from DB 
    const product = await ProductController.getBasedOnName(name)

    // check if product was found
    if (!product) {
      return res.status(404).json({ error: "Product wasn't found" })
    }

    // return data
    return res.status(200).json(product)
  }
}

export default ProductController
