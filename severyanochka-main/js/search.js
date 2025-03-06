const data = [
  "Г/Ц Блинчики с мясом вес, Россия",
  "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
  "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
  "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
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
        // Автоматический поиск при клике на подсказку
        window.location.href = `search-results.html?term=${encodeURIComponent(item)}`;
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

document.querySelector('.header__search').addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm) {
    window.location.href = `search-results.html?term=${encodeURIComponent(searchTerm)}`;
  }
  suggestions.style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header__search')) {
    suggestions.style.display = 'none';
  }
});

restoreInputValue();