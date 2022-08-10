const random = document.getElementById("random");

//fetch random meal from API
const getRandomMeal = async () => {
  //Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  if (response.status === 200) {
    const data = await response.json();
    const meal = await data.meals[0];
    addMealToDOM(meal);
  } else {
    throw new Error("Unable to fetch random meal");
  }
};

//Add meal to DOM
const addMealToDOM = meal => {
  const ingredients = [];

  for (let i = 1; i <= 10; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>분류 : ${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>국가 : ${meal.strArea}</p>` : ""}
      </div>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

      <div class="main">
        <h2>조리방법</h2>
        <span></span>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        <p>${meal.strInstructions}</p>

      </div>
    </div>
  `;
};

//EventListener
random.addEventListener("click", getRandomMeal);
