import Cards from "../Cards/Cards"
import Iniciales from "../Iniciales/Iniciales"
import Button from "../Button/Button"

export default function UserInfo(){
    return(
       <Cards>
        <Iniciales/>
        <h1></h1>
        <h2></h2>
        <Button>Ver mi perfil</Button>
       </Cards>
    )
}