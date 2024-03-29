var Imported = Imported || {};
Imported.MSEP_X_ChangeBattleEquip = true;

var MageStudios = MageStudios || {};
MageStudios.CBE = MageStudios.CBE || {};
MageStudios.CBE.version = 1.0;

/*:
 * @plugindesc (Requires MSEP_BattleEngineCore & MSEP_EquipCore)
 * Allow your actors to change equipment mid-battle.
 * @author Mage Studios Engine Plugins
 *
 * @param Command Name
 * @desc This is the command name used for changing equipment.
 * @default Equip
 *
 * @param Equip Cooldown
 * @type number
 * @min 0
 * @desc This is the default number of turns selecting the command
 * will place the command on cooldown for.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires MSEP_BattleEngineCore and MSEP_EquipCore. Make sure this
 * plugin is located under MSEP_BattleEngineCore and MSEP_EquipCore in the Plugin
 * Manager's plugin list.
 *
 * This plugin enables your player to be able to switch out an actor's equips
 * mid-battle. This will take the player to the Equip menu rather than leave
 * the player inside the battle scene.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to alter how the Change Battle Equip command
 * functions for your actors in battle.
 *
 * Actor, Class, Weapons, Armors, and State Notetags:
 *
 *   <Change Battle Equip Cooldown: +x>
 *   <Change Battle Equip Cooldown: -x>
 *   Increases or decreases the number of turns an actor has to wait in battle
 *   before the actor can change equips again by x amount.
 *
 *   <Disable Change Battle Equip>
 *   This will disable the ability to change equipment mid-battle for the
 *   related actor.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.6.1.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Game now refreshes all battlers upon reentry into the battle after
 * entering and leaving the equipment change menu mid-battle.
 *
 * Version 1.01a:
 * - Fixed a bug that made <Disable Change Battle Equip> not work.
 * - Optimization update.
 *
 * Version 1.00:
 * - Finished Plugin!
 */

