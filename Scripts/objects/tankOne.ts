module objects {
    export class tankOne extends objects.GameObject {
      // private instance variables
      
      private _bulletSpawn:math.Vec2;
  
      // public properties
      public planeFlash: objects.PlaneFlash;
  
      // Constructor
      constructor() {
        super("plane2");
        this.Start();
      }
  
      // private methods
      private _animationEnded():void {
        if(this.alpha == 0) {
          this.alpha = 1;
          this.planeFlash.alpha = 0;
        }
      }
  
      // public methods
  
      // Initializes variables and creates new objects
      public Start():void {
        this.planeFlash = new objects.PlaneFlash();
        this.planeFlash.alpha = 1;
        this.planeFlash.on("animationend", this._animationEnded.bind(this), false );
  
        this.x = 270;
        this.y = 430;
        this._bulletSpawn = new math.Vec2();
      }
  
      // updates the game object every frame
      public Update():void {
        this.Move();
        this.CheckBounds();
        this.BulletFire();
      }
  
      // reset the objects location to some value
      public Reset():void {
  
      }
  
      // move the object to some new location
      public Move():void {
       // mouse controls
       // this.x = objects.Game.stage.mouseX;
  
       // keyboard controls
       if(managers.Game.keyboardManager.moveForward1) {
         this.rotation = 0;
               this.y -= 1;
      }
  
      if(managers.Game.keyboardManager.moveBackward1) {
        this.rotation = 180;
        this.y += 1;
      }
      if(managers.Game.keyboardManager.moveLeft1) {
        this.rotation=-90;
       this.x -= 1;
     }
  
     if(managers.Game.keyboardManager.moveRight1) {
       this.rotation = 90;
       this.x += 1;
     }
      
  
       this.planeFlash.x = this.x;
       this.planeFlash.y = this.y;
  
      }
  
      // check to see if some boundary has been passed
      public CheckBounds():void {
        // right boundary
       // right boundary
       if(this.x >= 640 - this.halfWidth) {
        this.x = 640 - this.halfWidth;
      }
  
      // left boundary
      if(this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }
      if(this.y >= 480 - this.halfWidth) {
        this.y = 480 - this.halfWidth;
      }
  
      // left boundary
      if(this.y <= this.halfWidth) {
        this.y = this.halfWidth;
      }
    }
  
      public BulletFire():void {
        // check if Plane is "alive"
        if(this.alpha = 1) {
          let ticker:number = createjs.Ticker.getTicks();
          if((managers.Game.keyboardManager.fire2) && (ticker % 10 == 0)) {
            this._bulletSpawn = new math.Vec2(this.x, this.y - this. halfHeight);
            let currentBullet = managers.Game.bulletManger.CurrentBullet;
            let bullet = managers.Game.bulletManger.Bullets[currentBullet];
            bullet.x = this._bulletSpawn.x;
            bullet.y = this._bulletSpawn.y;
            managers.Game.bulletManger.CurrentBullet++;
            if(managers.Game.bulletManger.CurrentBullet > 49) {
              managers.Game.bulletManger.CurrentBullet = 0;
            }
            createjs.Sound.play("bulletSound");
          }
        }
      }
    }
  }
  