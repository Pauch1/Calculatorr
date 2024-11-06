const recipes = {
    marinated: {
        title: "Marinated Chi-kin",
        title2:"Fry batter Chi-kin",
        type: "marinade",
        marinade: {
            percentages: {
                "Salt": 62,
                "Onion Powder": 11,
                "Garlic Powder": 11,
                "Black Pepper": 7,
                "Ginger Powder": 9,
                "Water": 1.50
            },
            ratios: {
                "P-MAR CHX": 0.0170,
                "Salt": 0.01054,
                "Onion Powder": 0.00187,
                "Garlic Powder": 0.00187,
                "Black Pepper": 0.00119,
                "Ginger Powder": 0.00153,
                "Water": 0.0150,
            }
        },
        fryBatter: {
            percentages: {
                "All Purpose Flour": 28,
                "Potato Starch": 46.20,
                "Baking Powder": 1.80,
                "Salt": 2.60,
                "Roasted Sesame Powder": 21.40,
                "Water": 55
            },
            ratios: {
                "All Purpose Flour": 0.0392,
                "Potato Starch": 0.06468,
                "Baking Powder": 0.00252,
                "Salt": 0.00364,
                "Roasted Sesame Powder": 0.02996,
                "Water": .2475
            }
        }
    },
    chop: {
        title: "Marinated Chi-kin Chop",
        title2: "Fry Batter for Chop",
        type: "marinade",
        marinade: {
            percentages: {
                "Salt": 58,
                "Onion Powder": 12,
                "Garlic Powder": 12,
                "Black Pepper": 8,
                "Ginger Powder": 10,
                "Water": 1.50
            },
            ratios: {
                "P-MAR CHX": 0.0170,
                "Salt": 0.00986,
                "Onion Powder": 0.00204,
                "Garlic Powder": 0.00204,
                "Black Pepper": 0.00136,
                "Ginger Powder": 0.0017,
                "Water": 0.0150
            }
        },
        fryBatter: {
            percentages: {
                "All Purpose Flour": 28,
                "Potato Starch": 46.20,
                "Baking Powder": 1.80,
                "Salt": 2.60,
                "Roasted Sesame Powder": 21.40,
                "Water": 55
            },
            ratios: {
                "All Purpose Flour": 0.0392,
                "Potato Starch": 0.0647,
                "Baking Powder": 0.00252,
                "Salt": 0.00364,
                "Roasted Sesame Powder": 0.02996,
                "Water": 0.2475
            }
        }
    },
    soy: {
        title: "Soy Garlic",
        type: "sauce",
        est: "EST: 12%",
        sauce: {
            percentages: {
                "Soy Sauce": 21.9,
                "Mirin": 19.9,
                "Sugar": 15.2,
                "Corn Syrup": 25.1,
                "Garlic": 8.6,
                "Vinegar": 3.3,
                "Oyster Sauce": 6.0
            },
            ratios: {
                "Soy Sauce": 0.02628,
                "Mirin": 0.02388,
                "Sugar": 0.01824,
                "Corn Syrup": 0.03012,
                "Garlic": 0.01032,
                "Vinegar": 0.00396,
                "Oyster Sauce": 0.0072
            }
        }
    },
    spicy: {
        title: "Spicy Gochujang Sauce",
        type: "sauce",
        est: "EST: 10%",
        sauce: {
            percentages: {
                "Gochujang": 28.9,
                "Ketchup": 16.5,
                "Soy Sauce": 9.3,
                "Brown Rice Vinegar": 20.8,
                "Mirin": 10.9,
                "Light Brown Sugar": 8.1,
                "Garlic": 5.5,
                "Sesame seed for garnish": 0
            },
            ratios: {
                "Gochujang": 0.0289,
                "Ketchup": 0.0165,
                "Soy Sauce": 0.0093,
                "Brown Rice Vinegar": 0.0208,
                "Mirin": 0.0109,
                "Light Brown Sugar": 0.0081,
                "Garlic": 0.0055,
                "Sesame seed for garnish": 0
            }
        }
    }
};

function formatNumber(num) {
    return num.toFixed(2);
}

function calculateIngredients(weight, section) {
    const results = {};
    let total = 0;
    
    for (const [ingredient, ratio] of Object.entries(section.ratios)) {
        // Skip adding water to the main results
        if (ingredient === 'Water') continue;
        
        const amount = weight * ratio;
        results[ingredient] = {
            amount,
            percentage: section.percentages?.[ingredient] || null
        };
        
        total += amount;
    }
    
    // Store total excluding water
    results['Total'] = {
        amount: total,
        percentage: 100
    };
    
    // Add water separately at the end
    const waterAmount = section.ratios['Water'] ? weight * section.ratios['Water'] : 0;
    if (waterAmount > 0) {
        results['Water'] = {
            amount: waterAmount,
            percentage: section.percentages?.['Water'] || null
        };
    }
    
    return results;
}


