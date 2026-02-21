var objGrid = {
    x: 138,
    y: 103
}
let intMultiplier = 16;
let objCanvasSize = {
    width: objGrid.x * intMultiplier,
    height: objGrid.y * intMultiplier
}



function resize() {
    let width = objGrid.x;
    let height = objGrid.y;

    const intContainerWidth = containerDiv.offsetWidth;
    const intContainerHeight = containerDiv.offsetHeight;

    const scale = Math.min(intContainerWidth / width, intContainerHeight / height);

    const enlargedWidth = Math.floor(scale * width);
    const enlargedHeight = Math.floor(scale * height);

    app.view.style.width = `${enlargedWidth}px`;
    app.view.style.height = `${enlargedHeight}px`;

    // if background texture is needed
    // bgSprite.width = app.screen.width;
    // bgSprite.height = app.screen.height;

    //  grid.scale.set(1);
}
// if background texture is needed
// let bgSprite;

let app;
let containerDiv;
let grid;

function drawGrid() {
    // Create a grid of vertical and horizontal lines
    grid = new PIXI.Graphics();
    let intLineWidth = 1 / 2;

    intMultiplier = app.screen.width / objGrid.x;


    // spaced 16 pixels apart
    // Draw vertical lines

    console.log(objCanvasSize.width / app.screen.width)
    console.log(objCanvasSize.width)


    for (var i = 0; i < objGrid.x; i++) {
        let x = i * intMultiplier;

        grid.moveTo(x, 0);
        grid.lineTo(x, app.screen.height);

        x = x + intMultiplier - intLineWidth;
        grid.moveTo(x, 0);
        grid.lineTo(x, app.screen.height);
    }
    intMultiplier = app.screen.height / objGrid.y;


    for (var i = 0; i < objGrid.y; i++) {
        let y = i * intMultiplier;
        grid.moveTo(0, y);
        grid.lineTo(app.screen.width, y);

        y = y + intMultiplier - intLineWidth;
        grid.moveTo(0, y);
        grid.lineTo(app.screen.width, y);
    }

    grid.stroke({ color: 0xffffff, pixelLine: false, width: intLineWidth });

    // Add it to the stage
    app.stage.addChild(grid);

}




$(document).ready(function () {

    window.addEventListener("resize", resize);
    // resize();

    (async () => {
        containerDiv = document.querySelector('#game-container');

        // Create a new application
        app = new PIXI.Application();

        // Initialize the application
        await app.init({ backgroundAlpha: 0, resizeTo: containerDiv, antialias: false });

        // Append the application canvas to the document body
        containerDiv.appendChild(app.canvas);

        app.view.style.width = `${objCanvasSize.width}px`;
        app.view.style.height = `${objCanvasSize.height}px`;

        // Create and add a container to the stage
        const container = new PIXI.Container();

        app.stage.addChild(container);

        // if background texture is needed
        // const bgTexture = await PIXI.Assets.load('./images/rm_farm.png');
        // bgSprite = new PIXI.Sprite(bgTexture);
        // bgSprite.width = app.screen.width;
        // bgSprite.height = app.screen.height;
        // bgTexture.source.scaleMode = 'nearest';
        // app.stage.addChild(bgSprite);

        drawGrid();

        // Load the bunny texture
        const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');

        // Create a 5x5 grid of bunnies in the container
        for (let i = 0; i < 25; i++) {
            const bunny = new PIXI.Sprite(texture);

            bunny.x = (i % 5) * 40;
            bunny.y = Math.floor(i / 5) * 40;
            container.addChild(bunny);
        }

        // Move the container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // Center the bunny sprites in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;







        //   let count = 0;
        // Listen for animate update
        app.ticker.add((time) => {
            // Continuously rotate the container!
            // * use delta to create frame-independent transform *
            container.rotation -= 0.01 * time.deltaTime;

            container.x = app.screen.width / 2;
            container.y = app.screen.height / 2;

            // count += 0.01;
            // container.scale = 1 + (Math.sin(count) + 1) * 2;

        });

        resize();
    })();

});