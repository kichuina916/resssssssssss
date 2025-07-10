let cart = []
let currentCategory = "ramen"
let languageDropdownOpen = false

// Enhanced Menu data with ratings, badges, and dietary info
const menuData = {
  ramen: [
    {
      id: 1,
      name: "Ramen Spice",
      description: "Soup, Egg, Fridge onion, Green onion",
      price: 1100,
      image: "https://halalwagyuramen.jp/storage/91/conversions/Yukaris-Miso-Ramen5-thumb.jpg?height=100&width=300",
      type: "non-veg",
      rating: 4.5,
      badge: "Popular",
      spicy: true,
      halal: true,
      dietary: ["🥩", "🌶️", "☪️"],
    },
    {
      id: 2,
      name: "Ramen Non-Spice",
      description: "Soup, Egg, Fridge onion, Green onion",
      price: 1100,
      image:
        "https://halalwagyuramen.jp/storage/92/conversions/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__01__20140120-beef-ramyun-homemade-recipe-15-014423f0ac734abc8c0d826e54857afe-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.2,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🥩", "☪️"],
    },
    {
      id: 3,
      name: "Chicken Ramen Spice",
      description: "Soup, Egg, Fridge onion, Green onion",
      price: 1550,
      image: "https://halalwagyuramen.jp/storage/93/conversions/th-thumb.jpeg?height=200&width=300",
      type: "non-veg",
      rating: 4.7,
      badge: "Chef's Special",
      spicy: true,
      halal: true,
      dietary: ["🐔", "🌶️", "☪️"],
    },
    {
      id: 4,
      name: "Chicken Ramen Non Spice",
      description: "Soup, Egg, Fridge onion, Green onion",
      price: 1550,
      image: "https://halalwagyuramen.jp/storage/94/conversions/Chicken-Ramen-SQ-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.3,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🐔", "☪️"],
    },
    {
      id: 5,
      name: "Special Ramen Spice",
      description: "Wagyu Qube Size, Karage, Egg, Nori",
      price: 2000,
      image: "https://halalwagyuramen.jp/storage/100/conversions/20211209-DSCF2063-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.9,
      badge: "New",
      spicy: true,
      halal: true,
      dietary: ["🥩", "🌶️", "☪️"],
    },
    {
      id: 6,
      name: "Special Ramen Non-Spicy",
      description: "Wagyu Qube Size, Karage, Egg, Nori",
      price: 2000,
      image:
        "https://halalwagyuramen.jp/storage/101/conversions/47481-0w470h470_Special_Ramen_Discovery_Pack-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.6,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🥩", "☪️"],
    },
  ],
  "wagyu-special": [
    {
      id: 7,
      name: "Wagyu Special Ramen",
      description: "Premium wagyu beef, special broth",
      price: 2500,
      image:
        "https://halalwagyuramen.jp/storage/97/conversions/13351-chicken-tortilla-soup-i-DDMFS-4x3-746173decf5548e581fd08e713a8adba-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.8,
      badge: "Premium",
      spicy: false,
      halal: true,
      dietary: ["🥩", "☪️", "⭐"],
    },
    {
      id: 8,
      name: "Wagyu Deluxe",
      description: "Premium wagyu with extra toppings",
      price: 3000,
      image:
        "https://halalwagyuramen.jp/storage/102/conversions/vegetable-noodle-soup-sq-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.9,
      badge: "Chef's Special",
      spicy: true,
      halal: true,
      dietary: ["🥩", "🌶️", "☪️", "⭐"],
    },
  ],
  "wagyu-sukiyaki": [
    {
      id: 9,
      name: "Wagyu Sukiyaki Bowl",
      description: "Traditional sukiyaki with wagyu beef",
      price: 2800,
      image:
        "https://halalwagyuramen.jp/storage/99/conversions/ALR-269606-carrot-ginger-soup-VAT-4x3-1closeup-29714cd6727c4befb83302234841aa31-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.6,
      badge: "Popular",
      spicy: false,
      halal: true,
      dietary: ["🥩", "☪️"],
    },
    {
      id: 10,
      name: "Premium Sukiyaki",
      description: "Premium sukiyaki with vegetables",
      price: 3200,
      image: "https://halalwagyuramen.jp/storage/103/conversions/tomato-soup-recipe-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.7,
      badge: "New",
      spicy: false,
      halal: true,
      dietary: ["🥩", "🥬", "☪️"],
    },
  ],
  "set-menu": [
    {
      id: 11,
      name: "Ramen Set A",
      description: "Ramen + Rice + Gyoza",
      price: 1800,
      image:
        "https://halalwagyuramen.jp/storage/120/conversions/k_Photo_People_2022-05-AAPI-Month-Third-Culture_Raymum_K_AAPI_2022_Ramyun_003-thumb.jpeg?height=200&width=300",
      type: "non-veg",
      rating: 4.4,
      badge: "Popular",
      spicy: false,
      halal: true,
      dietary: ["🥩", "🍚", "☪️"],
    },
    {
      id: 12,
      name: "Ramen Set B",
      description: "Ramen + Fried Rice + Salad",
      price: 2000,
      image:
        "https://halalwagyuramen.jp/storage/119/conversions/k_Photo_People_2022-05-AAPI-Month-Third-Culture_Raymum_K_AAPI_2022_Ramyun_003-thumb.jpeg?height=200&width=300",
      type: "non-veg",
      rating: 4.5,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🥩", "🍚", "🥬", "☪️"],
    },
  ],
  "normal-rice": [
    {
      id: 13,
      name: "Chicken Fried Rice",
      description: "Fried rice with chicken and vegetables",
      price: 900,
      image: "https://halalwagyuramen.jp/storage/109/conversions/how-to-cook-rice-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.1,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🐔", "🍚", "☪️"],
    },
    {
      id: 14,
      name: "Vegetable Fried Rice",
      description: "Fried rice with mixed vegetables",
      price: 800,
      image: "https://halalwagyuramen.jp/storage/109/conversions/how-to-cook-rice-thumb.jpg?height=200&width=300",
      type: "veg",
      rating: 4.0,
      badge: "Healthy",
      spicy: false,
      halal: true,
      dietary: ["🥬", "🍚", "☪️"],
    },
  ],
  juice: [
    {
      id: 15,
      name: "Orange Juice",
      description: "Fresh orange juice",
      price: 400,
      image: "/placeholder.svg?height=200&width=300",
      type: "veg",
      rating: 4.2,
      badge: "Fresh",
      spicy: false,
      halal: true,
      dietary: ["🍊", "☪️"],
    },
    {
      id: 16,
      name: "Apple Juice",
      description: "Fresh apple juice",
      price: 400,
      image: "/placeholder.svg?height=200&width=300",
      type: "veg",
      rating: 4.1,
      badge: null,
      spicy: false,
      halal: true,
      dietary: ["🍎", "☪️"],
    },
  ],
  indonesian: [
    {
      id: 17,
      name: "Nasi Goreng",
      description: "Indonesian fried rice",
      price: 1200,
      image: "https://halalwagyuramen.jp/images/item/thumb.png?height=200&width=300",
      type: "non-veg",
      rating: 4.3,
      badge: "Authentic",
      spicy: true,
      halal: true,
      dietary: ["🥩", "🌶️", "🍚", "☪️"],
    },
    {
      id: 18,
      name: "Mie Goreng",
      description: "Indonesian fried noodles",
      price: 1100,
      image: "/placeholder.svg?height=200&width=300",
      type: "non-veg",
      rating: 4.2,
      badge: null,
      spicy: true,
      halal: true,
      dietary: ["🥩", "🌶️", "☪️"],
    },
  ],
  "single-item": [
    {
      id: 19,
      name: "Gyoza (6pcs)",
      description: "Pan-fried dumplings",
      price: 600,
      image: "https://halalwagyuramen.jp/storage/107/conversions/top_back2-thumb.jpg?height=200&width=300",
      type: "non-veg",
      rating: 4.4,
      badge: "Popular",
      spicy: false,
      halal: true,
      dietary: ["🥩", "☪️"],
    },
    {
      id: 20,
      name: "Edamame",
      description: "Steamed soybeans",
      price: 400,
      image:
        "https://halalwagyuramen.jp/storage/95/conversions/merlin_141075300_74569dec-9fc2-4174-931d-019dddef3bb8-jumbo-thumb.jpg?height=200&width=300",
      type: "veg",
      rating: 3.9,
      badge: "Healthy",
      spicy: false,
      halal: true,
      dietary: ["🥬", "☪️"],
    },
  ],
}

