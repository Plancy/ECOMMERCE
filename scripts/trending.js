/* filepath: e:\IT Step Academy\JavaScript\31 - Робота у команді\Ecommerce\scripts\trending.js */
// 🔹 Элементы для работы с трендинг секцией
const filterBtns = document.querySelectorAll('.filter-btn');
const productsContainer = document.querySelector('.trending-products');

// 🔹 Дані товарів
const productsData = {
  shorts: [
    { img: './img/images/shorts_black_small.jpg', name: 'Training Shorts', price: '$42.50', category: 'shorts' },
    { img: './img/images/shorts_yellow_small.jpg', name: 'Pro Athlete Shorts', price: '$59.00', category: 'shorts' },
    { img: './img/images/shorts_blue_big.jpg', name: 'Running Shorts', price: '$39.99', category: 'shorts' },
    { img: './img/images/shorts_red_big.jpg', name: 'Performance Shorts', price: '$64.90', category: 'shorts' },
    { img: './img/images/shorts_white_small.jpg', name: 'Casual Shorts', price: '$34.90', category: 'shorts' },
    { img: './img/images/shorts_green_small.jpg', name: 'Outdoor Shorts', price: '$48.20', category: 'shorts' },
  ],

  hat: [
    { img: './img/images/hat_black_small.jpg', name: 'Training Cap', price: '$25.99', category: 'hat' },
    { img: './img/images/hat_blue_small.jpg', name: 'Running Hat', price: '$29.00', category: 'hat' },
    { img: './img/images/hat_yellow_big.jpg', name: 'Baseball Hat', price: '$45.00', category: 'hat' },
    { img: './img/images/hat_grey_big.jpg', name: 'Sport Visor', price: '$39.50', category: 'hat' },
    { img: './img/images/hat_white_small.jpg', name: 'Winter Beanie', price: '$22.50', category: 'hat' },
    { img: './img/images/hat_green_small.jpg', name: 'Outdoor Hat', price: '$31.90', category: 'hat' },
  ],

  jackets: [
    { img: './img/images/jacket_naviblue_small.jpg', name: 'Running Jacket', price: '$89.99', category: 'jackets' },
    { img: './img/images/jacket_blue_small.jpg', name: 'Training Jacket', price: '$92.50', category: 'jackets' },
    { img: './img/images/jacket_red_big.jpg', name: 'Pro Sports Jacket', price: '$120.00', category: 'jackets' },
    { img: './img/images/jacket_purple_big.jpg', name: 'Outdoor Jacket', price: '$150.00', category: 'jackets' },
    { img: './img/images/jacket_black_small.jpg', name: 'Casual Jacket', price: '$99.90', category: 'jackets' },
    { img: './img/images/jacket_purple_small.jpg', name: 'Performance Jacket', price: '$85.00', category: 'jackets' },
  ],

  shoes: [
    { img: './img/images/shoes_blue_1.jpg', name: 'Casual Shoe', price: '$225', category: 'shoes' },
    { img: './img/images/shoes_broun_1.jpg', name: 'Skateboard Shoe', price: '$125', category: 'shoes' },
    { img: './img/images/shoes_grey_big1.jpg', name: 'Skateboard Shoe', price: '$125', category: 'shoes' },
    { img: './img/images/shoes_red_big.jpg', name: 'Skateboard Shoe', price: '$125', category: 'shoes' },
    { img: './img/images/shoes_white_small.jpg', name: 'Basket Shoe', price: '$125', category: 'shoes' },
    { img: './img/images/shoes_high_small.jpg', name: 'Sportwear Shoe', price: '$159', category: 'shoes' },
  ],

  't-shirt': [
    { img: './img/images/tshirt_red_small.jpg', name: 'Running T-shirt', price: '$19.99', category: 't-shirt' },
    { img: './img/images/tshirt_blue_small.jpg', name: 'Training Tee', price: '$24.90', category: 't-shirt' },
    { img: './img/images/tshirt_pink_big.jpg', name: 'Casual T-shirt', price: '$34.00', category: 't-shirt' },
    { img: './img/images/tshirt_purple_big.jpg', name: 'Pro Athlete T-shirt', price: '$22.90', category: 't-shirt' },
    { img: './img/images/tshirt_yellow_small.jpg', name: 'Performance T-shirt', price: '$29.90', category: 't-shirt' },
    { img: './img/images/tshirt_limegreen_small.jpg', name: 'Outdoor T-shirt', price: '$27.50', category: 't-shirt' },
  ]
};

