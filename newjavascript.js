/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* initial an 2 dimension slots array */
var slots;
var colors;
//var movesound, mergesound;
//var bMerged = false;
            
$(document).ready(function(){
    colors = new Array();
    colors['2'] = 'snow';
    colors['4'] = 'papayaWhip';
    colors['8'] = 'LightSalmon';
    colors['16'] = 'SandyBrown';
    colors['32'] = 'coral';
    colors['64'] = 'OrangeRed';
    colors['128'] = 'Gold';
    colors['256'] = 'Khaki';
    colors['512'] = 'Orange';
    colors['1024'] = 'GoldenRod';
    colors['2048'] = 'GoldenRod';
    colors['4096'] = 'DarkGreen';
    colors['8192'] = 'Blue';
    colors['16384'] = 'Black';
    colors['32768'] = 'Red';
    
    //movesound = document.getElementById("movesound")
    //mergesound = document.getElementById("mergesound")
     
    slots = new Array();
     for(var row = 0; row < 4; row++)
    {
        slots[row] = new Array();
        for(var col = 0; col < 4; col++)
        {
            slots[row][col] = null;
        }
    }
   
    document.addEventListener('touchstart', touchHandler, false);	
    document.addEventListener('touchmove', touchHandler, false);	
    document.addEventListener('touchend', touchHandler, false);

    createCube();
/*
    $(document).on("swipeleft",function(){
        alert("you swiped left");
    });

    $(document).on("swiperight",function(){
        alert("you swiped right");
    });

    $(window).on("swipeup",function(){
        alert("you swiped up");
    });

    $(window).on("swipedown",function(){
        alert("you swiped down");
    });*/
});



$(document).keydown(function(key){
    switch (key.which){
        case 37:
            moveCubes("Left");
            break;
        case 38:
            moveCubes("Up");
            break;
        case 39:
            moveCubes("Right");
            break;
        case 40:
            moveCubes("Down");
            break;
    }
});

function createCube(){
    var $cube = null;
    /* random a row */
    var row = Math.floor(Math.random()*4);
    for(var countRow=0; (countRow<4) && ($cube===null); countRow++)
    {
        /* random a col */
        var col = Math.floor(Math.random()*4);
        for(var countCol=0;(countCol<4) && ($cube===null); countCol++)
        {
            if (slots[row][col] === null)
            {
                $cube = $("<div class='cube'>2</div>");
                $cube.css('background',colors[$cube.text()]);
                $("#slots").append($cube);
                $cube.css({left: $('.slot').eq(row*4+col).position().left,
                            top: $('.slot').eq(row*4+col).position().top});
                $cube.css('display','initial');
                slots[row][col] = $cube;
                $cube.addClass('showCube');
            }
            col++;
            if(col===4) col = 0;
        }
        row++;
        if(row===4) row = 0;
    }
}

function moveCubes(direction) {
    var bMoved = false;
    bMerged = false;

    for(var row=0;row<4;row++)
    for(var col=0;col<4;col++)
        if(slots[row][col]!==null)
        {
            if (slots[row][col].hasClass("showCube"))
                slots[row][col].removeClass("showCube");
            if (slots[row][col].hasClass("mergedCube"))
                slots[row][col].removeClass("mergedCube");
        }
    
    switch (direction)
    {
        case "Left":
            for(var col=1; col<4; col++)
            {
                for(var row=0; row<4; row++)
                    if(moveCube(row, col, "Left"))
                        bMoved = true;
            }
            break;
        case "Right":
            for(var col=2; col>=0; col--)
            {
                for(var row=0; row<4; row++)
                    if(moveCube(row, col, "Right"))
                        bMoved = true;
            }
            break;
        case "Up":
            for(var row=1; row<4; row++)
            {
                for(var col=0; col<4; col++)
                    if(moveCube(row, col, "Up"))
                        bMoved = true;
            }
            break;
        case "Down":
            for(var row=2; row>=0; row--)
            {
                for(var col=0; col<4; col++)
                    if(moveCube(row, col, "Down"))
                        bMoved = true;
            }
            break;
    }
    
    if(bMoved)
    {
//        movesound.load();
//        movesound.play();
        createCube();
    }
}