// Add new functions for enhanced features
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += "⭐"
  }
  if (hasHalfStar) {
    stars += "✨"
  }

  return stars
}

function createSkeletonLoader() {
  return `
    <div class="skeleton-loader">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-footer">
          <div class="skeleton-price"></div>
          <div class="skeleton-button"></div>
        </div>
      </div>
    </div>
  `
}

function displayMenuItems(category, filter = "all") {
  const menuGrid = document.getElementById("menuGrid")
  const items = menuData[category] || []

  // Show skeleton loaders first
  menuGrid.innerHTML = Array(6).fill(createSkeletonLoader()).join("")

  let filteredItems = items
  if (filter === "veg") {
    filteredItems = items.filter((item) => item.type === "veg")
  } else if (filter === "non-veg") {
    filteredItems = items.filter((item) => item.type === "non-veg")
  }

  // Simulate loading delay for better UX
  setTimeout(() => {
    menuGrid.innerHTML = filteredItems
      .map(
        (item) => `
          <div class="menu-item" data-item-id="${item.id}">
              ${item.badge ? `<div class="item-badge ${item.badge.toLowerCase().replace(/[^a-z]/g, "-")}">${item.badge}</div>` : ""}
              <div class="image-container">
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='/placeholder.svg?height=180&width=168'">
              </div>
              <div class="menu-item-content">
                  <div class="item-header">
                    <h3>${item.name}</h3>
                    <div class="rating">
                      <span class="stars">${generateStars(item.rating)}</span>
                      <span class="rating-number">${item.rating}</span>
                    </div>
                  </div>
                  <p>${item.description}</p>
                  <div class="dietary-icons">
                    ${item.dietary.map((icon) => `<span class="dietary-icon" title="${getDietaryTitle(icon)}">${icon}</span>`).join("")}
                  </div>
                  <div class="menu-item-footer">
                      <span class="price">¥${item.price}</span>
                      <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="updateItemQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display" id="qty-${item.id}">0</span>
                        <button class="quantity-btn plus" onclick="updateItemQuantity(${item.id}, 1)">+</button>
                      </div>
                  </div>
              </div>
          </div>
      `,
      )
      .join("")

    // Update quantity displays
    filteredItems.forEach((item) => {
      const cartItem = cart.find((cartItem) => cartItem.id === item.id)
      const qtyDisplay = document.getElementById(`qty-${item.id}`)
      if (qtyDisplay) {
        qtyDisplay.textContent = cartItem ? cartItem.quantity : 0
      }
    })
  }, 800)
}

