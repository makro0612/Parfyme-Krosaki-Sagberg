const birthFlowers = [
  { month: "January", flowers: ["Carnation", "Snowdrop"] },
  { month: "February", flowers: ["Violet", "Primrose"] },
  { month: "March", flowers: ["Daffodil", "Jonquil"] },
  { month: "April", flowers: ["Daisy", "Sweet Pea"] },
  { month: "May", flowers: ["Lily of the Valley", "Hawthorn"] },
  { month: "June", flowers: ["Rose", "Honeysuckle"] },
  { month: "July", flowers: ["Larkspur", "Water Lily"] },
  { month: "August", flowers: ["Gladiolus", "Poppy"] },
  { month: "September", flowers: ["Aster", "Morning Glory"] },
  { month: "October", flowers: ["Marigold", "Cosmos"] },
  { month: "November", flowers: ["Chrysanthemum"] },
  { month: "December", flowers: ["Narcissus", "Holly"] }
];

async function fetchPerfumes(name) {
  try {
    const response = await fetch('./perfumes/' + name + '.json');
    const perfumes = await response.json();
    return perfumes; // <-- Add this line
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // <-- Return empty array on error
  }
}
async function fullPerfumeList() {
  const perfumeNames = ["barkHollow", "tempestTide", "breakfastBed", "petalThorne", "smokeEmbers"];
  const perfumeList1 = await fetchPerfumes(perfumeNames[3]);
  const perfumeList2 = await fetchPerfumes(perfumeNames[0]);
  const perfumeList3 = await fetchPerfumes(perfumeNames[4]);
  const perfumeList4 = await fetchPerfumes(perfumeNames[1]);
  const perfumeList5 = await fetchPerfumes(perfumeNames[2]);
  const fullPerfumeList = perfumeList1.concat(perfumeList2, perfumeList3, perfumeList4, perfumeList5);
  return fullPerfumeList;   
}

// Render perfume cards after data is loaded
async function renderPerfumeCards() {
  const perfumes = await fetchAllPerfumes();

  // Shuffle the perfumes array
  const shuffledPerfumes = perfumes.sort(() => Math.random() - 0.5);

  const perfumeGrid = document.querySelector(".perf");
  shuffledPerfumes.forEach(perfume => {
    const card = createPerfumeCard(perfume);
    perfumeGrid.appendChild(card);
  });
}

async function renderSomePerfumes(filter) {
  const perfumes = await fetchPerfumeFiltered(filter);
  const perfumeGrid = document.querySelector(".perf");
  perfumeGrid.innerHTML = ""; // Clear existing cards
  perfumes.forEach(perfume => {
    const card = createPerfumeCard(perfume);
    perfumeGrid.appendChild(card);
  });
}

function getBirthFlower() {
    const monthInput = document.getElementById("birthmonthinput").value;
    const month = monthInput.charAt(0).toUpperCase() + monthInput.slice(1).toLowerCase(); 
    const birthFlower = birthFlowers.find(bf => bf.month.toLowerCase() === month.toLowerCase());
    console.log(birthFlower.flowers);
}

function toggleFilter() {
    console.log("Filter button clicked");
    const filterpopelm = document.querySelector(".filterpop");
    console.log(filterpopelm);
    filterpopelm.classList.toggle("visible");
    const perfumeGrid = document.querySelector(".perf");
    perfumeGrid.classList.toggle("perfumeGrid");
    
    
}

async function fetchAllPerfumes() {
  try {
    const response = await fetch('./perfumes/allPerfumes.json');
    const allPerfumes = await response.json();
    return allPerfumes;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
function createPerfumeCard(perfume) {
    const perfumeCard = document.createElement("div")
    perfumeCard.classList.add("perfumeCard")

    const perfumeName = document.createElement("h3")
    perfumeName.textContent = perfume.name

    const perfumeImage = document.createElement("img")
    perfumeImage.src = perfume.image

    const perfumeDescription = document.createElement("p")
    perfumeDescription.textContent = perfume.series;

    const perfumePrice = document.createElement("p");
    perfumePrice.textContent = `$${perfume.price}`;

    
    perfumeCard.appendChild(perfumeImage);
    perfumeCard.appendChild(perfumeName);
    perfumeCard.appendChild(perfumeDescription);
    perfumeCard.appendChild(perfumePrice);

    return perfumeCard;
    

}

async function fetchPerfumeFiltered(gender) {
  const allPerfumes = await fetchAllPerfumes();
  //console.log(allPerfumes);
  const filteredPerfumes = []
  allPerfumes.forEach(perfume => {
    if (perfume.classification.toLowerCase() === gender.toLowerCase()) {
      filteredPerfumes.push(perfume);
    }
  });
  return filteredPerfumes;
}

function getCheckedValues(selector) {
  return Array.from(document.querySelectorAll(selector + ':checked')).map(cb => cb.value);
}

async function renderFilteredPerfumes() {
  const checkedGenders = getCheckedValues('.filtercheck');
  const checkedScents = getCheckedValues('.scentcheck');
  const checkedSeries = getCheckedValues('.seriescheck');
  const allPerfumes = await fetchAllPerfumes();

  let filtered = allPerfumes;

  // Filter by gender (OR logic)
  if (checkedGenders.length > 0) {
    filtered = filtered.filter(perfume =>
      checkedGenders.includes(perfume.classification)
    );
  }

  // Filter by series (OR logic)
  if (checkedSeries.length > 0) {
    filtered = filtered.filter(perfume =>
      checkedSeries.includes(perfume.series)
    );
  }

  // Filter by scent (OR logic, matches any top, heart, or base note)
  if (checkedScents.length > 0) {
    filtered = filtered.filter(perfume =>
      (perfume.top_notes && perfume.top_notes.some(note => checkedScents.includes(note))) ||
      (perfume.heart_notes && perfume.heart_notes.some(note => checkedScents.includes(note))) ||
      (perfume.base_notes && perfume.base_notes.some(note => checkedScents.includes(note)))
    );
  }

  const perfumeGrid = document.querySelector(".perf");
  perfumeGrid.innerHTML = "";
  filtered.forEach(perfume => {
    const card = createPerfumeCard(perfume);
    perfumeGrid.appendChild(card);
  });
}

// Add event listeners to all filter checkboxes
document.querySelectorAll('.filtercheck, .scentcheck, .seriescheck').forEach(cb => {
  cb.addEventListener('change', renderFilteredPerfumes);
});

// Optionally, render all perfumes on page load
renderPerfumeCards();

