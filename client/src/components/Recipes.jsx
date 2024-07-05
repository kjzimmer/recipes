import Carousel from 'react-bootstrap/Carousel';
import { ExampleRecipe } from './ExampleRecipe';
import Button from 'react-bootstrap/esm/Button';
import {userServices} from '../services/services';
import { recipeServices } from '../services/recipe.services';



export function Recipes() {
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

    return(<>
        <div>
            <h1>Show all recipes</h1>
            <Carousel className='recipeCarousel'>
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
            </Carousel>
        </div>
        <Button onClick={getUsers}>get all users (just for testing...check the console)</Button>
        <Button onClick={createRecipe}>create recipe (just for testing...check the console)</Button>
    </>)
}