function getDietaryTitle(icon) {
  const titles = {
    "🥩": "Beef",
    "🐔": "Chicken",
    "🥬": "Vegetarian",
    "🌶️": "Spicy",
    "☪️": "Halal",
    "🍚": "Rice",
    "⭐": "Premium",
    "🍊": "Orange",
    "🍎": "Apple",
  }
  return titles[icon] || ""
}

function updateItemQuantity(itemId, change) {
  let item = null
  for (const category in menuData) {
    item = menuData[category].find((i) => i.id === itemId)
    if (item) break
  }

  if (!item) return

  const existingItem = cart.find((cartItem) => cartItem.id === itemId)

  if (existingItem) {
    existingItem.quantity += change
    if (existingItem.quantity <= 0) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId)
    }
  } else if (change > 0) {
    cart.push({ ...item, quantity: change })
  }

  // Update display
  const qtyDisplay = document.getElementById(`qty-${itemId}`)
  const newQuantity = cart.find((cartItem) => cartItem.id === itemId)?.quantity || 0
  if (qtyDisplay) {
    qtyDisplay.textContent = newQuantity
  }

  updateCartCount()
}

// Global language selector functions
function toggleLanguageDropdown() {
  const dropdown = document.getElementById('languageDropdown')
  languageDropdownOpen = !languageDropdownOpen
  
  if (languageDropdownOpen) {
    dropdown.classList.add('show')
  } else {
    dropdown.classList.remove('show')
  }
}

function selectLanguageGlobal(lang) {
  updateGlobalLanguageDisplay(lang)
  
  // Close dropdown
  document.getElementById('languageDropdown').classList.remove('show')
  languageDropdownOpen = false
  
  // Update active state
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.remove('active')
  })
  event.target.closest('.language-option').classList.add('active')
}

function updateGlobalLanguageDisplay(lang = 'en') {
  const flagElement = document.getElementById('currentFlag')
  const langElement = document.getElementById('currentLang')
  
  if (lang === 'en') {
    flagElement.textContent = '🇺🇸'
    langElement.textContent = 'English'
  } else {
    flagElement.textContent = '🇯🇵'
    langElement.textContent = '日本語'
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector')
  if (!languageSelector.contains(event.target) && languageDropdownOpen) {
    document.getElementById('languageDropdown').classList.remove('show')
    languageDropdownOpen = false
  }
})

function addToCart(itemId) {
  updateItemQuantity(itemId, 1)
}

function quickRemoveFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId)
  updateCartCount()
  displayCartItems()

  // Update menu quantity display
  const qtyDisplay = document.getElementById(`qty-${itemId}`)
  if (qtyDisplay) {
    qtyDisplay.textContent = "0"
  }
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 2000)
}

