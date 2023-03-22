import styled from "styled-components"
import { IconButton } from "@material-ui/core"

export const Wrapper = styled.div`
    margin: 40px;
`

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 10;
    top: 20px;
    right: 20px;
`