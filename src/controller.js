const setA = new XSet("red", 60);
const setB = new XSet("green", 50);
const setC = new XSet("blue", 40);



btnGo.addEventListener('click', function(e) {
    setStage(setA, setB, setC);
    draw();

    let matrix = calcMatrix(setA, setB, setC);
    draw(matrix);   
    $exprRes.innerHTML = calcExpr(setA, setB, setC);
})

btnStage.addEventListener('click', function(e) {
    setStage(setA, setB, setC);
    draw();
})


//--------------------- test -----------------------------
btnTest.addEventListener('click', function(e) {
    let i = +inputTest.value;
    let [a,b,c] = stages[i][2].split('-');
    inputA.value = a ? a : "";
    inputB.value = b ? b : "";
    inputC.value = c ? c : "";
    setStage(setA, setB, setC);
    draw();
    inputTest.value = i + 1;  
})


// learning ---------------------------------------
function makeLearningButtons() {
    for (let partIdx = 0; partIdx < DATA.length; partIdx++) {
        let btn = document.createElement("button");
        btn.id="card" + partIdx;
        btn.className = "btn btn-info"; 
        btn.innerHTML = partIdx + 1;
        btn.type = "button";
        btn.title = DATA[partIdx].h;
        btn.addEventListener("click", () => learn(partIdx));
        btn.style.marginLeft = "4px";
        document.getElementById("buttonsDiv").appendChild(btn);
    }
}

function learn(partIdx) {
    cardTitle.innerHTML = `${partIdx+1} ${DATA[partIdx].h}`;
    let dataT = DATA[partIdx].t.replace( /<<(.):(.*)>>/g,
        '<span class="config" onclick="learn2(' + partIdx + ',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[partIdx].a[0];
    inputB.value = DATA[partIdx].a[1];
    inputC.value = DATA[partIdx].a[2];
    if (DATA[partIdx].a[3]) inputParams.value = DATA[partIdx].a[3];
    draw();
}

function learn2(partIdx, x) {
    inputA.value = DATA[partIdx][x][0];
    inputB.value = DATA[partIdx][x][1];
    inputC.value = DATA[partIdx][x][2];
    draw();
}

