#!/bin/bash
ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml.syntax -syntax camlp4o -package sexplib -package sexplib.syntax -linkpkg -o pi_clock.byte -rectypes -custom data.ml pi_clock.ml -verbose
