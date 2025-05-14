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

function getBirthFlower() {
    const monthInput = document.getElementById("birthmonthinput").value;
    const month = monthInput.charAt(0).toUpperCase() + monthInput.slice(1).toLowerCase(); 
    const birthFlower = birthFlowers.find(bf => bf.month.toLowerCase() === month.toLowerCase());
    console.log(birthFlower.flowers);
}


   
