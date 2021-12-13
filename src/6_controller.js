
btnGo.addEventListener('click', refresh);

function refresh() {
    // get inputs
    setA = new XSet("red",   inputA.value);
    setB = new XSet("green", inputB.value);
    setC = new XSet("blue",  inputC.value);

    switch (STATE) {
        case 0: // SETS
        setStage(setA, setB, setC);
        drawSets(); 
        let matrix = calcMatrix(setA, setB, setC, $expr.value);
        drawSets(matrix);   
        $exprRes.innerHTML = calcSetExpression(setA, setB, setC, $expr.value);
        break;
        case 1: // NUMBERS
        let setR = calcNumberExpression(setA, setB, setC, $expr.value);
        drawNumbers(setR);
        $exprRes.innerHTML = setR.str;
        break;
    }
}


// SETS ============================================

// test for sets 
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
