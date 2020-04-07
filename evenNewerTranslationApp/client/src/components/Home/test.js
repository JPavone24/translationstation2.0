import React from "react";

import { TranslatorProvider, useTranslate } from "react-translate"
 
let translations = {
  locale: "fr",
  Home: {
    HELLO: "Helloworld!"
  }
};
 
function Home() {
  let t = useTranslate("Home");
  return <h1> {t(HELLO)} </h1>
}
 
function App() {
  return (
    <TranslatorProvider translations={translations}>
      <Home />
    </TranslatorProvider>
  )
}
