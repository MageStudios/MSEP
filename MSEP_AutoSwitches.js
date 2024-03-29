var Imported = Imported || {};
Imported.MSEP_AutoSwitches = true;

var MageStudios = MageStudios || {};
MageStudios.AutoSwitch = MageStudios.AutoSwitch || {};
MageStudios.AutoSwitch.version = 1.0;

/*:
 * @plugindesc When playtesting, this will cause a particular
 * switch to always be ON for testing purposes.
 * @author Mage Studios Engine Plugins
 *
 * @param Battle Switch
 * @type switch
 * @desc This switch will always be ON when the player is in battle.
 * @default 0
 *
 * @param Battle Test Switch
 * @type switch
 * @desc This switch will only be ON when accessing battle through
 * the database's Battle Test option.
 * @default 0
 *
 * @param Dash Switch
 * @type switch
 * @desc This switch will always be ON when the player is dashing.
 * @default 0
 *
 * @param Debug Switch
 * @type switch
 * @desc This switch will always be ON during test play and battle
 * testing and always OFF otherwise.
 * @default 0
 *
 * @param Mobile Switch
 * @type switch
 * @desc This switch will always be ON when playing on any mobile
 * device and always OFF otherwise.
 * @default 0
 *
 * @param Mobile Chrome Switch
 * @type switch
 * @desc This switch will be ON or OFF depending if playing on
 * the Mobile Chrome browser.
 * @default 0
 *
 * @param Mobile Safari Switch
 * @type switch
 * @desc This switch will be ON or OFF depending if playing on
 * the Mobile Safari browser.
 * @default 0
 *
 * @param Non-Local Switch
 * @type switch
 * @desc This switch will always be ON when playing on mobile or
 * browser and always OFF otherwise.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to set switches that are either always enabled or
 * always disabled based on a various conditions. These conditions are here to
 * help enable easier access to determining the lesser frequently seen flags
 * set by the game such as determining if the game is running via debug mode or
 * on a certain type of browser.
 *
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_AutoSwitches");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.AutoSwitches = {
  battle: Number(MageStudios.Parameters["Battle Switch"]),
  btest: Number(MageStudios.Parameters["Battle Test Switch"]),
  dash: Number(MageStudios.Parameters["Dash Switch"]),
  debug: Number(MageStudios.Parameters["Debug Switch"]),
  mobile: Number(MageStudios.Parameters["Mobile Switch"]),
  mobileChrome: Number(MageStudios.Parameters["Mobile Chrome Switch"]),
  mobileSafari: Number(MageStudios.Parameters["Mobile Safari Switch"]),
  nonLocal: Number(MageStudios.Parameters["Non-Local Switch"]),
};

Utils.isMobileChrome = function () {
  var agent = navigator.userAgent;
  return agent.match(/Chrome/);
};

MageStudios.AutoSwitch.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function (switchId) {
  if (switchId === MageStudios.Param.AutoSwitches.battle) {
    return this.battleAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.btest) {
    return this.dashAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.dash) {
    return this.dashAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.debug) {
    return this.debugAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.mobile) {
    return this.mobileAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.mobileChrome) {
    return this.mobileChromeAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.mobileSafari) {
    return this.mobileSafariAutoSwitch();
  } else if (switchId === MageStudios.Param.AutoSwitches.nonLocal) {
    return this.nonLocalAutoSwitch();
  } else {
    return MageStudios.AutoSwitch.Game_Switches_value.call(this, switchId);
  }
};

Game_Switches.prototype.battleAutoSwitch = function () {
  return $gameParty.inBattle();
};

Game_Switches.prototype.battleTestAutoSwitch = function () {
  return BattleManager.isBattleTest();
};

Game_Switches.prototype.dashAutoSwitch = function () {
  return $gamePlayer.isDashing();
};

Game_Switches.prototype.debugAutoSwitch = function () {
  return Utils.isNwjs() && Utils.isOptionValid("test");
};

Game_Switches.prototype.mobileAutoSwitch = function () {
  return Utils.isMobileDevice();
};

Game_Switches.prototype.mobileChromeAutoSwitch = function () {
  return Utils.isMobileChrome();
};

Game_Switches.prototype.mobileSafariAutoSwitch = function () {
  return Utils.isMobileSafari();
};

Game_Switches.prototype.nonLocalAutoSwitch = function () {
  return !Utils.isNwjs();
};
