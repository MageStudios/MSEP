//=============================================================================
// Mage Studios Engine Plugins - Event Chase Player
// MSEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.MSEP_EventChasePlayer = true;

var MageStudios = MageStudios || {};
MageStudios.ECP = MageStudios.ECP || {};
MageStudios.ECP.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc When a player is in the proximity of a certain event,
 * the event will start chasing or fleeing from the player.
 * @author Mage Studios Engine Plugins
 *
 * @param Sight Lock
 * @type number
 * @min 0
 * @desc This is the number of frames for how long an event chases
 * the player if 'this._seePlayer = true' is used.
 * @default 300
 *
 * @param See Player
 * @type boolean
 * @on YES
 * @off NO
 * @desc Does the event have to be able to see the player by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Alert Timer
 * @type number
 * @min 0
 * @desc This is the number of frames that must occur before the
 * alert balloon will show up on the same event.
 * @default 120
 *
 * @param Alert Balloon
 * @type number
 * @min 0
 * @desc This is the default balloon used when the player is seen.
 * Refer to balloon ID's.
 * @default 1
 *
 * @param Alert Sound
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc This is the default sound played when the player is seen.
 * @default Attack1
 *
 * @param Alert Common Event
 * @type common_event
 * @desc The default common event played when the player is seen.
 * Use 0 if you do not wish to use a Common Event.
 * @default 0
 *
 * @param Return After
 * @type boolean
 * @on YES
 * @off NO
 * @desc After chasing/fleeing from a player, the event returns
 * to its original spot. NO - false   YES - true
 * @default true
 *
 * @param Return Wait
 * @type number
 * @min 0
 * @desc The frames to wait after finishing a chase/flee.
 * @default 180
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to make events that will chase the player or flee
 * from the player when the player enters within range of the event or when the
 * event sees the player.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Insert these lines into the script call window within the Movement Route
 * event to give an event the chase or flee flag.
 *
 * Note: This doesn’t work with players.
 *
 * Script Call lines
 *  this._chaseRange = x       Event will chase player if reaching x range.
 *  this._fleeRange = x        Event will flee from player if reaching x range.
 *  this._chaseSpeed = x       Event's movement speed when chasing.
 *  this._fleeSpeed = x        Event's movement speed when fleeing.
 *  this._sightLock = x        Event will flee/chase player for x frames.
 *  this._seePlayer = true     Requires the event to be able to see player.
 *  this._seePlayer = false    Doesn't require event to be able to see player.
 *  this._alertBalloon = x     This balloon will play when player is seen.
 *  this._alertSound = x       This sound will play when player is seen.
 *  this._alertSoundVol = x    The volume used by the alert sound.
 *  this._alertSoundPitch = x  The pitch used by the alert sound.
 *  this._alertSoundPan = x    The pan used by the alert sound.
 *  this._alertCommonEvent = x This event will play when player is seen.
 *  this._returnAfter = true   Returns the event back to its original spot.
 *  this._returnAfter = false  Event stays where it is when finished chasing.
 *  this._returnWait = x       How long event waits after finishing chase/flee.
 *
 * It is best to play this inside of a custom move route for the event at a
 * high frequency rate. Keep in mind these effects only occur after the setting
 * is made and ran, which means upon loading a map, if the event with a low
 * frequency hasn't loaded up 'this._chaseRange = x' in its movement queue yet,
 * the event will not chase the player just yet.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

MageStudios.Parameters = PluginManager.parameters('MSEP_EventChasePlayer');
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.ECPSightLock = Number(MageStudios.Parameters['Sight Lock']);
MageStudios.Param.ECPSeePlayer = String(MageStudios.Parameters['See Player']);
MageStudios.Param.ECPSeePlayer = eval(MageStudios.Param.ECPSeePlayer);
MageStudios.Param.ECPAlertTimer = Number(MageStudios.Parameters['Alert Timer']);
MageStudios.Param.ECPAlertBalloon = Number(MageStudios.Parameters['Alert Balloon']);
MageStudios.Param.ECPAlertSound = String(MageStudios.Parameters['Alert Sound']);
MageStudios.Param.ECPAlertEvent = Number(MageStudios.Parameters['Alert Common Event']);
MageStudios.Param.ECPReturn = eval(String(MageStudios.Parameters['Return After']));
MageStudios.Param.ECPReturnWait = Number(MageStudios.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

MageStudios.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    MageStudios.ECP.Game_Event_setupPage.call(this);
    this.clearChaseSettings();
};

Game_Event.prototype.clearChaseSettings = function() {
  this._alertBalloon = MageStudios.Param.ECPAlertBalloon;
  this._alertCommonEvent = MageStudios.Param.ECPAlertEvent;
  this._alertLock = 0;
  this._alertPlayer = false;
  this._alertSound = MageStudios.Param.ECPAlertSound;
  this._alertSoundVol = 100;
  this._alertSoundPitch = 100;
  this._alertSoundPan = 0;
  this._alertTimer = 0;
  this._chasePlayer = false;
  this._chaseRange = 0;
  this._chaseSpeed = this._moveSpeed;
  this._defaultSpeed = this._moveSpeed;
  this._fleePlayer = false;
  this._fleeRange = 0;
  this._fleeSpeed = this._moveSpeed;
  this._seePlayer = MageStudios.Param.ECPSeePlayer;
  this._sightLock = MageStudios.Param.ECPSightLock;
  this._returnAfter = MageStudios.Param.ECPReturn;
  this._returnWait = MageStudios.Param.ECPReturnWait;
  this._returnPhase = false;
  this._returnFrames = 0;
  this._staggerCount = 0;
  this._startLocationX = this.x;
  this._startLocationY = this.y;
  this._startLocationDir = this._direction;
};

