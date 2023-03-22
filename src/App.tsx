import { useState } from "react"
import { useQuery } from "react-query"
import { Drawer } from "@material-ui/core"
import { LinearProgress } from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import { Grid } from "@material-ui/core"
import { Badge } from "@material-ui/core"
import { Wrapper, StyledButton } from "./App.styles"
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

  console.log(data)

  const getTotalItems = (items: CartItemType[]) => null

  const handleAddToCart = (clickedItem: CartItemType) => null

  const handleRemoveFromCart = () => null

  if (isLoading) return <LinearProgress />
  
  if (error) return <div>Ops, we had some error here.</div>

  return (
    <Wrapper>
      <Drawer anchor={"right"} open={cartOpen} onClose={() => setCartOpen(false)}>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItens)} color={"error"}>
            <AddShoppingCart />
          </Badge>
        </StyledButton>
      </Drawer>
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