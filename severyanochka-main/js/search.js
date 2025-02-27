const data = [
  "Молоко Простоквашино 0,5",
  "Молоко Домик в деревне 1л",
  "Кефир Простоквашино 1л",
  "Сметана Домик в деревне 20%",
  "Йогурт Чудо клубничный",
  "Молочный коктейль Милка",
  "Г/Ц Блинчики с мясом вес, Россия",
  "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
  "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
  "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
  "Сыр Гауда President полутвердый сливочный 45% 200г",
  "Творог Домик в Деревне 5% 200г",
  "Масло сливочное Волоколамское 82,5% 180г",
  "Хлеб Бородинский нарезка 400г",
  "Яйцо куриное Светлое отборное 10шт",
  "Фарш говяжий мраморный охлажденный 500г",
  "Сок J7 апельсиновый прямого отжима 1л",
  "Печенье Юбилейное традиционное 300г",
  "Шоколад Alpen Gold молочный с орехами 100г",
  "Кофе Jacobs Monarch растворимый 95г",
  "Чай Greenfield английский классический 25 пакетиков",
  "Макароны Barilla перья №23 450г",
  "Рис Басмати Мистраль рассыпчатый 900г",
  "Сахар песок Россия 1кг",
  "Соль поваренная Экстра помол №1 1кг",
  "Масло подсолнечное Злато рафинированное 1л",
  "Вода минеральная Боржоми 0,75л",
  "Пиво Жигулевское светлое 4,5% 0,5л",
  "Салфетки бумажные Zewa Premium 2-слойные 100шт",
  "Средство для мытья посуды Fairy Лимон 500мл",
  "Шампунь Head&Shoulders против перхоти 400мл",
  "Зубная паста Colgate Тотал 100мл",
  "Мыло жидкое Dove увлажняющий уход 300мл",
  "Стиральный порошок Persil автомат 4,5кг",
  "Туалетная бумага Kleenex 3-слойная 8 рулонов",
  "Батарейки Duracell AA 4шт",
  "Лапша быстрого приготовления Доширак говяжий 90г"
];

const input = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

function saveInputValue(value) {
  localStorage.setItem('searchInputValue', value);
}

function restoreInputValue() {
  const savedValue = localStorage.getItem('searchInputValue');
  if (savedValue) {
    input.value = savedValue;
    showSuggestions(savedValue);
  }
}

input.addEventListener('input', function (e) {
  const value = e.target.value.trim();
  saveInputValue(value);

  suggestions.innerHTML = '';

  if (!value) {
    suggestions.style.display = 'none';
    return;
  }

  const filtered = data
    .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 5);

  if (filtered.length) {
    filtered.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = highlightMatch(item, value);
      div.addEventListener('click', () => {
        input.value = item;
        saveInputValue(item);
        suggestions.style.display = 'none';
      });
      suggestions.appendChild(div);
    });
    suggestions.style.display = 'block';
  } else {
    suggestions.style.display = 'none';
  }
});

function highlightMatch(text, match) {
  const regex = new RegExp(`(${escapeRegExp(match)})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function showSuggestions(value) {
  suggestions.innerHTML = '';
  if (!value) {
    suggestions.style.display = 'none';
    return;
  }

  const filtered = data
    .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 5);

  if (filtered.length) {
    filtered.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = highlightMatch(item, value);
      div.addEventListener('click', () => {
        input.value = item;
        saveInputValue(item);
        suggestions.style.display = 'none';
      });
      suggestions.appendChild(div);
    });
    suggestions.style.display = 'block';
  } else {
    suggestions.style.display = 'none';
  }
}

restoreInputValue();

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header__search')) {
    suggestions.style.display = 'none';
  }
});

document.querySelector('.header__search').addEventListener('submit', function (e) {
  e.preventDefault();
  suggestions.style.display = 'none';
});