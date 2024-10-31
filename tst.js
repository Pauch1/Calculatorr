const recipes = {
    'chicken': {
        name: 'Marinated Chi-Ken',
        name2: 'Fry Batter Chi-Ken',
        ingredient: 'Ingredient Chi-Ken',
        salt: 0.65,
        onion: 0.11,
        garlic: 0.11,
        pepper: 0.065,
        ginger: 0.065
    },
    'chicken-chop': {
        name: 'Marinated Chop',
        name2: 'Fry Batter Chop',
        ingredient: 'Ingredient(chop)',
        salt: 0.58,
        onion: 0.12,
        garlic: 0.12,
        pepper: 0.08,
        ginger: 0.10
    }
};

function formatPercentage(value) {
    // Convert to percentage and fix to 2 decimal places
    return `${(value * 100).toFixed(2)}%`;
}

function updatePercentages(recipeType) {
    const recipe = recipes[recipeType];
    // Update recipe title
    document.getElementById('recipe-title').textContent = recipe.name;
    document.getElementById('title').textContent = recipe.name2;
    document.getElementById('ingr').textContent = recipe.ingredient;
    document.getElementById('ingrs').textContent = recipe.ingredient;
    
    // Update percentages with fixed decimal places
    document.getElementById('salt-percentage').textContent = formatPercentage(recipe.salt);
    document.getElementById('onion-percentage').textContent = formatPercentage(recipe.onion);
    document.getElementById('garlic-percentage').textContent = formatPercentage(recipe.garlic);
    document.getElementById('pepper-percentage').textContent = formatPercentage(recipe.pepper);
    document.getElementById('ginger-percentage').textContent = formatPercentage(recipe.ginger);
}

function calculateAll() {

    
    
    const chicken_gram = parseFloat(document.getElementById('chicken-gram').value) || 0;
    const recipeType = document.getElementById('recipe-type').value;
    const recipe = recipes[recipeType];
    
    // Update percentages display
    updatePercentages(recipeType);
    
    // Marinade calculations
    const water1 = 0.0150 * chicken_gram;
    const p_mar_chx = 0.0170 * chicken_gram;
    
    const salt = recipe.salt * p_mar_chx;
    const onion_powder = recipe.onion * p_mar_chx;
    const garlic_powder = recipe.garlic * p_mar_chx;
    const black_pepper = recipe.pepper * p_mar_chx;
    const ginger_powder = recipe.ginger * p_mar_chx;
    
    const p_mar_chx_val = salt + onion_powder + garlic_powder + black_pepper + ginger_powder;
    const marinated_chicken = p_mar_chx_val + water1;
    
    // Fry batter calculations
    const est = 0.14;
    const fry_batter = est * chicken_gram;
    const all_purpose_flour = 0.28 * fry_batter;
    const potato_starch = 0.4620 * fry_batter;
    const baking_powder = 0.0180 * fry_batter;
    const salt2 = 0.0260 * fry_batter;
    const roasted_sesame_powder = 0.2140 * fry_batter;
    const water2 = (fry_batter / 0.45) * 0.55;
    
    const fry_batter_val = all_purpose_flour + potato_starch + baking_powder + salt2 + roasted_sesame_powder;
    const batter_total = water2 + fry_batter_val;
    
    // Update marinade values
    
    updateValue('salt', salt);
    updateValue('onion-powder', onion_powder);
    updateValue('garlic-powder', garlic_powder);
    updateValue('black-pepper', black_pepper);
    updateValue('ginger-powder', ginger_powder);
    updateValue('marinade-total', p_mar_chx_val);
    updateValue('water1', water1);
    updateValue('marinade-grand-total', marinated_chicken);
    
    // Update batter values
    updateValue('fry-batter', fry_batter);
    updateValue('flour', all_purpose_flour);
    updateValue('potato-starch', potato_starch);
    updateValue('baking-powder', baking_powder);
    updateValue('salt2', salt2);
    updateValue('sesame-powder', roasted_sesame_powder);
    updateValue('batter-total', fry_batter_val);
    updateValue('water2', water2);
    updateValue('batter-grand-total', batter_total);
}

function updateValue(id, value) {
    document.getElementById(id).textContent = value.toFixed(2);
}

// Event Listeners
document.getElementById('chicken-gram').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAll();
    }
});

document.getElementById('recipe-type').addEventListener('change', function() {
    if (document.getElementById('chicken-gram').value) {
        calculateAll();
    }
    updatePercentages(this.value);
});

// Initialize with default recipe
window.addEventListener('load', function() {
    updatePercentages('chicken');
});