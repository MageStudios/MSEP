var Imported = Imported || {};
Imported.MSEP_X_ActorPartySwitch = true;

var MageStudios = MageStudios || {};
MageStudios.PartySwitch = MageStudios.PartySwitch || {};
MageStudios.PartySwitch.version = 1.0;

/*:
 * @plugindesc (Req MSEP_PartySystem.js and MSEP_BattleEngineCore.js)
 * Allow actors to switch with other party members mid-battle.
 * @author Mage Studios Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Switch Command
 * @parent ---General---
 * @desc The text that appears in the actor command window to switch allies.
 * @default Switch
 *
 * @param Switch Cooldown
 * @parent ---General---
 * @type number
 * @desc When an actor switches out, how many turns must the actor wait before
 * the actor can switch back in? Use 0 to disable this.
 * @default 1
 *
 * @param Show Command
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show party switching by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable party switching by default?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Window---
 * @default
 *
 * @param Window X
 * @parent ---Window---
 * @desc The x position of the party switch window.
 * This is a formula.
 * @default 0
 *
 * @param Window Y
 * @parent ---Window---
 * @desc The y position of the party switch window.
 * This is a formula.
 * @default 0
 *
 * @param Window Width
 * @parent ---Window---
 * @desc The width of the party switch window.
 * This is a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Window Height
 * @parent ---Window---
 * @desc The height of the party switch window.
 * This is a formula.
 * @default Graphics.boxHeight - this.fittingHeight(4)
 *
 * @param Actor Graphic
 * @parent ---Window---
 * @type select
 * @option None
 * @value 0
 * @option Character
 * @value 1
 * @option Face
 * @value 2
 * @option Sideview Battler
 * @value 3
 * @desc What kind of graphic do you wish to associate with actors?
 * 0: None; 1: Character; 2: Face; 3: SV Battler
 * @default 2
 *
 * @param Font Size
 * @parent ---Window---
 * @type number
 * @min 1
 * @desc The font size used for the Actor Party Switch window.
 * Default: 28
 * @default 20
 *
 * @param Rect Height
 * @parent ---Window---
 * @type number
 * @min 0
 * @desc The height for each actor entry's height in pixels.
 * Use 0 for automatic detection.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires MSEP_PartySystem and MSEP_BattleEngineCore. Make sure
 * this plugin is located under both plugins in the plugin list.
 *
 * For games that benefit more from individual party switching, this plugin
 * grants players the ability to switch party members on an individual basis
 * rather than entire parties at a time mid-battle. However, actors that have
 * just switched in and are on cooldown, required for battle, or locked in the
 * party position cannot switch out.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * For those who'd like to be able to change the settings of Actor Part Switch
 * midway through the game, use the following plugin commands:
 *
 * Plugin Commands:
 *
 *   ShowActorPartySwitch
 *   HideActorPartySwitch
 *   - Shows/hides the 'Switch' command from the actor command window from
 *   being visible.
 *
 *   EnableActorPartySwitch
 *   DisableActorPartySwitch
 *   - Enables/disables the 'Switch' command from the actor command window
 *   from being able to selected.
 *
 *   ResetActorPartySwitchCooldowns
 *   - Resets all cooldowns for actor party switching.
 *
 */

