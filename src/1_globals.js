const canvas = document.getElementById("canvas");
const btnGo = document.getElementById("btnGo");
const btnStage = document.getElementById("btnStage");
const $expr = document.getElementById("expr");
const info = document.getElementById("info");

let STATE = 0;  // 0-sets, 1-numbers

let setA = null;
let setB = null;
let setC = null;



// SETS
const ROWS = 400;
const COLS = 400;
const Kx = canvas.width / COLS;
const Ky = canvas.height / ROWS;

