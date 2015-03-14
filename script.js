var nowInMilliseconds = function () {
    var now = new Date(Date.now ());
    var acc = 0;
    acc += now.getHours ();
    acc *= 60;
    acc += now.getMinutes ();
    acc *= 60;
    acc += now.getSeconds ();
    acc *= 1000;
    acc += now.getMilliseconds ();
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
        var now = nowInMilliseconds();
        advance_index (now);
        $("#milliseconds").html(now);
        $("#pipower").html(pi_powers[current_index].pi_power.toString());
    }, 100);
});
