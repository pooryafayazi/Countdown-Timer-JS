var INITIAL_SECONDS = 120;
var countInterval;
// var initial_counter = "02:00"


var onLoadCounter = function(){
    if (!Cookies.get('initial_counter')){
       INITIAL_SECONDS = 120
    } else {
        INITIAL_SECONDS =  Number(Cookies.get('initial_counter'))
    }
    // INITIAL_SECONDS != NaN ? Number(Cookies.get('initial_counter')) : 120
    // INITIAL_SECONDS = Number(Cookies.get('initial_counter'))
    var mm = String(Math.floor(INITIAL_SECONDS / 60)).padStart(2, '0');
    var ss = INITIAL_SECONDS % 60 == 0 ? '00' : String(INITIAL_SECONDS % 60).padStart(2, '0')
    document.getElementById('counter').innerHTML = `${mm}:${ss}`;
    

    var previousState = Cookies.get('state')
    if (previousState === 'started'){
        startCount();
    } else if (previousState === 'paused') {
            pauseCount();
    }
}

var startCount = function () {
    countInterval = setInterval(function () {
        Cookies.set('state', 'started')
        INITIAL_SECONDS --;
        
        var mm = String(Math.floor(INITIAL_SECONDS / 60)).padStart(2, '0');
        var ss = INITIAL_SECONDS % 60 == 0 ? '00' : String(INITIAL_SECONDS % 60).padStart(2, '0')
        document.getElementById('counter').innerHTML = `${mm}:${ss}`;

        Cookies.set('initial_counter', INITIAL_SECONDS)

        console.log(document.getElementById('counter').innerHTML)
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;

        if ( document.getElementById('counter').innerHTML === "00:00"){
            document.getElementById('counter').innerHTML = "02:00";
            console.log(document.getElementById('counter').innerHTML)
            resetCount();
        }
    }, 1000)
}

var pauseCount = function () {
    clearInterval(countInterval);
    Cookies.set('state', 'paused')
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('startBtn').disabled = false;
}


var resetCount = function () {
    // clearInterval(countInterval);
    // Cookies.set('state', 'paused');
    // document.getElementById('pauseBtn').disabled = true;
    // document.getElementById('startBtn').disabled = false;
    pauseCount();
    Cookies.set('initial_counter', 120);
    INITIAL_SECONDS = 120;
    document.getElementById('counter').innerHTML = "02:00";
}

