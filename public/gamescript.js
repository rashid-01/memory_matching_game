//Declaring Global Variables
var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

//Implementing functions here
setUp();
startTimer();

//funtion definitions
function randomAnswers(){
    var array = [1,1,2,2,3,3,4,4,5];
    array.sort(function(item){
        return .5 - Math.random();
    })
    return array;
}

function reveal(cell){
    cell.style.backgroundColor = "Red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if(started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "time elapsed:" + time;
        },1000);
        started = true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "blue";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "purple";
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var array = randomAnswers();

    for(var i=0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = array[i];

        cell.addEventListener("mouseenter", function(){
            if(this.completed == false && this.clicked == false)
            this.style.backgroundColor = "yellow";
        });
        cell.addEventListener("mouseleave", function(){
            if(this.completed == false && this.clicked == false )
            this.style.backgroundColor = "blue";
        });
        cell.addEventListener('click', function(){
            if(ready == false)
                return;
                startTimer();
            if(this.completed == false && this.clicked == false ){
                clickedArray.push(this);
                reveal(this);
            }
            if(clickedArray.length == 2){
                if(clickedArray[0].value == clickedArray[1].value){
                    //if a matching pair is found
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);
                    
                    clickedArray = [];
    
                    if(numCompleted == 8){
                        alert(" You win in " +time+ "seconds!");
                        clearInterval(interval);
                    }
                }
                else{
                    //matching pair not found
                    ready = false;
                    document.getElementById("gridTable").style.border = "5px solid red";
                    setTimeout(function(){
                    //after 500ms delay
                    hide(clickedArray[0]);
                    hide(clickedArray[1]);
    
                    clickedArray = [];
    
                    ready = true;
                    document.getElementById("gridTable").style.border = "5px solid red";
                    },500);
                }
            }
        });
        cell.addEventListener('keydown', function(event){
            if(event.key > 0 && event.key<10){
                grid[event.key-1].click();
            }
        });
        document.getElementById('restart').addEventListener('click', function(){
            location.reload();
        });
    }
}