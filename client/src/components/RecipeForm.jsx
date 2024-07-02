import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function RecipeForm() {
    return(
        <>
            {/* This is a sample form still subject to change */}
            <h1>Add a Recipe!</h1>
            <Form>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Recipe Name'/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type='text' placeholder='Author Name'/>
                    </Form.Group>
                </Row>
                <Row className='form'>
                    <Form.Group as={Col}>
                        <Form.Label>Prep Time</Form.Label>
                        <Form.Control type='number' placeholder='Prep Time (minutes)'/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Cook Time</Form.Label>
                        <Form.Control type='number' placeholder='Cook Time (minutes)'/>
                    </Form.Group>
                </Row>
                <Row className='recipeFormCheckbox'>
                    <Form.Group as={Col}>
                        <Form.Check type='checkbox' label='Dairy' />
                        <Form.Check type='checkbox' label='Eggs' />
                        <Form.Check type='checkbox' label='Shellfish' />
                        <Form.Check type='checkbox' label='Gluten' />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Check type='checkbox' label='Nuts' />
                        <Form.Check type='checkbox' label='Soy' />
                        <Form.Check type='checkbox' label='Sesame' />
                        <Form.Check type='checkbox' label='Fish' />
                    </Form.Group>
                </Row>
                <Form.Group className='form'>
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type='text' placeholder='Ingredients' />
                </Form.Group>

                <Form.Group className='form'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as='textarea' rows={4} placeholder='Notes (Step by Step)' />
                </Form.Group>

                <Button variant='primary' type='submit' className='form'>
                    Share Recipe
                </Button>
            </Form>
        </>
    )
}