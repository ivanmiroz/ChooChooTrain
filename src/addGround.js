import { Graphics } from 'pixi.js';

export function addGround(app) {

    //create and draw the bottom ground graphic
    const width = app.screen.width;
    const groundHeight = 20;
    const groundY = app.screen.height;
    const ground = new Graphics()
        .rect(0, groundY - groundHeight, width, groundHeight)
        .fill({ color: 0xdddddd });

    //add the ground to the stage
    app.stage.addChild(ground);

    //define the total height of the track. Both the planks and the rail layers
    const trackHeight = 15;

    //define the dimensions and parameters for the planks
    const plankWidth = 50;
    const plankHeight = trackHeight / 2;
    const plankGap = 20;
    const plankCount = width / (plankWidth + plankGap) + 1;
    const plankY = groundY - groundHeight;

    //create an array to store all the planks
    const planks = [];

    for (let index = 0; index < plankCount; index++) {
        //create and draw a plank graphic
        const plank = new Graphics()
            .rect(0, plankY - plankHeight, plankWidth, plankHeight)
            .fill({ color: 0x241811 });

        //position the plank to distribute it across the screen
        plank.x = index * (plankWidth + plankGap);

        //add the plank to the stage and reference array
        app.stage.addChild(plank);
        planks.push(plank);
    }

    //crate and draw the rail strip graphic
    const railHeight = trackHeight / 2;
    const railY = plankY - plankHeight;
    const rail = new Graphics()
        .rect(0, railY - railHeight, width, railHeight)
        .fill({ color: 0x5c5c5c });

    //app the rail to the stage
    app.stage.addChild(rail);

    //animate just the planks to simulate the passing of the ground
    //since the rail and the ground are uniform strips, they do not need to be animated
    app.ticker.add((time) => 
    {
        //calcilate the amount of distance to move the plank per tick
        const dx = time.deltaTime * 6;

        planks.forEach((plank) =>
        {
            //move the planks leftwards
            plank.x -= dx;
            
            //reposition the planks when they move off the screen
            if (plank.x <= -(plankWidth + plankGap))
            {
                plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5;
            }
        });
    });
}
