open StdLabels

module Decimal = struct
  type t = {
    non_exponent : string;
    exponent : int;
  }
end

let rec pow10 = function
  | 0 -> 1
  | i ->
    if i < 0 then raise "negative power"
    else 10 * pow10 (i - 1)

let times_of_int_array a =
  let milliseconds_of_second_index i =
    let rec loop acc i j =
      if i >= Array.length a || j < 0
      then acc
      else loop (acc + a.(i) * pow10 j) (i + 1) (j - 1)
    in
    loop 0 i 5
  in
  let single_digit_hour =
    let minutes = a.(1) * 10 + a.(2) in
    if minutes >= 60
    then []
    else
      [
        a.(0) * 60 * 60 * 1000
        + minutes * 60 * 1000
        + milliseconds_of_second_index 3
      ]
  in
  let two_digit_hour =
    let hour = 10 * a.(0) + a.(1) in
    let minutes = 10 * a.(2) + a.(3) in
    if hour < 24 && minutes < 60




module Datapoint = struct
  type t = {
    milliseconds : int;
    pi_exponent : int;
    decimal : Decimal.t;
  }

  let of_string s =
    let index_of_first_comma =
      let rec loop i =
        if s.[i] = ','
        then i
        else loop (i + 1)
      in
      loop 0
    in
    let pi_exponent = int_of_string (
      String.sub s ~pos:1 ~len:(index_of_first_comma - 1)
    )
    in
    let index_of_backtick =
      let rec loop i =
        if s.[i] = '`'
        then i
        else loop (i + 1)
      in
      loop (index_of_first_comma + 1)
    in
    let non_exponent = String.sub s ~pos:(index_of_first_comma + 2)

end

let parse_data

let () = print_endline Data.data
