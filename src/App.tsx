import { useState } from "react"
import { useQuery } from "react-query"
import { Drawer } from "@material-ui/core"
import LinearProgress from "@material-ui/core"
import Grid from "@material-ui/core"
import Badge from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import { Wrapper } from "./App.styles"

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async () => {
  await (await fetch('https://fakestoreapi.com/products')).json()
}

const App = () => {
  return (
    <div className="App">
      
    </div>
  )
}

export default App