if (Imported.MSEP_PartySystem && Imported.MSEP_BattleEngineCore) {
  MageStudios.Parameters = PluginManager.parameters("MSEP_X_ActorPartySwitch");
  MageStudios.Param = MageStudios.Param || {};

  MageStudios.Param.PartySwitchCmd = String(
    MageStudios.Parameters["Switch Command"]
  );
  MageStudios.Param.PartySwitchCooldown = Number(
    MageStudios.Parameters["Switch Cooldown"]
  );
  MageStudios.Param.PartySwitchShow = String(
    MageStudios.Parameters["Show Command"]
  );
  MageStudios.Param.PartySwitchShow = eval(MageStudios.Param.PartySwitchShow);
  MageStudios.Param.PartySwitchEnable = String(
    MageStudios.Parameters["Enable Command"]
  );
  MageStudios.Param.PartySwitchEnable = eval(
    MageStudios.Param.PartySwitchEnable
  );

  MageStudios.Param.PartySwitchWinX = String(
    MageStudios.Parameters["Window X"]
  );
  MageStudios.Param.PartySwitchWinY = String(
    MageStudios.Parameters["Window Y"]
  );
  MageStudios.Param.PartySwitchWinW = String(
    MageStudios.Parameters["Window Width"]
  );
  MageStudios.Param.PartySwitchWinH = String(
    MageStudios.Parameters["Window Height"]
  );
  MageStudios.Param.PartySwitchActGraphic = Number(
    MageStudios.Parameters["Actor Graphic"]
  );
  MageStudios.Param.PartySwitchFontSize = Number(
    MageStudios.Parameters["Font Size"]
  );
  MageStudios.Param.PartySwitchRectHeight = Number(
    MageStudios.Parameters["Rect Height"]
  );

  MageStudios.PartySwitch.BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function (result) {
    MageStudios.PartySwitch.BattleManager_endBattle.call(this, result);
    this.resetActorPartySwitchCooldowns();
  };

  BattleManager.resetActorPartySwitchCooldowns = function () {
    var group = $gameParty.allMembers();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.setPartySwitchCooldown(0);
    }
  };

  MageStudios.PartySwitch.Game_System_initialize =
    Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    MageStudios.PartySwitch.Game_System_initialize.call(this);
    this.initActorPartySwitch();
  };

  Game_System.prototype.initActorPartySwitch = function () {
    this._showActorPartySwitch = MageStudios.Param.PartySwitchShow;
    this._enableActorPartySwitch = MageStudios.Param.PartySwitchEnable;
  };

  Game_System.prototype.isShowActorPartySwitch = function () {
    if (this._showActorPartySwitch === undefined) this.initActorPartySwitch();
    return this._showActorPartySwitch;
  };

  Game_System.prototype.setShowActorPartySwitch = function (value) {
    if (this._showActorPartySwitch === undefined) this.initActorPartySwitch();
    this._showActorPartySwitch = value;
  };

  Game_System.prototype.isActorPartySwitchEnabled = function () {
    if (this._enableActorPartySwitch === undefined) this.initActorPartySwitch();
    return this._enableActorPartySwitch;
  };

  Game_System.prototype.setActorPartySwitchEnabled = function (value) {
    if (this._enableActorPartySwitch === undefined) this.initActorPartySwitch();
    this._enableActorPartySwitch = value;
  };

  MageStudios.PartySwitch.Game_Battler_onTurnStart =
    Game_Battler.prototype.onTurnStart;
  Game_Battler.prototype.onTurnStart = function () {
    MageStudios.PartySwitch.Game_Battler_onTurnStart.call(this);
    if (this.isActor()) this.updatePartySwitchCooldown();
  };

  MageStudios.PartySwitch.Game_Actor_initMembers =
    Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function () {
    MageStudios.PartySwitch.Game_Actor_initMembers.call(this);
    this.initActorPartySwitch();
  };

  Game_Actor.prototype.initActorPartySwitch = function () {
    this._partySwitchCooldown = 0;
  };

  Game_Actor.prototype.getPartySwitchCooldown = function () {
    if (this._partySwitchCooldown === undefined) this.initActorPartySwitch();
    return this._partySwitchCooldown;
  };

  Game_Actor.prototype.setPartySwitchCooldown = function (value) {
    if (this._partySwitchCooldown === undefined) this.initActorPartySwitch();
    this._partySwitchCooldown = value;
  };

  Game_Actor.prototype.updatePartySwitchCooldown = function () {
    if (this._partySwitchCooldown === undefined) this.initActorPartySwitch();
    this._partySwitchCooldown -= 1;
  };

  MageStudios.PartySwitch.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    MageStudios.PartySwitch.Game_Interpreter_pluginCommand.call(
      this,
      command,
      args
    );
    if (command === "ShowActorPartySwitch") {
      $gameSystem.setShowActorPartySwitch(true);
    } else if (command === "HideActorPartySwitch") {
      $gameSystem.setShowActorPartySwitch(false);
    } else if (command === "EnableActorPartySwitch") {
      $gameSystem.setActorPartySwitchEnabled(true);
    } else if (command === "DisableActorPartySwitch") {
      $gameSystem.setActorPartySwitchEnabled(false);
    } else if (command === "ResetActorPartySwitchCooldowns") {
      BattleManager.resetActorPartySwitchCooldowns();
    }
  };

  Window_Base.prototype.drawSvActor = function (actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
  };

  MageStudios.PartySwitch.Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function () {
    MageStudios.PartySwitch.Window_ActorCommand_makeCommandList.call(this);
    this.addSwitchCommand();
  };

  Window_ActorCommand.prototype.addSwitchCommand = function () {
    if (!$gameSystem.isShowActorPartySwitch()) return;
    var enabled = this.isActorPartySwitchEnabled();
    var text = MageStudios.Param.PartySwitchCmd;
    this.addCommand(text, "partyswitch", enabled);
  };

  Window_ActorCommand.prototype.isActorPartySwitchEnabled = function () {
    if (!$gameSystem.isActorPartySwitchEnabled()) return false;
    if (!this._actor) return false;
    if (this._actor._locked) return false;
    if (this._actor._required) return false;
    return this._actor.getPartySwitchCooldown() <= 0;
  };

  function Window_ActorPartySwitch() {
    this.initialize.apply(this, arguments);
  }

  Window_ActorPartySwitch.prototype = Object.create(Window_Command.prototype);
  Window_ActorPartySwitch.prototype.constructor = Window_ActorPartySwitch;

  Window_ActorPartySwitch.prototype.initialize = function () {
    var x = eval(MageStudios.Param.PartySwitchWinX);
    var y = eval(MageStudios.Param.PartySwitchWinY);
    Window_Command.prototype.initialize.call(this, x, y);
    this.openness = 0;
    this.deactivate();
  };

  Window_ActorPartySwitch.prototype.standardFontSize = function () {
    return MageStudios.Param.PartySwitchFontSize;
  };

  Window_ActorPartySwitch.prototype.standardPadding = function () {
    if (this._calc) return Window_Base.prototype.standardPadding.call(this);
    return 6;
  };

  Window_ActorPartySwitch.prototype.windowWidth = function () {
    this._calc = true;
    var width = eval(MageStudios.Param.PartySwitchWinW);
    this._calc = false;
    return width;
  };

  Window_ActorPartySwitch.prototype.windowHeight = function () {
    this._calc = true;
    var height = eval(MageStudios.Param.PartySwitchWinH);
    this._calc = false;
    return height;
  };

  Window_ActorPartySwitch.prototype.itemHeight = function () {
    var height = MageStudios.Param.PartySwitchRectHeight || this.autoHeight();
    return Math.max(height, this.lineHeight() * 2);
  };

  Window_ActorPartySwitch.prototype.autoHeight = function () {
    switch (this.graphicType()) {
      case 3:
        return this.lineHeight() * 3;
        break;
    }
    return this.lineHeight() * 2;
  };

  Window_ActorPartySwitch.prototype.graphicType = function () {
    return MageStudios.Param.PartySwitchActGraphic;
  };

  Window_ActorPartySwitch.prototype.makeCommandList = function () {
    var array = $gameParty._actors;
    var length = array.length;
    for (var i = 0; i < length; ++i) {
      var actorId = array[i];
      var actor = $gameActors.actor(actorId);
      if (actor.isBattleMember()) continue;
      var enabled = this.isActorEnabled(actor);
      this.addCommand(actor.name(), "switch", enabled, actorId);
    }
  };

  Window_ActorPartySwitch.prototype.isActorEnabled = function (actor) {
    if (actor.isDead()) return false;
    if (!actor.canMove()) return false;
    return true;
  };

  Window_ActorPartySwitch.prototype.drawItem = function (index) {
    var actorId = this._list[index].ext;
    var actor = $gameActors.actor(actorId);
    this.changePaintOpacity(this.isActorEnabled(actor));
    this.drawActorGraphic(actor, index);
  };

  Window_ActorPartySwitch.prototype.drawActorGraphic = function (actor, index) {
    var type = this.graphicType();
    if (type <= 0) {
      this.drawActorData(actor, index, this.textPadding());
    } else if (type === 1) {
      this.drawActorCharGfx(actor, index);
    } else if (type === 2) {
      this.drawActorFaceGfx(actor, index);
    } else if (type >= 3) {
      this.drawActorSvGfx(actor, index);
    }
  };

  Window_ActorPartySwitch.prototype.drawActorData = function (
    actor,
    index,
    dx
  ) {
    var rect = this.itemRect(index);
    rect.x = dx;
    rect.width -= dx + this.textPadding();
    var dw = Math.floor(rect.width / 2);
    var dw2 = Math.ceil(dw / 2);
    var dx2 = dx + dw;
    var dy = rect.y;
    this.drawActorName(actor, dx, dy, dw);
    this.drawActorHp(actor, dx2, dy, dw);
    dy += this.lineHeight();
    this.drawActorIcons(actor, dx, dy, dw);
    if (
      this.itemHeight() >= this.lineHeight() * 3 ||
      !$dataSystem.optDisplayTp
    ) {
      this.drawActorMp(actor, dx2, dy, dw);
      if ($dataSystem.optDisplayTp) {
        this.drawActorTp(actor, dx2, dy + this.lineHeight(), dw);
      }
    } else {
      this.drawActorMp(actor, dx2, dy, dw2);
      this.drawActorTp(actor, dx2 + dw2, dy, dw2);
    }
  };

  Window_ActorPartySwitch.prototype.drawActorCharGfx = function (actor, index) {
    var bitmap = ImageManager.loadCharacter(actor.characterName());
    if (bitmap.width <= 0) {
      return setTimeout(this.drawActorCharGfx.bind(this, actor, index), 5);
    }
    var rect = this.itemRect(index);
    var big = ImageManager.isBigCharacter(actor.characterName());
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var x = Math.ceil(pw / 2 + this.textPadding());
    var y = rect.y + rect.height;
    if (rect.height > ph) y -= Math.ceil((rect.height - ph) / 2);
    this.drawActorCharacter(actor, x, y);
    this.drawActorData(
      actor,
      index,
      Math.floor(x * 2) + this.textPadding() * 2
    );
  };

  Window_ActorPartySwitch.prototype.drawActorFaceGfx = function (actor, index) {
    var bitmap = ImageManager.loadFace(actor.faceName());
    if (bitmap.width <= 0) {
      return setTimeout(this.drawActorFaceGfx.bind(this, actor, index), 5);
    }
    var rect = this.itemRect(index);
    var big = ImageManager.isBigCharacter(actor.faceName());
    var w = Window_Base._faceWidth;
    var h = Math.min(Window_Base._faceHeight, rect.height - 4);
    var x = rect.x + 2;
    var y = rect.y + 2;
    this.drawActorFace(actor, x, y, w, h);
    this.drawActorData(actor, index, w + this.textPadding() + 2);
  };

  Window_ActorPartySwitch.prototype.drawActorSvGfx = function (actor, index) {
    var bitmap = ImageManager.loadSvActor(actor.battlerName());
    if (bitmap.width <= 0) {
      return setTimeout(this.drawActorSvGfx.bind(this, actor, index), 5);
    }
    var rect = this.itemRect(index);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var x = Math.ceil(pw / 2 + this.textPadding());
    var y = rect.y + rect.height;
    if (rect.height > ph) y -= Math.ceil((rect.height - ph) / 2);
    this.drawSvActor(actor, x, y);
    this.drawActorData(
      actor,
      index,
      Math.floor(x * 2) + this.textPadding() * 2
    );
  };

  MageStudios.PartySwitch.Scene_Battle_isAnyInputWindowActive =
    Scene_Battle.prototype.isAnyInputWindowActive;
  Scene_Battle.prototype.isAnyInputWindowActive = function () {
    if (
      MageStudios.PartySwitch.Scene_Battle_isAnyInputWindowActive.call(this)
    ) {
      return true;
    }
    if (this._actorPartySwitchWindow) {
      var win = this._actorPartySwitchWindow;
      return win.isOpen() || win.isOpening();
    }
  };

  MageStudios.PartySwitch.Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    MageStudios.PartySwitch.Scene_Battle_createAllWindows.call(this);
    this.createActorPartySwitchWindow();
  };

  MageStudios.PartySwitch.Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    MageStudios.PartySwitch.Scene_Battle_createActorCommandWindow.call(this);
    var win = this._actorCommandWindow;
    win.setHandler("partyswitch", this.commandPartySwitch.bind(this));
  };

  Scene_Battle.prototype.createActorPartySwitchWindow = function () {
    this._actorPartySwitchWindow = new Window_ActorPartySwitch();
    this.addChild(this._actorPartySwitchWindow);
    var win = this._actorPartySwitchWindow;
    win.setHandler("cancel", this.partySwitchCancel.bind(this));
    win.setHandler("switch", this.processPartySwitch.bind(this));
  };

  Scene_Battle.prototype.commandPartySwitch = function () {
    this._actorPartySwitchWindow.activate();
    this._actorPartySwitchWindow.refresh();
    this._actorPartySwitchWindow.select(0);
    this._actorPartySwitchWindow.open();
  };

  Scene_Battle.prototype.partySwitchCancel = function () {
    this._actorPartySwitchWindow.deactivate();
    this._actorPartySwitchWindow.close();
    this._actorCommandWindow.activate();
  };

  Scene_Battle.prototype.processPartySwitch = function () {
    var actorId = this._actorPartySwitchWindow.currentExt();
    var swapIn = $gameActors.actor(actorId);
    if (!swapIn) return this.partySwitchCancel();
    var swapOut = this._actorCommandWindow._actor;
    var index = $gameParty._battleMembers.indexOf(swapOut.actorId());
    var distance = Graphics.boxWidth - swapOut.spritePosX();
    distance += swapOut.spriteWidth();
    swapOut.battler().startMove(distance, 0, 20);
    swapOut.requestMotion("escape");
    setTimeout(this.processPartySwitching.bind(this, index, actorId), 300);
  };

  Scene_Battle.prototype.processPartySwitching = function (index, actorId) {
    var sprite = BattleManager.actor().battler();
    var swapOut = this._actorCommandWindow._actor;
    $gameParty._battleMembers[index] = actorId;
    this._actorPartySwitchWindow.deactivate();
    this._actorPartySwitchWindow.close();
    BattleManager.actor().setBattler(sprite);
    sprite.setBattler(BattleManager.actor());
    this.refreshBattleMembers();
    BattleManager.actor().requestMotion("walk");
    BattleManager.actor().spriteStepForward();
    $gameParty.reconstructActions();
    this.postPartySwitch(index, swapOut, BattleManager.actor());
    $gameParty.rearrangeActors();
    $gamePlayer.refresh();
  };

  Scene_Battle.prototype.postPartySwitch = function (index, swapOut, swapIn) {
    var cooldown = MageStudios.Param.PartySwitchCooldown;
    BattleManager.actor().setPartySwitchCooldown(cooldown);
    if (Imported.MSEP_X_BattleSysATB && BattleManager.isATB()) {
      if (swapIn._atbSpeed === undefined) swapIn.onATBStart();
      swapIn._atbSpeed = swapOut._atbSpeed + BattleManager.atbTarget();
    }
    if (Imported.MSEP_X_BattleSysCTB && BattleManager.isCTB()) {
      if (swapIn._ctbSpeed === undefined) swapIn.onCTBStart();
      swapIn._ctbSpeed = swapOut._ctbSpeed + BattleManager.ctbTarget();
    }
    if (Imported.MSEP_RowFormation) {
      var subject = BattleManager._subject;
      BattleManager._subject = undefined;
      this.refreshRowPositions();
      BattleManager._subject = subject;
    }
    if (BattleManager.actor().isAutoBattle()) {
      BattleManager.actor().makeAutoBattleActions();
      this.selectNextCommand();
    } else if (BattleManager.actor().isConfused()) {
      BattleManager.actor().makeConfusionActions();
      this.selectNextCommand();
    } else {
      this._actorCommandWindow.setup(BattleManager.actor());
    }
  };

  Scene_Battle.prototype.refreshBattleMembers = function () {
    var members = $gameParty.battleMembers();
    var length = members.length;
    for (var i = 0; i < length; ++i) {
      var member = members[i];
      if (!member) continue;
      member.refresh();
      if (Imported.MSEP_RowFormation) member.battler().refreshActorRow();
    }
    this.refreshStatus();
  };
}
