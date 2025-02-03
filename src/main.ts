import { Application, Container } from 'pixi.js';
import { addMoon } from './addMoon';
import { addStars } from './addStars';
import { addMountains } from './addMountains';
import { addTrees } from './addTrees';
import { addGround } from './addGround';
import { addTrain } from './addTrain';
import { addSmokes } from './addSmokes';

//create a PixiJS app
const app = new Application();

//create a container to hold all the train parts
const trainContainer = new Container();

// Asynchronous IIFE
(async () => {
    //init the app
    await app.init({ background: '#021f4b', resizeTo: window });

    //append the application canvas to the document body
    document.body.appendChild(app.canvas);

    addStars(app);
    addMoon(app);
    addMountains(app);
    addTrees(app);
    addGround(app);
    addTrain(app, trainContainer);
    addSmokes(app, trainContainer);
})();
