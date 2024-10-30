function calculateAll() {
    const chicken_gram = parseFloat(document.getElementById('chicken-gram').value) || 0;
    
    // Marinade calculations
    const water1 = 0.0150 * chicken_gram;
    const p_mar_chx = 0.0170 * chicken_gram;
    
    const salt = 0.58 * p_mar_chx;
    const onion_powder = 0.12 * p_mar_chx;
    const garlic_powder = 0.12 * p_mar_chx;
    const black_pepper = 0.08 * p_mar_chx;
    const ginger_powder = 0.10 * p_mar_chx;
    
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
    updateValue('p-mar-chx', p_mar_chx);
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

// Add event listener for Enter key on input
document.getElementById('chicken-gram').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAll();
    }
});