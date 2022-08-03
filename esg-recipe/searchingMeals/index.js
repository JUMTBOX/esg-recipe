const search = document.getElementById('search'),
	submit = document.getElementById('submit'),
    resultHeading = document.getElementById('resultHeading'),
    mealsEl = document.getElementById('mealsEl');




const searchMeal = async (e) => {
  //we dont want to actually try to submit to a file
  //console.log("button click success");
  e.preventDefault();
  //Clear single meal
  //single_mealEl.innerHTML = ''

  //Get the search term
  const term = search.value;
  
  //Check for empty
  if (term.trim()) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json();
    //console.log(data.meals);


    if (data.meals === null) {
      resultHeading.innerHTML = '<p>There are no search results. Try again!<p>';
    } else {
        resultHeading.innerHTML = `<h2>'${term}' 검색결과: ${data.meals.length}건</h2>`;
        mealsEl.innerHTML = data.meals.map((meal => `
      <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
      `))
      .join('')
    }
    
    //Clear searchText
    search.value = ''
  } else {
    alert('검색어는 1자 이상 입력해주세요')
  }
}

//EventListener
submit.addEventListener('click', searchMeal);