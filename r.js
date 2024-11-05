const recipes = {
    marinated: {
        title: "Marinated Chi-kin",
        title2:"Fry batter",
        type: "marinade",
        marinade: {
            percentages: {
                "Salt": 62,
                "Onion Powder": 11,
                "Garlic Powder": 11,
                "Black Pepper": 7,
                "Ginger Powder": 9,
            },
            ratios: {
                "P-MAR CHX": 0.0170,
                "Salt": 0.01054,
                "Onion Powder": 0.00187,
                "Garlic Powder": 0.00187,
                "Black Pepper": 0.00119,
                "Ginger Powder": 0.00153,
                "Water": 0.0150
            }
        },
        fryBatter: {
            percentages: {
                "All Purpose Flour": 28,
                "Potato Starch": 46.20,
                "Baking Powder": 1.80,
                "Salt": 2.60,
                "Roasted Sesame Powder": 21.40
            },
            ratios: {
                "All Purpose Flour": 0.0392,
                "Potato Starch": 0.0647,
                "Baking Powder": 0.00252,
                "Salt": 0.00364,
                "Roasted Sesame Powder": 0.02996,
                "Water": 0.0770
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
                "Ginger Powder": 10
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
                "Roasted Sesame Powder": 21.40
            },
            ratios: {
                "All Purpose Flour": 0.0392,
                "Potato Starch": 0.0647,
                "Baking Powder": 0.00252,
                "Salt": 0.00364,
                "Roasted Sesame Powder": 0.02996,
                "Water": 0.0770
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
                "Corn Syrup": 25.2,
                "Garlic": 8.6,
                "Vinegar": 3.3,
                "Oyster Sauce": 6.0
            },
            ratios: {
                "Soy Sauce": 0.0219 * 1.2,
                "Mirin": 0.0199 * 1.2,
                "Sugar": 0.0152 * 1.2,
                "Corn Syrup": 0.0252 * 1.2,
                "Garlic": 0.0086 * 1.2,
                "Vinegar": 0.0033 * 1.2,
                "Oyster Sauce": 0.0060 * 1.2
            }
        }
    },
    spicy: {
        title: "Spicy Gochujang Sauce",
        type: "sauce",
        est: "EST: 10%",
        sauce: {
            percentages: {
                "Gochujang": 29.2,
                "Ketchup": 16.5,
                "Soy Sauce": 9.4,
                "Brown Rice Vinegar": 20.2,
                "Mirin": 11.0,
                "Light Brown Sugar": 8.2,
                "Garlic": 5.5,
                "Sesame seed for garnish": 0
            },
            ratios: {
                "Gochujang": 0.0292,
                "Ketchup": 0.0165,
                "Soy Sauce": 0.0094,
                "Brown Rice Vinegar": 0.0202,
                "Mirin": 0.0110,
                "Light Brown Sugar": 0.0082,
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
        const amount = weight * ratio;
        results[ingredient] = {
            amount,
            percentage: section.percentages?.[ingredient] || null
        };
        total += amount;
    }
    
    results['Total'] = {
        amount: total,
        percentage: 100
    };
    return results;
}

function displayResults(results, containerId, showPercentages) {
    const container = document.querySelector(`#${containerId} .ingredients`);
    container.innerHTML = '';
    
    Object.entries(results).forEach(([ingredient, data]) => {
        if (ingredient === 'P-MAR CHX') return; // Skip P-MAR CHX

        const row = document.createElement('div');
        row.className = 'ingredient-row';
        
        let content = `<span>${ingredient}</span><span>`;
        if (showPercentages && data.percentage !== null) {
            content += `<span class="percentage">${data.percentage}%</span>`;
        }
        content += `${formatNumber(data.amount)}g</span>`;
        
        row.innerHTML = content;
        container.appendChild(row);
    });
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

function calculate() {
    const weight = parseFloat(document.getElementById('chickenWeight').value);
    const recipe = document.getElementById('recipeSelect').value;
    const showPercentages = document.getElementById('showPercentages').checked;
    
    // If no weight entered, use placeholder value of 1000g
    const calculationWeight = weight || 0;
    
    if (!recipe) {
        // Hide all sections if no recipe selected
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