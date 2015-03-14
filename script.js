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

var to_padded_string = function(num) {
    if (num >= 10) {
        return num.toString();
    } else {
        return "0" + num.toString();
    }
};

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
        $("#current-minutes").html(to_padded_string(now.getMinutes()));
        $("#current-seconds").html(to_padded_string(now.getSeconds() + (now.getMilliseconds ()) / 1000));

        var current_pi_power = pi_powers[current_index];
        
        $("#pipower").html(current_pi_power.pi_power.toString());
        
    }, 100);
});
