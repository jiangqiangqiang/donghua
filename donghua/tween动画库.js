~(function(){
    var zhufengEffect = {
        //匀速
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },             
    };
    function move(ele, obj, duration,effect,callback) {
        var zfEffect  = zhufengEffect.Linear;
        if(typeof effect ==="number"){
            switch (effect){
                
                case 2 :
                    zfEffect = zhufengEffect.Bounce.easeInOut
                    break;
                
            }
        }else if(typeof effect =="function"){
            callback = effect;
        }
        clearInterval(ele.timer);
        var begin = {};
        var change = {};
        for (var attr in obj) {
            begin[attr] = utils.css(ele, attr);
            change[attr] = obj[attr] - begin[attr];
        }
        var times = 0;
        ele.timer = window.setInterval(function () {
            times += 15;
            if (times >= duration) {
                for (var attr in obj) {
                    utils.css(ele, attr, obj[attr]);
                }
                clearInterval(ele.timer);
                callback&&callback.call(ele);
                return;
            }
            for (var attr in begin) {
                var curPos = zfEffect(times, begin[attr], change[attr], duration);
                utils.css(ele, attr, curPos);
            }
        }, 15)
    }
    window.animate = move;
})();
