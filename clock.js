const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

let radius;

/**
 * Past de canvas-grootte aan op basis van de beschikbare schermruimte
 * Zorgt voor een vierkant canvas dat past binnen de viewport
 */
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;

  canvas.width = size;
  canvas.height = size;

  radius = canvas.height / 2;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(radius, radius);
}

function drawOutlineHand(ctx, length, width, bgcolor) {
  // Hoofdwijzer (zilverkleurig)
  ctx.beginPath();
  let x = 0;
  let y = 0;
  ctx.moveTo(x, y); // A N
  //console.log("Hand A, x:", x, "y:", y);

  x = 0;
  y = -width * 0.5;
  ctx.lineTo(x, y); // B M
  //console.log("Hand B, x:", x, "y:", y);

  x = (length * 1) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // C L
  //console.log("Hand C, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = -width * (1 + 0.5);
  ctx.lineTo(x, y); // D K
  //console.log("Hand D, x:", x, "y:", y);

  x = (length * 10) / 15;
  y = -width * (1 + 0.5);
  ctx.lineTo(x, y); // E J
  //console.log("Hand E, x:", x, "y:", y);

  x = (length * 11) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // F I
  //console.log("Hand F, x:", x, "y:", y);

  x = (length * 15) / 15;
  y = -width * 0.5;
  ctx.lineTo(x, y); // G H
  //console.log("Hand G, x:", x, "y:", y);

  x = (length * 15) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // H G
  //console.log("Hand H, x:", x, "y:", y);

  x = (length * 11) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // I F
  //console.log("Hand I, x:", x, "y:", y);

  x = (length * 10) / 15;
  y = +width * (1 + 0.5);
  ctx.lineTo(x, y); // I F
  //console.log("Hand J, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = +width * (1 + 0.5);
  ctx.lineTo(x, y); // K D
  //console.log("Hand K, x:", x, "y:", y);

  x = (length * 1) / 15;
  y = +width * 0.5;
  ctx.lineTo(x, y); // L C
  //console.log("Hand K, x:", x, "y:", y);

  x = 0;
  y = +width * 0.5;
  ctx.lineTo(x, y); // M B
  //console.log("Hand M, x:", x, "y:", y);

  x = 0;
  y = 0;
  ctx.lineTo(x, y); // N A
  //console.log("Hand N, x:", x, "y:", y);

  ctx.closePath();
  ctx.fillStyle = bgcolor;
  ctx.fill();
}

function drawInsidelineHand(ctx, length, width, fgcolor) {
  // Hoofdwijzer (zilverkleurig)
  ctx.beginPath();
  let x = (length * 2) / 15;
  let y = 0;
  ctx.moveTo(x, y); // A1
  //console.log("Hand A1, x:", x, "y:", y);

  x = (length * (2 + 0.8)) / 15;
  y = -width * (1 - 0.2);
  ctx.lineTo(x, y); // B1
  //console.log("Hand B1, x:", x, "y:", y);

  x = (length * (10 - 0.8)) / 15;
  y = -width * (1 - 0.2);
  ctx.lineTo(x, y); // C1 E1
  //console.log("Hand C1, x:", x, "y:", y);

  x = (length * (11 - 0.8)) / 15;
  y = 0;
  ctx.lineTo(x, y); // D1
  //console.log("Hand D1, x:", x, "y:", y);

  x = (length * (10 - 0.8)) / 15;
  y = +width * (1 - 0.2);
  ctx.lineTo(x, y); // E1 C1
  //console.log("Hand E1, x:", x, "y:", y);

  x = (length * (2 + 0.8)) / 15;
  y = +width * (1 - 0.2);
  ctx.lineTo(x, y); // F1 B1
  //console.log("Hand F1, x:", x, "y:", y);

  x = (length * 2) / 15;
  y = 0;
  ctx.lineTo(x, y); // G1 A1
  //console.log("Hand G1, x:", x, "y:", y);

  ctx.closePath();
  ctx.fillStyle = fgcolor;
  ctx.fill();
}

