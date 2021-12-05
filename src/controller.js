const setA = new XSet("red", 60);
const setB = new XSet("green", 50);
const setC = new XSet("blue", 40);

let current = null;

draw();

btnA.addEventListener('click', function(e) {
    current = setA;
})

btnB.addEventListener('click', function(e) {
    current = setB;
})

btnC.addEventListener('click', function(e) {
    current = setC;
})

btnGo.addEventListener('click', function(e) {
    
    setStage(setA, setB, setC);
    draw();
       
    // current =  null;
    // let matrix = calcMatrix(setA, setB, setC);
    // draw(matrix);   
})


// mouse events 

canvas.addEventListener('mousedown', function(e) {
    if (current) {
        current.x = e.offsetX;
        current.y = e.offsetY;   
        current =  null;
        draw(); 
    }
})

canvas.addEventListener('mousemove', function(e) {
    if (current) {
        current.x = e.offsetX;
        current.y = e.offsetY; 
        draw();       
    }
})

