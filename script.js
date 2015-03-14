var timeToMilliseconds = function (time) {
    var acc = 0;
    acc += time.getHours ();
    acc *= 60;
    acc += time.getMinutes ();
    acc *= 60;
    acc += time.getSeconds ();
    acc *= 1000;
    acc += time.getMilliseconds ();
    return acc;
}

$(document).ready(function () {
    var current_index = 0;
    var advance_index = function (now) {
        if (now > 86340840) // the maximum number of milliseconds in pi_powers
        {
            current_index = 0;
            return;
        }
        while (pi_powers[current_index].milliseconds < now) {
            current_index += 1;
        }
    };
        
    setInterval(function () {
        var now = new Date(Date.now ());
        var now_ms = timeToMilliseconds(now);
        advance_index (now_ms);
        $("#current-hours").html((now.getHours()).toString());
        $("#milliseconds").html(now_ms);
        $("#pipower").html(pi_powers[current_index].pi_power.toString());
    }, 100);
});