// 🔹 Продукт описания
const productDescriptions = {
  'Training Shorts': {
    description: 'Perfect for gym workouts and training sessions. Made with breathable fabric.',
    specs: ['Material: Cotton blend', 'Waist: Elastic', 'Pockets: 2', 'Color: Black']
  },
  'Pro Athlete Shorts': {
    description: 'Professional-grade shorts designed for serious athletes.',
    specs: ['Material: Dri-Fit polyester', 'Fit: Athletic', 'Moisture-wicking', 'Color: Yellow']
  },
  'Training Cap': {
    description: 'Classic 6-panel cap perfect for training and casual wear.',
    specs: ['Material: Cotton twill', 'Closure: Velcro', 'Adjustable', 'Color: Black']
  },
  'Running Jacket': {
    description: 'Lightweight and windproof jacket for running and outdoor activities.',
    specs: ['Material: Nylon shell', 'Feature: Windproof', 'Water-resistant', 'Color: Navy Blue']
  },
  'Casual Shoe': {
    description: 'Comfortable casual shoes perfect for everyday wear.',
    specs: ['Material: Mesh & Rubber', 'Size: Various', 'Breathable design', 'Color: Blue']
  },
  'Running T-shirt': {
    description: 'Lightweight performance t-shirt for running and sports.',
    specs: ['Material: Polyester', 'Moisture-wicking', 'Quick-dry', 'Color: Red']
  }
};

// 🔹 Модальное окно элементы
const productModal = document.getElementById('productModal');
const modalClose = document.querySelector('.product-modal-close');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductSpecs = document.getElementById('modalProductSpecs');
const modalAddToCart = document.getElementById('modalAddToCart');

// 🔹 Функція створення товару
function createProductCard(item) {
  return `
    <div class="product-card" data-category="${item.category}">
      <div class="product-image-container">
        <img src="${item.img}" alt="${item.name}" class="product-image">

      </div>
      <div class="product-info">
        <h3 class="product-title">${item.name}</h3>
        <p class="product-price">${item.price}</p>
        <button class="product-view-btn" data-product='${JSON.stringify(item)}'>View more</button>
      </div>
    </div>
  `;
}

// 🔹 Открытие модального окна
function openProductModal(product) {
  const productInfo = productDescriptions[product.name] || {
    description: 'High-quality product with excellent features.',
    specs: ['Material: Premium quality', 'Color: Various', 'Size: Available']
  };

  modalProductImage.src = product.img;
  modalProductImage.alt = product.name;
  modalProductTitle.textContent = product.name;
  modalProductPrice.textContent = product.price;
  modalProductDescription.textContent = productInfo.description;

  modalProductSpecs.innerHTML = productInfo.specs
    .map(spec => `<li>${spec}</li>`)
    .join('');

  productModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// 🔹 Закрытие модального окна
function closeProductModal() {
  productModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// 🔹 Обработка кликов
document.addEventListener('click', (e) => {
  // View more кнопка
  if (e.target.classList.contains('product-view-btn')) {
    try {
      const productData = JSON.parse(e.target.getAttribute('data-product'));
      openProductModal(productData);
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }

  // favorite
  if (e.target.closest('.favorite-btn')) {
    const favoriteBtn = e.target.closest('.favorite-btn');
    favoriteBtn.classList.toggle('active');
  }
});

// 🔹 Закриття модального вікна на кліку
modalClose?.addEventListener('click', closeProductModal);

productModal?.addEventListener('click', (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

// 🔹 Закриття Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal.style.display === 'flex') {
    closeProductModal();
  }
});

// 🔹 Відображення товарів
function renderProducts(category) {
  const items = productsData[category] || productsData.shoes;
  if (productsContainer) {
    productsContainer.innerHTML = items.map(item => createProductCard(item)).join('');
    console.log(`Rendered ${items.length} products for category: ${category}`);
  }
}

// 🔹 Перемикання фільтрів
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Забираємо активний клас у всіх кнопок
    filterBtns.forEach(b => b.classList.remove('active'));
    // Додаємо активний клас до натиснутої кнопки
    btn.classList.add('active');

    // Получаем категорию из data-filter
    const category = btn.getAttribute('data-filter');
    renderProducts(category);
  });
});

