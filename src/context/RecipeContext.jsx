import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import sampleRecipes from '../data/recipes.json'

const RecipeContext = createContext(null)
const KEYS = { recipes: 'recipehub_user_recipes_v1', favorites: 'recipehub_favorites_v1', recent: 'recipehub_recent_v1' }
function read(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback } catch { return fallback } }

export function RecipeProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState(() => read(KEYS.recipes, []))
  const [favorites, setFavorites] = useState(() => read(KEYS.favorites, []))
  const [recent, setRecent] = useState(() => read(KEYS.recent, []))
  useEffect(() => localStorage.setItem(KEYS.recipes, JSON.stringify(userRecipes)), [userRecipes])
  useEffect(() => localStorage.setItem(KEYS.favorites, JSON.stringify(favorites)), [favorites])
  useEffect(() => localStorage.setItem(KEYS.recent, JSON.stringify(recent)), [recent])
  const recipes = useMemo(() => [...userRecipes, ...sampleRecipes], [userRecipes])
  const toggleFavorite = recipe => setFavorites(previous => previous.some(item => item.id === recipe.id) ? previous.filter(item => item.id !== recipe.id) : [{ id: recipe.id, title: recipe.title, image: recipe.image, category: recipe.category, prepTime: recipe.prepTime, cookTime: recipe.cookTime, difficulty: recipe.difficulty }, ...previous])
  const addRecipe = recipe => { const saved = { ...recipe, id: `user-${crypto.randomUUID()}`, createdAt: new Date().toISOString() }; setUserRecipes(previous => [saved, ...previous]); return saved }
  const updateRecipe = (id, updates) => setUserRecipes(previous => previous.map(recipe => recipe.id === id ? { ...recipe, ...updates } : recipe))
  const deleteRecipe = id => { setUserRecipes(previous => previous.filter(recipe => recipe.id !== id)); setFavorites(previous => previous.filter(item => item.id !== id)); setRecent(previous => previous.filter(item => item !== id)) }
  const trackRecent = useCallback(recipe => setRecent(previous => [recipe.id, ...previous.filter(id => id !== recipe.id)].slice(0, 8)), [])
  const value = { recipes, userRecipes, favorites, recent, toggleFavorite, addRecipe, updateRecipe, deleteRecipe, trackRecent }
  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useRecipes() { const context = useContext(RecipeContext); if (!context) throw new Error('useRecipes must be used within RecipeProvider'); return context }
