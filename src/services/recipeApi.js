const BASE = 'https://www.themealdb.com/api/json/v1/1/'
const cache = new Map()
async function request(path) {
  if (cache.has(path)) return cache.get(path)
  const response = await fetch(`${BASE}${path}`)
  if (!response.ok) throw new Error('Recipe service is taking a break. Showing your saved kitchen collection instead.')
  const data = await response.json(); cache.set(path, data); return data
}
export function transformMeal(meal) {
  const ingredients = Array.from({ length: 20 }, (_, index) => ({ name: meal[`strIngredient${index + 1}`]?.trim(), quantity: meal[`strMeasure${index + 1}`]?.trim() })).filter(item => item.name)
  const instructions = (meal.strInstructions || '').split(/\r?\n|\. (?=[A-Z])/).map(step => step.trim()).filter(Boolean).map(step => step.endsWith('.') ? step : `${step}.`)
  return { id: `meal-${meal.idMeal}`, apiId: meal.idMeal, title: meal.strMeal, description: `A delicious ${meal.strArea || 'homemade'} ${meal.strCategory || 'recipe'} to add to your table.`, image: meal.strMealThumb, category: meal.strCategory || 'Dinner', cuisine: meal.strArea || 'World', prepTime: 15, cookTime: 30, servings: 2, difficulty: 'Easy', ingredients, instructions, tags: meal.strTags?.split(',').filter(Boolean) || [], source: 'api' }
}
export async function searchMeals(term = '') { const data = await request(`search.php?s=${encodeURIComponent(term)}`); return (data.meals || []).map(transformMeal) }
export async function mealsByFirstLetter(letter) { const data = await request(`search.php?f=${encodeURIComponent(letter.slice(0, 1))}`); return (data.meals || []).map(transformMeal) }
export async function mealsByCategory(category) { const data = await request(`filter.php?c=${encodeURIComponent(category)}`); return data.meals || [] }
export async function getMeal(id) { const data = await request(`lookup.php?i=${encodeURIComponent(id)}`); return data.meals?.[0] ? transformMeal(data.meals[0]) : null }
export async function getCategories() { const data = await request('categories.php'); return data.categories || [] }
