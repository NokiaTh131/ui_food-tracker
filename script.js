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

// Mock Thai food database for recognition
const thaiFoodDatabase = [
    {
        id: 1,
        name: "ข้าวผัดกุ้ง",
        emoji: "🍤",
        calories: 520,
        protein: 25,
        carbs: 75,
        fat: 12,
        fiber: 3,
        sodium: 1200,
        confidence: 0.92
    },
    {
        id: 2,
        name: "ส้มตำไทย",
        emoji: "🥗",
        calories: 120,
        protein: 8,
        carbs: 25,
        fat: 2,
        fiber: 6,
        sodium: 800,
        confidence: 0.88
    },
    {
        id: 3,
        name: "แกงเขียวหวานไก่",
        emoji: "🍛",
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 20,
        fiber: 4,
        sodium: 950,
        confidence: 0.85
    },
    {
        id: 4,
        name: "ผัดไทยกุ้งสด",
        emoji: "🍜",
        calories: 450,
        protein: 22,
        carbs: 65,
        fat: 15,
        fiber: 5,
        sodium: 1100,
        confidence: 0.90
    },
    {
        id: 5,
        name: "มะม่วงข้าวเหนียว",
        emoji: "🥭",
        calories: 280,
        protein: 4,
        carbs: 55,
        fat: 8,
        fiber: 3,
        sodium: 50,
        confidence: 0.87
    }
];

// User's daily nutrition targets
const dailyTargets = {
    calories: 1800,
    protein: 90,      // grams
    carbs: 225,       // grams
    fat: 60,          // grams
    fiber: 25,        // grams
    sodium: 2300      // mg
};

// Current daily intake (mock data)
let currentIntake = {
    calories: 1020,
    protein: 45,
    carbs: 120,
    fat: 35,
    fiber: 12,
    sodium: 1500
};

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

// Photo upload functions
function triggerPhotoUpload() {
    const photoInput = document.getElementById('photo-input');
    photoInput.click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);

    // Show loading state
    showModal(
        '📷 กำลังวิเคราะห์...',
        '🔍 กำลังวิเคราะห์อาหารของคุณ...\n\nโปรดรอสักครู่',
        null
    );

    // Simulate AI processing time
    setTimeout(() => {
        closeModal();
        
        // Mock food recognition - randomly select a Thai food
        const recognizedFood = thaiFoodDatabase[Math.floor(Math.random() * thaiFoodDatabase.length)];
        
        // Display analysis results with the uploaded image
        displayNutrientAnalysis(recognizedFood, imageUrl);
        
        // Update daily intake
        updateDailyIntake(recognizedFood);
        
        // Show restaurant suggestions after analysis
        setTimeout(() => {
            displayRestaurantSuggestionsBasedOnDeficiency();
        }, 1500);
        
    }, 2000);
}

