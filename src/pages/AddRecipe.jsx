import { Link, useNavigate, useParams } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'
import { useRecipes } from '../context/RecipeContext'
import { Footer } from './Home'
export default function AddRecipe() { const { id } = useParams(); const { recipes, addRecipe, updateRecipe } = useRecipes(); const navigate = useNavigate(); const editing = Boolean(id); const recipe = recipes.find(item => item.id === id); const missingRecipe = editing && !recipe
  function save(values) { const saved = editing ? (updateRecipe(id, values), recipe) : addRecipe(values); navigate(`/recipes/${saved.id}`, { state: { notice: editing ? 'Recipe updated — nice work.' : 'Recipe saved — happy cooking!' } }) }
  if (editing && recipe && !recipe.id.startsWith('user-')) return <main className="empty-state"><h1>This recipe is read-only.</h1><Link to={`/recipes/${id}`}>Back to recipe</Link></main>
  return <><main className="add-page page-container"><div className="add-heading"><span className="eyebrow">{editing ? 'A LITTLE UPDATE' : 'ADD SOMETHING DELICIOUS'}</span><h1>{editing ? <>Make it <em>your own.</em></> : <>Share a recipe <em>with your future self.</em></>}</h1><p>Save the ingredients and steps so your next cooking session is easy.</p></div>{missingRecipe ? <div className="empty-state"><p>That personal recipe could not be found.</p><Link to="/recipes?mine=1">See my recipes</Link></div> : (!editing || recipe) && <RecipeForm initial={recipe} onSave={save} submitLabel={editing ? 'Save changes' : 'Save recipe'} />}</main><Footer /></>
}
