import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import { recipeServices } from "../services/recipe.services";

export const BlankAdminPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault()

        const file = e.target.img.files[0]

        const formData = new FormData()
        formData.append('img', file)

        recipeServices.upload(formData)
            .then(res => img1.src='http://localhost:8000/api/recipes/image/' + file.name)   // for recipes, save the file name in the recipe DB
            .catch(error => console.log(error))
    }

    return (<>
        <h2>Blank Admin Page</h2>
        <p>Should not be able to gete here without authentication AND admin authorization</p>
        <p>See code in ProtectedAdminRoutes.jsx, PrivateRoutes where authorization check is performed</p>
        <p></p>

        <h2>file upload test example</h2>
        <Image src='' id='img1'/>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type='file'
                    placeholder='file'
                    name='img'
                // value={user.lastName}
                // onChange={updateInput}
                />
            </Form.Group>
            <Button type='submit' className='form'>
                Submit
            </Button>
        </Form>

    </>)
}