/**
 * Tekent een wijzer met luminescerende tip (Breitling stijl)
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} pos - Positie van de wijzer in radialen
 * @param {number} length - Lengte van de wijzer
 * @param {number} width - Dikte van de wijzer
 * @param {string} color - Kleur van de wijzer
 */
function drawHand(ctx, pos, length, width, bgcolor = "black", fgcolor = "red") {
  ctx.save();
  ctx.rotate(pos);

  drawOutlineHand(ctx, length, width, bgcolor);
  drawInsidelineHand(ctx, length, width, fgcolor);

  ctx.restore();
}

/**
 * Tekent de wijzerplaat van de klok in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawFace(
  ctx,
  radius,
  bgcolor = "#1a1a1a",
  bordercolor = "#c0c0c0",
  centercolor = "#c0c0c0"
) {
  // Donkere achtergrond (zoals Breitling)
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.97, 0, 2 * Math.PI);
  ctx.fillStyle = bgcolor; // "#464040ff"; //"#ebebebff"; //"#1a1a1a";
  ctx.fill();

  // Buitenste zilverkleurige ring
  ctx.strokeStyle = bordercolor; //"#c0c0c0";
  ctx.lineWidth = radius * 0.06;
  ctx.stroke();

  // Binnenste ring
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
  ctx.strokeStyle = bordercolor; //"#808080";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();

  // Middenpunt
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.04, 0, 2 * Math.PI);
  ctx.fillStyle = centercolor; // "#c0c0c0";
  ctx.fill();
}

function drawLoad(ctx, radius, percentage = 75, fgcolor = "green") {
  let startAngle = -Math.PI / 2;
  let endAngle = startAngle + (percentage / 100) * 2 * Math.PI;
  let angleDiff = endAngle - startAngle;
  // percentage load as green
  ctx.beginPath();
  //  ctx.arc(0, 0, radius * 0.92, -Math.PI / 2, (percentage/100) * 2 * Math.PI - Math.PI / 2);
  ctx.arc(0, 0, radius * 0.92, startAngle, endAngle);
  ctx.strokeStyle = fgcolor; // "#464040ff"; //"#ebebebff"; //"#1a1a1a";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  // percentage load as green
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.92, endAngle, startAngle);
  ctx.strokeStyle = "red"; // "#464040ff"; //"#ebebebff"; //"#1a1a1a";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();
}

/**
 * Tekent driehoekige uurmarkeringen
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawHourMarkers(ctx, radius, fgcolor = "white") {
  const triangleHeight = radius * 0.08;
  const triangleBase = radius * 0.04;

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6;

    let xOuter = Math.cos(angle) * radius * 0.88;
    let yOuter = Math.sin(angle) * radius * 0.88;

    let perpAngle = angle + Math.PI / 2;
    let xBase1 = xOuter + Math.cos(perpAngle) * (triangleBase / 2);
    let yBase1 = yOuter + Math.sin(perpAngle) * (triangleBase / 2);
    let xBase2 = xOuter - Math.cos(perpAngle) * (triangleBase / 2);
    let yBase2 = yOuter - Math.sin(perpAngle) * (triangleBase / 2);

    let xTip = Math.cos(angle) * (radius * 0.88 - triangleHeight);
    let yTip = Math.sin(angle) * (radius * 0.88 - triangleHeight);

    ctx.beginPath();
    ctx.moveTo(xBase1, yBase1);
    ctx.lineTo(xBase2, yBase2);
    ctx.lineTo(xTip, yTip);
    ctx.closePath();
    ctx.fillStyle = fgcolor; // "#ffffff";
    ctx.fill();
  }
}

/**
 * Tekent minuutstreepjes
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawMinuteTicks(ctx, radius, fgcolor = "gray") {
  const tickLength = radius * 0.04;
  const tickWidth = radius * 0.008;

  for (let i = 0; i < 60; i++) {
    // Skip de posities waar de uurmarkeringen zijn
    if (i % 5 !== 0) {
      let angle = (i * Math.PI) / 30;

      let xStart = Math.cos(angle) * (radius * 0.88);
      let yStart = Math.sin(angle) * (radius * 0.88);
      let xEnd = Math.cos(angle) * (radius * 0.88 - tickLength);
      let yEnd = Math.sin(angle) * (radius * 0.88 - tickLength);

      ctx.beginPath();
      ctx.lineWidth = tickWidth;
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = fgcolor; //"#a0a0a0";
      ctx.stroke();
    }
  }
}

/**
 * Tekent de nummers op de wijzerplaat in Breitling stijl
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawNumbers(ctx, radius, fgcolor = "white") {
  ctx.font = `${radius * 0.11}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = fgcolor; // "#ffffff";

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6 - Math.PI / 2;
    let x = Math.cos(angle) * radius * 0.73;
    let y = Math.sin(angle) * radius * 0.73;

    ctx.fillText(numbers[i].toString(), x, y);
  }
}

/**
 * Tekent de huidige tijd met Breitling-stijl wijzers
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawTime(ctx, radius, bgcolor = "black", fgcolor = "red") {
  const now = new Date();
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Uurwijzer
  let hourPos =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60) -
    Math.PI / 2;
  drawHand(ctx, hourPos, radius * 0.55, radius * 0.035, bgcolor, fgcolor);

  // Minuutwijzer
  let minutePos =
    (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60) - Math.PI / 2;
  drawHand(ctx, minutePos, radius * 0.7, radius * 0.025, bgcolor, fgcolor);

  // Secondewijzer (dun en rood, zoals chronograaf)
  let secondPos =
    (second * Math.PI) / 30 + (ms * Math.PI) / (30 * 1000) - Math.PI / 2;
  ctx.save();
  ctx.rotate(secondPos);
  ctx.beginPath();
  ctx.moveTo(-radius * 0.1, 0);
  ctx.lineTo(radius * 0.75, 0);
  ctx.strokeStyle = fgcolor;
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
  ctx.restore();
}

/**
 * Tekent datuminformatie in twee boxen naast elkaar ter hoogte van de 3
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawDateInfo(
  ctx,
  radius,
  bgcolor = "#0a0a0a",
  daynamecolor = "#ff3333",
  daynumbercolor = "#ffffff",
  outlinecolor = "#606060"
) {
  const now = new Date();

  const weekdays = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
  const weekday = weekdays[now.getDay()];
  const day = now.getDate();

  const centerX = radius * 0.45;
  const centerY = 0;
  const boxWidth = radius * 0.16;
  const boxHeight = radius * 0.14;
  const boxSpacing = radius * 0.02;

  // Linker box (weekdag)
  const weekdayBoxX = centerX - boxWidth / 2 - boxSpacing / 2;

  ctx.fillStyle = bgcolor; // "#0a0a0a";
  ctx.fillRect(
    weekdayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.strokeStyle = outlinecolor; // "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(
    weekdayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.fillStyle = daynamecolor; // "#ff3333";
  ctx.font = `bold ${radius * 0.07}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(weekday, weekdayBoxX, centerY);

  // Rechter box (dag)
  const dayBoxX = centerX + boxWidth / 2 + boxSpacing / 2;

  ctx.fillStyle = bgcolor; //"#0a0a0a";
  ctx.fillRect(
    dayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.strokeStyle = outlinecolor; // "#606060";
  ctx.lineWidth = radius * 0.008;
  ctx.strokeRect(
    dayBoxX - boxWidth / 2,
    centerY - boxHeight / 2,
    boxWidth,
    boxHeight
  );

  ctx.fillStyle = daynumbercolor; // "#ffffff";
  ctx.font = `bold ${radius * 0.09}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(day.toString(), dayBoxX, centerY);
}

/**
 * Hoofdfunctie die de volledige klok tekent in Breitling stijl
 */

