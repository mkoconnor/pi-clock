#!/bin/bash
ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml.syntax -linkpkg -o pi_clock.byte -rectypes -custom data.ml pi_clock.ml -verbose && js_of_ocaml pi_clock.byte
