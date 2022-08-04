
const getMealById = async (mealID) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    
    const addMealToDOM = (meal) => {
      const ingredients = []
    
      for (let i = 1; i <= 10; i ++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
          break
        }
      }
      
      resultHeading.innerHTML = ''
      mealsEl.innerHTML = ''
      single_mealEl.innerHTML = `
        <div class="single-meal">
          <h1>${meal.strMeal}</h1>
          <div class="single-meal-info">
            ${meal.strCategory ? `<p>음식 분류 : ${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>국가 : ${meal.strArea}</p>` : ''}
          </div>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    
          <div class="main">
            <h2>조리방법</h2>
            <br>
            <span><h3>재료</h3></span>
            <ul>
              ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <br>
            <div>${meal.strInstructions}</div>
    
          </div>
        </div>
      `
    }
      
    ////////////////////////////////////////////////////////////////////////////////
      if (response.status === 200) {
      const data = await response.json()
      const meal = await data.meals[0]
      addMealToDOM(meal)
    } else {
      throw new Error('Unable to fetch ID')
    }
  }
  

  mealsEl.addEventListener('click', (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    const mealInfo = path.find(item => {
      if (item.classList) {
        return item.classList.contains('meal-info')
      } else {
        return false
      }
    })
  
    if (mealInfo) {
      const mealID = mealInfo.getAttribute('data-mealID')
      getMealById(mealID)
    }
  })