if (Imported.MSEP_BattleEngineCore && Imported.MSEP_EquipCore) {
  MageStudios.Parameters = PluginManager.parameters("MSEP_X_ChangeBattleEquip");
  MageStudios.Param = MageStudios.Param || {};

  MageStudios.Param.CBECmd = String(MageStudios.Parameters["Command Name"]);
  MageStudios.Param.CBECooldown = Number(
    MageStudios.Parameters["Equip Cooldown"]
  );

  MageStudios.CBE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (!MageStudios.CBE.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!MageStudios._loaded_MSEP_X_ChangeBattleEquip) {
      this.processCBENotetags($dataActors);
      this.processCBENotetags($dataClasses);
      this.processCBENotetags($dataWeapons);
      this.processCBENotetags($dataArmors);
      this.processCBENotetags($dataStates);
      MageStudios._loaded_MSEP_X_ChangeBattleEquip = true;
    }
    return true;
  };

  DataManager.processCBENotetags = function (group) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.changeBattleEquipCooldown = 0;
      obj.disableChangeBattleEquip = false;

      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<CHANGE BATTLE EQUIP COOLDOWN:[ ]([\+\-]\d+)>/i)) {
          obj.changeBattleEquipCooldown = parseInt(RegExp.$1);
        } else if (line.match(/<DISABLE CHANGE BATTLE EQUIP>/i)) {
          obj.disableChangeBattleEquip = true;
        }
      }
    }
  };

  MageStudios.CBE.BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    if (!$gameTemp._cbeBattle) {
      MageStudios.CBE.BattleManager_startBattle.call(this);
    } else {
      this.refreshAllMembers();
    }
    $gameTemp._cbeBattle = false;
    this._bypassMoveToStartLocation = false;
    BattleManager.refreshAllBattlers();
  };

  BattleManager.refreshAllBattlers = function () {
    var members = $gameParty.members().concat($gameTroop.members());
    var length = members.length;
    for (var i = 0; i < length; ++i) {
      var member = members[i];
      if (member) member.refresh();
    }
  };

  MageStudios.CBE.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
  BattleManager.playBattleBgm = function () {
    var restartBgm = true;
    if (MageStudios.CBE.SavedBattleBgm) {
      AudioManager.playBgm(MageStudios.CBE.SavedBattleBgm);
      MageStudios.CBE.SavedBattleBgm = undefined;
      restartBgm = false;
    }
    if (MageStudios.CBE.SavedBattleBgs) {
      AudioManager.playBgs(MageStudios.CBE.SavedBattleBgs);
      MageStudios.CBE.SavedBattleBgs = undefined;
      restartBgm = false;
    }
    if (restartBgm) MageStudios.CBE.BattleManager_playBattleBgm.call(this);
  };

  Game_Temp.prototype.hasStoredBattleSpriteset = function () {
    return this._battleSpriteset;
  };

  Game_Temp.prototype.storeBattleSpriteset = function () {
    this._battleSpriteset = SceneManager._scene._spriteset;
  };

  Game_Temp.prototype.restoreBattleSpriteset = function () {
    if (this._battleSpriteset) {
      SceneManager._scene._spriteset = this._battleSpriteset;
      SceneManager._scene.addChild(SceneManager._scene._spriteset);
      this._battleSpriteset = undefined;
    }
  };

  MageStudios.CBE.Game_Battler_onBattleStart =
    Game_Battler.prototype.onBattleStart;
  Game_Battler.prototype.onBattleStart = function () {
    MageStudios.CBE.Game_Battler_onBattleStart.call(this);
    this._changeBattleEquipCooldown = 0;
  };

  MageStudios.CBE.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function () {
    MageStudios.CBE.Game_Battler_onBattleEnd.call(this);
    this._changeBattleEquipCooldown = 0;
  };

  MageStudios.CBE.Game_Battler_regenerateAll =
    Game_Battler.prototype.regenerateAll;
  Game_Battler.prototype.regenerateAll = function () {
    MageStudios.CBE.Game_Battler_regenerateAll.call(this);
    if (!$gameParty.inBattle()) return;
    if (this.isActor()) this.updateBattleEquipChangeCooldown();
  };

  MageStudios.CBE.Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    this._cacheChangeBattleEquipCooldown = undefined;
    this._cacheCanCBattleEquipChange = undefined;
    MageStudios.CBE.Game_Actor_refresh.call(this);
  };

  Game_Actor.prototype.canBattleEquipChange = function () {
    if (this._cacheCanCBattleEquipChange !== undefined) {
      if (this._cacheCanCBattleEquipChange) {
        this._changeBattleEquipCooldown = this._changeBattleEquipCooldown || 0;
        return this._changeBattleEquipCooldown <= 0;
      } else {
        return false;
      }
    }
    if (this.actor().disableChangeBattleEquip) {
      this._cacheCanCBattleEquipChange = false;
      return this._cacheCanCBattleEquipChange;
    }
    if (this.currentClass().disableChangeBattleEquip) {
      this._cacheCanCBattleEquipChange = false;
      return this._cacheCanCBattleEquipChange;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.disableChangeBattleEquip) {
        this._cacheCanCBattleEquipChange = false;
        return this._cacheCanCBattleEquipChange;
      }
    }
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.disableChangeBattleEquip) {
        this._cacheCanCBattleEquipChange = false;
        return this._cacheCanCBattleEquipChange;
      }
    }
    this._cacheCanCBattleEquipChange = true;
    this._changeBattleEquipCooldown = this._changeBattleEquipCooldown || 0;
    return this._changeBattleEquipCooldown <= 0;
  };

  Game_Actor.prototype.setBattleEquipChange = function (value) {
    if (!value) {
      this._changeBattleEquipCooldown = 0;
      return;
    }
    if (this._cacheChangeBattleEquipCooldown !== undefined) {
      this._changeBattleEquipCooldown -= this._cacheChangeBattleEquipCooldown;
      return;
    }
    value = MageStudios.Param.CBECooldown;
    value += this.actor().changeBattleEquipCooldown;
    value += this.currentClass().changeBattleEquipCooldown;
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.changeBattleEquipCooldown) {
        value += obj.changeBattleEquipCooldown;
      }
    }
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.changeBattleEquipCooldown) {
        value += obj.changeBattleEquipCooldown;
      }
    }
    this._cacheChangeBattleEquipCooldown = value;
    this._changeBattleEquipCooldown = this._cacheChangeBattleEquipCooldown;
  };

  Game_Actor.prototype.updateBattleEquipChangeCooldown = function () {
    this._changeBattleEquipCooldown = this._changeBattleEquipCooldown || 0;
    this._changeBattleEquipCooldown -= 1;
  };

  MageStudios.CBE.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
  Game_Unit.prototype.onBattleStart = function () {
    if ($gameTemp._cbeBattle) return;
    MageStudios.CBE.Game_Unit_onBattleStart.call(this);
  };

  MageStudios.CBE.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
  Game_Unit.prototype.onBattleEnd = function () {
    if ($gameTemp._cbeBattle) return;
    MageStudios.CBE.Game_Unit_onBattleEnd.call(this);
  };

  Game_Party.prototype.loadActorImages = function () {
    for (var i = 0; i < this.members().length; ++i) {
      var actor = this.members()[i];
      if (!actor) continue;
      ImageManager.loadFace(actor.faceName());
      ImageManager.loadCharacter(actor.characterName());
    }
  };

  Window_Selectable.prototype.removeHandler = function (symbol) {
    this._handlers[symbol] = undefined;
  };

  MageStudios.CBE.Window_ActorCommand_makeCommandList =
    Window_ActorCommand.prototype.makeCommandList;
  Window_ActorCommand.prototype.makeCommandList = function () {
    MageStudios.CBE.Window_ActorCommand_makeCommandList.call(this);
    if (this._actor && this._actor.isActor()) this.addEquipChangeCommand();
  };

  Window_ActorCommand.prototype.addEquipChangeCommand = function () {
    var text = MageStudios.Param.CBECmd;
    var enabled = this._actor.canBattleEquipChange();
    this.addCommand(text, "equip change", enabled);
  };

  MageStudios.CBE.Scene_Battle_createActorCommandWindow =
    Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    MageStudios.CBE.Scene_Battle_createActorCommandWindow.call(this);
    var win = this._actorCommandWindow;
    win.setHandler("equip change", this.commandChangeBattleEquip.bind(this));
  };

  MageStudios.CBE.Scene_Battle_createSpriteset =
    Scene_Battle.prototype.createSpriteset;
  Scene_Battle.prototype.createSpriteset = function () {
    if ($gameTemp.hasStoredBattleSpriteset()) {
      $gameTemp.restoreBattleSpriteset();
    } else {
      MageStudios.CBE.Scene_Battle_createSpriteset.call(this);
    }
  };

  Scene_Battle.prototype.commandChangeBattleEquip = function () {
    BattleManager._bypassMoveToStartLocation = true;
    $gameParty.loadActorImages();
    this.prepareBackground();
    $gameParty.setMenuActor(BattleManager.actor());
    BattleManager._savedActor = BattleManager.actor();
    BattleManager.actor().setBattleEquipChange(true);
    MageStudios.CBE.SavedBattleBgm = AudioManager.saveBgm();
    MageStudios.CBE.SavedBattleBgs = AudioManager.saveBgs();
    $gameTemp.storeBattleSpriteset();
    SceneManager.push(Scene_Equip);
    BattleManager._phase = "input";
    $gameTemp._cbeBattle = true;
  };

  Scene_Battle.prototype.prepareBackground = function () {
    MageStudios.CBE.SavedBackgroundBitmap = SceneManager._backgroundBitmap;
    this._prevWindowLayer = this._windowLayer.y;
    this._windowLayer.y = Graphics.boxHeight * 495;
    SceneManager.snapForBackground();
    this._windowLayer.y = this._prevWindowLayer;
  };

  MageStudios.CBE.Scene_Equip_createCommandWindow =
    Scene_Equip.prototype.createCommandWindow;
  Scene_Equip.prototype.createCommandWindow = function () {
    MageStudios.CBE.Scene_Equip_createCommandWindow.call(this);
    if (!$gameTemp._cbeBattle) return;
    this._commandWindow.removeHandler("pagedown");
    this._commandWindow.removeHandler("pageup");
    if (DataManager.isBattleTest() && !$gameTemp._bypassAddDebugEquipment) {
      this.addDebugEquipment();
    }
  };

  Scene_Equip.prototype.addDebugEquipment = function () {
    if ($gameTemp._addDebugEquipment) return;
    $gameTemp._addDebugEquipment = true;
    var length = $dataWeapons.length;
    for (var i = 0; i < length; ++i) {
      var obj = $dataWeapons[i];
      if (!obj) continue;
      if (obj.name === "") continue;
      var value = $gameParty.maxItems(obj);
      $gameParty.gainItem(obj, value);
    }
    var length = $dataArmors.length;
    for (var i = 0; i < length; ++i) {
      var obj = $dataArmors[i];
      if (!obj) continue;
      if (obj.name === "") continue;
      var value = $gameParty.maxItems(obj);
      $gameParty.gainItem(obj, value);
    }
  };
}
