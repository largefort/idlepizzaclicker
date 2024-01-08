// Initialize i18next with language detection
i18next.use(i18nextBrowserLanguageDetector).init({
  fallbackLng: 'en', // Default language
  resources: {
    en: {
      translation: {
        pizza: 'Pizza',
        prestigePoints: 'Prestige Points',
        clickToMakePizza: 'Click to make pizza!',
        upgradeOven: 'Upgrade oven (Cost: {{cost}})',
        deliverPizzas: 'Deliver Pizzas (Earns 1 per second)',
        upgradeDelivery: 'Upgrade Delivery (Cost: {{cost}})',
        hireManager: 'Hire Manager (Cost: {{cost}})',
        prestige: 'Prestige (Lose progress, gain prestige points)',
        chooseLanguage: 'Choose Your Language',
        save: 'Save',
      }
    },
    es: {
      translation: {
        pizza: 'Pizza',
        prestigePoints: 'Puntos de Prestigio',
        clickToMakePizza: 'Haz clic para hacer pizza',
        upgradeOven: 'Mejorar horno (Costo: {{cost}})',
        deliverPizzas: 'Entregar Pizzas (Gana 1 por segundo)',
        upgradeDelivery: 'Mejorar Entrega (Costo: {{cost}})',
        hireManager: 'Contratar Gerente (Costo: {{cost}})',
        prestige: 'Prestigio (Pierde progreso, gana puntos de prestigio)',
        chooseLanguage: 'Elige tu idioma',
        save: 'Guardar',
      }
    },
    is: {
      translation: {
        pizza: 'Pítsa',
        prestigePoints: 'Prestígepunktir',
        clickToMakePizza: 'Smelltu til að gera pítsu!',
        upgradeOven: 'Uppfæra ofni (Kostnaður: {{cost}})',
        deliverPizzas: 'Aflvera Pítsur (Að fá 1 á sekúndu)',
        upgradeDelivery: 'Uppfæra Aflverun (Kostnaður: {{cost}})',
        hireManager: 'Leigja Stjórnanda (Kostnaður: {{cost}})',
        prestige: 'List (Tapaðu framgangi, fáðu hæfnispunkt)',
        chooseLanguage: 'Veldu þitt tungumál',
        save: 'Vista',
      }
    }
    // Add more language translations as needed
  }
});

// Game variables
let pizzaCount = parseInt(localStorage.getItem('pizzaCount')) || 0;
let ovenLevel = parseInt(localStorage.getItem('ovenLevel')) || 1;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
let deliveryIncome = parseInt(localStorage.getItem('deliveryIncome')) || 1;
let managerCost = 100;
let managerIsHired = localStorage.getItem('managerIsHired') === 'true' || false;
let upgradeDeliveryCost = 50;
let prestigePoints = parseInt(localStorage.getItem('prestigePoints')) || 0;

// Timer for automatic pizza production
setInterval(() => {
  pizzaCount += ovenLevel;
  updateScore();
}, 1000);

document.getElementById('clickButton').addEventListener('click', () => {
  pizzaCount += ovenLevel;
  updateScore();
});

document.getElementById('upgradeButton').addEventListener('click', () => {
  if (pizzaCount >= upgradeCost) {
    pizzaCount -= upgradeCost;
    ovenLevel++;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateScore();
    updateUpgradeButton();
    saveGame();
  } else {
    alert(i18next.t('Not enough pizzas to upgrade the oven!'));
  }
});

document.getElementById('deliverButton').addEventListener('click', () => {
  pizzaCount += deliveryIncome;
  updateScore();
  saveGame();
});

document.getElementById('hireManager').addEventListener('click', () => {
  if (pizzaCount >= managerCost && !managerIsHired) {
    pizzaCount -= managerCost;
    managerIsHired = true;
    updateScore();
    updateManagerButton();
    saveGame();
    // Start manager production if hired
    if (managerIsHired) {
      hireManager();
    }
  } else if (managerIsHired) {
    alert(i18next.t('Manager is already hired!'));
  } else {
    alert(i18next.t('Not enough pizzas to hire a manager!'));
  }
});

