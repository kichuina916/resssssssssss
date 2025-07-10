// Login functionality
function handleLogin(event) {
  event.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  // Simple demo authentication (replace with real authentication)
  if (username === "admin" && password === "admin123") {
    // Store login status
    localStorage.setItem("ownerLoggedIn", "true")
    localStorage.setItem("ownerUsername", username)

    // Redirect to dashboard
    window.location.href = "owner-dashboard.html"
  } else {
    alert("Invalid credentials. Use admin/admin123 for demo.")
  }
}

// Check if user is logged in
function checkAuth() {
  const isLoggedIn = localStorage.getItem("ownerLoggedIn")
  const currentPage = window.location.pathname

  if (!isLoggedIn && !currentPage.includes("owner-login.html")) {
    window.location.href = "owner-login.html"
  }
}

// Logout functionality
function logout() {
  localStorage.removeItem("ownerLoggedIn")
  localStorage.removeItem("ownerUsername")
  window.location.href = "owner-login.html"
}

// Dashboard page navigation
function showPage(page) {
  // Update active menu item
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active")
  })
  event.target.closest(".menu-item").classList.add("active")

  // Update page title
  const titles = {
    overview: "Dashboard Overview",
    orders: "Order Management",
    checkout: "Checkout System",
  }

  document.getElementById("page-title").textContent = titles[page]

  // Load page content
  loadPageContent(page)
}

function loadPageContent(page) {
  const contentArea = document.getElementById("content-area")

  switch (page) {
    case "overview":
      contentArea.innerHTML = getOverviewContent()
      break
    case "orders":
      contentArea.innerHTML = getOrdersContent()
      initializeOrdersPage()
      break
    case "expense":
      contentArea.innerHTML = getExpenseContent()
      break
    case "checkout":
      window.location.href = "checkout-page.html"
      break
    default:
      contentArea.innerHTML = getOverviewContent()
  }
}

function getExpenseContent() {
  return `
    <div class="expense-management">
      <div class="coming-soon-container">
        <div class="coming-soon-content">
          <div class="coming-soon-icon">🚧</div>
          <h2>Expense Management</h2>
          <p>This feature is coming soon!</p>
          <div class="coming-soon-features">
            <div class="feature-item">📊 Track daily expenses</div>
            <div class="feature-item">💰 Budget management</div>
            <div class="feature-item">📈 Expense analytics</div>
            <div class="feature-item">🧾 Receipt management</div>
          </div>
        </div>
      </div>
    </div>
  `
}
// Sample data for calculations
const todaysSales = {
  dineIn: 28450,
  takeout: 16780,
  total: 45230
}

const todaysOrders = {
  dineIn: 78,
  takeout: 49,
  total: 127
}

const cashRegister = {
  initialDeposit: 50000,
  totalSales: 45230,
  availableBalance: 95230
}

