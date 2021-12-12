const setA = new XSet("red");
const setB = new XSet("green");
const setC = new XSet("blue");

btnGo.addEventListener('click', refresh);


function refresh() {
    // get inputs
    setA.setInnerSet(inputA.value);
    setB.setInnerSet(inputB.value);
    setC.setInnerSet(inputC.value);

    switch (STATE) {
        case 0: // sets
        setStage(setA, setB, setC);
        drawSets(); 
        let matrix = calcMatrix(setA, setB, setC);
        drawSets(matrix);   
        $exprRes.innerHTML = calcSetExpression(setA, setB, setC);
        break;
        case 1: // numbers
        let setR = calcNumberExpression(setA, setB, setC)
        drawNumbers(setR);
        $exprRes.innerHTML = setR.str;
        break;
    }
}


//--------------------- test for sets -----------------------------
btnTest.addEventListener('click', function(e) {
    let i = +inputTest.value;
    let [a,b,c] = stages[i][2].split('-');
    inputA.value = a ? a : "";
    inputB.value = b ? b : "";
    inputC.value = c ? c : "";
    setStage(setA, setB, setC);
    drawSets();
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
    STATE = partIdx;
    refresh();
}

function learn2(partIdx, x) {
    inputA.value = DATA[partIdx][x][0];
    inputB.value = DATA[partIdx][x][1];
    inputC.value = DATA[partIdx][x][2];
    refresh();
}

