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
  return fullPerfumeList; // <-- Return the array
}

// Render perfume cards after data is loaded
async function renderPerfumeCards() {
  const perfumes = await fullPerfumeList();
  const perfumeGrid = document.querySelector(".perf");
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

function createPerfumeCard(perfume) {
    const perfumeCard = document.createElement("div");
    perfumeCard.classList.add("perfumeCard");

    const perfumeName = document.createElement("h3");
    perfumeName.textContent = perfume.name;

    const perfumeImage = document.createElement("img");
    perfumeImage.src = perfume.image;
    

    const perfumeDescription = document.createElement("p");
    perfumeDescription.textContent = perfume.description;

    const perfumePrice = document.createElement("p");
    perfumePrice.textContent = `$${perfume.price}`;

    perfumeCard.appendChild(perfumeName);
    perfumeCard.appendChild(perfumeImage);
    perfumeCard.appendChild(perfumeDescription);
    perfumeCard.appendChild(perfumePrice);

    return perfumeCard;
    const perfumeGrid = document.querySelector(".perf");
    perfumeGrid.appendChild(perfumeCard);

}



fullPerfumeList();
renderPerfumeCards();