function moveCube(row, col, direction) {
    /* empty cube */
    var cube = slots[row][col];                
    if (cube === null)
        return false;

    /* reach border */
    if((direction==="Left" && col===0) ||
    (direction==="Right" && col===3) ||
    (direction==="Up" && row===0) ||
    (direction==="Down" && row===3))
        return false;

    switch (direction)
    {
        case "Left":
            if(slots[row][col-1]===null)
            {
                slots[row][col-1] = cube;
                slots[row][col] = null;
                cube.css({left: $('.slot').eq(row*4+col-1).position().left});
                if (col > 1)
                    moveCube(row, col-1, direction);
                return true;
            }
            if(slots[row][col-1].text()===cube.text() && !slots[row][col-1].hasClass("mergedCube"))
            {
                slots[row][col-1].remove();
                slots[row][col-1] = cube;
                slots[row][col] = null;
                cube.css({left: $('.slot').eq(row*4+col-1).position().left});
                upgrade(cube);
                return true;
            }
            else
                return false;
            break;
        case "Right":
            if(slots[row][col+1]===null)
            {
                slots[row][col+1] = cube;
                slots[row][col] = null;
                cube.css({left: $('.slot').eq(row*4+col+1).position().left});
                if (col < 2)
                    moveCube(row, col+1, direction);
                return true;
            }
            if(slots[row][col+1].text()===cube.text() && !slots[row][col+1].hasClass("mergedCube"))
            {
                slots[row][col+1].remove();
                slots[row][col+1] = cube;
                slots[row][col] = null;
                cube.css({left: $('.slot').eq(row*4+col+1).position().left});
                upgrade(cube);
                return true;
            }
            else
                return false;
            break;
        case "Up":
            if(slots[row-1][col]===null)
            {
                slots[row-1][col] = cube;
                slots[row][col] = null;
                cube.css({top: $('.slot').eq((row-1)*4+col).position().top});
                if (row > 1)
                    moveCube(row-1, col, direction);
                return true;
            }
            if(slots[row-1][col].text()===cube.text() && !slots[row-1][col].hasClass("mergedCube"))
            {
                slots[row-1][col].remove();
                slots[row-1][col] = cube;
                slots[row][col] = null;
                cube.css({top: $('.slot').eq((row-1)*4+col).position().top});
                upgrade(cube);
                return true;
            }
            else
                return false;
            break;
        case "Down":
            if(slots[row+1][col]===null)
            {
                slots[row+1][col] = cube;
                slots[row][col] = null;
                cube.css({top: $('.slot').eq((row+1)*4+col).position().top});
                if (row < 2)
                    moveCube(row+1, col, direction);
                return true;
            }
            if(slots[row+1][col].text()===cube.text() && !slots[row+1][col].hasClass("mergedCube"))
            {
                slots[row+1][col].remove();
                slots[row+1][col] = cube;
                slots[row][col] = null;
                cube.css({top: $('.slot').eq((row+1)*4+col).position().top});
                upgrade(cube);
                return true;
            }
            else
                return false;
            break;
    }
    return true;
}

function upgrade(cube) {
    var value = parseInt(cube.text());
    cube.text(value*2);
    cube.css('background',colors[cube.text()]);
    if(value>=4)
        cube.css('color','white');
    
    if(value>=8192)
        cube.addClass('fivedigital');
    else if(value>=512)
        cube.addClass('fourdigital');
    else if(value>=64)
        cube.addClass('threedigital');

    cube.addClass("mergedCube");
    
    var score = parseInt($("#score").text());
    score+= value*2;
    $("#score").text(score);
    bMerged = true;
}


var	touchstart = {"x":-1, "y":-1}; 
var	touchmove = {"x":-1, "y":-1}; 
function touchHandler(event) {
    var touch;
    touch = event.touches[0];
    switch (event.type) {
        case 'touchstart':
            touchstart.x = touch.pageX;
            touchstart.y = touch.pageY;
            break;
        case 'touchmove':
            touchmove.x = touch.pageX;
            touchmove.y = touch.pageY;
            event.preventDefault();
            break;
        case 'touchend':
            var distanceX = Math.abs(touchmove.x-touchstart.x);
            var distanceY = Math.abs(touchmove.y-touchstart.y);
            var direction;
            if (distanceX > distanceY) {
                if (touchmove.x > touchstart.x)
                    direction = "Right";
                else
                    direction = "Left";
            }
            else {
                if (touchmove.y > touchstart.y)
                    direction = "Down";
                else
                    direction = "Up";
            }
            moveCubes(direction);
            break;
    }
}
