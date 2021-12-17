const canvas = document.getElementById("canvas");
const btnGo = document.getElementById("btnGo");
const btnStage = document.getElementById("btnStage");
const $expr = document.getElementById("expr");
const $exprRes = document.getElementById("exprRes");
const $oper = document.getElementById("oper");
const info = document.getElementById("info");

let STATE = 0;  // 0-sets, 1-numbers, 2-extrems

let setA = null;
let setB = null;
let setC = null;
let setU = null;   // universum

// SETS
const ROWS = 400;
const COLS = 400;
const Kx = canvas.width / COLS;
const Ky = canvas.height / ROWS;
// NUMBERS
const maxBinLength = 10;


