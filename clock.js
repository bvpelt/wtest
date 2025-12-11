/**
 * Analoge klok met continue animatie en responsive canvas
 * @file clock.js
 */

const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

let radius;

/**
 * Past de canvas-grootte aan op basis van de beschikbare schermruimte
 * Zorgt voor een vierkant canvas dat past binnen de viewport
 */
function resizeCanvas() {
  // Bepaal de kleinste dimensie van de viewport (met wat marge)
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
  
  // Stel canvas dimensies in
  canvas.width = size;
  canvas.height = size;
  
  // Herbereken radius op basis van nieuwe grootte
  radius = canvas.height / 2;
  
  // Reset transformatie en verplaats oorsprong naar centrum
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformatie
  ctx.translate(radius, radius);
}

/**
 * Tekent de wijzerplaat van de klok
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.975, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Buitenrand
  ctx.strokeStyle = "black";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  // Middenpunt
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

/**
 * Tekent driehoekige uurmarkeringen op de wijzerplaat
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawMinuteTriangles(ctx, radius) {
  const triangleHeight = radius * 0.08; // Afstand van cirkel naar binnen
  const triangleBase = radius * 0.05;   // Breedte van driehoeksbasis

  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6; // 12 posities (elk 5 minuten)

    // Positie aan buitenrand
    let xOuter = Math.cos(angle) * radius * 0.95;
    let yOuter = Math.sin(angle) * radius * 0.95;

    // Basishoeken (loodrecht op straal)
    let perpAngle = angle + Math.PI / 2;
    let xBase1 = xOuter + Math.cos(perpAngle) * (triangleBase / 2);
    let yBase1 = yOuter + Math.sin(perpAngle) * (triangleBase / 2);
    let xBase2 = xOuter - Math.cos(perpAngle) * (triangleBase / 2);
    let yBase2 = yOuter - Math.sin(perpAngle) * (triangleBase / 2);

    // Punt wijzend naar binnen
    let xTip = Math.cos(angle) * (radius * 0.95 - triangleHeight);
    let yTip = Math.sin(angle) * (radius * 0.95 - triangleHeight);

    // Teken driehoek
    ctx.beginPath();
    ctx.moveTo(xBase1, yBase1);
    ctx.lineTo(xBase2, yBase2);
    ctx.lineTo(xTip, yTip);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

/**
 * Tekent minuutstreepjes op de wijzerplaat
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawMinuteTicks(ctx, radius) {
  const tickLength = radius * 0.05;  // Lengte van elk streepje
  const tickWidth = radius * 0.01;   // Lijndikte

  for (let i = 0; i < 60; i++) {
    let angle = (i * Math.PI) / 30; // 60 streepjes rond de cirkel

    // Begin- en eindpunten van streepje
    let xStart = Math.cos(angle) * (radius * 0.95);
    let yStart = Math.sin(angle) * (radius * 0.95);
    let xEnd = Math.cos(angle) * (radius * 0.95 - tickLength);
    let yEnd = Math.sin(angle) * (radius * 0.95 - tickLength);

    ctx.beginPath();
    ctx.lineWidth = tickWidth;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

/**
 * Tekent de nummers op de wijzerplaat
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let num = 1; num <= 12; num++) {
    let angle = (num * Math.PI) / 6;
    ctx.rotate(angle);
    ctx.translate(0, -radius * 0.80);
    ctx.rotate(-angle);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * 0.80);
    ctx.rotate(-angle);
  }
}

/**
 * Tekent een enkele wijzer van de klok
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} pos - Positie van de wijzer in radialen
 * @param {number} length - Lengte van de wijzer
 * @param {number} width - Dikte van de wijzer
 */
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

/**
 * Tekent de huidige tijd op de klok met vloeiende beweging
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ms = now.getMilliseconds();

  // Uurwijzer (vloeiend met minuten/seconden)
  hour = hour % 12;
  let hourPos = (hour * Math.PI) / 6 +
                (minute * Math.PI) / (6 * 60) +
                (second * Math.PI) / (360 * 60);
  drawHand(ctx, hourPos, radius * 0.5, radius * 0.07);

  // Minuutwijzer (vloeiend met seconden)
  let minutePos = (minute * Math.PI) / 30 +
                  (second * Math.PI) / (30 * 60);
  drawHand(ctx, minutePos, radius * 0.8, radius * 0.05);

  // Secondewijzer (vloeiend met milliseconden)
  let secondPos = (second * Math.PI) / 30 +
                  (ms * Math.PI) / (30 * 1000);
  ctx.strokeStyle = "red";
  drawHand(ctx, secondPos, radius * 0.85, radius * 0.02);
  ctx.strokeStyle = "black"; // Reset naar standaard kleur
}

/**
 * Tekent datuminformatie in twee boxen naast elkaar ter hoogte van de 3
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} radius - Straal van de klok
 */
function drawDateInfo(ctx, radius) {
  const now = new Date();

  // Formatteer weekdag en dag
  const weekdays = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
  const weekday = weekdays[now.getDay()];
  const day = now.getDate();

  // Positie en grootte van de boxen
  const centerX = radius * 0.57;  // Horizontale positie (rechts, naast de 3)
  const centerY = 0;              // Verticale positie (midden)
  const boxWidth = radius * 0.14;
  const boxHeight = radius * 0.13;
  const boxSpacing = radius * 0.02; // Ruimte tussen de boxen

  // Linker box (weekdag)
  const weekdayBoxX = centerX - boxWidth / 2 - boxSpacing / 2;
  
  ctx.fillStyle = "white";
  ctx.fillRect(weekdayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
  
  ctx.strokeStyle = "black";
  ctx.lineWidth = radius * 0.01;
  ctx.strokeRect(weekdayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);

  ctx.fillStyle = "black";
  ctx.font = radius * 0.08 + "px Arial bold";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(weekday, weekdayBoxX, centerY);

  // Rechter box (dag)
  const dayBoxX = centerX + boxWidth / 2 + boxSpacing / 2;
  
  ctx.fillStyle = "white";
  ctx.fillRect(dayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);
  
  ctx.strokeStyle = "black";
  ctx.lineWidth = radius * 0.01;
  ctx.strokeRect(dayBoxX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);

  ctx.fillStyle = "black";
  ctx.font = radius * 0.10 + "px Arial bold";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(day.toString(), dayBoxX, centerY);
}

/**
 * Hoofdfunctie die de volledige klok tekent
 * Wordt aangeroepen in een animatie-loop voor continue weergave
 */
function drawClock() {
  // Wis het canvas voordat we opnieuw tekenen
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  
  // Teken alle componenten van de klok
  drawFace(ctx, radius);
  drawMinuteTriangles(ctx, radius);
  drawMinuteTicks(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  drawDateInfo(ctx, radius);
  
  // Plan de volgende frame (continue animatie-loop)
  requestAnimationFrame(drawClock);
}

// Event listener voor window resize
window.addEventListener('resize', () => {
  resizeCanvas();
});

// Initialiseer canvas en start animatie
resizeCanvas();
requestAnimationFrame(drawClock);