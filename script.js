// Mock data and state management
let currentScreen = 'dashboard';
let dailyCalories = 1020;
let calorieGoal = 1800;
let currentAction = null;

// Mock restaurant data in Thai
const nearbyRestaurants = [
    {
        id: 1,
        name: "ร้านสวนเขียว",
        distance: "500 ม.",
        rating: 4.8,
        healthyOptions: ["โบลอกแซลมอน", "สลัดควินัว", "ซุปผัก"],
        address: "123 ถ.สุขภาพ",
        phone: "02-123-4567",
        cuisine: "อาหารเพื่อสุขภาพ",
        emoji: "🥗"
    },
    {
        id: 2,
        name: "บิสโทร่สดใส",
        distance: "800 ม.", 
        rating: 4.6,
        healthyOptions: ["โบลอเมดิเตอร์เรเนียน", "แร็ปโปรตีน", "พาร์เฟต์ผลไม้"],
        address: "456 ถ.เวลเนส",
        phone: "02-234-5678",
        cuisine: "เมดิเตอร์เรเนียน",
        emoji: "🌿"
    },
    {
        id: 3,
        name: "มุมโภชนาการ",
        distance: "1.2 กม.",
        rating: 4.7,
        healthyOptions: ["โอ๊ตมีลดีต่อหัวใจ", "สลัดไก่ย่าง", "ผักนึ่ง"],
        address: "789 ถ.สุขภาพดี",
        phone: "02-345-6789",
        cuisine: "อาหารสุขภาพ",
        emoji: "💚"
    },
    {
        id: 4,
        name: "ไดเนอร์ผู้สูงอายุ",
        distance: "1.8 กม.",
        rating: 4.5,
        healthyOptions: ["ซุปเกลือต่ำ", "ปลาอบกับผัก", "ขนมปังโฮลเกรน"],
        address: "321 ถ.ผู้สูงวัย",
        phone: "02-456-7890",
        cuisine: "อาหารไทย",
        emoji: "👵"
    }
];

// Mock food recommendations in Thai
const foodRecommendations = [
    {
        id: 1,
        name: "โยเกิร์ตกรีกกับเบอร์รี่",
        calories: 150,
        reason: "โปรตีนสูงช่วยให้ถึงเป้าหมายรายวัน",
        nutrients: "โปรตีน 20g, โปรไบโอติก",
        time: "ของว่างช่วงบ่าย",
        emoji: "🫐"
    },
    {
        id: 2,
        name: "แซลมอนย่างกับบร็อกโคลี่",
        calories: 420,
        reason: "โอเมก้า-3 ดีต่อหัวใจ",
        nutrients: "โปรตีน 35g, ไขมันดี",
        time: "มื้อเย็น",
        emoji: "🐟"
    },
    {
        id: 3,
        name: "ขนมปังโฮลเกรนกับอะโวคาโด",
        calories: 280,
        reason: "ไขมันดีและใยอาหารสูง",
        nutrients: "ใยอาหาร 8g, โพแทสเซียม",
        time: "มื้อเบา",
        emoji: "🥑"
    },
    {
        id: 4,
        name: "ถั่วรวม (30g)",
        calories: 160,
        reason: "ไขมันดีและวิตามินอี",
        nutrients: "โปรตีน 6g, แมกนีเซียม",
        time: "ของว่าง",
        emoji: "🥜"
    }
];

// Calculate what nutrients user needs more of
function getNutritionNeeds() {
    const currentProtein = 75; // Mock current protein intake
    const proteinGoal = 90;
    const remainingCalories = calorieGoal - dailyCalories;
    
    const needs = [];
    
    if (currentProtein < proteinGoal) {
        needs.push("protein");
    }
    
    if (remainingCalories > 300) {
        needs.push("calories");
    }
    
    if (dailyCalories < 800) {
        needs.push("fiber");
    }
    
    return needs;
}

