document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item-cart').forEach(item => {
        updateItemPrice(item);
    });

    document.querySelector('.cart__select').addEventListener('click', toggleSelectAll);
    
    document.querySelectorAll('.item-cart__selector').forEach(selector => {
        selector.addEventListener('click', function() {
            this.classList.toggle('active');
            checkAllSelected();
            updateTotal();
        });
    });

    document.querySelectorAll('.item-cart__counter-btn').forEach(button => {
        button.addEventListener('click', handleCounterClick);
    });

    document.querySelector('.cart__delete').addEventListener('click', deleteSelectedItems);

    document.querySelector('.switch').addEventListener('click', function() {
        this.classList.toggle('active');
        updateTotal();
    });

    updateTotal();
});

function toggleSelectAll() {
    const selectAllButton = this;
    const isActive = selectAllButton.classList.toggle('active');
    
    document.querySelectorAll('.item-cart:not(.out-of-stock) .item-cart__selector').forEach(selector => {
        selector.classList.toggle('active', isActive);
    });
    
    updateTotal();
}

function checkAllSelected() {
    const allSelectors = document.querySelectorAll('.item-cart:not(.out-of-stock) .item-cart__selector');
    const allSelected = [...allSelectors].every(s => s.classList.contains('active'));
    document.querySelector('.cart__select').classList.toggle('active', allSelected);
}

function handleCounterClick() {
    const counter = this.closest('.item-cart__counter');
    const valueElement = counter.querySelector('.item-cart__counter-value');
    let value = parseInt(valueElement.dataset.counter) || 0;
    
    if (this.classList.contains('item-cart__counter-increase')) {
        value++;
    } else {
        value = Math.max(1, value - 1);
    }
    
    valueElement.dataset.counter = value;
    updateItemPrice(this.closest('.item-cart'));
    updateTotal();
}

function updateItemPrice(item) {
    const price = parseFloat(
        item.querySelector('[data-price-with-card]').dataset.priceWithCard.replace(',', '.')
    );
    const quantity = parseInt(item.querySelector('.item-cart__counter-value').dataset.counter);
    const total = (price * quantity).toFixed(2);
    item.querySelector('.item-cart__price').textContent = `${total} ₽`;
}

function deleteSelectedItems() {
    document.querySelectorAll('.item-cart__selector.active').forEach(selector => {
        selector.closest('.cart__item').remove();
    });
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let discount = 0;
    let itemsCount = 0;

    document.querySelectorAll('.item-cart:not(.out-of-stock)').forEach(item => {
        const selector = item.querySelector('.item-cart__selector');
        if (!selector.classList.contains('active')) return;

        const price = parseFloat(
            item.querySelector('[data-price-with-card]').dataset.priceWithCard.replace(',', '.')
        );
        const regularPrice = parseFloat(
            item.querySelector('[data-price-without-card]').dataset.priceWithoutCard.replace(',', '.')
        );
        const quantity = parseInt(item.querySelector('.item-cart__counter-value').dataset.counter);
        
        total += price * quantity;
        discount += (regularPrice - price) * quantity;
        itemsCount += quantity;
    });

    const useBonus = document.querySelector('.switch').classList.contains('active');
    if (useBonus) {
        total = Math.max(0, total - 200);
    }

    document.querySelector('[data-counter="1"]').dataset.counter = itemsCount;
    document.querySelector('.control-cart__item-title').textContent = `${itemsCount} товара`;
    document.querySelector('.control-cart__item-value').textContent = `${total.toFixed(2)} ₽`;
    document.querySelector('.control-cart__item-value--highlighted').textContent = `-${discount.toFixed(2)} ₽`;
    document.querySelector('.control-cart__amount-value').textContent = `${total.toFixed(2)} ₽`;

    const alertElement = document.querySelector('.control-cart__alert');
    alertElement.style.display = total < 1000 ? 'block' : 'none';

    // Расчет бонусов
    const bonus = Math.floor(total / 2.5);
    document.querySelector('.control-cart__getting-bonus').innerHTML = `
        <img src="img/icons/cart/bonus.svg" alt="bonus">
        Вы получаете ${bonus} бонусов
    `;
}