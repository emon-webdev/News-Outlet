const loadNewsCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategory(data.data.news_category)
    } catch (error) {
        console.error(error)
    }
}


const displayNewsCategory = (newsCategory) => {
    const menuCategory = document.getElementById('menu-category');
    
    newsCategory.forEach(newsCategoryName => {
        // console.log(newsItem)
        const li = document.createElement('li');
        li.classList.add('li-list')
        li.innerHTML = `
            <a onclick="loadSingeNews('${newsCategoryName.category_id}')"
             class="">${newsCategoryName.category_name}</a>
        `
        menuCategory.appendChild(li)
    })
};


const loadSingeNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
      try{
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data)
    }catch(error){
        console.error(error)
    }
};


const displayNews = (newsInfo) => {
    console.log(newsInfo)
    
};







loadNewsCategory()