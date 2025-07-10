let currentLanguage = "en"
let selectedOrderType = null
let selectedTable = null
let languageDropdownOpen = false

const translations = {
  en: {
    chooseLanguage: "Choose your language", 
    welcome: "Welcome to Our Restaurant",
    dineIn: "Dine In",
    takeout: "Takeout",
    tableSelectionTitle: "Select Your Table",
    heroSubtitle: "Experience authentic flavors and exceptional service",
    dineInSubtitle: "Enjoy dining at our restaurant",
    takeoutSubtitle: "Order for pickup",
  },
  ja: {
    chooseLanguage: "言語を選択してください",
    welcome: "レストランへようこそ",
    dineIn: "店内飲食",
    takeout: "テイクアウト",
    tableSelectionTitle: "テーブルを選択",
    heroSubtitle: "本格的な味と優れたサービスを体験してください",
    dineInSubtitle: "レストランでのお食事をお楽しみください",
    takeoutSubtitle: "お持ち帰りのご注文",
  },
}

// Table availability status (true = available, false = occupied)
const tableStatus = {
  1: true, 2: false, 3: true, 4: true, 5: false,
  6: true, 7: true, 8: false, 9: true, 10: true
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
  currentLanguage = lang
  updateGlobalLanguageDisplay()
  updateLanguage()
  
  // Close dropdown
  document.getElementById('languageDropdown').classList.remove('show')
  languageDropdownOpen = false
  
  // Update active state
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.remove('active')
  })
  event.target.closest('.language-option').classList.add('active')
}

function updateGlobalLanguageDisplay() {
  const flagElement = document.getElementById('currentFlag')
  const langElement = document.getElementById('currentLang')
  
  if (currentLanguage === 'en') {
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

function selectLanguage(lang) {
  currentLanguage = lang
  updateGlobalLanguageDisplay()
  updateLanguage()
  document.getElementById("languageModal").classList.add("hidden")
  document.getElementById("mainContent").classList.remove("hidden")
}

function updateLanguage() {
  const texts = translations[currentLanguage]
  document.getElementById("chooseLanguageText").textContent = texts.chooseLanguage
  document.getElementById("welcomeText").textContent = texts.welcome
  document.getElementById("dineInText").textContent = texts.dineIn
  document.getElementById("takeoutText").textContent = texts.takeout
  document.getElementById("tableSelectionTitle").textContent = texts.tableSelectionTitle
}

function selectDineIn() {
  selectedOrderType = "dine-in"
  showTableSelection()
}

function selectTakeout() {
  selectedOrderType = "takeout"
  selectedTable = null
  goToMenu()
}

function showTableSelection() {
  generateTableGrid()
  document.getElementById("tableSelectionModal").classList.remove("hidden")
}

function closeTableSelection() {
  document.getElementById("tableSelectionModal").classList.add("hidden")
}

function generateTableGrid() {
  const tableGrid = document.querySelector(".table-grid")
  tableGrid.innerHTML = ""
  
  for (let i = 1; i <= 10; i++) {
    const tableBtn = document.createElement("button")
    tableBtn.className = `table-btn ${tableStatus[i] ? 'available' : 'occupied'}`
    tableBtn.innerHTML = `
      <span class="table-number">${i}</span>
      <span class="table-status">${tableStatus[i] ? 'Available' : 'Occupied'}</span>
    `
    
    if (tableStatus[i]) {
      tableBtn.onclick = () => selectTable(i)
    } else {
      tableBtn.disabled = true
    }
    
    tableGrid.appendChild(tableBtn)
  }
}

function selectTable(tableNumber) {
  selectedTable = tableNumber
  // Add visual feedback
  document.querySelectorAll('.table-btn').forEach(btn => btn.classList.remove('selected'))
  event.target.closest('.table-btn').classList.add('selected')
  
  // Auto-proceed after selection with a slight delay for visual feedback
  setTimeout(() => {
    closeTableSelection()
    goToMenu()
  }, 500)
}

function goToMenu() {
  localStorage.setItem("selectedLanguage", currentLanguage)
  localStorage.setItem("orderType", selectedOrderType)
  if (selectedTable) {
    localStorage.setItem("selectedTable", selectedTable)
  }
  window.location.href = "menu.html"
}

// Initialize the page
window.onload = () => {
  // Initialize global language selector
  updateGlobalLanguageDisplay()
  
  document.getElementById("languageModal").classList.remove("hidden")
}