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
    alert('Not enough pizzas to upgrade the oven!');
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
    alert('Manager is already hired!');
  } else {
    alert('Not enough pizzas to hire a manager!');
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
    alert('Not enough pizzas to upgrade delivery efficiency!');
  }
});

document.getElementById('prestigeButton').addEventListener('click', () => {
  if (pizzaCount >= 1000) {
    prestige();
  } else {
    alert('You need at least 1000 pizzas to prestige!');
  }
});

function updateScore() {
  document.getElementById('score').innerText = `Pizza: ${pizzaCount} (Prestige Points: ${prestigePoints})`;
}

function updateUpgradeButton() {
  document.getElementById('upgradeButton').innerText = `Upgrade oven (Cost: ${upgradeCost})`;
}

function updateManagerButton() {
  document.getElementById('hireManager').innerText = `Hire Manager (Cost: ${managerCost})`;
}

function updateUpgradeDeliveryButton() {
  document.getElementById('upgradeDeliveryButton').innerText = `Upgrade Delivery (Cost: ${upgradeDeliveryCost})`;
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

// Update the score, upgrade buttons, and manager button when the page loads
updateScore();
updateUpgradeButton();
updateManagerButton();
updateUpgradeDeliveryButton();
