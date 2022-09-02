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


const displayNewsCategory = (newsItems) => {
    console.log(newsItems)
    const menuCategory = document.getElementById('menu-category');
    
    newsItems.forEach(newsItem => {
        console.log(newsItem)
        const li = document.createElement('li');
        li.classList.add('li-list')
        li.innerHTML = `
            <a>${newsItem.category_name}</a>
        `
        menuCategory.appendChild(li)
        
    })
    
    
};


loadNewsCategory()