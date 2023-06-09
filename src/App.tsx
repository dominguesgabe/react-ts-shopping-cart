import { useState } from "react"
import { useQuery } from "react-query"
import { Drawer } from "@material-ui/core"
import { LinearProgress } from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import { Grid } from "@material-ui/core"
import { Badge } from "@material-ui/core"
import { Wrapper, StyledButton } from "./App.style"
import Cart from "./Cart/Cart"
import Item from "./Item/Item"

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItens, setCartItems] = useState([] as CartItemType[])

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item: CartItemType) => acc + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1  } : item
        ))
      }

      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc
          return [...acc, { ...item, amount: item.amount - 1}]
        } else {
          return [...acc, item]
        }
      }, [] as CartItemType[])
    ))
  }

  if (isLoading) return <LinearProgress />
  
  if (error) return <div>Ops, we had some error here.</div>

  return (
    <Wrapper>
      <Drawer anchor={"right"} open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItens}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItens)} color={"error"}>
            <AddShoppingCart />
          </Badge>
        </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        )))}
      </Grid>
    </Wrapper>
  )
}

export default App