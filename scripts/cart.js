document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartTableBody = document.querySelector('#cartTable tbody');
    const cartTotalEl = document.getElementById('cartTotal');
    const orderBtn = document.getElementById('orderBtn');
    const orderForm = document.getElementById('orderForm');
    const closeForm = document.getElementById('closeForm');
    const checkoutForm = document.getElementById('checkoutForm');
    const orderMessage = document.getElementById('orderMessage');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBuyBtn = document.getElementById('modalBuyBtn');
  
    let cart = [];
    let cartCount = 0;
  
 
    let cartOverlay = document.querySelector('.cart-overlay');
    if (!cartOverlay) {
      cartOverlay = document.createElement('div');
      cartOverlay.className = 'cart-overlay';
      document.body.appendChild(cartOverlay);
    }
  
    function formatPrice(n) {
      return Number(n).toFixed(2);
    }
  
    function updateCartBadge() {
      const cartIconEl = document.getElementById('cartIcon');
      if (!cartIconEl) return;
  
      
      let wrapper = cartIconEl.closest('.cart-icon-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('span');
        wrapper.className = 'cart-icon-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.lineHeight = '0';
        cartIconEl.parentNode.insertBefore(wrapper, cartIconEl);
        wrapper.appendChild(cartIconEl);
      }
  
   
      let badge = wrapper.querySelector('.cart-count');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-count';
        // styles
        badge.style.position = 'absolute';
        badge.style.top = '-6px';
        badge.style.right = '-6px';
        badge.style.minWidth = '18px';
        badge.style.height = '18px';
        badge.style.padding = '0 5px';
        badge.style.boxSizing = 'border-box';
        badge.style.background = '#ff3b30';
        badge.style.color = '#fff';
        badge.style.borderRadius = '9px';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = '600';
        badge.style.textAlign = 'center';
        badge.style.lineHeight = '18px';
        badge.style.display = 'none';
        wrapper.appendChild(badge);
      }
  
      if (cartCount > 0) {
        badge.textContent = cartCount;
        badge.style.display = 'inline-block';
        cartIconEl.style.filter = 'drop-shadow(0 0 6px rgba(255,59,48,0.6))';
        cartIconEl.setAttribute('aria-label', `Cart: ${cartCount} item(s)`);
        wrapper.title = `Cart: ${cartCount} item(s)`;
      } else {
        badge.textContent = '';
        badge.style.display = 'none';
        cartIconEl.style.filter = '';
        cartIconEl.removeAttribute('aria-label');
        wrapper.removeAttribute('title');
      }
    }
  
    function escapeHtml(str = '') {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  
   
    function recalcCartCount() {
      cartCount = cart.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);
      updateCartBadge();
    }
  
    function renderCart() {
      if (!cartTableBody) return;

    
      cartTableBody.style.display = '';
      const tableHead = document.querySelector('#cartTable thead');
      if (tableHead) tableHead.style.display = '';
      if (orderBtn) orderBtn.style.display = '';
      if (cartTotalEl) {
        cartTotalEl.style.display = '';
        cartTotalEl.style.fontWeight = '';
        cartTotalEl.style.fontSize = '';
        cartTotalEl.style.color = '';
      }

      cartTableBody.innerHTML = '';

      if (cart.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.style.textAlign = 'center';
        td.textContent = 'Your cart is empty';
        tr.appendChild(td);
        cartTableBody.appendChild(tr);
        cartTotalEl.textContent = `Total: $${formatPrice(0)}`;
        recalcCartCount();
        return;
      }
  
      let total = 0;
      cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.color || '-')}</td>
          <td>${escapeHtml(item.size || '-')}</td>
          <td>
            <button class="qty-btn" data-index="${idx}" data-action="minus">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-index="${idx}" data-action="plus">+</button>
          </td>
          <td>$${formatPrice(item.price)}</td>
          <td>$${formatPrice(itemTotal)}</td>
          <td><button class="delete-btn" data-index="${idx}">🗑️</button></td>
        `;
        cartTableBody.appendChild(row);
      });
  
      cartTotalEl.textContent = `Total: $${formatPrice(total)}`;
      recalcCartCount();
    }
  
    function openCart() {
      renderCart();
      if (cartSidebar) cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
    }
  
    function closeCartSidebar() {
      if (cartSidebar) cartSidebar.classList.remove('active');
      cartOverlay.classList.remove('active');
    }
  
    if (cartIcon) cartIcon.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
  
    if (cartTableBody) {
      cartTableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const idx = btn.dataset.index;
        if (btn.classList.contains('qty-btn')) {
          const action = btn.dataset.action;
          if (!cart[idx]) return;
          if (action === 'plus') cart[idx].qty++;
          if (action === 'minus' && cart[idx].qty > 1) cart[idx].qty--;
          renderCart(); 
        } else if (btn.classList.contains('delete-btn')) {
          if (!cart[idx]) return;
          cart.splice(idx, 1);
          renderCart(); 
        }
      });
    }
  

    document.addEventListener('click', (e) => {
      const buyEl = e.target.closest(
        '#modalAddToCart, #modalBuyBtn, [data-role="buy"], .modal-buy, .buy-btn, .add-to-cart'
      );
      if (!buyEl) return;
  
      try {
        const ds = buyEl.dataset || {};
  

        const titleEl = document.getElementById('modalProductTitle') || document.querySelector('.modal-title');
        const priceEl = document.getElementById('modalProductPrice') || document.querySelector('.modal-price');
        const specsEls =
          document.querySelectorAll('#modalProductSpecs li').length
            ? document.querySelectorAll('#modalProductSpecs li')
            : document.querySelectorAll('.modal-specs li');
  
        let name = (ds.name || titleEl?.textContent || 'Product').trim();
        let rawPrice = ds.price || priceEl?.textContent || '';
        const price = parseFloat(String(rawPrice).replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  
        let color = (ds.color || '').trim();
        let size = (ds.size || '').trim();
  
        if ((!color || !size) && specsEls?.length) {
          specsEls.forEach(li => {
            const txt = li.textContent || '';
            if (!color && /color/i.test(txt)) color = txt.replace(/color[:\s]*?/i, '').trim();
            if (!size && /size/i.test(txt)) size = txt.replace(/size[:\s]*?/i, '').trim();
          });
        }
  
        const existing = cart.find(i => i.name === name && i.color === color && i.size === size);
        if (existing) existing.qty += 1;
        else cart.push({ name, price, color, size, qty: 1 });
  
        renderCart(); 

        const productModalEl = document.getElementById('productModal');
        if (productModalEl) {
          productModalEl.style.display = 'none';
          document.body.style.overflow = '';
        } else if (modalOverlay) {
          modalOverlay.style.display = 'none';
          document.body.style.overflow = '';
        }
      } catch (err) {
        console.error('Error adding product to cart:', err);
      }
    });
  
    // ----- Place Order -----
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        orderForm.classList.remove('hidden');
        orderForm.classList.add('active');
      });
    }
  
    if (closeForm) {
      closeForm.addEventListener('click', () => {
        orderForm.classList.add('hidden');
        orderForm.classList.remove('active');
      });
    }
  
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // скрити форму
        if (orderForm) {
          orderForm.classList.add('hidden');
          orderForm.classList.remove('active');
        }
  
        cart = [];
        recalcCartCount();
  
        // приховуємо таблицю та кнопку Order
        if (cartTableBody) cartTableBody.style.display = 'none';
        const tableHead = document.querySelector('#cartTable thead');
        if (tableHead) tableHead.style.display = 'none';
        if (orderBtn) orderBtn.style.display = 'none';
  
        // замість Total: $ показуємо подяку
        if (cartTotalEl) {
          cartTotalEl.style.display = 'block';
          cartTotalEl.style.fontWeight = 'bold';
          cartTotalEl.style.fontSize = '18px';
          cartTotalEl.style.color = '#28a745';
          cartTotalEl.textContent = "Thanks for your order!";
        }
      });
    }
  
    // ----- Ініціалізація -----
    updateCartBadge();
    renderCart();
  });