document.getElementById('upgradeDeliveryButton').addEventListener('click', () => {
  if (pizzaCount >= upgradeDeliveryCost) {
    pizzaCount -= upgradeDeliveryCost;
    deliveryIncome *= 2;
    upgradeDeliveryCost = Math.floor(upgradeDeliveryCost * 1.5);
    updateScore();
    updateUpgradeDeliveryButton();
    saveGame();
  } else {
    alert(i18next.t('Not enough pizzas to upgrade delivery efficiency!'));
  }
});

document.getElementById('prestigeButton').addEventListener('click', () => {
  if (pizzaCount >= 1000) {
    prestige();
  } else {
    alert(i18next.t('You need at least 1000 pizzas to prestige!'));
  }
});

function updateScore() {
  document.getElementById('score').innerText = `${i18next.t('pizza')}: ${pizzaCount} (${i18next.t('prestigePoints')}: ${prestigePoints})`;
}

function updateUpgradeButton() {
  document.getElementById('upgradeButton').innerText = `${i18next.t('upgradeOven', { cost: upgradeCost })}`;
}

function updateManagerButton() {
  document.getElementById('hireManager').innerText = `${i18next.t('hireManager', { cost: managerCost })}`;
}

function updateUpgradeDeliveryButton() {
  document.getElementById('upgradeDeliveryButton').innerText = `${i18next.t('upgradeDelivery', { cost: upgradeDeliveryCost })}`;
}

function hireManager() {
  setInterval(() => {
    if (managerIsHired) {
      pizzaCount += ovenLevel;
      updateScore();
      saveGame();
    }
  }, 2000); // Manager produces pizza every 2 seconds
}

function prestige() {
  prestigePoints++;
  // Reset game state
  pizzaCount = 0;
  ovenLevel = 1;
  upgradeCost = 10;
  deliveryIncome = 1;
  managerIsHired = false;
  upgradeDeliveryCost = 50;
  // Save and update
  updateScore();
  updateUpgradeButton();
  updateManagerButton();
  updateUpgradeDeliveryButton();
  saveGame();
}

function saveGame() {
  localStorage.setItem('pizzaCount', pizzaCount);
  localStorage.setItem('ovenLevel', ovenLevel);
  localStorage.setItem('upgradeCost', upgradeCost);
  localStorage.setItem('deliveryIncome', deliveryIncome);
  localStorage.setItem('managerIsHired', managerIsHired);
  localStorage.setItem('upgradeDeliveryCost', upgradeDeliveryCost);
  localStorage.setItem('prestigePoints', prestigePoints);
}

// Function to set the game elements based on the current language
function setLanguage() {
  document.getElementById('score').innerText = i18next.t('pizza') + ': 0 (' + i18next.t('prestigePoints') + ': 0)';
  document.getElementById('clickButton').innerText = i18next.t('clickToMakePizza');
  document.getElementById('upgradeButton').innerText = i18next.t('upgradeOven', { cost: upgradeCost });
  document.getElementById('deliverButton').innerText = i18next.t('deliverPizzas');
  document.getElementById('upgradeDeliveryButton').innerText = i18next.t('upgradeDelivery', { cost: upgradeDeliveryCost });
  document.getElementById('hireManager').innerText = i18next.t('hireManager', { cost: managerCost });
  document.getElementById('prestigeButton').innerText = i18next.t('prestige');
  document.getElementById('languageModalLabel').innerText = i18next.t('chooseLanguage');
  document.getElementById('languageModalSaveButton').innerText = i18next.t('save');
}

// Initialize language selection modal
var languageModal = new bootstrap.Modal(document.getElementById('languageModal'), {
  backdrop: 'static',
  keyboard: false
});

// Show the language selection modal on page load
window.onload = function () {
  languageModal.show();
};

// Function to save language preferences
function saveLanguagePreferences() {
  var nativeLanguage = document.getElementById('nativeLanguage').value;
  var preferredLanguage = document.getElementById('preferredLanguage').value;

  // Save language preferences to localStorage or a server, as needed
  localStorage.setItem('nativeLanguage', nativeLanguage);
  localStorage.setItem('preferredLanguage', preferredLanguage);

  // Change the language and update game elements
  i18next.changeLanguage(preferredLanguage, () => {
    setLanguage();
    // Close the modal
    languageModal.hide();
  });
}
