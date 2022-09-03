const loadNewsCategory = async () => {
      //start spinner
    toggleSpinner(true)
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
    loadSingeNews(newsCategory[7].category_id)
    newsCategory.forEach(newsCategoryName => {
        // console.log(newsItem)
        const li = document.createElement('li');
        li.classList.add('li-list')
        li.innerHTML = `
            <button onclick="loadSingeNews('${newsCategoryName.category_id}')"
             class="">${newsCategoryName.category_name}</button>
        `
        menuCategory.appendChild(li)
    })
};


const loadSingeNews = async (categoryId) => {
    toggleSpinner(true)
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
    //sort
    newsInfos.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    //spinner
    toggleSpinner(true)
    // news length show ui
    const totalNews = document.getElementById('total-news');
    totalNews.innerHTML = `
    <p" class="text-[18px] font-[500]">
    ${newsInfos.length > 1 ? newsInfos.length + ' News Found ' : 'No News Found'}
     </p>
    `

    // show news
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsInfos.forEach(newsInfo => {
        const { thumbnail_url, _id, title, details, author, total_view, rating } = newsInfo;
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="card md:card-side items-center bg-base-100 shadow-xl mt-4 mb-8">
                    <figure><img src=${thumbnail_url} alt="Movie"></figure>
                    <div class="card-body">
                        <h2 class="card-title">${title}</h2>
                        <p>${details.slice(0, 300)} ...</p>
                        <div class="card-footer lg:flex items-center justify-between pt-3">
                            <div class="author flex items-center">
                                <img class="w-[40px] h-[40px] rounded-full mr-2.5" src=${author.img} alt="Movie">
                                <div>
                                <h5 class="mb-3">${author.name ? author.name : 'Not Found'}</h5>
                                <p class="mb-3"><small>${author.published_date}</small></p>
                                </div>
                            </div>
                            <div class="views mb-3">
                            <h4>View: ${total_view ? total_view : 'Not Found'}</h4>
                            </div>
                            <div class="rating mb-3">
                            <p>Rating: ${rating.number}</p>
                            </div>
                            <label onclick="showNewsDetails('${_id}')" for="my-modal-3" class="btn btn-primary modal-button ml-3">View Details</label>
                        </div>
                        
                    </div>
                </div>
            `
        newsContainer.appendChild(div)
    })
    // step loader
    toggleSpinner(false)
};


// load news details id/ url
const showNewsDetails = async (newsId) => {
    toggleSpinner(true)
    const url = ` https://openapi.programming-hero.com/api/news/${newsId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        NewsDetailsModal(data.data[0])
    } catch (error) {
        console.error(error)
    }
};

// show news details info on ui/display
const NewsDetailsModal = (newsDetail) => {
    const { thumbnail_url, title, details, author, total_view, rating } = newsDetail;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="inner-body mt-4 mb-4">
                <img class="detail-img" src=${thumbnail_url} alt="Movie">
                <h2 class="card-title">${title}</h2>S
                    <p>${details.slice(0, 300)} ...</p>
                    <div class="card-footer pt-3">
                        <div class="author flex items-center">
                            <img class="w-[40px] h-[40px] rounded-full mr-2.5" src=${author.img} alt="Movie">
                            <div>
                            <h5>${author.name ? author.name : 'Not Found'}</h5>
                            <p><small>${author.published_date}</small></p>
                            </div>
                        </div>
                        <div className="views pt-3">
                        <h4>View: ${total_view ? total_view : 'Not Found'}</h4>
                        </div>
                        <div className="rating pt-3">
                        <p>Rating: ${rating.number}</p>
                        </div>
                    </div>
            </div>
    `
    toggleSpinner(false)

};

//spinner function
const toggleSpinner = (isLoading) => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('hidden')
    } else {
        spinnerSection.classList.add('hidden')
    }

};



loadNewsCategory()