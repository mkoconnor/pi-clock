open StdLabels

let rec pow10 = function
  | 0 -> 1
  | i ->
    if i < 0 then failwith "negative power"
    else 10 * pow10 (i - 1)

module Time = struct
  type t = {
    hours : int;
    minutes : int;
    milliseconds : int;
  }

  let to_milliseconds t =
    t.hours * 60 * 60 * 1000
    + t.minutes * 60 * 1000
    + t.milliseconds

  let of_int_array a =
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
          {
            hours = a.(0);
            minutes;
            milliseconds = milliseconds_of_second_index 3;
          }
        ]
    in
    let two_digit_hour =
      let hours = 10 * a.(0) + a.(1) in
      let minutes = 10 * a.(2) + a.(3) in
      if hours >= 24 || minutes >= 60
      then []
      else [
        {
          hours;
          minutes;
          milliseconds = milliseconds_of_second_index 4;
        }
      ]
    in
    single_digit_hour @ two_digit_hour

  let of_string s =
    let l = ref [] in
    let rec loop i =
      if i >= 0
      then begin
        begin
          match s.[i] with
          | '0' .. '9' as c ->  l := (int_of_char c - int_of_char '0') :: !l
          | _ -> ()
        end;
        loop (i - 1)
      end
    in
    loop (String.length s - 1);
    of_int_array (Array.of_list (List.rev !l))
end


module Datapoint = struct
  type t = {
    time : Time.t;
    milliseconds : int;
    data : Data.t;
  }

  let of_data (data : Data.t) =
    List.map (Time.of_string data.decimal_value) ~f:(fun time ->
      let milliseconds = Time.to_milliseconds time in
      {
        time;
        milliseconds;
        data;
      }
    )

  let array () = Array.sort
    (fun t1 t2 -> compare t1.milliseconds t2.milliseconds)
    (Array.concat
       (List.map (Data.data ()) ~f:(fun data -> Array.of_list (of_data data))))
end

let () = print_endline "hmm"
