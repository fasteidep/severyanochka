const productsData = [
    {
      id: 1,
      title: "Г/Ц Блинчики с мясом вес, Россия",
      priceWithCard: "44,50 ₽",
      price: "50,50 ₽",
      image: "img/products/01.jpg",
      discount: "-50%",
      rating: 2,
      tags: ["еда", "блины", "блинчики"]
    },
    {
      id: 2,
      title: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
      priceWithCard: "44,50 ₽",
      price: "50,50 ₽",
      image: "img/products/02.png",
      discount: "-50%",
      rating: 3,
      tags: ["молочные продукты", "молоко"]
    },
    {
      id: 3,
      title: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
      priceWithCard: "44,50 ₽",
      price: "50,50 ₽",
      image: "img/products/03.png",
      discount: "-50%",
      rating: 5,
      tags: ["мясо", "колбаса"]
    },
    {
      id: 4,
      title: "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
      priceWithCard: "44,50 ₽",
      price: "50,50 ₽",
      image: "img/products/04.png",
      discount: "-50%",
      rating: 4,
      tags: ["мясо", "сосиски"]
    }
];
const productsList = document.querySelector('.products-searched-list');

function renderSearchResults(products) {
  productsList.innerHTML = ''; // Очищаем список
  
  products.forEach(product => {
    const productEl = document.createElement('li');
    productEl.classList.add('product');
    productEl.innerHTML = `
      <div class="product__header">
        <img class="product__image" src="${product.image}" alt="${product.title}">
        <div class="product__tags">
          <button type="button" class="product__favourite">
            <img src="img/icons/products/heart.svg" alt="❤">
          </button>
          ${product.discount ? `<div class="product__tag">${product.discount}</div>` : ''}
        </div>
      </div>
      <div class="product__body">
        <ul class="product__price product-price">
          <li class="product-price__item">
            <span class="product-price__price product-price--large">${product.priceWithCard}</span>
            <span class="product-price__subtitle">С картой</span>
          </li>
          <li class="product-price__item">
            <span class="product-price__price">${product.price}</span>
            <span class="product-price__subtitle">Обычная</span>
          </li>
        </ul>
        <h3 class="product__title">${product.title}</h3>
      </div>
      <div class="product__footer">
        <div class="product__rating">
        ${Array.from({ length: 5 }, (_, i) => 
          `<img src="img/icons/products/star${i < product.rating ? '-active' : ''}.svg" alt="★">`
        ).join('')}        
        </div>
        <button class="product__button button button-outline" type="button">
          В корзину
        </button>
      </div>
    `;
    productsList.appendChild(productEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('term')?.toLowerCase().trim() || '';

  document.querySelector('.request-name-input').textContent = `"${decodeURIComponent(searchTerm)}"`;

  const filteredProducts = productsData
    .map(product => {
      const titleLower = product.title.toLowerCase();
      let priority = -1;

      if (titleLower === searchTerm) {
        priority = 3; // Полное совпадение
      } else if (titleLower.startsWith(searchTerm)) {
        priority = 2; // Начинается с искомого слова
      } else if (titleLower.includes(searchTerm)) {
        priority = 1; // Просто содержит
      }

      return { ...product, priority };
    })
    .filter(product => product.priority > 0) // Исключаем неподходящие товары
    .sort((a, b) => b.priority - a.priority); // Сортируем по приоритету

  renderSearchResults(filteredProducts);
});
