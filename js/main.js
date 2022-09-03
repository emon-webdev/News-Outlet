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
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data)
    } catch (error) {
        console.error(error)
    }
};


const displayNews = (newsInfos) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsInfos.forEach(newsInfo => {
        const { thumbnail_url, title, details, author, total_view, rating } = newsInfo;
        console.log(newsInfo)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card card-side items-center bg-base-100 shadow-xl mt-4 mb-4">
                <figure><img src=${thumbnail_url} alt="Movie"></figure>
                <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.slice(0, 300)} ...</p>
                    <div class="card-footer flex items-center justify-between pt-3">
                        <div class="author flex items-center">
                            <img class="w-[40px] h-[40px] rounded-full mr-2.5" src=${author.img} alt="Movie">
                            <div>
                            <h5>${author.name}</h5>
                            <p><small>${author.published_date}</small></p>
                            </div>
                        </div>
                        <div className="views">
                        <h4>View: {${total_view}}</h4>
                        </div>
                        <div className="rating">
                        <p>Rating: ${rating.number}</p>
                        </div>
                        <img class="w-[20px] h-[18px] rounded-full mr-2.5" src="../images/arrow.png" alt="Movie">
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div)
    })
};







loadNewsCategory()