import { CartItemType } from "../App";
import { Wrapper } from "./Item.style";
import { Button } from "@material-ui/core";

type Props = {
    item: CartItemType
    handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h4>R${item.price}</h4>
        </div>
        <Button onClick={() => handleAddToCart(item)}>add to cart</Button>
    </Wrapper>
)

export default Item