function displayCartItems() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>"
    cartTotal.textContent = "0"
    return
  }

  let cartHTML = ""

  if (cart.length > 0) {
    cartHTML += cart
      .map(
        (item) => `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-info">
                  <h4>${item.name}</h4>
                  <p>¥${item.price} each</p>
                  <div class="dietary-icons">
                    ${item.dietary.map((icon) => `<span class="dietary-icon small">${icon}</span>`).join("")}
                  </div>
              </div>
              <div class="cart-item-controls">
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                  <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                  <span style="margin-left: 15px; font-weight: bold; color: #ff6b35;">¥${item.price * item.quantity}</span>
              </div>
              <div class="cart-item-actions">
                <button class="quick-remove-btn" onclick="quickRemoveFromCart(${item.id})" title="Remove">🗑️</button>
              </div>
          </div>
      `,
      )
      .join("")
  }

  cartItems.innerHTML = cartHTML

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total
}

// Add mini cart preview functionality
let miniCartTimeout

function showMiniCart() {
  clearTimeout(miniCartTimeout)
  const miniCart = document.getElementById("miniCartPreview")
  if (cart.length === 0) {
    miniCart.innerHTML = "<p>Cart is empty</p>"
  } else {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    miniCart.innerHTML = `
      <div class="mini-cart-items">
        ${cart
          .slice(0, 3)
          .map(
            (item) => `
          <div class="mini-cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <span>${item.name}</span>
              <span>×${item.quantity}</span>
            </div>
          </div>
        `,
          )
          .join("")}
        ${cart.length > 3 ? `<p>+${cart.length - 3} more items</p>` : ""}
      </div>
      <div class="mini-cart-total">Total: ¥${total}</div>
    `
  }
  miniCart.classList.add("show")
}

function hideMiniCart() {
  miniCartTimeout = setTimeout(() => {
    document.getElementById("miniCartPreview").classList.remove("show")
  }, 300)
}

// Update existing functions to work with new features
function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId)
    }
    updateCartCount()
    displayCartItems()

    // Update menu quantity display
    const qtyDisplay = document.getElementById(`qty-${itemId}`)
    if (qtyDisplay) {
      qtyDisplay.textContent = cart.find((cartItem) => cartItem.id === itemId)?.quantity || 0
    }
  }
}

// Rest of the existing functions remain the same...
function showCategory(category) {
  currentCategory = category

  // Update active category
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.remove("active")
  })
  event.target.closest(".category-item").classList.add("active")

  // Update category title
  const categoryNames = {
    ramen: "Ramen",
    "wagyu-special": "Wagyu Ramen Soup Special",
    "wagyu-sukiyaki": "Wagyu Sukiyaki Rice Bowl",
    "set-menu": "Set Menu",
    "normal-rice": "Normal Rice",
    juice: "Juice",
    indonesian: "Indonesian",
    "single-item": "Single Item",
  }

  document.getElementById("categoryTitle").textContent = categoryNames[category]

  // Display menu items
  displayMenuItems(category)
}

function filterItems(filter) {
  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  displayMenuItems(currentCategory, filter)
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cartCount").textContent = totalItems
}

function openCart() {
  displayCartItems()
  document.getElementById("cartModal").classList.remove("hidden")
}

function closeCart() {
  document.getElementById("cartModal").classList.add("hidden")
}

function confirmOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }
  document.getElementById("confirmModal").classList.remove("hidden")
}

function closeConfirm() {
  document.getElementById("confirmModal").classList.add("hidden")
}

function placeOrder() {
  // Generate order number
  const orderNumber = "ORD" + Math.random().toString(36).substr(2, 6).toUpperCase()

  // Store order data
  localStorage.setItem("orderNumber", orderNumber)
  localStorage.setItem("orderData", JSON.stringify(cart))

  // Redirect to success page
  window.location.href = "order-success.html"
}

// Initialize page
window.onload = () => {
  // Display order type and table info
  const orderType = localStorage.getItem("orderType")
  const selectedTable = localStorage.getItem("selectedTable")
  
  // Initialize global language selector
  updateGlobalLanguageDisplay()
  
  if (orderType) {
    const orderInfo = document.createElement("div")
    orderInfo.className = "order-info-banner"
    
    // Only show table info for dine-in orders
    const tableInfoHtml = (orderType === 'dine-in' && selectedTable) 
      ? `<span class="table-info">Table ${selectedTable}</span>` 
      : ''
    
    orderInfo.innerHTML = `
      <div class="order-info-content">
        <span class="order-type">${orderType === 'dine-in' ? '🍽️ Dine In' : '🥡 Takeout'}</span>
        ${tableInfoHtml}
      </div>
    `
    document.querySelector('.menu-container').prepend(orderInfo)
  }
  
  displayMenuItems("ramen")
  updateCartCount()
}