MageStudios.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (Imported.MSEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;
    this.updateChaseDistance();
    this.updateFleeDistance();
    this.updateChaseMovement();
};

MageStudios.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    MageStudios.ECP.Game_Event_update.call(this);
    this.updateAlert();
    this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function() {
    if (!this._seePlayer) return false;
    var sx = this.deltaXFrom($gamePlayer.x);
    var sy = this.deltaYFrom($gamePlayer.y);
    if (Math.abs(sx) > Math.abs(sy)) {
      var direction = (sx > 0) ? 4 : 6;
    } else {
      var direction = (sy > 0) ? 8 : 2;
    }
    if (direction === this.direction()) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.updateChaseDistance = function() {
    if (this._erased) return;
    if (this._chaseRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.chaseConditions(dis)) {
      this.startEventChase();
    } else if (this._chasePlayer) {
      this.endEventChase();
    }
};

Game_Event.prototype.chaseConditions = function(dis) {
    if (dis <= this._chaseRange && this.nonSeePlayer()) {
      this._alertLock = this._sightLock;
      return true;
    }
    if (this._alertLock > 0) return true;
    if (dis <= this._chaseRange && this.canSeePlayer()) return true;
    return false;
};

Game_Event.prototype.nonSeePlayer = function() {
  if (Imported.MSEP_X_EventChaseStealth) {
    if (this.meetStealthModeConditions()) {
      this.stealthClearChaseSettings();
      this._stopCount = 0;
      return false;
    }
  }
  return !this._seePlayer;
};

Game_Event.prototype.startEventChase = function() {
    this._chasePlayer = true;
    this.setMoveSpeed(this._chaseSpeed);
};

Game_Event.prototype.endEventChase = function() {
    this._chasePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateFleeDistance = function() {
    if (this._erased) return;
    if (this._fleeRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.fleeConditions(dis)) {
      this.startEventFlee();
    } else if (this._fleePlayer) {
      this.endEventFlee();
    }
};

Game_Event.prototype.fleeConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._fleeRange && this.canSeePlayer()) return true;
    if (dis <= this._fleeRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventFlee = function() {
    this._fleePlayer = true;
    this.setMoveSpeed(this._fleeSpeed);
};

Game_Event.prototype.endEventFlee = function() {
    this._fleePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateChaseMovement = function() {
    if (this._staggerCount > 0) {
      return this._staggerCount--;
    }
    if (this._stopCount > 0 && this._chasePlayer) {
      var direction = this.findDirectionTo($gamePlayer.x, $gamePlayer.y);
      if (direction > 0) {
        var x = this._x;
        var y = this._y;
        this.moveStraight(direction);
        if (x === this._x && y === this._y) this._staggerCount = 20;
      }
    } else if (this._stopCount > 0 && this._fleePlayer) {
      this.updateFleeMovement();
    } else if (this._returnPhase) {
      this.updateMoveReturnAfter();
    } else {
      MageStudios.ECP.Game_Event_updateSelfMovement.call(this);
    }
};

Game_Event.prototype.updateFleeMovement = function() {
    switch (Math.randomInt(6)) {
    case 0: case 1: case 2: case 3: case 4:
      this.moveAwayFromPlayer();
      break;
    case 5:
      this.moveRandom();
      break;
    }
};

Game_Event.prototype.updateAlert = function() {
    if (this._erased) return;
    this._alertLock--;
    if (this.alertConditions()) this.activateAlert();
    if (this._alertPlayer) this._alertTimer--;
};

Game_Event.prototype.alertConditions = function() {
    return (this._chasePlayer || this._fleePlayer) && !this._alertPlayer;
};

Game_Event.prototype.activateAlert = function() {
    if (this._alertBalloon >= 0) this.requestBalloon(this._alertBalloon);
    this._alertPlayer = true;
    this._alertTimer = MageStudios.Param.ECPAlertTimer;
    this.playAlertSound();
    this.playAlertCommonEvent();
};

Game_Event.prototype.playAlertSound = function() {
    if (this._alertSound === '') return;
    var sound = {
      name:   this._alertSound,
      volume: this._alertSoundVol,
      pitch:  this._alertSoundPitch,
      pan:    this._alertSoundPan
    };
    AudioManager.playSe(sound);
};

Game_Event.prototype.playAlertCommonEvent = function() {
    if (this._alertCommonEvent <= 0) return;
    $gameTemp.reserveCommonEvent(this._alertCommonEvent);
};

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

Game_Event.prototype.updateReturnPhase = function() {
    if (this._returnPhase) this._returnFrames--;
};

Game_Event.prototype.updateMoveReturnAfter = function() {
    if (this._returnFrames > 0) return;
    var sx = this.deltaXFrom(this._startLocationX);
    var sy = this.deltaYFrom(this._startLocationY);
    if (Math.abs(sx) > Math.abs(sy)) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
          this.moveStraight(sy > 0 ? 8 : 2);
        }
      } else {
        this.moveRandom();
      }
    } else if (sy !== 0) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
          this.moveStraight(sx > 0 ? 4 : 6);
        }
      } else {
        this.moveRandom();
      }
    }
    if (sx === 0 && sy === 0) {
      this._returnPhase = false;
      this._returnFrames = 0;
      this._direction = this._startLocationDir;
    }
};

//=============================================================================
// End of File
//=============================================================================
