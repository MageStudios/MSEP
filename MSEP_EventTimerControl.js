var Imported = Imported || {};
Imported.MSEP_EventTimerControl = true;

var MageStudios = MageStudios || {};
MageStudios.Timer = MageStudios.Timer || {};
MageStudios.Timer.version = 1.0;

/*:
 * @plugindesc Gain more control over the event timer function
 * for your game.
 * @author Mage Studios Engine Plugins
 *
 * @param ---Mechanical---
 *
 * @param SpritesetSplit
 * @text Separate from Spriteset
 * @parent ---Mechanical---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Separates the game timer from the spriteset.
 * YES - true     NO - false     DEFAULT: true
 * @default true
 *
 * @param TextAlign
 * @text Timer Text Alignment
 * @parent ---Mechanical---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the text to be aligned?
 * Default: center
 * @default right
 *
 * @param ---Lunatic Mode---
 *
 * @param Effect Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc LUNATIC MODE: This is the code used for each of the
 * plugin commands.
 * @default "
 *
 * @param Expire Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc LUNATIC MODE: Unique code that can be run when the
 * countdown timer expires.
 * @default "BattleManager.abort();"
 * *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The event timer is often used for countdown purposes. However, sometimes you
 * would like to have a bit more control over it, such as being able to pause
 * and resume the timer, increase or decrease the seconds, minutes, or even
 * hours on the timer. Don't want a countdown timer? Why not have it count
 * upwards instead? Experienced Lunatic Mode coders will be able to add in
 * their own plugin commands, too!
 *
 * Notable Changes Made:
 * - Ability to separate timer sprite from the spriteset
 * - Timer is now capable of displaying hours
 * - Pause/resume functions for timer
 * - Increasing/decreasing seconds from timer
 * - Counting up instead of just count down
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to make use of the new features added by
 * this plugin to control the event timer.
 *
 * Plugin Commands:
 *
 *   --- PAUSE/RESUME ---
 *
 *   EventTimer Pause
 *   - Pauses the event timer.
 *
 *   EventTimer Resume
 *   - Resumes the event timer if it has been paused.
 *
 *   --- COUNT DOWN/UP ---
 *
 *   EventTimer Countdown
 *   - Changes the direction of the event timer to decrease and count down
 *   towards 0 seconds.
 *
 *   EventTimer Count Up
 *   - Changes the direction of the event timer to increase and count upwards
 *   endlessly until manually stopped
 *
 *   EventTimer Count Toggle
 *   - Switches the current direction of the event timer to either increase or
 *   decrease each second it is active.
 *
 *   --- INCREASE/DECREASE ---
 *
 *   EventTimer Increase x Frames
 *   EventTimer Decrease x Frames
 *   - Replace 'x' with a number value to determine how many frames to
 *   increase or decrease the event timer by.
 *
 *   EventTimer Increase x Seconds
 *   EventTimer Decrease x Seconds
 *   - Replace 'x' with a number value to determine how many seconds to
 *   increase or decrease the event timer by.
 *
 *   EventTimer Increase x Minutes
 *   EventTimer Decrease x Minutes
 *   - Replace 'x' with a number value to determine how many minutes to
 *   increase or decrease the event timer by.
 *
 *   EventTimer Increase x Hours
 *   EventTimer Decrease x Hours
 *   - Replace 'x' with a number value to determine how many hours to
 *   increase or decrease the event timer by.
 *
 *   You can also combine them together as such:
 *
 *   EventTimer Increase x Hours, y Seconds
 *   EventTimer Increase x Hours, y Minutes
 *   EventTimer Increase x Minutes, y Seconds
 *   EventTimer Increase x Hours, y Minutes, z Seconds
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new plugin commands for this plugin or alter the code of currently
 * existing plugin commands from the plugin parameters entry: Effect Code.
 * It should look something like this:
 *
 * ---
 *
 *
 *
 *
 * if (data.match(/PAUSE/i)) {
 *   $gameTimer.pause();
 *
 * } else if (data.match(/RESUME/i)) {
 *   $gameTimer.resume();
 *
 * ...
 *
 *
 *
 *
 * } else {
 *
 * }
 *
 * ---
 *
 * The 'data' variable refers to the rest of the Plugin Command after the
 * 'EventTimer' keyword. For example:
 *
 *   EventTimer Increase 2 Hours, 30 Minutes, 15 Seconds
 *
 * The 'data' would be 'Increase 2 Hours, 30 Minutes, 15 Seconds' and thus, the
 * string 'data' is used when checking lines in the 'Effect Code' parameter.
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_EventTimerControl");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.TimerSeparate = String(
  MageStudios.Parameters["SpritesetSplit"]
);
MageStudios.Param.TimerSeparate = eval(MageStudios.Param.TimerSeparate);
MageStudios.Param.TimerAlign = String(MageStudios.Parameters["TextAlign"]);

MageStudios.Param.TimerCode = JSON.parse(MageStudios.Parameters["Effect Code"]);
MageStudios.Param.TimerExpire = JSON.parse(
  MageStudios.Parameters["Expire Code"]
);

if (MageStudios.Param.TimerSeparate) {
  Spriteset_Base.prototype.createTimer = function () {
    this._timerSprite = new Sprite_Timer();
  };

  MageStudios.Timer.Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    MageStudios.Timer.Scene_Map_createDisplayObjects.call(this);
    this.addChild(this._spriteset._timerSprite);
  };

  MageStudios.Timer.Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    MageStudios.Timer.Scene_Battle_createDisplayObjects.call(this);
    this.addChild(this._spriteset._timerSprite);
  };
}

MageStudios.Timer.Game_Timer_initialize = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function () {
  MageStudios.Timer.Game_Timer_initialize.call(this);
  this._paused = false;
  this._direction = -1;
};

Game_Timer.prototype.update = function (sceneActive) {
  if (!sceneActive) return;
  if (!this._working) return;
  if (this._paused) return;
  if (this._frames <= 0) return;
  this._frames += this._direction;
  if (this._frames <= 0) this.onExpire();
};

MageStudios.Timer.Game_Timer_start = Game_Timer.prototype.start;
Game_Timer.prototype.start = function (count) {
  MageStudios.Timer.Game_Timer_start.call(this, count);
  this._paused = false;
};

MageStudios.Timer.Game_Timer_stop = Game_Timer.prototype.stop;
Game_Timer.prototype.stop = function () {
  MageStudios.Timer.Game_Timer_stop.call(this);
  this._paused = false;
};

Game_Timer.prototype.pause = function () {
  if (this._frames <= 0) return;
  this._paused = true;
  this._working = true;
};

Game_Timer.prototype.resume = function () {
  if (this._frames <= 0) return;
  this._paused = false;
  this._working = true;
};

Game_Timer.prototype.gainFrames = function (value) {
  this._frames = this._frames || 0;
  this._frames += value;
  this._working = true;
};

Game_Timer.prototype.changeDirection = function (value) {
  this._direction = value;
  this._working = true;
  if (value > 0) {
    this._frames = Math.max(this._frames, 1);
  }
};

Game_Timer.prototype.onExpire = function () {
  var code = MageStudios.Param.TimerExpire;
  try {
    eval(code);
  } catch (e) {
    MageStudios.Util.displayError(
      e,
      code,
      "EVENT TIMER CONTROL EXPIRE CODE ERROR"
    );
  }
};

Sprite_Timer.prototype.createBitmap = function () {
  this.bitmap = new Bitmap(144, 48);
  this.bitmap.fontSize = 32;
};

Sprite_Timer.prototype.timerText = function () {
  var hour = Math.floor(this._seconds / 60 / 60);
  var min = Math.floor(this._seconds / 60) % 60;
  var sec = this._seconds % 60;
  var text = min.padZero(2) + ":" + sec.padZero(2);
  if (hour > 0) text = MageStudios.Util.toGroup(hour) + ":" + text;
  return text;
};

Sprite_Timer.prototype.redraw = function () {
  var text = this.timerText();
  var width = this.bitmap.width;
  var height = this.bitmap.height;
  this.bitmap.clear();
  this.bitmap.drawText(text, 0, 0, width, height, MageStudios.Param.TimerAlign);
};

if (MageStudios.Param.TimerAlign === "right") {
  Sprite_Timer.prototype.updatePosition = function () {
    this.x = Graphics.width - this.bitmap.width - 12;
    this.y = 0;
  };
}

MageStudios.Timer.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  MageStudios.Timer.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/EVENTTIMER/i)) {
    var data = this.argsToString(args);
    var code = MageStudios.Param.TimerCode;
    try {
      eval(code);
    } catch (e) {
      MageStudios.Util.displayError(
        e,
        code,
        "EVENT TIMER CONTROL EFFECT CODE ERROR"
      );
    }
  }
};

Game_Interpreter.prototype.argsToString = function (args) {
  var str = "";
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + " ";
  }
  return str.trim();
};

MageStudios.Util = MageStudios.Util || {};

if (!MageStudios.Util.toGroup) {
  MageStudios.Util.toGroup = function (inVal) {
    return inVal;
  };
}

MageStudios.Util.displayError = function (e, code, message) {
  console.log(message);
  console.log(code || "NON-EXISTENT");
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid("test")) {
    if (!require("nw.gui").Window.get().isDevToolsOpen()) {
      require("nw.gui").Window.get().showDevTools();
    }
  }
};

if (false) {
  if (data.match(/PAUSE/i)) {
    $gameTimer.pause();
  } else if (data.match(/RESUME/i)) {
    $gameTimer.resume();
  } else if (data.match(/(?:COUNTDOWN|COUNT DOWN)/i)) {
    $gameTimer.changeDirection(-1);
  } else if (data.match(/(?:COUNTUP|COUNT UP)/i)) {
    $gameTimer.changeDirection(1);
  } else if (data.match(/(?:COUNTOGGLE|COUNT TOGGLE)/i)) {
    $gameTimer.changeDirection(-1 * $gameTimer._direction);
  } else if (data.match(/(?:INCREASE|DECREASE)/i)) {
    if (data.match(/DECREASE/i)) {
      var direction = -1;
    } else {
      var direction = 1;
    }
    var frames = 0;
    if (data.match(/(\d+)[ ]FRAME/i)) {
      frames += parseInt(RegExp.$1);
    }
    if (data.match(/(\d+)[ ]SEC/i)) {
      frames += parseInt(RegExp.$1) * 60;
    }
    if (data.match(/(\d+)[ ]MIN/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60;
    }
    if (data.match(/(\d+)[ ](?:HR|HOUR)/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60;
    }
    if (data.match(/(\d+)[ ]DAY/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24;
    }
    if (data.match(/(\d+)[ ]WEEK/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 7;
    }
    if (data.match(/(\d+)[ ]MONTH/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 30;
    }
    if (data.match(/(\d+)[ ](?:YR|YEAR)/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365;
    }
    if (data.match(/(\d+)[ ]DECADE/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 10;
    }
    if (data.match(/(\d+)[ ]CENTUR/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 100;
    }
    if (data.match(/(\d+)[ ]MILLEN/i)) {
      frames += parseInt(RegExp.$1) * 60 * 60 * 60 * 24 * 365 * 1000;
    }
    frames *= direction;
    $gameTimer.gainFrames(frames);
  } else {
  }
}
