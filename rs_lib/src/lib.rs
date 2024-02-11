use wasm_bindgen::prelude::*;
use cirilica;

#[wasm_bindgen]
pub fn translate(text: String) -> String {
  cirilica::latin_to_cyrillic(text)
}


