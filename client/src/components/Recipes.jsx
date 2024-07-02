import Carousel from 'react-bootstrap/Carousel';
import { ExampleRecipe } from './ExampleRecipe';
import Button from 'react-bootstrap/esm/Button';
import {allServices} from '../services/services';



export function Recipes() {
    function getUsers(){
        allServices.getAll()
            .then(data => console.log('all users: ',data))
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
    </>)
}