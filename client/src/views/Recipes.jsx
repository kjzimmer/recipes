import Carousel from 'react-bootstrap/Carousel';
import { ExampleRecipe } from '../components/ExampleRecipe';
import Button from 'react-bootstrap/esm/Button';
import {userServices} from '../services/services';
import { recipeServices } from '../services/recipe.services';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



export function Recipes() {
    const [recipes, setRecipes] = useState([])

    function getUsers(){
        userServices.getAll()
            .then(data => console.log('all users: ',data))
    }

    function createRecipe(){
        const recipe = {
            name:'test recipe',
            description: 'just testing services',
            servings:5,
            prepTime: 32,
            cookTime: 23
        }

        recipeServices.create(recipe)
        .then(res => console.log(res))
    }

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
            {/* Carousel for recipes */}
            {/* <Carousel className='recipeCarousel'>
                <Carousel.Item interval={5000}>
                    <ExampleRecipe />
                    <Carousel.Caption>
                        <h2>First slide label</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <ExampleRecipe />
                    <Carousel.Caption>
                        <h2>Second slide label</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <ExampleRecipe />
                    <Carousel.Caption>
                        <h2>Third slide label</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
        </div>
            {
                recipes.map( recipe => (
                    <div key={recipe.id}>
                        <p> {recipe.name} </p>
                        <Link to={`/recipes/${recipe.id}`}> Go to Recipe </Link>
                    </div>
                ) )
            }
    </>)
}