// Content templates
function getOverviewContent() {
  return `
        <div class="overview-grid">
            <div class="stat-card sales-card">
                <div class="stat-icon">💰</div>
                <div class="stat-info">
                    <h3>Today's Total Sales</h3>
                    <p class="stat-value">¥${todaysSales.total.toLocaleString()}</p>
                    <div class="sales-breakdown">
                        <div class="breakdown-item">
                            <span class="breakdown-label">🍽️ Dine In:</span>
                            <span class="breakdown-value">¥${todaysSales.dineIn.toLocaleString()}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">🥡 Takeout:</span>
                            <span class="breakdown-value">¥${todaysSales.takeout.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="stat-card orders-card">
                <div class="stat-icon">🛒</div>
                <div class="stat-info">
                    <h3>Today's Total Orders</h3>
                    <p class="stat-value">${todaysOrders.total}</p>
                    <div class="orders-breakdown">
                        <div class="breakdown-item">
                            <span class="breakdown-label">🍽️ Dine In:</span>
                            <span class="breakdown-value">${todaysOrders.dineIn}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">🥡 Takeout:</span>
                            <span class="breakdown-value">${todaysOrders.takeout}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-info">
                    <h3>Active Tables</h3>
                    <p class="stat-value">18/25</p>
                </div>
            </div>
            
            <div class="stat-card balance-card">
                <div class="stat-icon">💳</div>
                <div class="stat-info">
                    <h3>Cash Register Balance</h3>
                    <p class="stat-value">¥${cashRegister.availableBalance.toLocaleString()}</p>
                    <div class="balance-breakdown">
                        <div class="breakdown-item">
                            <span class="breakdown-label">💵 Initial Deposit:</span>
                            <span class="breakdown-value">¥${cashRegister.initialDeposit.toLocaleString()}</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">📈 Today's Sales:</span>
                            <span class="breakdown-value">¥${cashRegister.totalSales.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="recent-orders">
            <h2>Recent Orders</h2>
            <div class="orders-table-container">
                <div class="orders-table">
                    <div class="order-row header">
                        <span>Order ID</span>
                        <span>Table</span>
                        <span>Items</span>
                        <span>Total</span>
                        <span>Status</span>
                        <span>Checkout</span>
                    </div>
                    <div class="order-row">
                        <span class="order-id">#ORD001</span>
                        <span>Table 5</span>
                        <span class="order-items">2x Wagyu Ramen, 1x Sushi</span>
                        <span class="order-total">¥4,090</span>
                        <span class="status preparing">Preparing</span>
                        <span class="print-action">
                            <button class="checkout-btn" onclick="printInvoice('ORD001')">💳 Checkout</button>
                        </span>
                    </div>
                    <div class="order-row">
                        <span class="order-id">#ORD002</span>
                        <span>Table 12</span>
                        <span class="order-items">1x Chicken Ramen</span>
                        <span class="order-total">¥1,550</span>
                        <span class="status ready">Ready</span>
                        <span class="print-action">
                            <button class="checkout-btn" onclick="printInvoice('ORD002')">💳 Checkout</button>
                        </span>
                    </div>
                    <div class="order-row">
                        <span class="order-id">#ORD003</span>
                        <span>Takeout</span>
                        <span class="order-items">1x Special Ramen, 2x Gyoza</span>
                        <span class="order-total">¥3,200</span>
                        <span class="status completed">Completed</span>
                        <span class="print-action">
                            <button class="checkout-btn" onclick="printInvoice('ORD003')">💳 Checkout</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function getOrdersContent() {
  return `
        <div class="orders-management">
            <div class="orders-header">
                <div class="orders-title-section">
                    <h2>Order Management</h2>
                    <div class="orders-stats">
                        <div class="stat-chip">
                            <span class="stat-number">${todaysOrders.total}</span>
                            <span class="stat-label">Total Orders</span>
                        </div>
                        <div class="stat-chip">
                            <span class="stat-number">¥${todaysSales.total.toLocaleString()}</span>
                            <span class="stat-label">Total Sales</span>
                        </div>
                    </div>
                </div>
                <div class="order-filters">
                    <button class="filter-btn active" onclick="filterOrders('all')">
                        <span class="filter-icon">📋</span>
                        All Orders
                    </button>
                    <button class="filter-btn" onclick="filterOrders('pending')">
                        <span class="filter-icon">⏳</span>
                        Pending
                    </button>
                    <button class="filter-btn" onclick="filterOrders('preparing')">
                        <span class="filter-icon">👨‍🍳</span>
                        Preparing
                    </button>
                    <button class="filter-btn" onclick="filterOrders('ready')">
                        <span class="filter-icon">✅</span>
                        Ready
                    </button>
                    <button class="filter-btn" onclick="filterOrders('completed')">
                        <span class="filter-icon">🎉</span>
                        Completed
                    </button>
                </div>
            </div>
            
            <div class="orders-grid" id="ordersGrid">
                <!-- Orders will be populated by JavaScript -->
            </div>
        </div>
    `
}

// Sample orders data
const ordersData = [
  {
    id: "ORD001",
    table: "Table 5",
    time: "2:30 PM",
    items: [
      { name: "MB Wagyu Ramen (L)", quantity: 2, price: 1900 },
      { name: "Sushi (60g)", quantity: 1, price: 190 }
    ],
    total: 4090,
    status: "preparing",
    type: "dine-in"
  },
  {
    id: "ORD002",
    table: "Table 12",
    time: "2:45 PM",
    items: [
      { name: "Chicken Karaage Ramen", quantity: 1, price: 590 },
      { name: "Gold Premium A5 Set", quantity: 1, price: 6600 }
    ],
    total: 7190,
    status: "ready",
    type: "dine-in"
  },
  {
    id: "ORD003",
    table: "Takeout",
    time: "3:15 PM",
    items: [
      { name: "Special Ramen Spice", quantity: 1, price: 2000 },
      { name: "Gyoza (6pcs)", quantity: 2, price: 600 }
    ],
    total: 3200,
    status: "completed",
    type: "takeout"
  },
  {
    id: "ORD004",
    table: "Table 8",
    time: "3:30 PM",
    items: [
      { name: "Ramen Spice", quantity: 1, price: 1100 },
      { name: "Chicken Fried Rice", quantity: 1, price: 900 }
    ],
    total: 2000,
    status: "pending",
    type: "dine-in"
  }
]

function initializeOrdersPage() {
  displayOrders(ordersData)
}

function displayOrders(orders) {
  const ordersGrid = document.getElementById("ordersGrid")
  
  ordersGrid.innerHTML = orders.map(order => `
    <div class="order-card ${order.status}" data-status="${order.status}">
        <div class="order-card-header">
            <div class="order-info">
                <span class="order-id">${order.id}</span>
                <span class="order-time">${order.time}</span>
            </div>
            <div class="order-type-badge ${order.type}">
                ${order.type === 'dine-in' ? '🍽️ Dine In' : '🥡 Takeout'}
            </div>
        </div>
        
        <div class="order-details">
            <div class="table-info">
                <strong>${order.table}</strong>
            </div>
            
            <div class="order-items-list">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span class="item-quantity">${item.quantity}x</span>
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">¥${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-total-section">
                <span class="total-label">Total:</span>
                <span class="total-amount">¥${order.total.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="order-status-section">
            <div class="status-indicator ${order.status}">
                <span class="status-text">${getStatusText(order.status)}</span>
            </div>
        </div>
        
        <div class="order-actions">
            ${getOrderActions(order)}
        </div>
    </div>
  `).join('')
}

function getStatusText(status) {
  const statusTexts = {
    pending: "Pending",
    preparing: "Preparing",
    ready: "Ready",
    completed: "Completed"
  }
  return statusTexts[status] || status
}

function getOrderActions(order) {
  switch(order.status) {
    case 'pending':
      return `
        <button class="action-btn start-preparing" onclick="updateOrderStatus('${order.id}', 'preparing')">
          👨‍🍳 Start Preparing
        </button>
        <button class="action-btn checkout-invoice" onclick="printInvoice('${order.id}')">
          💳 Checkout
        </button>
      `
    case 'preparing':
      return `
        <button class="action-btn mark-ready" onclick="updateOrderStatus('${order.id}', 'ready')">
          ✅ Mark Ready
        </button>
        <button class="action-btn checkout-invoice" onclick="printInvoice('${order.id}')">
          💳 Checkout
        </button>
      `
    case 'ready':
      return `
        <button class="action-btn complete-order" onclick="updateOrderStatus('${order.id}', 'completed')">
          🎉 Complete
        </button>
        <button class="action-btn checkout-invoice" onclick="printInvoice('${order.id}')">
          💳 Checkout
        </button>
      `
    case 'completed':
      return `
        <button class="action-btn checkout-invoice" onclick="printInvoice('${order.id}')">
          💳 Checkout
        </button>
      `
    default:
      return ''
  }
}

function filterOrders(status) {
  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  let filteredOrders = ordersData
  if (status !== 'all') {
    filteredOrders = ordersData.filter(order => order.status === status)
  }
  
  displayOrders(filteredOrders)
}

function updateOrderStatus(orderId, newStatus) {
  const orderIndex = ordersData.findIndex(order => order.id === orderId)
  if (orderIndex !== -1) {
    ordersData[orderIndex].status = newStatus
    displayOrders(ordersData)
    
    // Show success notification
    showNotification(`Order ${orderId} status updated to ${getStatusText(newStatus)}`)
  }
}

function printInvoice(orderId) {
  const order = ordersData.find(o => o.id === orderId)
  if (!order) return

  // Calculate totals with discount and tax
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * 0.10 // Assuming 10% discount for demo
  const afterDiscount = subtotal - discountAmount
  const taxAmount = afterDiscount * 0.10 // 10% tax
  const total = afterDiscount + taxAmount
  
  // Create print window with exact invoice format
  const printWindow = window.open('', '_blank', 'width=400,height=700')
  
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Invoice - ${orderId}</title>
        <style>
            @page {
                size: 80mm auto;
                margin: 0;
            }
            body { 
                font-family: 'Courier New', monospace; 
                padding: 10mm;
                margin: 0;
                font-size: 12px;
                line-height: 1.4;
                color: #000;
                background: white;
                width: 60mm;
            }
            .header { 
                text-align: center; 
                margin-bottom: 15px;
                border-bottom: 1px solid #000;
                padding-bottom: 10px;
            }
            .logo-section {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;
            }
            .logo {
                width: 40px;
                height: 40px;
                background: #000;
                border-radius: 50%;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }
            .restaurant-name {
                font-weight: bold;
                font-size: 14px;
                margin: 0;
                text-align: left;
            }
            .restaurant-subtitle {
                font-size: 10px;
                margin: 2px 0 0 0;
                text-align: left;
            }
            .order-details {
                margin: 15px 0;
                font-size: 12px;
            }
            .order-details div {
                margin-bottom: 3px;
            }
            .items-section {
                margin: 15px 0;
                border-top: 1px solid #000;
                padding-top: 8px;
            }
            .item-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 3px;
                font-size: 11px;
            }
            .calculations {
                border-top: 1px solid #000;
                padding-top: 8px;
                margin-top: 10px;
            }
            .calc-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 3px;
                font-size: 11px;
            }
            .total-row {
                border-top: 1px solid #000;
                padding-top: 5px;
                margin-top: 5px;
                font-weight: bold;
                font-size: 14px;
            }
            .qr-section {
                text-align: center;
                margin: 15px 0;
                padding: 10px 0;
                border-top: 1px solid #000;
            }
            .qr-placeholder {
                width: 60px;
                height: 60px;
                background: #000;
                margin: 0 auto 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 8px;
                text-align: center;
            }
            .review-text {
                font-size: 10px;
                margin: 5px 0;
            }
            .barcode {
                text-align: center;
                margin-top: 10px;
                font-family: 'Courier New', monospace;
                font-size: 20px;
                letter-spacing: 1px;
            }
            @media print {
                body { 
                    width: 58mm;
                    font-size: 11px;
                }
                .header, .calculations, .qr-section {
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo-section">
                <div class="logo">🍜</div>
                <div>
                    <div class="restaurant-name">HALAL WAGYU<br>RAMEN OKUBO</div>
                    <div class="restaurant-subtitle">PREMIUM HALAL DINING</div>
                </div>
            </div>
        </div>
        
        <div class="order-details">
            <div><strong>Order number ${orderId.replace('ORD', '')}</strong></div>
            <div><strong>${order.table}, ${order.type === 'dine-in' ? 'Dine-In' : 'Takeout'}</strong></div>
            <div><strong>Guest Count: 2</strong></div>
        </div>
        
        <div class="items-section">
            ${order.items.map(item => `
                <div class="item-row">
                    <span>${item.name}</span>
                    <span>¥${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="calculations">
            <div class="calc-row">
                <span>Subtotal</span>
                <span>¥${subtotal.toLocaleString()}</span>
            </div>
            <div class="calc-row">
                <span>Tax (10%)</span>
                <span>¥${Math.round(taxAmount).toLocaleString()}</span>
            </div>
            <div class="calc-row total-row">
                <span>Total</span>
                <span>¥${Math.round(total).toLocaleString()}</span>
            </div>
        </div>
        
        <div class="qr-section">
            <div class="qr-placeholder">
                QR<br>CODE
            </div>
            <div class="review-text">Please leave us a review</div>
            <div class="review-text"><strong>Google Reviews</strong></div>
            
            <div class="barcode">
                ||||| |||| | |||| ||||| | |||| |||||
            </div>
        </div>
    </body>
    </html>
  `
  
  printWindow.document.write(invoiceHTML)
  printWindow.document.close()
  
  // Wait for content to load then print
  printWindow.onload = function() {
    printWindow.print()
    printWindow.onafterprint = function() {
      printWindow.close()
    }
  }
}

function showNotification(message) {
  const notification = document.createElement('div')
  notification.className = 'notification'
  notification.textContent = message
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.add('show')
  }, 100)
  
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Initialize page
window.onload = () => {
  // Check authentication for protected pages
  if (
    window.location.pathname.includes("owner-dashboard.html") ||
    window.location.pathname.includes("checkout-page.html")
  ) {
    checkAuth()
  }

  // Load default content for dashboard
  if (window.location.pathname.includes("owner-dashboard.html")) {
    loadPageContent("overview")
  }
}