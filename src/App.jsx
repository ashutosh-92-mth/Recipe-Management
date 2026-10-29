import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecipeProvider } from './context/RecipeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import AddRecipe from './pages/AddRecipe'
import RecipeDetails from './pages/RecipeDetails'
import './App.css'

function NotFound() { return <main className="empty-state"><span className="eyebrow">A LITTLE DETOUR</span><h1>That page wandered off.</h1><a className="button button-primary" href="/">Back to the kitchen</a></main> }
export default function App() { return <RecipeProvider><BrowserRouter><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/recipes" element={<Home explorer />} /><Route path="/recipes/:id" element={<RecipeDetails />} /><Route path="/add-recipe" element={<AddRecipe />} /><Route path="/edit-recipe/:id" element={<AddRecipe />} /><Route path="/favorites" element={<Favorites />} /><Route path="/my-recipes" element={<Navigate to="/recipes?mine=1" replace />} /><Route path="*" element={<NotFound />} /></Routes></BrowserRouter></RecipeProvider> }
