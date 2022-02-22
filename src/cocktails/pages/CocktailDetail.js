import { useParams } from "react-router";
import Cocktail from "../Cocktail";

const CocktailDetail = ()=> {
    const params = useParams();

    return <section>
        <h1  style={{textAlign:'center',fontSize:'2rem'}}>Cocktail Detail</h1>
        <Cocktail id={params.cocktailId}/>
    </section>
}

export default CocktailDetail;