let handbgcolor = "#504949";
let handfgcolor = "#ff0000";

let facebgcolor = "#000000"; // Changed from "black"
let facebordercolor = "#c0c0c0";
let facecentercolor = "#504949";

let daybgcolor = "#000000"; // Changed from "black"
let daynamecolor = "#ff3333";
let daynumbercolor = "#a0a0a0";
let dayoutlinecolor = "#c0c0c0";

let hourmarkercolor = "#ffffff";
let minutetickcolor = "#a0a0a0";
let numbercolor = "#ffffff";

let load = 95;
let count = 0;
function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

  drawFace(ctx, radius, facebgcolor, facebordercolor, facecentercolor);
  drawHourMarkers(ctx, radius, hourmarkercolor);
  drawMinuteTicks(ctx, radius, minutetickcolor);
  drawNumbers(ctx, radius, numbercolor);
  drawLoad(ctx, radius, load, "green");
  drawDateInfo(
    ctx,
    radius,
    daybgcolor,
    daynamecolor,
    daynumbercolor,
    dayoutlinecolor
  );
  drawTime(ctx, radius, handbgcolor, handfgcolor);

  requestAnimationFrame(drawClock);
  count++;
  if (count % 60 === 0) {
    load = load - 1 > 0 ? load - 1 : 100;
  }
}

