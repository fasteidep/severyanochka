import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs"

const articles_list_ = document.querySelector(".articles-list")
const articles = [
    {
        id:1,
        photo:"/img/articles/article_1.png",
        date:"05.03.2021",
        header:"Режим использования масок и перчаток на территории магазинов",
        discription:'Подробная информация о режимах использования масок и перчаток на территории магазинов "ЛЕНТА". Информация обновляется каждый будний день.'
    },
    {
        id:2,
        photo:"/img/articles/article_2.png",
        date:"05.03.2021",
        header:"Весеннее настроение для каждой",
        discription:'8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.'
    },
    {
        id:3,
        photo:"/img/articles/article_3.png",
        date:"22.02.2020",
        header:"ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
        discription:'Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!'
    },
    {
        id:4,
        photo:"/img/articles/article_1.png",
        date:"05.03.2021",
        header:"Режим использования масок и перчаток на территории магазинов",
        discription:'Подробная информация о режимах использования масок и перчаток на территории магазинов "ЛЕНТА". Информация обновляется каждый будний день.'
    },
    {
        id:5,
        photo:"/img/articles/article_2.png",
        date:"05.03.2021",
        header:"Весеннее настроение для каждой",
        discription:'8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.'
    },
    {
        id:6,
        photo:"/img/articles/article_3.png",
        date:"22.02.2020",
        header:"ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
        discription:'Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!'
    },
    
]
function renderArticles(articles_list, articlesEl) {
    articles_list.map(article => {
      const articleEl = document.createElement("li")
  
      articleEl.classList.add("article", "swiper-slide")
      articleEl.innerHTML = articleTemplate(article)
  
      articlesEl.appendChild(articleEl)
    })
}
function articleTemplate(article) {
    return `
    <img src="${article.photo}">
    <p class="date_article">${article.date}</p>
    <h2 class="header_article">${article.header}</h2>
    <p class="discription_article">${article.discription}</p>
    <a href="#" class="details_button_article ">Подробнее</a>
    `
}
renderArticles(articles, articles_list_)

// Swiper

const swiper = new Swiper(".swiper", {
  breakpoints: {
    300: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
})
