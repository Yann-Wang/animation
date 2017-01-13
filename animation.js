/**
 * Created by a_wav on 2016/11/16.
 */
//a function to build a function, so browser checks only run once
var requestFrame = (function() {
    var thisFunc,
        prefixList = ['webkit', 'moz', 'ms'];

    //check each method for availability, when one is found,
    //use that
    for (var i=0; i < prefixList.lenth; i++) {
        thisFunc = prefixList[i] + 'RequestAnimationFrame';

        if(window[thisFunc]) {
            return function(callback) {
                window[thisFunc](callback);
            }
        }
    }

    //if we got here none was found, fallback to 15fps setTimeout
    return function(callback) {
        window.setTimeout(callback, 33);
    }

})();

// 要确定每帧走的距离
function animate(element, from, to, duration, callback) {

    //figure out how much to move per millisecond
    var pixelsPerMS = to/duration;

    //keep track of the position
    var pos = from;

    //keep track of the time
    var time = Date.now();

    //create the callback function
    var func = function(){

        var lastTime, elapsed, pixelsToMove;

        lastTime = time;
        time = Date.now();
        elapsed = time - lastTime;

        //multiply the time elapsed by how many pixels
        //per ms to determine how far to move
        pixelsToMove = Math.floor(elapsed * pixelsPerMS);

        pos = pos + pixelsToMove;

        //In real life this should do more than move elements
        //down.


        if( pos < to ){
            requestFrame(func);
        } else {
            callback();
        }

        element.style.top = pos + 'px';

    }

    func();

}