import { recipeServices } from '../services/recipe.services';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';



export function Recipes() {
    const [recipes, setRecipes] = useState([])

    console.log('url: ', window.location.href)

    useEffect( () => {
        recipeServices.get()
        .then(res => {
            setRecipes(res)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    return(<>
        <div>
            <h1>Recipes</h1>
            <h2>Find your next family recipe</h2>
        </div>
        <div className='recipeCard_Holder'>
            {
                recipes.map( recipe => (
                    <Link key={recipe.id} to={`${window.location.href}/${recipe.id}`}>
                        <Card className='recipeCard' key={recipe.id}>
                            <Card.Title> {recipe.name} </Card.Title>
                            <Card.Text> {recipe.description} </Card.Text>
                        </Card>
                    </Link>
                ) )
            }
        </div>
    </>)
}