// Screen navigation
function showScreen(screenName) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show selected screen
    const targetScreen = document.getElementById(screenName + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`[onclick="showScreen('${screenName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    currentScreen = screenName;
}

// Photo screen actions
function handleTakePhoto() {
    showModal(
        '📷 บันทึกอาหาร',
        '✅ ถ่ายรูปสำเร็จ! กำลังวิเคราะห์คุณค่าทางโภชนาการ...',
        () => {
            // Mock adding a meal
            dailyCalories += 320;
            updateProgressBar();
            showSuccessMessage('🎉 บันทึกอาหารสำเร็จ!\n\n🥗 สลัดไก่ย่าง\n📊 320 แคลอรี่ • 35g โปรตีน');
            
            // Show restaurant suggestions after photo capture
            setTimeout(() => {
                displayRestaurantSuggestions();
            }, 1000);
        }
    );
}

// Food recommendation functions
function populateFoodRecommendations() {
    const container = document.getElementById('food-recommendations');
    if (!container) return;
    
    const needs = getNutritionNeeds();
    const relevantRecommendations = foodRecommendations.filter(food => {
        if (needs.includes('protein') && food.nutrients.includes('protein')) return true;
        if (needs.includes('calories') && food.calories > 200) return true;
        if (needs.includes('fiber') && food.nutrients.includes('fiber')) return true;
        return false;
    }).slice(0, 2); // Show only 2 recommendations
    
    container.innerHTML = '';
    
    relevantRecommendations.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'recommendation-item';
        foodItem.innerHTML = `
            <div class="meal-image">${food.emoji}</div>
            <div class="recommendation-info">
                <h4>${food.name}</h4>
                <p class="reason">${food.reason}</p>
            </div>
            <div class="recommendation-calories">
                ${food.calories} แคลอรี่
            </div>
        `;
        foodItem.addEventListener('click', () => {
            showModal(
                'รายละเอียดอาหาร',
                `${food.emoji} ${food.name}\n\n📊 แคลอรี่: ${food.calories}\n💪 สารอาหาร: ${food.nutrients}\n🕐 เวลาที่เหมาะ: ${food.time}\n\n💡 เหตุผล: ${food.reason}`,
                null
            );
        });
        container.appendChild(foodItem);
    });
}

function showAllRecommendations() {
    showModal(
        '🍽️ คำแนะนำอาหารทั้งหมด',
        'คำแนะนำอาหารสำหรับคุณวันนี้:\n\n' + 
        foodRecommendations.map(food => `${food.emoji} ${food.name} (${food.calories} แคลอรี่)\n💡 ${food.reason}`).join('\n\n'),
        null
    );
}

// Restaurant suggestion functions
function displayRestaurantSuggestions() {
    const container = document.getElementById('restaurant-suggestions');
    const listContainer = document.getElementById('restaurant-list');
    
    if (!container || !listContainer) return;
    
    // Show the restaurant suggestions section
    container.style.display = 'block';
    
    // Populate restaurant list
    listContainer.innerHTML = '';
    
    // Show top 3 nearest restaurants
    nearbyRestaurants.slice(0, 3).forEach(restaurant => {
        const restaurantItem = document.createElement('div');
        restaurantItem.className = 'restaurant-item';
        restaurantItem.innerHTML = `
            <div class="meal-image">${restaurant.emoji}</div>
            <div class="restaurant-info">
                <h4>${restaurant.name}</h4>
                <div class="restaurant-rating">
                    <span>⭐ ${restaurant.rating}</span>
                    <span> • ${restaurant.cuisine}</span>
                </div>
                <p class="restaurant-options">
                    ${restaurant.healthyOptions.slice(0, 2).join(', ')}
                </p>
            </div>
            <div class="restaurant-contact">
                <p class="restaurant-distance">📍 ${restaurant.distance}</p>
                <p>📞 ${restaurant.phone}</p>
            </div>
        `;
        
        restaurantItem.addEventListener('click', () => {
            showRestaurantDetails(restaurant);
        });
        
        listContainer.appendChild(restaurantItem);
    });
    
    // Scroll to show the suggestions
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showRestaurantDetails(restaurant) {
    const healthyOptionsText = restaurant.healthyOptions.map(option => `• ${option}`).join('\n');
    
    showModal(
        `${restaurant.emoji} ${restaurant.name}`,
        `🏪 ร้าน${restaurant.cuisine}\n\n` +
        `📍 ${restaurant.address}\n` +
        `📞 ${restaurant.phone}\n` +
        `⭐ คะแนน ${restaurant.rating}\n` +
        `📏 ระยะทาง ${restaurant.distance}\n\n` +
        `🥗 เมนูเพื่อสุขภาพ:\n${healthyOptionsText}\n\n` +
        `ต้องการเส้นทางหรือจองโต๊ะหรือไม่?`,
        () => {
            showSuccessMessage(`🗺️ เปิดเส้นทางไป ${restaurant.name}...`);
        }
    );
}

function findMoreRestaurants() {
    showModal(
        '🏪 ร้านอาหารเพิ่มเติม',
        'ร้านอาหารเพื่อสุขภาพอื่นๆ:\n\n' +
        nearbyRestaurants.slice(3).map(restaurant => 
            `${restaurant.emoji} ${restaurant.name}\n📏 ${restaurant.distance} • ⭐ ${restaurant.rating}\n🥗 ${restaurant.healthyOptions[0]}`
        ).join('\n\n'),
        null
    );
}

function updateProgressBar() {
    const progressPercentage = Math.min((dailyCalories / calorieGoal) * 100, 100);
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const caloriesNumber = document.querySelector('.stat-number');
    
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(progressPercentage) + '% of daily goal';
    }
    
    if (caloriesNumber) {
        caloriesNumber.textContent = dailyCalories.toLocaleString();
    }
}

// Removed chat functionality for minimal design

// History screen functions
function exportReport() {
    showModal(
        'Export Report',
        'This would export your weekly nutrition report as a PDF.',
        () => {
            showSuccessMessage('Weekly report exported successfully!');
        }
    );
}

function shareWithFamily() {
    showModal(
        'Share with Family',
        'This would share your nutrition progress with family members.',
        () => {
            showSuccessMessage('Progress shared with family!');
        }
    );
}

// Removed profile functions for minimal design

// Modal functions
function showModal(title, text, onConfirm) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add('active');
    
    currentAction = onConfirm;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    currentAction = null;
}

function confirmAction() {
    if (currentAction) {
        currentAction();
    }
    closeModal();
}

function showSuccessMessage(message) {
    showModal(
        'Success!',
        message,
        null
    );
    
    // Auto-close success messages after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard screen by default
    showScreen('dashboard');
    
    // Initialize progress bar
    updateProgressBar();
    
    // Populate food recommendations on dashboard
    populateFoodRecommendations();
    
    // Add click handlers for meal items
    const mealItems = document.querySelectorAll('.meal-item');
    mealItems.forEach(item => {
        item.addEventListener('click', function() {
            const mealName = this.querySelector('h4').textContent;
            showModal(
                'Meal Details',
                `${mealName}\n\nThis would show detailed nutrition information for this meal.`,
                null
            );
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Add touch feedback for better mobile experience
document.addEventListener('touchstart', function() {}, true);

// Prevent zoom on double tap for better mobile experience
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add haptic feedback simulation
function simulateHapticFeedback() {
    // This would trigger actual haptic feedback on mobile devices
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('nav-btn')) {
        simulateHapticFeedback();
    }
});

// Smooth scrolling for chat messages
function scrollToBottom(element) {
    element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
    });
}

// Add accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, input, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #4CAF50';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ARIA labels
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize search and input handlers
const debouncedSearch = debounce((query) => {
    // Search functionality would go here
    console.log('Searching for:', query);
}, 300);

// Add service worker for offline capability (basic setup)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service worker support detected');
    });
}

// Add responsive design helpers
function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(updateViewportHeight, 100));
updateViewportHeight();

// Add dark mode support (if needed in future)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Add animation helpers
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * progress;
        element.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}

// Add loading states
function showLoading(element) {
    element.innerHTML = '<span class="material-icons">hourglass_empty</span> Loading...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showModal(
        'Error',
        'Something went wrong. Please try again.',
        null
    );
});

// Add performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}