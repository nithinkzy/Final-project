/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function () {

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;
  let textureAtlasData: any;
  let textureAtlas: createjs.SpriteSheet;
  let stats: Stats;

  textureAtlasData = {

    "images": [
      ""
      //"./Assets/sprites/textureAtlas.png"
    ],

    "frames": [
      [2, 2, 16, 16, 0, 0, 0],
      [20, 2, 35, 50, 0, 0, 0],
      [57, 2, 44, 40, 0, 0, 0],
      [103, 2, 44, 40, 0, 0, 0],
      [149, 2, 44, 40, 0, 0, 0],
      [195, 2, 44, 40, 0, 0, 0],
      [241, 2, 44, 40, 0, 0, 0],
      [287, 2, 44, 40, 0, 0, 0],
      [333, 2, 44, 40, 0, 0, 0],
      [379, 2, 44, 40, 0, 0, 0],
      [425, 2, 44, 40, 0, 0, 0],
      [2, 54, 44, 40, 0, 0, 0],
      [48, 54, 93, 74, 0, 0, 0],
      [143, 54, 93, 74, 0, 0, 0],
      [238, 54, 93, 74, 0, 0, 0],
      [333, 54, 65, 65, 0, 0, 0],
      [400, 54, 65, 65, 0, 0, 0],
      [2, 130, 65, 65, 0, 0, 0],
      [69, 130, 65, 65, 0, 0, 0],
      [136, 130, 65, 65, 0, 0, 0],
      [203, 130, 65, 65, 0, 0, 0],
      [270, 130, 65, 65, 0, 0, 0],
      [337, 130, 62, 63, 0, 0, 0],
      [401, 130, 65, 65, 0, 0, 0],
      [401, 130, 65, 65, 0, 0, 0],
      [401, 130, 65, 65, 0, 0, 0],
      [2, 197, 65, 65, 0, 0, 0],
      [69, 197, 65, 65, 0, 0, 0],
      [136, 197, 200, 60, 0, 0, 0],
      [338, 197, 32, 32, 0, 0, 0],
      [372, 197, 32, 32, 0, 0, 0],
      [406, 197, 32, 32, 0, 0, 0],
      [440, 197, 32, 32, 0, 0, 0],
      [474, 197, 32, 32, 0, 0, 0],
      [2, 264, 32, 32, 0, 0, 0],
      [36, 264, 200, 60, 0, 0, 0]
  ],

  "animations": {
    "bullet": { "frames": [0] },
    "cloud": { "frames": [1] },
    "coin": {
      "frames": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      "speed": 0.33
    },
    "enemy": {
      "frames": [12, 13, 14],
      "speed": 0.25
    },
    "explosion": {
      "frames": [15, 16, 17, 18, 19, 20, 21],
      "speed": 0.16
    },
    "island": { "frames": [22] },
    "plane": { "frames": [23,24,25] },
    "planeflash": {
      "frames": [26, 27, 26, 27, 26, 27],
      "speed": 0.08
    },
    "restartButton": { "frames": [28] },
    "smallexplosion": {
      "frames": [29, 30, 31, 32, 33, 34],
      "speed": 0.16
    },
    "startButton": { "frames": [35] }
}

  };

  assetManifest = [
    { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
    { id: "ocean", src: "./Assets/images/ocean.png" },
    { id: "engine", src: "./Assets/audio/engine.ogg" },
    { id: "coin", src: "./Assets/audio/coin.wav" },
    { id: "life", src: "./Assets/audio/life.wav" },
    { id: "explosion", src: "./Assets/audio/explosion.mp3" },
    { id: "bulletSound", src: "./Assets/audio/bullet.mp3" }
  ];

  // preloads assets
  function Init(): void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function InitStats(): void {
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
  }

  function Start(): void {
    console.log("Starting Application...")
    // initialize performance counting
    InitStats();

    textureAtlasData.images = [assetManager.getResult("textureAtlas")];
    textureAtlas = new createjs.SpriteSheet(textureAtlasData);

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    managers.Game.stage = stage;
    managers.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyboardManager = new managers.Keyboard();
    managers.Game.keyboardManager = keyboardManager;
    managers.Game.assetManager = assetManager;
    managers.Game.textureAtlas = textureAtlas;

    Main();
  }

  function Update(): void {
    stats.begin();
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if (currentState != managers.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage

    stats.end();
  }

  function Main(): void {
    stage.removeAllChildren();

    switch (managers.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene();
        break;
      case config.Scene.PLAY:
        currentScene = new scenes.PlayScene();
        break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene();
        break;
    }

    currentState = managers.Game.currentScene;
    managers.Game.currentSceneObject = currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