/**
 * Initialiseer color pickers en bind ze aan de klok variabelen
 */
/**
 * Initialiseer color pickers en bind ze aan de klok variabelen
 */

/**
 * Initialiseer color pickers en bind ze aan de klok variabelen
 */
function initColorPickers() {
  // Create a map of element IDs to variable update functions
  const colorBindings = {
    handbgcolor: (value) => {
      handbgcolor = value;
    },
    handfgcolor: (value) => {
      handfgcolor = value;
    },
    facebgcolor: (value) => {
      facebgcolor = value;
    },
    facebordercolor: (value) => {
      facebordercolor = value;
    },
    facecentercolor: (value) => {
      facecentercolor = value;
    },
    daybgcolor: (value) => {
      daybgcolor = value;
    },
    daynamecolor: (value) => {
      daynamecolor = value;
    },
    daynumbercolor: (value) => {
      daynumbercolor = value;
    },
    dayoutlinecolor: (value) => {
      dayoutlinecolor = value;
    },
    hourmarkercolor: (value) => {
      hourmarkercolor = value;
    },
    minutetickcolor: (value) => {
      minutetickcolor = value;
    },
    numbercolor: (value) => {
      numbercolor = value;
    },
  };

  // Bind each color picker to its update function
  Object.keys(colorBindings).forEach((elementId) => {
    const picker = document.getElementById(elementId);
    if (picker) {
      picker.addEventListener("input", (e) => {
        colorBindings[elementId](e.target.value);
        saveColors(); // Auto-save on change
      });
    }
  });

  // Bind export/import/reset buttons
  document
    .getElementById("exportColors")
    .addEventListener("click", exportColors);
  document
    .getElementById("importColors")
    .addEventListener("click", importColors);
  document.getElementById("resetColors").addEventListener("click", resetColors);
}

// Event listener voor window resize
window.addEventListener("resize", () => {
  resizeCanvas();
});

// Roep deze functie aan wanneer de pagina geladen is
// Initialize everything when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  loadSavedColors(); // Load saved colors first
  initColorPickers();
  requestAnimationFrame(drawClock);
});

/**
 * Default color configuration
 */
const defaultColors = {
  handbgcolor: "#504949",
  handfgcolor: "#ff0000",
  facebgcolor: "#000000",
  facebordercolor: "#c0c0c0",
  facecentercolor: "#504949",
  daybgcolor: "#000000",
  daynamecolor: "#ff3333",
  daynumbercolor: "#a0a0a0",
  dayoutlinecolor: "#c0c0c0",
  hourmarkercolor: "#ffffff",
  minutetickcolor: "#a0a0a0",
  numbercolor: "#ffffff",
};

