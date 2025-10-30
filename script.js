// Variables iniciales
let medida = 15; // mm iniciales
let escala = 5;  // píxeles por mm (ajustable con calibración)

const medidaTxt = document.getElementById("medida");
const tallaTxt = document.createElement("p"); // Creamos elemento temporal si no existe
tallaTxt.id = "talla";
document.querySelector(".app").appendChild(tallaTxt);

const linea = document.getElementById("linea");
const lineaDer = document.getElementById("linea-derecha");
const sliderCalibracion = document.getElementById("sliderCalibracion");
const escalaValor = document.getElementById("escalaValor");
const moneda = document.querySelector(".moneda");

// Tallas estándar (diámetro interno en mm)
const tallas = [
  { diametro: 14.1, talla: "4" },
  { diametro: 14.5, talla: "5" },
  { diametro: 15.3, talla: "6" },
  { diametro: 16.1, talla: "7" },
  { diametro: 16.9, talla: "8" },
  { diametro: 17.3, talla: "9" },
  { diametro: 18.1, talla: "10" },
  { diametro: 18.9, talla: "11" },
  { diametro: 19.8, talla: "12" },
  { diametro: 20.2, talla: "13" },
  { diametro: 21.0, talla: "14" },
  { diametro: 22.0, talla: "15" },
  { diametro: 23.0, talla: "16" }
];

// 🔹 Encuentra la talla más cercana
function obtenerTalla(mm) {
  let minDiff = Infinity;
  let tallaCercana = "N/A";
  for (let t of tallas) {
    const diff = Math.abs(t.diametro - mm);
    if (diff < minDiff) {
      minDiff = diff;
      tallaCercana = t.talla;
    }
  }
  return tallaCercana;
}

// 🔹 Actualiza visualmente la medición
function actualizar() {
  medidaTxt.textContent = medida.toFixed(1) + " mm";
  const talla = obtenerTalla(medida);

  const offset = (medida * escala) / 2;
  linea.style.left = 110 - offset + "px";
  lineaDer.style.right = 110 - offset + "px";
}

// 🔹 Botones de control (aumenta/disminuye de 0.5 mm)
document.getElementById("mas").addEventListener("click", () => {
  medida += 0.5;
  if (medida > 30) medida = 30; // límite superior opcional
  actualizar();
});

document.getElementById("menos").addEventListener("click", () => {
  medida -= 0.5;
  if (medida < 10) medida = 10; // límite inferior opcional
  actualizar();
});

// 🔹 Calibración con moneda de 1 sol (25.5 mm)
sliderCalibracion.addEventListener("input", () => {
  escala = parseFloat(sliderCalibracion.value);
  escalaValor.textContent = escala.toFixed(2);

  const diametroPx = 25.5 * escala;
  moneda.style.width = diametroPx + "px";
  moneda.style.height = diametroPx + "px";

  actualizar();
});

// 🔹 Inicializa visualización
function iniciar() {
  const diametroPx = 25.5 * escala;
  moneda.style.width = diametroPx + "px";
  moneda.style.height = diametroPx + "px";
  actualizar();
}

iniciar();
