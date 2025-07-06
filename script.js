document.addEventListener('DOMContentLoaded', function () {
    
    function handleTabSwitch(options) {
        const { button, buttonSelector, contentSelector, container } = options;
        if (!button) return;
        const tabId = button.dataset.tab;

        container.querySelectorAll(buttonSelector).forEach(btn => btn.classList.remove('active'));
        container.querySelectorAll(contentSelector).forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        button.classList.add('active');
        const activeContent = container.querySelector(`#${tabId}`);
        if (activeContent) {
            activeContent.classList.add('active');
            activeContent.style.display = 'block';
        }
    }

    const mainContainer = document.querySelector('.main-container');
    const planMeseContainer = document.getElementById('planMese');
    const daySelector = document.getElementById('daySelector');
    const weekSelector = document.getElementById('weekSelector');
    const mealPlanDisplay = document.getElementById('mealPlanDisplay');
    const weeklyPlanDisplay = document.getElementById('weeklyPlanDisplay');
    const fullPlanTableBody = document.getElementById('fullPlanTableBody');
    const ingrasareAccordion = document.getElementById('ingrasareAccordion');
    
    mainContainer.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => handleTabSwitch({ button, buttonSelector: '.tab-button', contentSelector: '.tab-content', container: mainContainer }));
    });

    if (planMeseContainer) {
        planMeseContainer.querySelectorAll('.sub-tab-button').forEach(button => {
            button.addEventListener('click', () => handleTabSwitch({ button, buttonSelector: '.sub-tab-button', contentSelector: '.sub-tab-content', container: planMeseContainer }));
        });
    }
    
    const ingrasareData = [
        { icon: '⚖️', title: 'De ce contează o greutate sănătoasă?', content: 'Un Indice de Masă Corporală (IMC) sub 18.5 poate indica o stare de subponderalitate. Aceasta poate duce la o serie de probleme de sănătate, inclusiv: un sistem imunitar slăbit, oboseală cronică, anemie, probleme de fertilitate și o densitate osoasă redusă (risc de osteoporoză). Scopul nu este doar estetic, ci funcțional: să oferim corpului resursele de care are nevoie pentru a funcționa la capacitate maximă.' },
        { icon: '🤔', title: 'Provocarea constituției ectomorfe', content: 'Persoanele ectomorfe au, în mod natural, un metabolism rapid și o structură osoasă fină, ceea ce face acumularea de masă (atât musculară, cât și adipoasă) mai dificilă. Acest lucru nu este un defect, ci o particularitate metabolică. Cheia succesului nu este să mănânci "oricât și orice", ci să urmezi un plan structurat, bazat pe un surplus caloric din surse de calitate.' },
        { icon: '🍽️', title: 'Principiul surplusului caloric controlat', content: 'Pentru a câștiga în greutate, trebuie să consumi mai multe calorii decât arzi. Însă, un surplus haotic, bazat pe alimente procesate și zahăr, va duce la acumularea de grăsime nesănătoasă. Un surplus controlat (aprox. 300-500 kcal peste necesarul de menținere), bogat în proteine, carbohidrați complecși și grăsimi sănătoase, va favoriza construirea de masă musculară, mai ales dacă este combinat cu antrenament de forță.' },
        { icon: '💪', title: 'Rolul proteinelor și al antrenamentului de forță', content: 'Proteinele sunt "cărămizile" din care se construiesc mușchii. Fără un aport proteic adecvat, caloriile suplimentare se vor depune predominant ca grăsime. Antrenamentul cu greutăți este semnalul care îi spune corpului să folosească acele proteine pentru a repara și a construi țesut muscular. Cele două lucrează în sinergie perfectă.' },
    ];

    let mealPlanData = [];

    function generateMealPlan() {
        const fixedMealPlans = [
            // Day 1
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: 'Smoothie: 1 banană, 200ml lapte 3.5%, 20g unt arahide', kcal: 420, protein: 15, fat: 20, fiber: 6 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g piept de pui, 250g orez alb, salată cu 10ml ulei', kcal: 750, protein: 40, fat: 15, fiber: 8 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24', kcal: 140, protein: 10, fat: 5, fiber: 3 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Omletă din 3 ouă cu 50g brânză telemea, spanac', kcal: 380, protein: 25, fat: 28, fiber: 2 }
            ],
            // Day 2
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 30g nuci', kcal: 330, protein: 16, fat: 23, fiber: 5 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g vită, 300g cartofi, broccoli', kcal: 700, protein: 45, fat: 20, fiber: 12 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '200g iaurt grecesc 10%', kcal: 200, protein: 18, fat: 20, fiber: 0 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '180g cod la cuptor cu 200g fasole verde și usturoi', kcal: 390, protein: 42, fat: 15, fiber: 8 }
            ],
            // Day 3
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '150g iaurt grecesc 10%, 20g miere, 20g nuci', kcal: 350, protein: 15, fat: 28, fiber: 2 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g somon, 150g paste integrale, sos de roșii', kcal: 800, protein: 40, fat: 30, fiber: 15 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24', kcal: 140, protein: 10, fat: 5, fiber: 3 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Salată cu 200g năut, 100g brânză Feta, legume', kcal: 480, protein: 25, fat: 30, fiber: 15 }
            ],
            // Day 4
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 1 banană', kcal: 245, protein: 11, fat: 5, fiber: 6 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '180g curcan, 150g quinoa, 50g avocado', kcal: 750, protein: 50, fat: 25, fiber: 16 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '2 ouă fierte, 1 felie pâine integrală', kcal: 240, protein: 15, fat: 11, fiber: 4 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Supă cremă de linte (100g linte uscată)', kcal: 400, protein: 25, fat: 5, fiber: 18 }
            ],
            // Day 5
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '100g brânză vaci 5%, 30g semințe, 1 felie pâine integrală', kcal: 320, protein: 22, fat: 18, fiber: 6 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: 'Paste integrale (150g crude) cu sos Pesto (50g)', kcal: 750, protein: 30, fat: 28, fiber: 18 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24', kcal: 140, protein: 10, fat: 5, fiber: 3 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '180g păstrăv la cuptor cu legume la grătar', kcal: 450, protein: 40, fat: 28, fiber: 8 }
            ],
            // Day 6
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 150g iaurt grecesc 10%', kcal: 280, protein: 25, fat: 20, fiber: 3 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g piept de pui, 300g cartofi, salată', kcal: 650, protein: 45, fat: 15, fiber: 10 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '100g brânză vaci 5%, 30g semințe, 1 felie pâine integrală', kcal: 320, protein: 22, fat: 18, fiber: 6 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Salată: 200g năut, 120g Feta, legume, 10ml ulei', kcal: 520, protein: 28, fat: 35, fiber: 15 }
            ],
            // Day 7
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '150g iaurt grecesc 10%, 20g miere, 20g nuci', kcal: 350, protein: 15, fat: 28, fiber: 2 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g somon, 150g paste integrale, sos roșii', kcal: 800, protein: 40, fat: 30, fiber: 15 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24, 30g nuci', kcal: 330, protein: 16, fat: 23, fiber: 5 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Omletă 3 ouă, 50g cașcaval, salată', kcal: 450, protein: 30, fat: 35, fiber: 4 }
            ],
            // Day 8
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 1 banană', kcal: 245, protein: 11, fat: 5, fiber: 6 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '200g tofu, 250g orez, legume la tigaie', kcal: 650, protein: 25, fat: 20, fiber: 12 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: 'Smoothie: 1 banană, 200ml lapte 3.5%, 20g unt arahide', kcal: 420, protein: 15, fat: 20, fiber: 6 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '200g somon afumat, 100g cremă de brânză, 2 felii pâine secară', kcal: 550, protein: 35, fat: 30, fiber: 8 }
            ],
            // Day 9
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '150g iaurt grecesc 10%, 20g miere, 20g nuci', kcal: 350, protein: 15, fat: 28, fiber: 2 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g vită, 300g cartofi, broccoli', kcal: 700, protein: 45, fat: 20, fiber: 12 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24', kcal: 140, protein: 10, fat: 5, fiber: 3 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '180g cod, 200g piure mazăre, 10ml ulei măsline', kcal: 480, protein: 45, fat: 18, fiber: 12 }
            ],
            // Day 10
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 30g nuci', kcal: 330, protein: 16, fat: 23, fiber: 5 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '180g curcan, 150g quinoa, 50g avocado', kcal: 750, protein: 50, fat: 25, fiber: 16 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '200g iaurt grecesc 10%', kcal: 200, protein: 18, fat: 20, fiber: 0 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Omletă 3 ouă, 50g cașcaval, salată', kcal: 450, protein: 30, fat: 35, fiber: 4 }
            ],
            // Day 11
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: 'Smoothie: 1 banană, 200ml lapte 3.5%, 20g unt arahide', kcal: 420, protein: 15, fat: 20, fiber: 6 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g piept de pui, 250g orez, salată', kcal: 750, protein: 40, fat: 15, fiber: 8 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24', kcal: 140, protein: 10, fat: 5, fiber: 3 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Salată cu 200g năut, 100g brânză Feta, legume', kcal: 480, protein: 25, fat: 30, fiber: 15 }
            ],
            // Day 12
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 150g iaurt grecesc 10%', kcal: 280, protein: 25, fat: 20, fiber: 3 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g somon, 150g paste integrale, sos de roșii', kcal: 800, protein: 40, fat: 30, fiber: 15 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '100g brânză vaci 5%, 30g semințe, 1 felie pâine integrală', kcal: 320, protein: 22, fat: 18, fiber: 6 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '180g cod la cuptor cu 200g fasole verde și usturoi', kcal: 390, protein: 42, fat: 15, fiber: 8 }
            ],
            // Day 13
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '150g iaurt grecesc 10%, 20g miere, 20g nuci', kcal: 350, protein: 15, fat: 28, fiber: 2 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '150g vită, 300g cartofi, broccoli', kcal: 700, protein: 45, fat: 20, fiber: 12 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: '1 Baton proteic H24, 1 banană', kcal: 245, protein: 11, fat: 5, fiber: 6 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: '200g tofu la grătar cu 200g ciuperci sote', kcal: 400, protein: 28, fat: 25, fiber: 6 }
            ],
            // Day 14
            [
                { name: 'Mic dejun', icon: '☀️', type: 'breakfast', food: 'Shake Herbalife (2 linguri F1 + 2 linguri PDM) cu apă, 1 lingură Fibre de măr și ovăz, 1 lingură Beta Heart.', kcal: 225, protein: 20.5, fat: 5.5, fiber: 11 },
                { name: 'Gustare 1', icon: '🍎', type: 'snack', food: '1 Baton proteic H24, 30g nuci', kcal: 330, protein: 16, fat: 23, fiber: 5 },
                { name: 'Prânz', icon: '🍝', type: 'lunch', food: '180g curcan, 150g quinoa, 50g avocado', kcal: 750, protein: 50, fat: 25, fiber: 16 },
                { name: 'Gustare 2', icon: '🍋', type: 'snack', food: 'Smoothie: 1 banană, 200ml lapte 3.5%, 20g unt arahide', kcal: 420, protein: 15, fat: 20, fiber: 6 },
                { name: 'Cină', icon: '🌙', type: 'dinner', food: 'Omletă 3 ouă, 50g cașcaval, salată', kcal: 450, protein: 30, fat: 35, fiber: 4 }
            ]
        ];

        const generatedPlans = [];
        for (let i = 1; i <= 28; i++) {
            const planOfTheDay = fixedMealPlans[(i - 1) % 14];
            
            const totals = planOfTheDay.reduce((acc, meal) => {
                acc.kcal += meal.kcal || 0;
                acc.protein += meal.protein || 0;
                acc.fat += meal.fat || 0;
                acc.fiber += meal.fiber || 0;
                return acc;
            }, { kcal: 0, protein: 0, fat: 0, fiber: 0 });

            const proteinKcal = totals.protein * 4;
            const fatKcal = totals.fat * 9;
            totals.carbs = (totals.kcal - proteinKcal - fatKcal) / 4;

            const finalMeals = planOfTheDay.map(meal => {
                const mealProteinKcal = (meal.protein || 0) * 4;
                const mealFatKcal = (meal.fat || 0) * 9;
                const mealCarbKcal = (meal.kcal || 0) - mealProteinKcal - mealFatKcal;
                return {...meal, carbs: mealCarbKcal > 0 ? mealCarbKcal / 4 : 0};
            });

            generatedPlans.push({ day: i, meals: finalMeals, totals: totals });
        }
        mealPlanData = generatedPlans;
    }
    
    function populateDaySelector() {
        if (!daySelector) return;
        daySelector.innerHTML = '';
        for (let i = 1; i <= 28; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Ziua ${i}`;
            daySelector.appendChild(option);
        }
    }

    function showDay(dayNumber) {
        if (!mealPlanDisplay) return;
        const dayData = mealPlanData.find(d => d && d.day == dayNumber);
        if (!dayData) {
            mealPlanDisplay.innerHTML = `<div class="card text-center text-red-500">Planul pentru ziua ${dayNumber} nu a putut fi generat. Vă rugăm reîncărcați pagina.</div>`;
            return;
        }
        mealPlanDisplay.innerHTML = `
            <div class="card">
                <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Plan pentru ziua ${dayData.day}</h3>
                <div class="space-y-4">
                    ${dayData.meals.map(meal => `
                        <div class="meal-card meal-card-${meal.type}">
                            <div class="flex items-center gap-4">
                                <span class="text-3xl">${meal.icon}</span>
                                <div>
                                    <h4 class="font-bold text-lg text-gray-700">${meal.name}</h4>
                                    <p class="text-gray-600">${meal.food}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-sm mt-2 pt-2 border-t border-gray-300/50">
                                <div><span class="font-semibold block">${(meal.kcal || 0).toFixed(0)}</span><span class="text-xs text-gray-500">Kcal</span></div>
                                <div><span class="font-semibold block">${(meal.protein || 0).toFixed(1)} g</span><span class="text-xs text-gray-500">Proteine</span></div>
                                <div><span class="font-semibold block">${(meal.carbs || 0).toFixed(1)} g</span><span class="text-xs text-gray-500">Carbo.</span></div>
                                <div><span class="font-semibold block">${(meal.fat || 0).toFixed(1)} g</span><span class="text-xs text-gray-500">Grăsimi</span></div>
                                <div><b class="font-semibold block">${(meal.fiber || 0).toFixed(1)} g</b><span class="text-xs text-gray-500">Fibre</span></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-6 p-4 bg-indigo-50 rounded-lg">
                    <h4 class="font-bold text-lg text-center text-indigo-800 mb-2">Sumar nutrițional - ziua ${dayData.day}</h4>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div><b class="text-xl text-indigo-700 block">${(dayData.totals.kcal || 0).toFixed(0)}</b><span class="text-sm text-gray-600">Total Kcal</span></div>
                        <div><b class="text-xl text-indigo-700 block">${(dayData.totals.protein || 0).toFixed(0)} g</b><span class="text-sm text-gray-600">Total Proteine</span></div>
                        <div><b class="text-xl text-indigo-700 block">${(dayData.totals.carbs || 0).toFixed(0)} g</b><span class="text-sm text-gray-600">Total Carbo.</span></div>
                        <div><b class="text-xl text-indigo-700 block">${(dayData.totals.fat || 0).toFixed(0)} g</b><span class="text-sm text-gray-600">Total Grăsimi</span></div>
                        <div><b class="text-xl text-indigo-700 block">${(dayData.totals.fiber || 0).toFixed(0)} g</b><span class="text-sm text-gray-600">Total Fibre</span></div>
                    </div>
                </div>
            </div>`;
    }
    
    function showWeek(weekNumber) {
        if (!weeklyPlanDisplay) return;
        const startDay = (weekNumber - 1) * 7 + 1;
        const endDay = weekNumber * 7;
        const weekData = mealPlanData.slice(startDay - 1, endDay);
        
        weeklyPlanDisplay.innerHTML = `
            <div class="card">
                <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Plan pentru Săptămâna ${weekNumber} (Zilele ${startDay}-${endDay})</h3>
                <div class="space-y-6">
                    ${weekData.map((dayData, index) => {
                        if (!dayData) return `<div><h4 class="text-xl font-semibold text-red-700 mb-2 border-b pb-1">Ziua ${startDay + index}</h4><p>Nu s-a putut genera un plan valid pentru această zi.</p></div>`;
                        return `
                        <div>
                            <h4 class="text-xl font-semibold text-indigo-700 mb-2 border-b pb-1">Ziua ${dayData.day}</h4>
                            <ul class="list-disc list-inside space-y-1 text-gray-600">
                                ${dayData.meals.map(meal => `<li><b>${meal.name}:</b> ${meal.food}</li>`).join('')}
                            </ul>
                            <div class="mt-2 text-right text-sm font-semibold text-gray-800">Total: ~${dayData.totals.kcal.toFixed(0)} kcal</div>
                        </div>
                    `}).join('')}
                </div>
            </div>`;
    }

    function populateFullTable() {
        if (!fullPlanTableBody) return;
        fullPlanTableBody.innerHTML = '';
        mealPlanData.forEach(dayData => {
            if(!dayData) return;
            dayData.meals.forEach((meal, index) => {
                const row = document.createElement('tr');
                row.className = 'meal-row';
                row.innerHTML = `
                    ${index === 0 ? `<td rowspan="5"><b>${dayData.day}</b></td>` : ''}
                    <td>${meal.name}</td>
                    <td>${meal.food}</td>
                    <td>${(meal.kcal || 0).toFixed(0)}</td>
                    <td>${(meal.protein || 0).toFixed(1)}</td>
                    <td>${(meal.carbs || 0).toFixed(1)}</td>
                    <td>${(meal.fat || 0).toFixed(1)}</td>
                    <td>${(meal.fiber || 0).toFixed(1)}</td>
                `;
                fullPlanTableBody.appendChild(row);
            });
            const totalRow = document.createElement('tr');
            totalRow.className = 'total-row';
            totalRow.innerHTML = `
                <td colspan="2">TOTAL ZI ${dayData.day}</td>
                <td>${(dayData.totals.kcal || 0).toFixed(0)}</td>
                <td>${(dayData.totals.protein || 0).toFixed(1)}</td>
                <td>${(dayData.totals.carbs || 0).toFixed(1)}</td>
                <td>${(dayData.totals.fat || 0).toFixed(1)}</td>
                <td>${(dayData.totals.fiber || 0).toFixed(1)}</td>
            `;
            fullPlanTableBody.appendChild(totalRow);
        });
    }

    function createAccordion(container, data) {
        if (!container) return;
        container.innerHTML = data.map((item) => `
            <div class="accordion-item">
                <h2>
                    <button type="button" class="accordion-button" aria-expanded="false">
                        <span class="flex items-center gap-4">
                            <span class="text-2xl">${item.icon || ''}</span>
                            <span>${item.title}</span>
                        </span>
                        <span class="accordion-icon text-2xl font-light text-indigo-500">+</span>
                    </button>
                </h2>
                <div class="accordion-content">
                    <div class="prose max-w-none">${item.content}</div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.accordion-button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.parentElement.nextElementSibling;
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                container.querySelectorAll('.accordion-button').forEach(btn => {
                    if (btn !== button) {
                        btn.classList.remove('open');
                        btn.setAttribute('aria-expanded', 'false');
                        const otherContent = btn.parentElement.nextElementSibling;
                        otherContent.classList.remove('open');
                        otherContent.style.maxHeight = null;
                    }
                });

                button.classList.toggle('open');
                button.setAttribute('aria-expanded', String(!isExpanded));
                content.classList.toggle('open');
                content.style.maxHeight = content.classList.contains('open') ? content.scrollHeight + "px" : null;
            });
        });
    }
    
    generateMealPlan();
    populateDaySelector();
    populateFullTable();
    createAccordion(ingrasareAccordion, ingrasareData);
    
    if (daySelector) {
        daySelector.addEventListener('change', (e) => showDay(e.target.value));
    }
    if (weekSelector) {
        weekSelector.addEventListener('change', (e) => showWeek(e.target.value));
    }
    
    handleTabSwitch({ button: mainContainer.querySelector('.tab-button[data-tab="introducere"]'), buttonSelector: '.tab-button', contentSelector: '.tab-content', container: mainContainer });
    if (planMeseContainer) {
        handleTabSwitch({ button: planMeseContainer.querySelector('.sub-tab-button[data-tab="dailyPlanView"]'), buttonSelector: '.sub-tab-button', contentSelector: '.sub-tab-content', container: planMeseContainer });
    }
    
    showDay(1);
    showWeek(1);
});
</script>

</body>
</html>