// 🔹 Ждем повного завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  // Перевірка, чи існує контейнер
  if (!productsContainer) {
    console.error('Products container not found');
    return;
  }

  // 🔹 Ініціалізація з категорією взуття
  console.log('Initializing trending section...');
  renderProducts('shoes');
});

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites();
    this.favoritesIcon = document.getElementById('favoritesIcon');
    this.favoritesBadge = document.getElementById('favoritesBadge');
    this.favoritesModal = document.getElementById('favoritesModal');
    this.favoritesModalClose = document.querySelector('.favorites-modal-close');
    this.favoritesGrid = document.getElementById('favoritesGrid');
    this.favoritesCountBadge = document.getElementById('favoritesCountBadge');

    this.initEventListeners();
    this.updateBadge();
  }

  initEventListeners() {
    this.favoritesIcon?.addEventListener('click', () => this.openFavoritesModal());
    this.favoritesModalClose?.addEventListener('click', () => this.closeFavoritesModal());

    this.favoritesModal?.addEventListener('click', (e) => {
      if (e.target === this.favoritesModal) {
        this.closeFavoritesModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.favoritesModal?.style.display === 'flex') {
        this.closeFavoritesModal();
      }
    });
  }

  loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  addToFavorites(product) {
    const existingIndex = this.favorites.findIndex(item =>
      item.name === product.name && item.category === product.category
    );

    if (existingIndex === -1) {
      this.favorites.push({
        ...product,
        addedAt: new Date().toISOString()
      });
      this.saveFavorites();
      this.updateBadge();
      return true;
    }
    return false;
  }

  removeFromFavorites(product) {
    const index = this.favorites.findIndex(item =>
      item.name === product.name && item.category === product.category
    );

    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.updateBadge();
      this.renderFavorites();
      return true;
    }
    return false;
  }

  isInFavorites(product) {
    return this.favorites.some(item =>
      item.name === product.name && item.category === product.category
    );
  }

  updateBadge() {
    const count = this.favorites.length;
    if (count > 0) {
      this.favoritesBadge.textContent = count;
      this.favoritesBadge.style.display = 'flex';
    } else {
      this.favoritesBadge.style.display = 'none';
    }
  }

  openFavoritesModal() {
    this.renderFavorites();
    this.favoritesModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeFavoritesModal() {
    this.favoritesModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  renderFavorites() {
    if (this.favorites.length === 0) {
      this.favoritesGrid.innerHTML = `
        <div class="favorites-empty">
          <div class="favorites-empty-icon">💝</div>
          <h3>Список порожній</h3>
          <p>Додайте товари в обране, щоб вони з'явилися тут</p>
        </div>
      `;
      this.favoritesCountBadge.textContent = '0 товарів';
    } else {
      this.favoritesCountBadge.textContent = `${this.favorites.length} товарів`;
      this.favoritesGrid.innerHTML = this.favorites.map(item => `
        <div class="favorite-card">
          <div class="favorite-card-image">
            <img src="${item.img}" alt="${item.name}">
            <button class="favorite-card-remove" onclick="favoritesManager.removeFromFavorites(${JSON.stringify(item).replace(/"/g, '&quot;')})">
              ×
            </button>
          </div>
          <div class="favorite-card-info">
            <h3 class="favorite-card-title">${item.name}</h3>
            <p class="favorite-card-price">${item.price}</p>
            <div class="favorite-card-actions">
              <button class="favorite-card-view" onclick="favoritesManager.viewProduct(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                View More
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  viewProduct(product) {
    this.closeFavoritesModal();
    openProductModal(product);
  }
}

const favoritesManager = new FavoritesManager();

// 🔹 Обробка кліків
document.addEventListener('click', (e) => {
  // View more кнопка
  if (e.target.classList.contains('product-view-btn')) {
    try {
      const productData = JSON.parse(e.target.getAttribute('data-product'));
      openProductModal(productData);
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }

  // Вибране у картці товару
  if (e.target.closest('.favorite-btn')) {
    const favoriteBtn = e.target.closest('.favorite-btn');
    const productCard = favoriteBtn.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image').src;
    const productCategory = productCard.getAttribute('data-category');

    const product = {
      name: productTitle,
      price: productPrice,
      img: productImage,
      category: productCategory
    };

    if (favoritesManager.isInFavorites(product)) {
      favoritesManager.removeFromFavorites(product);
      favoriteBtn.classList.remove('active');
    } else {
      favoritesManager.addToFavorites(product);
      favoriteBtn.classList.add('active');
    }
  }

  // Вибране у модальному вікні
  if (e.target.closest('.product-modal-favorite')) {
    const modalTitle = document.getElementById('modalProductTitle').textContent;
    const modalPrice = document.getElementById('modalProductPrice').textContent;
    const modalImage = document.getElementById('modalProductImage').src;

    // + категорію з поточного активного фільтра
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter ? activeFilter.getAttribute('data-filter') : 'shoes';

    const product = {
      name: modalTitle,
      price: modalPrice,
      img: modalImage,
      category: category
    };

    const favoriteBtn = e.target.closest('.product-modal-favorite');

    if (favoritesManager.isInFavorites(product)) {
      favoritesManager.removeFromFavorites(product);
      favoriteBtn.innerHTML = `
        <img src="./img/icon/heart_outline.svg" alt="Favorite">
        Add to Favorites
      `;
    } else {
      favoritesManager.addToFavorites(product);
      favoriteBtn.innerHTML = `
        <img src="./img/icon/heart_outline.svg" alt="Favorite" style="filter: hue-rotate(340deg) saturate(2) brightness(1.2);">
        Remove from Favorites
      `;
    }
  }
});

function itemMatchesColor(item, colorKey) {
  if (!colorKey) return true;
  const src = (item.img || '').toLowerCase();
  const name = (item.name || '').toLowerCase();

  let specColor = '';
  const specs = (productDescriptions[item.name]?.specs) || [];
  const colorSpec = specs.find(s => /color\s*:/i.test(s));
  if (colorSpec) {
    specColor = colorSpec.split(':')[1]?.trim().toLowerCase() || '';
  }

  const haystack = `${src} ${name} ${specColor}`;

  const synonyms = {
    red: ['red'],
    green: ['green'],
    yellow: ['yellow'],
    purple: ['purple'],
    pink: ['pink'],
    white: ['white'],
    black: ['black'],
    limegreen: ['limegreen'],
    navyblue: ['naviblue', 'navy'],
    gray: ['gray', 'grey'],
    brown: ['brown', 'broun'],
    blue: ['blue']
  };

  const keys = synonyms[colorKey] || [colorKey];
  return keys.some(k => haystack.includes(k));
}

function renderProducts(category, colorFilter) {
  const all = productsData[category] || productsData.shoes;
  const items = colorFilter ? all.filter(item => itemMatchesColor(item, colorFilter)) : all;
  if (productsContainer) {
    productsContainer.innerHTML = items.map(item => createProductCard(item)).join('');

    setTimeout(() => {
      document.querySelectorAll('.product-card').forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (!favoriteBtn) return;
        const productTitle = card.querySelector('.product-title')?.textContent || '';
        const productCategory = card.getAttribute('data-category') || '';
        const product = { name: productTitle, category: productCategory };
        if (favoritesManager?.isInFavorites?.(product)) {
          favoriteBtn.classList.add('active');
        } else {
          favoriteBtn.classList.remove('active');
        }
      });
    }, 0);

    console.log(`Rendered ${items.length} products for category: ${category}${colorFilter ? `, color: ${colorFilter}` : ''}`);
  }
}

//-------подія на колір
let colourBatons = document.querySelectorAll(".buttons>div");
colourBatons.forEach(element => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let colorDiv = element.querySelector("div")
    let rgbcolor = getComputedStyle(colorDiv).backgroundColor;
    const colorMap = {
      'rgb(255, 0, 0)': 'red',
      'rgb(0, 128, 0)': 'green',
      'rgb(255, 255, 0)': 'yellow',
      'rgb(128, 0, 128)': 'purple',
      'rgb(255, 192, 203)': 'pink',
      'rgb(255, 255, 255)': 'white',
      'rgb(0, 0, 0)': 'black',
      'rgb(173, 255, 47)': 'limegreen',
      'rgb(0, 0, 128)': 'navyblue',
      'rgb(128, 128, 128)': 'gray',
      'rgb(165, 42, 42)': 'brown',
      'rgb(173, 216, 230)': 'blue'
    };
    const colourStr = colorMap[rgbcolor];

    const activeBtn = document.querySelector('.filter-btn.active');
    const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'shoes';

    renderProducts(category, colourStr);

    activeBtn?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  })
});
//-------
