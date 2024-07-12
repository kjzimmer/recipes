import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import { recipeServices } from "../services/recipe.services";

export const BlankAdminPage = () => {

    function onFileSelected(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        img1.title = selectedFile.name;

        reader.onload = function (event) {
            img1.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const file = e.target.img.files[0]

        const formData = new FormData()
        formData.append('img', file)

        recipeServices.upload(formData)
            .then(res => img1.src = 'http://localhost:8000/api/recipes/image/' + file.name)   // for recipes, save the file name in the recipe DB
            .catch(error => console.log(error))
    }

    return (<>
        <h2>Blank Admin Page</h2>
        <p>Should not be able to gete here without authentication AND admin authorization</p>
        <p>See code in ProtectedAdminRoutes.jsx, PrivateRoutes where authorization check is performed</p>
        <p></p>

        <h2>display images from sesrver</h2>
        <h3>(http://localhost:8000/api/recipes/image/&lt;file name&gt;))</h3>
        <Image src='http://localhost:8000/api/recipes/image/food-1459693_1280.jpg' style={{width:300}} />
        <Image src='http://localhost:8000/api/recipes/image/food-3270461_1280.jpg' style={{width:300}} />
        <Image src='http://localhost:8000/api/recipes/image/pexels-gabby-k-7144445.jpg' style={{width:300}} />
        <Image src='http://localhost:8000/api/recipes/image/meal-1140371_1280.jpg' style={{width:300}} />
        <h2>upload a new image</h2>
        <h3>(uploads to server/documents))</h3>
        <Image src='http://localhost:8000/api/recipes/image/blank.jpg' style={{width:300}} id='img1' />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type='file'
                    placeholder='file'
                    name='img'
                // value={user.lastName}
                onChange={onFileSelected}
                />
            </Form.Group>
            <Button type='submit' className='form'>
                Upload
            </Button>
        </Form>

    </>)
}