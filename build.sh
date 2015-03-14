#!/bin/bash
ocamlfind ocamlc -package js_of_ocaml -package coq-lib -package coq-toplevel -package js_of_ocaml.syntax -linkpkg -o automated.byte -rectypes -custom automated.ml -verbose
