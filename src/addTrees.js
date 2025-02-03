import { Graphics } from 'pixi.js';

export function addTrees(app) {

    //width of each tree
    const treeWidth = 200;

    //position of the base of th trees on the y-axis
    const y = app.screen.height - 20;

    //spacing between each tree
    const spacing = 15;

    //calculate the number of trees needed to fill the screen
    const count = app.screen.width / (treeWidth + spacing) + 1;

    //create an array to store all the trees
    const trees = [];

    for (let index = 0; index < count; index++) {
        //randomize the height of each tree within a constrained range
        const treeHeight = 225 + Math.random() * 50;

        //create a tree instance
        const tree = createTree(treeWidth, treeHeight);

        //initialy position the tree
        tree.x = index * (treeWidth + spacing);
        tree.y = y;

        //add the tree to the stage and the reference array
        app.stage.addChild(tree);
        trees.push(tree);
    }

    //animate the trees
    app.ticker.add((time) => 
    {
        //calculate the amount of distance to move the trees per tick
        const dx = time.deltaTime * 3;

        trees.forEach((tree) =>
        {
            //move the trees leftwards
            tree.x -= dx;

            //reposition the trees when they off screen
            if (tree.x <= -(treeWidth / 2 + spacing))
            {
                tree.x += count * (treeWidth + spacing) + spacing * 3;
            }
        });
    });
}

export function createTree(width, height) {

    //define the dimensions of thee tree trunk
    const trunkWidth = 30;
    const trunkHeight = height / 4;

    //define dimensions and parameters for the tree crown level
    const crownHeight = height - trunkHeight;
    const crownLevels = 4;
    const crownLevelHeight = crownHeight / crownLevels;
    const crownWidthIncrement = width / crownLevels;

    //define the colors of the parts
    const trunkColor = 0x563929;
    const crownColor = 0x264d3d;

    const graphics = new Graphics()
        //draw the trunk
        .rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
        .fill({ color: trunkColor });

    for (let index = 0; index < crownLevels; index++)
    {
        const y = -trunkHeight - crownLevelHeight * index;
        const levelWidth = width - crownWidthIncrement * index;
        const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

        //draw a crown layer
        graphics
            .moveTo(-levelWidth / 2, y)
            .lineTo(0, y - crownLevelHeight - offset)
            .lineTo(levelWidth / 2, y)
            .fill({ color: crownColor });
    }

    return graphics;
}
