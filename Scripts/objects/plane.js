var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // Constructor
        function Plane() {
            var _this = _super.call(this, "plane1") || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Plane.prototype, "Score", {
            get: function () {
                return this._direction;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        Plane.prototype._animationEnded = function () {
            if (this.alpha == 0) {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }
        };
        // public methods
        // Initializes variables and creates new objects
        Plane.prototype.Start = function () {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 0;
            this.planeFlash.on("animationend", this._animationEnded.bind(this), false);
            this.x = 320;
            this.y = 430;
            this._bulletSpawn = new math.Vec2();
        };
        // updates the game object every frame
        Plane.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        // reset the objects location to some value
        Plane.prototype.Reset = function () {
        };
        // move the object to some new location
        Plane.prototype.Move = function () {
            // mouse controls
            // this.x = managers.Game.stage.mouseX;
            //this.y = managers.Game.stage.mouseY;
            // keyboard controls
            if (managers.Game.keyboardManager.moveForward) {
                this.rotation = 0;
                this.y -= 2;
            }
            if (managers.Game.keyboardManager.moveBackward) {
                this.rotation = 180;
                managers.Game.direction = 180;
                this.y += 2;
            }
            if (managers.Game.keyboardManager.moveLeft) {
                this.rotation = -90;
                this.x -= 2;
            }
            if (managers.Game.keyboardManager.moveRight) {
                this.rotation = 90;
                this.x += 2;
            }
            // this.planeFlash.x = this.x;
            // this.planeFlash.y = this.y;
        };
        // check to see if some boundary has been passed
        Plane.prototype.CheckBounds = function () {
            // right boundary
            // right boundary
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= 480 - this.halfWidth) {
                this.y = 480 - this.halfWidth;
            }
            // left boundary
            if (this.y <= this.halfWidth) {
                this.y = this.halfWidth;
            }
        };
        Plane.prototype.BulletFire = function () {
            // check if Plane is "alive"
            if (this.alpha = 1) {
                var ticker = createjs.Ticker.getTicks();
                if ((managers.Game.keyboardManager.fire) && (ticker % 10 == 0)) {
                    this._bulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight);
                    var currentBullet = managers.Game.bulletManger.CurrentBullet;
                    var bullet = managers.Game.bulletManger.Bullets[currentBullet];
                    bullet.x = this._bulletSpawn.x;
                    bullet.y = this._bulletSpawn.y;
                    managers.Game.bulletManger.CurrentBullet++;
                    if (managers.Game.bulletManger.CurrentBullet > 49) {
                        managers.Game.bulletManger.CurrentBullet = 0;
                    }
                    createjs.Sound.play("bulletSound");
                }
            }
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map