/**
 * Convert any color format to 6-digit hex
 */
function normalizeColor(color) {
  // Create a temporary element to use browser's color parsing
  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);

  // Get computed color (will be in rgb format)
  const computed = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);

  // Parse rgb(r, g, b) or rgba(r, g, b, a)
  const match = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const r = parseInt(match[1]).toString(16).padStart(2, "0");
    const g = parseInt(match[2]).toString(16).padStart(2, "0");
    const b = parseInt(match[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  // If it's already a hex color, remove alpha if present
  if (color.startsWith("#")) {
    return color.substring(0, 7); // Keep only #RRGGBB
  }

  return color;
}

/**
 * Get current color configuration
 */
function getColorConfig() {
  return {
    handbgcolor: normalizeColor(handbgcolor),
    handfgcolor: normalizeColor(handfgcolor),
    facebgcolor: normalizeColor(facebgcolor),
    facebordercolor: normalizeColor(facebordercolor),
    facecentercolor: normalizeColor(facecentercolor),
    daybgcolor: normalizeColor(daybgcolor),
    daynamecolor: normalizeColor(daynamecolor),
    daynumbercolor: normalizeColor(daynumbercolor),
    dayoutlinecolor: normalizeColor(dayoutlinecolor),
    hourmarkercolor: normalizeColor(hourmarkercolor),
    minutetickcolor: normalizeColor(minutetickcolor),
    numbercolor: normalizeColor(numbercolor),
  };
}
/**
 * Apply color configuration
 */
function applyColorConfig(config) {
  handbgcolor = config.handbgcolor || defaultColors.handbgcolor;
  handfgcolor = config.handfgcolor || defaultColors.handfgcolor;
  facebgcolor = config.facebgcolor || defaultColors.facebgcolor;
  facebordercolor = config.facebordercolor || defaultColors.facebordercolor;
  facecentercolor = config.facecentercolor || defaultColors.facecentercolor;
  daybgcolor = config.daybgcolor || defaultColors.daybgcolor;
  daynamecolor = config.daynamecolor || defaultColors.daynamecolor;
  daynumbercolor = config.daynumbercolor || defaultColors.daynumbercolor;
  dayoutlinecolor = config.dayoutlinecolor || defaultColors.dayoutlinecolor;
  hourmarkercolor = config.hourmarkercolor || defaultColors.hourmarkercolor;
  minutetickcolor = config.minutetickcolor || defaultColors.minutetickcolor;
  numbercolor = config.numbercolor || defaultColors.numbercolor;

  // Update all color picker values
  Object.keys(config).forEach((key) => {
    const picker = document.getElementById(key);
    if (picker && config[key]) {
      picker.value = config[key];
    }
  });
}

/**
 * Export color configuration as JSON file
 */
function exportColors() {
  const config = getColorConfig();
  const dataStr = JSON.stringify(config, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "clock-colors.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import color configuration from JSON file
 */
function importColors() {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target.result);
        applyColorConfig(config);
      } catch (error) {
        alert("Error loading color configuration: " + error.message);
      }
    };
    reader.readAsText(file);

    // Reset file input
    fileInput.value = "";
  };
}

/**
 * Reset colors to default
 */
function resetColors() {
  if (confirm("Reset all colors to default?")) {
    applyColorConfig(defaultColors);
  }
}

/**
 * Load colors from localStorage on startup
 */
function loadSavedColors() {
  const saved = localStorage.getItem("clockColors");
  if (saved) {
    try {
      const config = JSON.parse(saved);
      applyColorConfig(config);
    } catch (error) {
      console.error("Error loading saved colors:", error);
    }
  }
}

/**
 * Save colors to localStorage
 */
function saveColors() {
  const config = getColorConfig();
  localStorage.setItem("clockColors", JSON.stringify(config));
}