function displayResults(results, containerId, showPercentages) {
    const container = document.querySelector(`#${containerId} .ingredients`);
    container.innerHTML = '';
    
    let totalAdded = false; // Flag to track if the total is added
    
    Object.entries(results).forEach(([ingredient, data]) => {
        // Skip P-MAR CHX if present
        if (ingredient === 'P-MAR CHX') return; 
        
        // Skip Water from appearing before the total
        if (ingredient === 'Water') return; 
        
        const row = document.createElement('div');
        row.className = 'ingredient-row';

        // Apply bold style for "Total"
        let content = `<span${ingredient === 'Total' ? ' style="font-weight:bold;"' : ''}>${ingredient}</span><span>`;
        
        if (showPercentages && data.percentage !== null) {
            content += `<span class="percentage">${data.percentage}%</span>`;
        }
        
        content += `${formatNumber(data.amount)}g</span>`;
        
        row.innerHTML = content;
        container.appendChild(row);
        
        // After adding the total, add an empty bar
        if (ingredient === 'Total' && !totalAdded) {
            const emptyBar = document.createElement('div');
            emptyBar.className = 'ingredient-row empty-bar'; // Add a class for the empty bar
            container.appendChild(emptyBar);
            totalAdded = true;
        }
    });
    
    // Now add the water at the very end, after the empty bar and total
    if (results['Water']) {
        const waterRow = document.createElement('div');
        waterRow.className = 'ingredient-row';
        
        let waterContent = `<span>Water</span><span>`;
        if (showPercentages && results['Water'].percentage !== null) {
            waterContent += `<span class="percentage">${results['Water'].percentage}%</span>`;
        }
        waterContent += `${formatNumber(results['Water'].amount)}g</span>`;
        
        waterRow.innerHTML = waterContent;
        container.appendChild(waterRow);
    }
}




function showSection(sectionClass, show) {
    const sections = document.querySelectorAll(`.${sectionClass}`);
    sections.forEach(section => {
        if (show) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}


function togglePercentageOnly(show) {
    const percentageElements = document.querySelectorAll('.percentage-only');
    percentageElements.forEach(element => {
        element.style.display = show ? 'block' : 'none';
    });
}

function calculate() {
    const weight = parseFloat(document.getElementById('chickenWeight').value);
    const recipe = document.getElementById('recipeSelect').value;
    const showPercentages = document.getElementById('showPercentages').checked;
    
    // Toggle "P-MAR CHX" and "EST" visibility based on Show Percentages checkbox
    togglePercentageOnly(showPercentages);

    const calculationWeight = weight || 0;
    
    if (!recipe) {
        showSection('marinade-section', false);
        showSection('sauce-section', false);
        return;
    }
    
    const selectedRecipe = recipes[recipe];
    
    // Update titles based on the selected recipe
    if (selectedRecipe.type === 'marinade') {
        document.getElementById('marinadeTitle').innerText = selectedRecipe.title;
        document.getElementById('fryBatterTitle').innerText = selectedRecipe.title2;
    } else if (selectedRecipe.type === 'sauce') {
        document.getElementById('sauceTitle').innerText = selectedRecipe.title;
        document.getElementById('est11').innerText = selectedRecipe.est;
    }
    
    // Show/hide appropriate sections based on recipe type
    showSection('marinade-section', selectedRecipe.type === 'marinade');
    showSection('sauce-section', selectedRecipe.type === 'sauce');
    
    // Reset all containers
    document.querySelectorAll('.result-card .ingredients').forEach(el => el.innerHTML = '');
    
    // Calculate and display results based on recipe type
    if (selectedRecipe.marinade) {
        const marinadeResults = calculateIngredients(calculationWeight, selectedRecipe.marinade);
        displayResults(marinadeResults, 'marinade', showPercentages);
        
        const fryBatterResults = calculateIngredients(calculationWeight, selectedRecipe.fryBatter);
        displayResults(fryBatterResults, 'fryBatter', showPercentages);
    }
    
    if (selectedRecipe.sauce) {
        const sauceResults = calculateIngredients(calculationWeight, selectedRecipe.sauce);
        displayResults(sauceResults, 'sauce', showPercentages);
    }
}

// Event Listeners
document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('showPercentages').addEventListener('change', calculate);
document.getElementById('recipeSelect').addEventListener('change', calculate);
document.getElementById('chickenWeight').addEventListener('input', calculate);

// Add enter key support for the weight input
document.getElementById('chickenWeight').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculate();
    }
});

// Initial calculation with default values
calculate();
