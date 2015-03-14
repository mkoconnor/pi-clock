#!/bin/bash
ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml.syntax -syntax camlp4o -linkpkg -o pi_clock.byte -rectypes -custom pi_clock.ml -verbose && js_of_ocaml pi_clock.byte
