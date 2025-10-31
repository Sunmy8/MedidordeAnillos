// Variables iniciales
let medida = 15; // mm iniciales
let escala = 5;  // píxeles por mm (ajustable con calibración)

const medidaTxt = document.getElementById("medida");
const tallaTxt = document.createElement("p"); 
tallaTxt.id = "talla";
document.querySelector(".app").appendChild(tallaTxt);

const linea = document.getElementById("linea");
const lineaDer = document.getElementById("linea-derecha");
const sliderCalibracion = document.getElementById("sliderCalibracion");
const escalaValor = document.getElementById("escalaValor");
const moneda = document.querySelector(".moneda");
const viewer = document.querySelector(".viewer");

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

// 🔹 Variables para líneas
let separationPx = medida * escala; // separación inicial en px

// 🔹 Actualiza visualmente la medición y líneas
function actualizar() {
  medidaTxt.textContent = medida.toFixed(1) + " mm";
  tallaTxt.textContent = "Talla: " + obtenerTalla(medida);

  const offset = (medida * escala) / 2;

  // Centrar ambas líneas en el viewer
  linea.style.left = `calc(50% - ${offset}px)`;
  lineaDer.style.left = `calc(50% + ${offset}px)`;
}

// 🔹 Botones de control
document.getElementById("mas").addEventListener("click", () => {
  medida += 0.5;
  if (medida > 30) medida = 30;
  actualizar();
});

document.getElementById("menos").addEventListener("click", () => {
  medida -= 0.5;
  if (medida < 10) medida = 10;
  actualizar();
});

// 🔹 Calibración con moneda
sliderCalibracion.addEventListener("input", () => {
  escala = parseFloat(sliderCalibracion.value);
  escalaValor.textContent = escala.toFixed(2);

  const diametroPx = 25.5 * escala;
  moneda.style.width = diametroPx + "px";
  moneda.style.height = diametroPx + "px";

  actualizar();
});

// 🔹 Arrastrar línea gris en móvil y PC
let arrastrando = false;

lineaDer.addEventListener("pointerdown", (e) => {
  arrastrando = true;
  e.preventDefault();
});

window.addEventListener("pointerup", () => arrastrando = false);

window.addEventListener("pointermove", (e) => {
  if (!arrastrando) return;
  const rect = viewer.getBoundingClientRect();
  let x = e.clientX - rect.left; // posición relativa al viewer
  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  // Calcula medida basada en separación
  medida = ((x - rect.width / 2) * 2) / escala;
  if (medida < 10) medida = 10;
  if (medida > 30) medida = 30;

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