function displayNutrientAnalysis(food, imageUrl = null) {
    const analysisContainer = document.getElementById('nutrient-analysis');
    const resultContainer = document.getElementById('food-analysis-result');
    
    if (!analysisContainer || !resultContainer) return;
    
    // Calculate nutrition deficiencies
    const deficiencies = calculateNutrientDeficiencies(food);
    
    resultContainer.innerHTML = `
        <div class="nutrient-analysis-result">
            <!-- Detected Food -->
            <div class="food-detected">
                ${imageUrl ? `<img src="${imageUrl}" alt="อาหารที่อัปโหลด" class="uploaded-image">` : `<span class="food-detected-emoji">${food.emoji}</span>`}
                <div class="food-detected-name">${food.name}</div>
                <div class="food-detected-confidence">ความแม่นยำ: ${Math.round(food.confidence * 100)}%</div>
            </div>
            
            <!-- Nutrient Grid -->
            <div class="nutrient-grid">
                <div class="nutrient-item">
                    <span class="nutrient-icon">🔥</span>
                    <div class="nutrient-value">${food.calories}</div>
                    <div class="nutrient-label">แคลอรี่</div>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-icon">💪</span>
                    <div class="nutrient-value">${food.protein}g</div>
                    <div class="nutrient-label">โปรตีน</div>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-icon">🌾</span>
                    <div class="nutrient-value">${food.carbs}g</div>
                    <div class="nutrient-label">คาร์โบไฮเดรต</div>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-icon">🥑</span>
                    <div class="nutrient-value">${food.fat}g</div>
                    <div class="nutrient-label">ไขมัน</div>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-icon">🌿</span>
                    <div class="nutrient-value">${food.fiber}g</div>
                    <div class="nutrient-label">ใยอาหาร</div>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-icon">🧂</span>
                    <div class="nutrient-value">${food.sodium}mg</div>
                    <div class="nutrient-label">โซเดียม</div>
                </div>
            </div>
            
            ${deficiencies.length > 0 ? `
            <!-- Deficiency Analysis -->
            <div class="deficiency-analysis">
                <div class="deficiency-title">
                    <span>⚠️</span>
                    <span>สารอาหารที่ยังขาด</span>
                </div>
                <ul class="deficiency-list">
                    ${deficiencies.map(def => `
                        <li class="deficiency-item">${def}</li>
                    `).join('')}
                </ul>
            </div>
            ` : `
            <div class="deficiency-analysis" style="background: #d4edda; border-color: #c3e6cb;">
                <div class="deficiency-title" style="color: #155724;">
                    <span>✅</span>
                    <span>คุณได้รับสารอาหารครบถ้วนแล้ววันนี้!</span>
                </div>
            </div>
            `}
        </div>
    `;
    
    // Show the analysis section
    analysisContainer.style.display = 'block';
    
    // Scroll to show the analysis
    analysisContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateDailyIntake(food) {
    // Update current intake with the analyzed food
    currentIntake.calories += food.calories;
    currentIntake.protein += food.protein;
    currentIntake.carbs += food.carbs;
    currentIntake.fat += food.fat;
    currentIntake.fiber += food.fiber;
    currentIntake.sodium += food.sodium;
    
    // Update the progress bar and daily calories display
    dailyCalories = currentIntake.calories;
    updateProgressBar();
}

function calculateNutrientDeficiencies(addedFood) {
    const deficiencies = [];
    const futureIntake = {
        calories: currentIntake.calories + addedFood.calories,
        protein: currentIntake.protein + addedFood.protein,
        carbs: currentIntake.carbs + addedFood.carbs,
        fat: currentIntake.fat + addedFood.fat,
        fiber: currentIntake.fiber + addedFood.fiber,
        sodium: currentIntake.sodium + addedFood.sodium
    };
    
    if (futureIntake.protein < dailyTargets.protein * 0.8) {
        const needed = Math.round(dailyTargets.protein - futureIntake.protein);
        deficiencies.push(`โปรตีน - ต้องการอีก ${needed}g`);
    }
    
    if (futureIntake.fiber < dailyTargets.fiber * 0.6) {
        const needed = Math.round(dailyTargets.fiber - futureIntake.fiber);
        deficiencies.push(`ใยอาหาร - ต้องการอีก ${needed}g`);
    }
    
    if (futureIntake.calories < dailyTargets.calories * 0.7) {
        const needed = Math.round(dailyTargets.calories - futureIntake.calories);
        deficiencies.push(`แคลอรี่ - ต้องการอีก ${needed} แคลอรี่`);
    }
    
    if (futureIntake.carbs < dailyTargets.carbs * 0.5) {
        const needed = Math.round(dailyTargets.carbs - futureIntake.carbs);
        deficiencies.push(`คาร์โบไฮเดรต - ต้องการอีก ${needed}g`);
    }
    
    return deficiencies;
}

// Legacy function - kept for compatibility
function handleTakePhoto() {
    triggerPhotoUpload();
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
            <div class="meal-image" style="margin-right: 5px;">${food.emoji}</div>
            <div class="recommendation-info" style="margin-right: 5px;">
                <h4>${food.name}</h4>
                <p class="reason">${food.reason}</p>
            </div>
            <div class="recommendation-calories">
                ${food.calories} แคลอรี่
            </div>
        `;
        foodItem.addEventListener('click', () => {
            showElderFriendlyModal(
                '🍽️ รายละเอียดอาหาร',
                {
                    emoji: food.emoji,
                    name: food.name,
                    calories: food.calories,
                    nutrients: food.nutrients,
                    time: food.time,
                    reason: food.reason
                },
                'food-detail'
            );
        });
        container.appendChild(foodItem);
    });
}

function showAllRecommendations() {
    showElderFriendlyModal(
        '🍽️ คำแนะนำอาหารทั้งหมด',
        foodRecommendations,
        'all-recommendations'
    );
}

// Restaurant suggestion functions
function displayRestaurantSuggestionsBasedOnDeficiency() {
    const container = document.getElementById('restaurant-suggestions');
    const listContainer = document.getElementById('restaurant-list');
    
    if (!container || !listContainer) return;
    
    // Calculate current deficiencies to recommend appropriate restaurants
    const deficiencies = calculateCurrentDeficiencies();
    
    // Update header to show why these restaurants are suggested
    const headerElement = container.querySelector('.card-header h3');
    if (headerElement) {
        if (deficiencies.length > 0) {
            headerElement.textContent = 'ร้านอาหารที่แนะนำสำหรับคุณ';
        } else {
            headerElement.textContent = 'ร้านอาหารใกล้เคียง';
        }
    }
    
    // Show the restaurant suggestions section
    container.style.display = 'block';
    
    // Populate restaurant list with deficiency-based recommendations
    listContainer.innerHTML = '';
    
    nearbyRestaurants.slice(0, 3).forEach(restaurant => {
        const restaurantItem = document.createElement('div');
        restaurantItem.className = 'restaurant-item';
        
        // Determine recommended foods based on deficiencies
        const recommendedFoods = getRecommendedFoodsForDeficiency(restaurant, deficiencies);
        
        restaurantItem.innerHTML = `
            <div class="meal-image">${restaurant.emoji}</div>
            <div class="restaurant-info">
                <h4>${restaurant.name}</h4>
                <div class="restaurant-rating">
                    <span>⭐ ${restaurant.rating}</span>
                    <span> • ${restaurant.cuisine}</span>
                </div>
                <p class="restaurant-options">
                    ${recommendedFoods.length > 0 ? recommendedFoods.join(', ') : restaurant.healthyOptions.slice(0, 2).join(', ')}
                </p>
                ${deficiencies.length > 0 ? `
                <p class="restaurant-recommendation-reason" style="font-size: 14px; color: #22986a; font-style: italic; margin-top: 5px;">
                    💡 ช่วยเติมเต็ม: ${deficiencies.slice(0, 2).join(', ')}
                </p>
                ` : ''}
            </div>
            <div class="restaurant-contact">
                <p class="restaurant-distance">📍 ${restaurant.distance}</p>
                <p>📞 ${restaurant.phone}</p>
            </div>
        `;
        
        restaurantItem.addEventListener('click', () => {
            showRestaurantDetailsWithNutrition(restaurant, deficiencies);
        });
        
        listContainer.appendChild(restaurantItem);
    });
    
    // Scroll to show the suggestions
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function calculateCurrentDeficiencies() {
    const deficiencies = [];
    
    if (currentIntake.protein < dailyTargets.protein * 0.8) {
        deficiencies.push('โปรตีน');
    }
    
    if (currentIntake.fiber < dailyTargets.fiber * 0.6) {
        deficiencies.push('ใยอาหาร');
    }
    
    if (currentIntake.calories < dailyTargets.calories * 0.7) {
        deficiencies.push('แคลอรี่');
    }
    
    if (currentIntake.carbs < dailyTargets.carbs * 0.5) {
        deficiencies.push('คาร์โบไฮเดรต');
    }
    
    return deficiencies;
}

function getRecommendedFoodsForDeficiency(restaurant, deficiencies) {
    const proteinFoods = {
        "ร้านสวนเขียว": ["โบลอกแซลมอน", "สลัดไก่ย่าง"],
        "บิสโทร่สดใส": ["แร็ปโปรตีน", "โบลอเมดิเตอร์เรเนียน"],
        "มุมโภชนาการ": ["สลัดไก่ย่าง", "ปลานึ่ง"],
        "ไดเนอร์ผู้สูงอายุ": ["ปลาอบกับผัก", "ไข่ต้ม"]
    };
    
    const fiberFoods = {
        "ร้านสวนเขียว": ["สลัดควินัว", "ซุปผัก"],
        "บิสโทร่สดใส": ["พาร์เฟต์ผลไม้", "โบลอผัก"],
        "มุมโภชนาการ": ["ผักนึ่ง", "โอ๊ตมีล"],
        "ไดเนอร์ผู้สูงอายุ": ["ขนมปังโฮลเกรน", "ผักต้ม"]
    };
    
    const calorieFoods = {
        "ร้านสวนเขียว": ["โบลอกแซลมอน", "ข้าวไก่ย่าง"],
        "บิสโทร่สดใส": ["พาสต้าโฮลเกรน", "โบลอเมดิเตอร์เรเนียน"],
        "มุมโภชนาการ": ["ข้าวกล้องผัดผัก", "ก๋วยเตี๋ยวไก่"],
        "ไดเนอร์ผู้สูงอายุ": ["ข้าวต้มปลา", "โจ๊กไก่"]
    };
    
    let recommended = [];
    
    if (deficiencies.includes('โปรตีน') && proteinFoods[restaurant.name]) {
        recommended.push(...proteinFoods[restaurant.name]);
    }
    
    if (deficiencies.includes('ใยอาหาร') && fiberFoods[restaurant.name]) {
        recommended.push(...fiberFoods[restaurant.name]);
    }
    
    if (deficiencies.includes('แคลอรี่') && calorieFoods[restaurant.name]) {
        recommended.push(...calorieFoods[restaurant.name]);
    }
    
    // Remove duplicates and limit to 2 items
    return [...new Set(recommended)].slice(0, 2);
}

function showRestaurantDetailsWithNutrition(restaurant, deficiencies) {
    const healthyOptionsText = restaurant.healthyOptions.map(option => `• ${option}`).join('\n');
    const recommendedFoods = getRecommendedFoodsForDeficiency(restaurant, deficiencies);
    
    let nutritionRecommendation = '';
    if (deficiencies.length > 0 && recommendedFoods.length > 0) {
        nutritionRecommendation = `\n\n🎯 แนะนำสำหรับคุณ:\n${recommendedFoods.map(food => `• ${food}`).join('\n')}\n(ช่วยเติมเต็ม: ${deficiencies.join(', ')})`;
    }
    
    showModal(
        `${restaurant.emoji} ${restaurant.name}`,
        `🏪 ร้าน${restaurant.cuisine}\n\n` +
        `📍 ${restaurant.address}\n` +
        `📞 ${restaurant.phone}\n` +
        `⭐ คะแนน ${restaurant.rating}\n` +
        `📏 ระยะทาง ${restaurant.distance}\n\n` +
        `🥗 เมนูเพื่อสุขภาพ:\n${healthyOptionsText}${nutritionRecommendation}\n\n` +
        `ต้องการเส้นทางหรือจองโต๊ะหรือไม่?`,
        () => {
            showSuccessMessage(`🗺️ เปิดเส้นทางไป ${restaurant.name}...`);
        }
    );
}

// Legacy function - kept for compatibility
function displayRestaurantSuggestions() {
    displayRestaurantSuggestionsBasedOnDeficiency();
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
        'ส่งออกรายงาน',
        'จะทำการส่งออกรายงานโภชนาการรายสัปดาห์เป็นไฟล์ PDF',
        () => {
            showSuccessMessage('ส่งออกรายงานรายสัปดาห์เรียบร้อยแล้ว!');
        }
    );
}

function shareWithFamily() {
    showModal(
        'แชร์กับครอบครัว',
        'จะทำการแชร์ความคืบหน้าโภชนาการของคุณกับสมาชิกในครอบครัว',
        () => {
            showSuccessMessage('แชร์ความคืบหน้ากับครอบครัวเรียบร้อยแล้ว!');
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
        'สำเร็จ!',
        message,
        null
    );
    
    // Auto-close success messages after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// Elder-friendly modal for food details and recommendations
function showElderFriendlyModal(title, data, type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    modalTitle.innerHTML = title;
    modalTitle.style.fontSize = '28px';
    modalTitle.style.color = '#22986a';
    modalTitle.style.marginBottom = '25px';
    modalTitle.style.textAlign = 'center';
    
    let content = '';
    
    if (type === 'food-detail') {
        content = `
            <div class="elder-food-detail">
                <div class="food-emoji">${data.emoji}</div>
                <div class="food-title">${data.name}</div>
                
                <div class="detail-section">
                    <div class="detail-label">🔥 แคลอรี่</div>
                    <div class="detail-value">${data.calories} แคลอรี่</div>
                </div>
                
                <div class="detail-section">
                    <div class="detail-label">💊 สารอาหาร</div>
                    <div class="detail-value">${data.nutrients}</div>
                </div>
                
                <div class="detail-section">
                    <div class="detail-label">⏰ เวลาที่เหมาะ</div>
                    <div class="detail-value">${data.time}</div>
                </div>
                
                <div class="detail-section reason-section">
                    <div class="detail-label">💡 เหตุผล</div>
                    <div class="detail-value reason-text">${data.reason}</div>
                </div>
            </div>
        `;
    } else if (type === 'all-recommendations') {
        content = `
            <div class="elder-recommendations">
                <div class="recommendations-subtitle">คำแนะนำอาหารสำหรับคุณวันนี้</div>
                ${data.map(food => `
                    <div class="recommendation-card">
                        <div class="rec-header">
                            <span class="rec-emoji">${food.emoji}</span>
                            <span class="rec-name">${food.name}</span>
                        </div>
                        <div class="rec-calories">${food.calories} แคลอรี่</div>
                        <div class="rec-reason">💡 ${food.reason}</div>
                        <div class="rec-details">
                            <div>⏰ ${food.time}</div>
                            <div>💊 ${food.nutrients}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    modalText.innerHTML = content;
    modalText.style.textAlign = 'left';
    modalText.style.lineHeight = '1.8';
    
    modal.classList.add('active');
    currentAction = null;
}

// Function to display current date
function displayCurrentDate() {
    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    
    // Thai abbreviated month names
    const thaiMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    
    const month = thaiMonths[now.getMonth()];
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = `${day} ${month} ${year}`;
    }
}

// Text-to-Speech function for today's summary
function speakTodaySummary() {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
        showModal(
            'ไม่รองรับ',
            'เบราว์เซอร์ของคุณไม่รองรับการอ่านข้อความ',
            null
        );
        return;
    }

    const voiceBtn = document.querySelector('.voice-btn');
    
    // If already speaking, stop it
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        voiceBtn.classList.remove('speaking');
        voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        return;
    }

    // Create speech text in Thai
    const summaryText = `วันนี้คุณได้รับแคลอรี่ทั้งหมด ${dailyCalories} แคลอรี่ จากเป้าหมาย ${calorieGoal} แคลอรี่ 
    โปรตีน ${currentIntake.protein} กรัม 
    และทานอาหารไปแล้ว ${document.querySelectorAll('#history-screen .meal-item').length} มื้อ 
    คุณทำได้ดีมากค่ะ ขอให้มีสุขภาพแข็งแรงตลอดไป`;

    const utterance = new SpeechSynthesisUtterance(summaryText);
    
    // Set Thai language
    utterance.lang = 'th-TH';
    utterance.rate = 0.8; // Slower speech for elder users
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Add visual feedback
    voiceBtn.classList.add('speaking');
    voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';

    // Event listeners
    utterance.onstart = function() {
        console.log('Speech started');
    };

    utterance.onend = function() {
        voiceBtn.classList.remove('speaking');
        voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    };

    utterance.onerror = function(event) {
        console.error('Speech error:', event.error);
        voiceBtn.classList.remove('speaking');
        voiceBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        showModal(
            'ข้อผิดพลาด',
            'ไม่สามารถเล่นเสียงได้ กรุณาลองใหม่อีกครั้ง',
            null
        );
    };

    // Try to find Thai voice or use default
    const voices = speechSynthesis.getVoices();
    const thaiVoice = voices.find(voice => voice.lang.includes('th')) || voices[0];
    if (thaiVoice) {
        utterance.voice = thaiVoice;
    }

    // Speak the text
    speechSynthesis.speak(utterance);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard screen by default
    showScreen('dashboard');
    
    // Display current date
    displayCurrentDate();
    
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
                'รายละเอียดอาหาร',
                `${mealName}\n\nจะแสดงข้อมูลโภชนาการโดยละเอียดของอาหารมื้อนี้`,
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
    element.innerHTML = '<span class="material-icons">hourglass_empty</span> กำลังโหลด...';
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