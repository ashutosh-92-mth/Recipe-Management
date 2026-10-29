import { Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'
import { Footer } from './Home'
export default function Favorites() {
  const { favorites, recipes } = useRecipes()
  const saved = favorites.map(item => recipes.find(recipe => recipe.id === item.id) || { ...item, description: 'A lovely recipe saved for another delicious day.', ingredients: [], instructions: [], cuisine: 'Kitchen favorite' })
  return <><main className="favorites-page page-container"><div className="favorites-heading"><span className="eyebrow">YOUR PERSONAL COLLECTION</span><h1>Recipes to <em>make again.</em></h1><p>The recipes you have saved for another delicious day.</p></div>{saved.length ? <div className="recipe-grid">{saved.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}</div> : <div className="empty-state favorites-empty"><span className="empty-icon">♡</span><h2>A little room for something lovely.</h2><p>Tap the heart on any recipe and it will be waiting here for you.</p><Link className="button button-primary" to="/recipes">Find a favorite <span>→</span></Link></div>}</main><Footer /></>
}
