let current = null;
let matrix = null;
draw();

btnA.addEventListener('click', function(e) {
    current = setA;
    matrix = null;
})

btnB.addEventListener('click', function(e) {
    current = setB;
    matrix = null;
})

btnC.addEventListener('click', function(e) {
    current = setC;
    matrix = null;
})

btnGo.addEventListener('click', function(e) {
    const op = new Function("a","b","c", "return " + expr.value);
    const a = setA.getMatrix();   
    const b = setB.getMatrix();   
    const c = setC.getMatrix();   

    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            a[y][x] = op(a[y][x], b[y][x], c[y][x]);
        }
    }
    matrix = a;
    current =  null;
    draw();   
})

// mouse events 

canvas.addEventListener('mousemove', function(e) {
    if (current) {
        current.x = e.offsetX;
        current.y = e.offsetY; 
        draw();       
    }
})

canvas.addEventListener('mousedown', function(e) {
    if (current) {
        current.x = e.offsetX;
        current.y = e.offsetY;   
        current =  null;
        draw(); 
    }
})


function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // sets fill    
    for (let s of [setA, setB, setC]) {
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2, true); 
        ctx.fill()
    }   
    // current
    if (current) {
        let r = current.r;
        ctx.fillStyle = current.color;
        ctx.beginPath();
        ctx.arc(current.x, current.y, current.r, 0, Math.PI*2, true); 
        ctx.fill();
    }
    // matrix
    if (matrix) {
        const D = 1;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (matrix[row][col]) {  
                    let x = col * Kx, y = row * Ky;
                    ctx.fillStyle = row % 3 ? "black" : "white";
                    ctx.fillRect(x - Kx/2, y - Ky/2, D, D);                
                }
            }
        }
    }
    // sets stroke    
    ctx.strokeStyle = "white";
    for (let s of [setA, setB, setC]) {
        ctx.beginPath(); 
        ctx.arc(s.x, s.y, s.r, 0,Math.PI*2,true); 
        ctx.stroke();
    }   
    

}

