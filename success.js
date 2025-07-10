// Sample order database for demonstration
const orderDatabase = {
  ORD001: {
    orderNumber: "ORD001",
    items: [
      { 
        name: "Ramen Spice", 
        quantity: 2, 
        price: 1100,
        image: "https://halalwagyuramen.jp/storage/91/conversions/Yukaris-Miso-Ramen5-thumb.jpg?height=100&width=300"
      },
      { 
        name: "Chicken Ramen Spice", 
        quantity: 1, 
        price: 1550,
        image: "https://halalwagyuramen.jp/storage/93/conversions/th-thumb.jpeg?height=200&width=300"
      },
    ],
    total: 3750,
    date: "2024-01-06",
    tableNumber: "Table 5",
    orderType: "dine-in",
    status: "Completed"
  },
  ORD002: {
    orderNumber: "ORD002",
    items: [
      { 
        name: "Special Ramen Spice", 
        quantity: 1, 
        price: 2000,
        image: "https://halalwagyuramen.jp/storage/100/conversions/20211209-DSCF2063-thumb.jpg?height=200&width=300"
      }
    ],
    total: 2000,
    date: "2024-01-05",
    tableNumber: null,
    orderType: "takeout",
    status: "Ready for Pickup"
  },
  ORD003: {
    orderNumber: "ORD003",
    items: [
      { 
        name: "Wagyu Special Ramen", 
        quantity: 1, 
        price: 2500,
        image: "https://halalwagyuramen.jp/storage/97/conversions/13351-chicken-tortilla-soup-i-DDMFS-4x3-746173decf5548e581fd08e713a8adba-thumb.jpg?height=200&width=300"
      },
      { 
        name: "Gyoza (6pcs)", 
        quantity: 2, 
        price: 600,
        image: "https://halalwagyuramen.jp/storage/107/conversions/top_back2-thumb.jpg?height=200&width=300"
      }
    ],
    total: 3700,
    date: "2024-01-07",
    tableNumber: "Table 3",
    orderType: "dine-in",
    status: "Preparing"
  }
}

// Global language selector functions
let languageDropdownOpen = false

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

window.onload = () => {
  // Initialize global language selector
  updateGlobalLanguageDisplay()
  
  const orderNumber = localStorage.getItem("orderNumber")
  const orderData = JSON.parse(localStorage.getItem("orderData") || "[]")
  const orderType = localStorage.getItem("orderType")
  const selectedTable = localStorage.getItem("selectedTable")

  if (orderNumber) {
    document.getElementById("orderNumber").textContent = orderNumber

    // Display table number or takeout
    if (orderType === "dine-in" && selectedTable) {
      document.getElementById("tableNumber").textContent = `Table ${selectedTable}`
    } else {
      document.getElementById("tableNumber").textContent = "Takeout Order"
    }

    // Generate random delivery time between 20-35 minutes
    const deliveryTime = Math.floor(Math.random() * 16) + 20
    document.getElementById("deliveryTime").textContent = `${deliveryTime}-${deliveryTime + 5} minutes`

    // Display order items with images
    if (orderData.length > 0) {
      const orderItemsList = document.getElementById("orderItemsList")
      const total = orderData.reduce((sum, item) => sum + item.price * item.quantity, 0)

      orderItemsList.innerHTML = orderData
        .map(
          (item) => `
        <div class="order-item">
          <img src="${item.image}" alt="${item.name}" class="order-item-image">
          <div class="order-item-info">
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <div class="order-item-price">¥${item.price * item.quantity}</div>
        </div>
      `,
        )
        .join("")

      document.getElementById("orderTotal").textContent = total
    }
  }
}

function goHome() {
  // Clear order data
  localStorage.removeItem("orderNumber")
  localStorage.removeItem("orderData")
  window.location.href = "index.html"
}

function orderMore() {
  // Clear order data
  localStorage.removeItem("orderNumber")
  localStorage.removeItem("orderData")
  window.location.href = "menu.html"
}

function showOrderHistory() {
  document.getElementById("orderHistoryModal").classList.remove("hidden")
}

function closeOrderHistory() {
  document.getElementById("orderHistoryModal").classList.add("hidden")
  document.getElementById("orderDetails").classList.add("hidden")
  document.getElementById("orderNumberInput").value = ""
}

function fillOrderNumber(orderNumber) {
  document.getElementById("orderNumberInput").value = orderNumber
  searchOrder()
}

function searchOrder() {
  const orderNumber = document.getElementById("orderNumberInput").value.trim().toUpperCase()
  const orderDetails = document.getElementById("orderDetails")

  if (orderDatabase[orderNumber]) {
    const order = orderDatabase[orderNumber]
    
    let itemsHtml = order.items.map(item => `
      <div class="history-order-item">
        <img src="${item.image}" alt="${item.name}" class="history-item-image">
        <div class="history-item-info">
          <h4>${item.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p class="item-price">¥${item.price} each</p>
        </div>
        <div class="history-item-total">¥${item.price * item.quantity}</div>
      </div>
    `).join("")

    orderDetails.innerHTML = `
      <div class="order-history-card">
        <div class="order-history-header">
          <h3>Order #${order.orderNumber}</h3>
          <span class="order-status ${order.status.toLowerCase().replace(/\s+/g, '-')}">${order.status}</span>
        </div>
        
        <div class="order-meta">
          <div class="meta-item">
            <span class="meta-label">Date:</span>
            <span class="meta-value">${order.date}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Type:</span>
            <span class="meta-value">${order.orderType === 'dine-in' ? 'Dine In' : 'Takeout'}</span>
          </div>
          ${order.tableNumber ? `
            <div class="meta-item">
              <span class="meta-label">Table:</span>
              <span class="meta-value">${order.tableNumber}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="order-items-section">
          <h4>Order Items:</h4>
          ${itemsHtml}
        </div>
        
        <div class="order-total-section">
          <strong>Total: ¥${order.total}</strong>
        </div>
      </div>
    `
    orderDetails.classList.remove("hidden")
  } else {
    orderDetails.innerHTML = `
      <div class="order-not-found">
        <div class="not-found-icon">❌</div>
        <h3>Order Not Found</h3>
        <p>Please check your order number and try again.</p>
        <p class="hint">Order numbers are in format: ORD001, ORD002, etc.</p>
      </div>
    `
    orderDetails.classList.remove("hidden")
  }
}