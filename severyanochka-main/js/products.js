import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs"

const discountProductsEl = document.querySelector(".discount-products")
const newProductsEl = document.querySelector(".new-products")
const soldBeforeProductsEl = document.querySelector(".sold-before-products")

const mockProducts = [
  {
    id: 1,
    title: "Г/Ц Блинчики с мясом вес, Россия",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/01.jpg",
    discount: "-50%",
    rating: 2, // 0 - 5
  },
  {
    id: 2,
    title: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/02.png",
    discount: "-50%",
    rating: 3, // 0 - 5
  },
  {
    id: 3,
    title: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/03.png",
    discount: "-50%",
    rating: 5, // 0 - 5
  },
  {
    id: 4,
    title: "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/04.png",
    discount: "-50%",
    rating: 4, // 0 - 5
  },
  {
    id: 1,
    title: "Г/Ц Блинчики с мясом вес, Россия",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/01.jpg",
    discount: "-50%",
    rating: 2, // 0 - 5
  },
  {
    id: 2,
    title: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/02.png",
    discount: "-50%",
    rating: 3, // 0 - 5
  },
  {
    id: 3,
    title: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/03.png",
    discount: "-50%",
    rating: 5, // 0 - 5
  },
  {
    id: 4,
    title: "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
    priceWithCard: "44,50 ₽",
    price: "50,50 ₽",
    image: "img/products/04.png",
    discount: "-50%",
    rating: 4, // 0 - 5
  },
]

function renderProducts(products, productsEl) {
  products.map(product => {
    const productEl = document.createElement("li")

    productEl.classList.add("products__item", "product", "swiper-slide")
    productEl.innerHTML = productTemplate(product)

    productsEl.appendChild(productEl)
  })
}

function productTemplate(product) {
  let rating = product.rating
  const ratingHTML = `
	${Array.from({ length: 5 })
    .map(() => {
      rating--

      return `<img src='img/icons/products/star${
        rating >= 0 ? "-active" : ""
      }.svg' alt='★' />`
    })
    .join("")}`

  return `
<div class="product__header">
	<img
		class="product__image"
		src="${product.image}"
		alt="${product.title}"
	/>
	<div class="product__tags">
		<button type="button" class="product__favourite">
			<img src="img/icons/products/heart.svg" alt="❤" />
		</button>
		${product.discount ? `<div class="product__tag">${product.discount}</div>` : ""}
	</div>
</div>
<div class="product__body">
	<ul class="product__price product-price">
		<li class="product-price__item">
			<span class="product-price__price product-price--large"
				>${product.priceWithCard}</span
			>
			<span class="product-price__subtitle">С картой</span>
		</li>
		<li class="product-price__item">
			<span class="product-price__price">${product.price}</span>
			<span class="product-price__subtitle">Обычная</span>
		</li>
	</ul>
	<h3 class="product__title">
		${product.title}
	</h3>
</div>
<div class="product__footer">
	<div class="product__rating">
		${ratingHTML}
	</div>
	<button
		class="product__button button button-outline"
		type="button"
	>
		В корзину
	</button>
</div>
`
}

renderProducts(mockProducts, discountProductsEl)
renderProducts(mockProducts, newProductsEl)
renderProducts(mockProducts, soldBeforeProductsEl)

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
