/* eslint-disable no-console */
const jsdom = require("jsdom");

// Elm needs some DOM to operate on, so create a fake one
const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
// Here we are just requiring the compiled Elm code. Nothing fancy
const Elm = require("./elm-build/main");

// This is just a little Promise-like wrapper.
// We could just use callbacks if we wanted.
const { Future } = require("ramda-fantasy");

// This will load the API we are exposing. Ideally we only
// call this once and afterwards we use a reference to the
// object it returned
const loadAPI = () =>
    Future((reject, resolve) => {
        const app = Elm.Main.fullscreen();
        app.ports.expose.subscribe(api => {
            resolve(api);
        });
        app.ports.requestExposition.send();
    });

loadAPI()
    .map(api => {
        console.log("Greeting");
        console.log(api.greet("Marcelo"));

        console.log("Summing numbers");
        console.log("2 + 3 = ", api.sum(2, 3));

        console.log("Triple OR operation");
        console.log("OR true false false = ", api.tripleOr(true, false, false));
    })
    .fork(err => console.log("Error:", err), () => console.log("Success"));
