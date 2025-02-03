import { Graphics } from 'pixi.js';

export function addSmokes(app, train) {

    const groupCount = 5;
    const particleCount = 7;

    //create an array to store all the smoke groups.
    const groups = [];

    //define the emitter position based on the train's position.
    const baseX = train.x + 170;
    const baseY = train.y - 120;

    for (let index = 0; index < groupCount; index++)
    {
        const smokeGroup = new Graphics();

        for (let i = 0; i < particleCount; i++)
        {
            //randomize the position and radius of each particle
            const radius = 20 + Math.random() * 20;
            const x = (Math.random() * 2 - 1) * 40;
            const y = (Math.random() * 2 - 1) * 40;

            //draw a smoke particle
            smokeGroup.circle(x, y, radius);
        }

        //fill the smoke group with gray color
        smokeGroup.fill({ color: 0xc9c9c9, alpha: 0.5 });

        //position the smoke group
        smokeGroup.x = baseX;
        smokeGroup.y = baseY;

        //add a tick custom property to the smoke group for storing the animation progress ratio
        smokeGroup.tick = index * (1 / groupCount);

        //add the smoke group to the stage and the reference array
        app.stage.addChild(smokeGroup);
        groups.push(smokeGroup);
    }

    //animate the smoke groups
    app.ticker.add((time) =>
    {
        //calculate the change in amount of animation progress ratio per tick.
        const dt = time.deltaTime * 0.01;

        groups.forEach((group) =>
        {
            //update the animation progress ratio.
            group.tick = (group.tick + dt) % 1;

            //update the position and scale of the smoke group based on the animation progress ratio.
            group.x = baseX - Math.pow(group.tick, 2) * 400;
            group.y = baseY - group.tick * 200;
            group.scale.set(Math.pow(group.tick, 0.75));
            group.alpha = 1 - Math.pow(group.tick, 0.5);
        });
    });
}
