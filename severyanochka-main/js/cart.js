
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.querySelectorAll(".cart__item");
    const selectAllButton = document.querySelector(".cart__select");
    const deleteSelectedButton = document.querySelector(".cart__delete");
    const totalPriceElement = document.querySelector(".control-cart__amount-value");
    const totalItemsElement = document.querySelector(".control-cart__item-title");
    const discountElement = document.querySelector(".control-cart__item-value--highlighted");
    const bonusElement = document.querySelector(".control-cart__getting-bonus");
    const alertElement = document.querySelector(".control-cart__alert");
  
    let selectedItems = [];
    let totalPrice = 0;
    let totalItems = 0;
    let totalDiscount = 0;
  
    function updateTotals() {
      totalPrice = 0;
      totalItems = 0;
      totalDiscount = 0;
  
      cartItems.forEach((item) => {
        if (item.querySelector(".item-cart__selector").classList.contains("active")) {
          const priceWithCard = parseFloat(
            item
              .querySelector(".item-cart__price-with-card span")
              .textContent.replace(",", ".")
          );
          const quantity = parseInt(
            item.querySelector(".item-cart__counter-value").textContent
          );
          const discount = parseFloat(
            item
              .querySelector(".item-cart__discount")
              .getAttribute("data-discount")
              .replace("%", "")
          );
  
          totalPrice += priceWithCard * quantity;
          totalItems += quantity;
          totalDiscount += (priceWithCard * quantity * discount) / 100;
        }
      });
  
      totalPriceElement.textContent = `${(totalPrice - totalDiscount).toFixed(2)} ₽`;
      totalItemsElement.textContent = `${totalItems} товара`;
      discountElement.textContent = `-${totalDiscount.toFixed(2)} ₽`;
      bonusElement.textContent = `Вы получаете ${Math.floor(totalPrice / 10)} бонусов`;
  
      if (totalPrice < 1000) {
        alertElement.style.display = "block";
      } else {
        alertElement.style.display = "none";
      }
    }
  
    selectAllButton.addEventListener("click", function () {
      const isActive = selectAllButton.classList.toggle("active");
      cartItems.forEach((item) => {
        item.querySelector(".item-cart__selector").classList.toggle("active", isActive);
      });
      updateTotals();
    });
  
    deleteSelectedButton.addEventListener("click", function () {
      cartItems.forEach((item) => {
        if (item.querySelector(".item-cart__selector").classList.contains("active")) {
          item.remove();
        }
      });
      updateTotals();
    });
  
    cartItems.forEach((item) => {
      const selector = item.querySelector(".item-cart__selector");
      const reduceButton = item.querySelector(".item-cart__counter-reduce");
      const increaseButton = item.querySelector(".item-cart__counter-increase");
      const counterValue = item.querySelector(".item-cart__counter-value");
      const priceElement = item.querySelector(".item-cart__price");
  
      selector.addEventListener("click", function () {
        selector.classList.toggle("active");
        updateTotals();
      });
  
      reduceButton.addEventListener("click", function () {
        let value = parseInt(counterValue.textContent);
        if (value > 1) {
          value--;
          counterValue.textContent = value;
          updateTotals();
        }
      });
  
      increaseButton.addEventListener("click", function () {
        let value = parseInt(counterValue.textContent);
        value++;
        counterValue.textContent = value;
        updateTotals();
      });
    });
  
    updateTotals();
  });