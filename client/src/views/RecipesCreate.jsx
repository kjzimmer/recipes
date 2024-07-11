import { recipeServices } from "../services/recipe.services"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { RecipeForm } from "../componentsV2/RecipeForm"

export function RecipesCreate() {

    const createPage = true

    return(
        <>
            <h1>Create Recipe</h1>
            <RecipeForm service={recipeServices.create} page={createPage} />
        </>
    )
}