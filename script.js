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

var zeroes = "00000000000000000000000";

$(document).ready(function () {
    var current_index = 0;
    var first_time_advance_called = true;
    var advance_index = function (now) {
        var advanced = false;
        if (now > 86376000) // the maximum number of milliseconds in pi_powers
        {
            current_index = 0;
            return true;
        }
        while (pi_powers[current_index].milliseconds < now) {
            advanced = true;
            current_index += 1;
        }
        var was_first_time_advance_called = first_time_advance_called;
        first_time_advance_called = false;
        return was_first_time_advance_called || advanced;
    };

    setInterval(function () {
        var now = new Date(Date.now ());
        var now_ms = timeToMilliseconds(now);
        var advanced = advance_index (now_ms);
        var hourString = (now.getHours()).toString ()
        // add a space to match with the decimal point in the pi time below
        if (now.getHours () >= 10) {
            hourString = hourString.charAt(0) + " " + hourString.charAt(1);
        } else {
            hourString = hourString + " ";
        }
        $("#current-hours").html(hourString);
        $("#current-minutes").html(to_padded_string(now.getMinutes()));
        var second_string = to_padded_string(now.getSeconds() + (now.getMilliseconds ()) / 1000);
        second_string = second_string.substring(0,Math.min(6,second_string.length));
        if (second_string.length < 6) {
            second_string = second_string + zeroes.substring(0,6 - second_string.length);
        }
        $("#current-seconds").html(second_string);


        var current_pi_power = pi_powers[current_index];

        // do these outside of the loop as a hack: they need to be updated
        // the first time because otherwise mathjax overwrites them.
        $("#pipower").html(current_pi_power.pi_power.toString());
        $("#tenpower").html(current_pi_power.exponent.toString());

        if (advanced) {

            var value = current_pi_power.value;
            var use_one_digit_hour = false;
            var one_digit_hour = parseInt(value.charAt(0));
            var one_digit_minutes = parseInt(value.substring(2,4));
            var one_digit_seconds = parseInt(value.substring(4,6));
            var one_digit_milliseconds = parseInt(value.substring(6,9));
            //        var one_digit_seconds = parseFloat("0." + value.substring(4,value.length)) * 100;
            var two_digit_hour = parseInt(value.charAt(0)) * 10 + parseInt(value.charAt(2));
            var two_digit_minutes = parseInt(value.substring(3,5));
            var two_digit_seconds = parseInt(value.substring(5,7));
            var two_digit_milliseconds = parseInt(value.substring(7,10));

            var fakeNow = (new Date(0,0,0,now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds())).getTime();
            var fakeOneDigit = (new Date(0,0,0,one_digit_hour, one_digit_minutes, one_digit_seconds, one_digit_milliseconds)).getTime();
            var fakeTwoDigit = (new Date(0,0,0,two_digit_hour, two_digit_minutes, two_digit_seconds, two_digit_milliseconds)).getTime();

            var use_one_digit = fakeNow < fakeOneDigit || fakeTwoDigit <= fakeNow || two_digit_hour >= 24 || two_digit_minutes >= 60 || two_digit_seconds >= 60;

            if (use_one_digit) {
                $("#pi-hours").html(one_digit_hour.toString() + ".");
                $("#pi-minutes").html(value.substring(2,4));
                $("#pi-seconds").html(value.substring(4,6) + " " + value.substring(6,9));
            } else {
                $("#pi-hours").html(value.charAt(0) + "." + value.charAt(2));
                $("#pi-minutes").html(value.substring(3,5));
                $("#pi-seconds").html(value.substring(5,7) + " " + value.substring(7,10));
            }
        }
    }, 100);
});
