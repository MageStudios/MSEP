var Imported = Imported || {};
Imported.MSEP_Z_StateProtection = true;

var MageStudios = MageStudios || {};
MageStudios.LunStPro = MageStudios.LunStPro || {};
MageStudios.LunStPro.version = 1.0;

/*:
 * @plugindesc (Lunatic Pack) Give states a variety of ways to protect
 * your battlers.
 * @author Mage Studios Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires the following plugins:
 * - Battle Engine Core
 * - Buffs & States Core
 *
 * Place this plugin beneath the above listed plugins in the plugin manager.
 *
 * This plugin allows you to add a variety of protection effects to your states
 * to allow them to reduce HP or MP damage in more unique ways, from cutting
 * off a percentage of the original damage, blocking off damage entirely once
 * certain break points are met, capping damage in certain ways, and surviving
 * fatal daMageStudios. And should any of those effects trigger, you can set the state
 * to perform special effects, too!
 *
 * *NOTE*: This plugin is best used with RPG Maker MV version 1.5.0+. You can
 * still use this plugin with a lower version number, but you will have a much
 * harder time altering the plugin parameters without it.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into a skill or item's notebox to give it one
 * of these effects:
 *
 * ---
 *
 * State Notetags:
 *
 *   <Protection Animation: x>
 *   - If a protection effect goes off, it will display animation x on the
 *   protected unit. This animation will be played in place of the default
 *   animation to indicate the effect has taken place.
 *
 *   <type Protection: effect>
 *   - Most of this plugin's notetags will follow the above format. 'type' will
 *   be replaced with either 'HP', 'MP', or 'Both' to indicate which damage
 *   types will be protected against. Replace 'effect' with one of the effects
 *   found below. Insert multiple entries of this notetag to give it multiple
 *   effects. The order of effects will be played by the order they're inserted
 *   into the notebox.
 *
 * =-=-=-= Protection EFFECTS =-=-=-=
 *
 *   --- Damage Reduction ---
 *
 *   <type Protection: Damage Cut x%>
 *   - Replace 'x' with a number. Will reduce damage by x% of the original
 *   damage value and not the current value.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Damage Block -x>
 *   <type Protection: Damage Block +x>
 *   - Replace 'x' with a flat value you wish to block (or increase) damage by.
 *   This is a flat change to the damage final value.
 *   SUGGESTED BY: Mage
 *
 *   --- Damage Nullifiers ---
 *
 *   <type Protection: Damage Null x%>
 *   - Replace 'x' with the percentage value of the target's MaxHP/MaxMP you
 *   wish to set as the break point. If the damage value is less than or equal
 *   to the break point, damage will be nullified and set to zero.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Damage Barrier x%>
 *   - Replace 'x' with the percentage value of the target's MaxHP/MaxMP you
 *   wish to set as the break point. If the damage value is less than or
 *   equal to the break point, damage will be nullified and set to zero.
 *   SUGGESTED BY: Mage
 *
 *   --- Damage Cappers ---
 *
 *   <type Protection: Damage Ceiling x%>
 *   - Replace 'x' with the percentage value of the target's MaxHP/MaxMP you
 *   wish to set as the break point. If the current damage value is above the
 *   break point, the damage value will become the break point.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Damage Floor x%>
 *   - Replace 'x' with the percentage value of the target's MaxHP/MaxMP you
 *   wish to set as the break point. If the current damage value is below the
 *   break point, the damage value will become the break point.
 *   SUGGESTED BY: Mage
 *
 *   --- Death Cheaters ---
 *
 *   <HP Protection: Guts x%>
 *   - Works only with HP type. Replace 'x' with the success rate percentage
 *   you wish to give this effect. If the affected target were to receive fatal
 *   damage as a result of this attack, there would be a x% chance the target
 *   would be able to survive with 1 HP left. This will not trigger if the
 *   target has exactly 1 HP left.
 *   SUGGESTED BY: Mage
 *
 *   <HP Protection: True Guts x%>
 *   - Works only with HP type. Replace 'x' with the success rate percentage
 *   you wish to give this effect. If the affected target were to receive fatal
 *   damage as a result of this attack, there would be a x% chance the target
 *   would be able to survive with 1 HP left. Unlike the regular guts, this
 *   remain in effect even if the user is at exactly 1 HP left.
 *   SUGGESTED BY: Joshua Pactor
 *
 *   <HP Protection: Fatal Damage Absorbx %>
 *   - Works only with HP type. Replace 'x' with the success rate percentage
 *   you wish to give this effect. If the affected target were to receive fatal
 *   damage as a result of this attack, the target would receive the damage as
 *   recovered health instead.
 *   SUGGESTED BY: Shaun Pattenden
 *
 *   --- Triggers ---
 *
 *   <type Protection: Trigger Removal x%>
 *   - If any of this state's protection effects have been triggered/activated,
 *   then remove this state as a result of the effect happening. Replace 'x'
 *   with the success rate you wish for this effect to occur.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Trigger Add x Buff>
 *   <type Protection: Trigger Add x Buff, y Turns>
 *   <type Protection: Trigger Add x Debuff>
 *   <type Protection: Trigger Add x Debuff, y Turns>
 *   - If any of this state's protection effects have been triggered/activated,
 *   then add a buff/debuff for parameter 'x'. Replace 'x' with 'MaxHP',
 *   'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'. You can replace 'y'
 *   with the number of turns the buff/debuff will last. If you do not use the
 *   notetag variant with the turn count, then it will default to 5 turns.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Trigger Remove x Buff>
 *   <type Protection: Trigger Remove x Debuff>
 *   - If any of this state's protection effects have been triggered/activated,
 *   then remove a buff/debuff for parameter 'x'. Replace 'x' with 'MaxHP',
 *   'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Trigger Add State x>
 *   - If any of this state's protection effects have been triggered/activated,
 *   then add state 'x' onto the target. Replace 'x' with the state ID you wish
 *   to apply to the target.
 *   SUGGESTED BY: Mage
 *
 *   <type Protection: Trigger Remove State x>
 *   - If any of this state's protection effects have been triggered/activated,
 *   then remove state 'x' onto the target. Replace 'x' with the state ID you
 *   wish to remove from the target.
 *   SUGGESTED BY: Mage
 *
 * =-=-=-= Examples =-=-=-=
 *
 *   <HP Protection: Damage Cut 70%>
 *   - This will reduce incoming HP damage for the affected unit by 70% meaning
 *   only 30% of the damage will go through.
 *
 *   <HP Protection: Damage Block -500>
 *   <HP Protection: Damage Null 20%>
 *   - This will reduce incoming HP damage for the affected unit by a flat 500
 *   first. If the damage is less than 20% of the unit's MaxHP, then it will be
 *   nullified completely.
 *
 *   <MP Protection: Damage Barrier 20%>
 *   - If the affected unit receives MP damage and the MP damage is more than
 *   20% of the unit's MaxMP, nullify that damage completely.
 *
 *   <HP Protection: Damage Ceiling 30%>
 *   - If the affected unit receives HP damage and the HP damage is more than
 *   30% of the unit's MaxHP, then the damage will be reduced to equal 30% of
 *   the unit's MaxHP.
 *
 *   <HP Protection: Guts 100%>
 *   <HP Protection: Trigger Removal 100%>
 *   - If the affected unit receives HP damage that would be fatal, the damage
 *   is reduced until the unit would be left with 1 HP left. At that point, the
 *   state that gives the Guts effect will be removed.
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 *
 *
 *
 * if (data.match(/DAMAGE CUT[ ](\d+)([%％])/i)) {
 *   rate = parseFloat(RegExp.$1) * 0.01;
 *   blocked = originalValue * rate;
 *   value -= blocked;
 *   value = Math.max(value, 0);
 *
 * } else if (data.match(/DAMAGE BLOCK[ ]([\+\-]\d+)/i)) {
 *   blocked = parseInt(RegExp.$1);
 *   value -= blocked;
 *   value = Math.max(value, 0);
 *
 * ...
 *
 *
 *
 *
 * } else {
 *   skip = true;
 * }
 *
 * ---
 *
 * Here's what each of the variables used in this code bit refer to:
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   state                  The state this effect belongs to
 *   stateId                The state ID this effect belongs to
 *
 *   value                  The HP/MP damage being affected by this effect. Any
 *                          changes made to this value will be permanent unless
 *                          the effect is skipped.
 *
 *   originalValue          The original HP/MP damage before any of the protect
 *                          state effects have been applied.
 *
 *   item                   The item being used by this action
 *   skill                  The skill being used by this action
 *
 *   isItem                 Returns true if action is an item
 *   isSkill                Returns true if action is a skill
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   b                      Returns the action's current target
 *   target                 Returns the action's current target
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   user._result           The current results for the user
 *   target._result         The current results for the target
 *   userPreviousResult     The results for the user before any changes
 *   targetPreviousResult   The results for the target before any changes
 *
 *   animation              The animation to be played.
 *
 *   triggered              Returns if any of this state's protection effects
 *                          have been triggered (true) or not (false)
 *
 *   skip                   Default: false. If true, skips popups & animations
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param Effect Code
 * @parent ---General---
 * @type note
 * @desc LUNATIC MODE: This is the code used for each of the notetag
 * effects. Refer to the help file for variables used here.
 * @default "
 *
 * @param Protection Animation
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves protecting HP/MP.
 * @default 53
 *
 */

MageStudios.PluginRequirements = function () {
  return Imported.MSEP_BattleEngineCore && Imported.MSEP_BuffsStatesCore;
};

if (MageStudios.PluginRequirements()) {
  MageStudios.Parameters = PluginManager.parameters("MSEP_Z_StateProtection");
  MageStudios.Param = MageStudios.Param || {};

  MageStudios.Param.LunStProEffect = JSON.parse(
    MageStudios.Parameters["Effect Code"]
  );

  MageStudios.Param.LunStProAni = Number(
    MageStudios.Parameters["Protection Animation"]
  );

  MageStudios.LunStPro.DataManager_isDatabaseLoaded =
    DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (!MageStudios.LunStPro.DataManager_isDatabaseLoaded.call(this))
      return false;

    if (!MageStudios._loaded_MSEP_Z_StateProtection) {
      this.processLunStProNotetags1($dataStates);
      MageStudios._loaded_MSEP_Z_StateProtection = true;
    }

    return true;
  };

  DataManager.processLunStProNotetags1 = function (group) {
    var notetag1 = /<(.*)[ ](?:PROTECT|PROTECTION):[ ](.*)>/i;
    var notetag2 = /<(?:PROTECT|PROTECTION)[ ](?:ANI|ANIMATION):[ ](\d+)>/i;
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.hpProtectionEffects = [];
      obj.mpProtectionEffects = [];
      obj.protectAnimation = MageStudios.Param.LunStProAni;

      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(notetag1)) {
          var data1 = String(RegExp.$1);
          var data2 = String(RegExp.$2);
          if (data1.match(/HP/i)) {
            obj.hpProtectionEffects.push(data2);
          } else if (data2.match(/MP/i)) {
            obj.mpProtectionEffects.push(data2);
          } else if (data2.match(/BOTH/i)) {
            obj.hpProtectionEffects.push(data2);
            obj.mpProtectionEffects.push(data2);
          }
        } else if (line.match(notetag2)) {
          obj.protectAnimation = parseInt(RegExp.$1);
        }
      }
    }
  };

  DataManager.getParamId = function (str) {
    switch (str.toUpperCase()) {
      case "HP":
      case "MAXHP":
      case "MAX HP":
        return 0;
        break;
      case "MP":
      case "MAXMP":
      case "MAX MP":
      case "SP":
      case "MAXSP":
      case "MAX SP":
        return 1;
        break;
      case "ATK":
      case "STR":
        return 2;
        break;
      case "DEF":
        return 3;
        break;
      case "MAT":
      case "INT":
      case "SPI":
        return 4;
        break;
      case "MDF":
      case "RES":
        return 5;
        break;
      case "AGI":
      case "SPD":
        return 6;
        break;
      case "LUK":
        return 7;
        break;
      default:
        return -1;
        break;
    }
  };

  MageStudios.LunStPro.Game_Action_onReact =
    Game_Action.prototype.onReactStateEffects;
  Game_Action.prototype.onReactStateEffects = function (target, value) {
    var states = target.states();
    var length = states.length;
    var originalValue = value;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      value = this.processStProtectEffects(target, state, value, originalValue);
    }
    value = MageStudios.LunStPro.Game_Action_onReact.call(this, target, value);
    return value;
  };

  Game_Action.prototype.processStProtectEffects = function (
    target,
    state,
    value,
    originalValue
  ) {
    if (!state) return value;
    if (this.isHpEffect() && value > 0) {
      var effects = state.hpProtectionEffects;
    } else if (this.isMpEffect() && value > 0) {
      var effects = state.mpProtectionEffects;
    } else {
      return value;
    }
    var length = effects.length;
    this._protectionStateTriggered = false;
    if (length <= 0) return value;
    for (var i = 0; i < length; ++i) {
      var data = effects[i];
      value = this.lunaticStateProtectEval(
        target,
        state,
        value,
        data,
        originalValue
      );
    }
    return Math.round(value);
  };

  Game_Action.prototype.lunaticStateProtectEval = function (
    target,
    state,
    value,
    data,
    originalValue
  ) {
    var prevValue = value;
    var stateId = state.id;
    var item = this.item();
    var skill = this.item();
    var isSkill = DataManager.isSkill(skill);
    var isItem = DataManager.isSkill(item);
    var user = this.subject();
    var a = user;
    var subject = user;
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var userPreviousResult = JsonEx.makeDeepCopy(user._result);
    var targetPreviousResult = JsonEx.makeDeepCopy(target._result);
    var triggered = this._protectionStateTriggered;
    var skip = false;
    var rate = 1;
    var blocked = 0;

    var animation = state.protectAnimation;

    var code = MageStudios.Param.LunStProEffect;
    try {
      eval(code);
    } catch (e) {
      MageStudios.Util.displayError(e, code, "LUNATIC STATE PROTECTION ERROR");
    }

    if (user.isDead()) user.performCollapse();
    if (target.isDead()) target.performCollapse();
    user._result = userPreviousResult;
    target._result = targetPreviousResult;

    if (!skip) {
      if (animation > 0) target.startAnimation(animation);
      this._protectionStateTriggered = true;
    } else if (skip) {
      return prevValue;
    }

    return value;
  };

  MageStudios.Util = MageStudios.Util || {};

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
    if (data.match(/DAMAGE CUT[ ](\d+)([%％])/i)) {
      rate = parseFloat(RegExp.$1) * 0.01;
      blocked = originalValue * rate;
      value -= blocked;
      value = Math.max(value, 0);
    } else if (data.match(/ELEMENT[ ](\d+)[ ]CUT[ ](\d+)([%％])/i)) {
      var eleId = parseInt(RegExp.$1);
      if (Imported.MSEP_ElementCore) {
        var match = this.getItemElements().contains(eleId);
      } else {
        var match = this.item().daMageStudios.elementId === eleId;
      }
      if (match) {
        rate = parseFloat(RegExp.$2) * 0.01;
        blocked = originalValue * rate;
        value -= blocked;
        value = Math.max(value, 0);
      } else {
        skip = true;
      }
    } else if (data.match(/DAMAGE BLOCK[ ]([\+\-]\d+)/i)) {
      blocked = parseInt(RegExp.$1);
      value -= blocked;
      value = Math.max(value, 0);
    } else if (data.match(/DAMAGE NULL[ ](\d+)([%％])/i)) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mhp * rate);
      } else if (this.isHpEffect()) {
        var breakpoint = Math.round(targer.mmp * rate);
      } else {
        skip = true;
      }
      if (!skip && value <= breakpoint) {
        value = 0;
      } else {
        skip = true;
      }
    } else if (data.match(/DAMAGE BARRIER[ ](\d+)([%％])/i)) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mhp * rate);
      } else if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mmp * rate);
      } else {
        skip = true;
      }
      if (!skip && value >= breakpoint) {
        value = 0;
      } else {
        skip = true;
      }
    } else if (data.match(/DAMAGE CEILING[ ](\d+)([%％])/i)) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mhp * rate);
      } else if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mmp * rate);
      } else {
        skip = true;
      }
      if (!skip) {
        value = Math.min(value, breakpoint);
      }
    } else if (data.match(/DAMAGE FLOOR[ ](\d+)([%％])/i)) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mhp * rate);
      } else if (this.isHpEffect()) {
        var breakpoint = Math.round(target.mmp * rate);
      } else {
        skip = true;
      }
      if (!skip) {
        value = Math.max(value, breakpoint);
      }
    } else if (data.match(/TRUE GUTS[ ](\d+)([%％])/i)) {
      skip = true;
      if (this.isHpEffect()) {
        if (value > target.hp) {
          rate = parseFloat(RegExp.$1) * 0.01;
          if (Math.random() < rate) {
            skip = false;
            value = target.hp - 1;
          }
        }
      }
    } else if (data.match(/GUTS[ ](\d+)([%％])/i)) {
      skip = true;
      if (this.isHpEffect() && target.hp > 1) {
        if (value > target.hp) {
          rate = parseFloat(RegExp.$1) * 0.01;
          if (Math.random() < rate) {
            skip = false;
            value = target.hp - 1;
          }
        }
      }
    } else if (data.match(/ABSORB FATAL DAMAGE[ ](\d+)([%％])/i)) {
      skip = true;
      if (this.isHpEffect()) {
        if (value > target.hp) {
          rate = parseFloat(RegExp.$1) * 0.01;
          if (Math.random() < rate) {
            skip = false;
            value *= -1;
          }
        }
      }
    } else if (data.match(/TRIGGER REMOVAL[ ](\d+)([%％])/i)) {
      skip = true;
      if (triggered) {
        rate = parseFloat(RegExp.$1) * 0.01;
        if (Math.random() < rate) {
          skip = false;
          target.removeState(stateId);
        }
      }
    } else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF,[ ](\d+)[ ]TURN/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var str = String(RegExp.$1).toUpperCase();
        var turns = parseInt(RegExp.$2);
        var paramId = DataManager.getParamId(str);
        target.addBuff(paramId, turns);
      }
    } else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var str = String(RegExp.$1).toUpperCase();
        var turns = 5;
        var paramId = DataManager.getParamId(str);
        target.addBuff(paramId, turns);
      }
    } else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF,[ ](\d+)[ ]TURN/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var str = String(RegExp.$1).toUpperCase();
        var turns = parseInt(RegExp.$2);
        var paramId = DataManager.getParamId(str);
        target.addDebuff(paramId, turns);
      }
    } else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var str = String(RegExp.$1).toUpperCase();
        var turns = 5;
        var paramId = DataManager.getParamId(str);
        target.addDebuff(paramId, turns);
      }
    } else if (data.match(/TRIGGER REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var str = String(RegExp.$1).toUpperCase();
        var paramId = DataManager.getParamId(str);
        target.removeBuff(paramId);
      }
    } else if (data.match(/TRIGGER ADD STATE[ ](\d+)/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var stateId = parseInt(RegExp.$1);
        user.addState(stateId);
      }
    } else if (data.match(/TRIGGER REMOVE STATE[ ](\d+)/i)) {
      skip = true;
      if (triggered) {
        skip = false;
        var stateId = parseInt(RegExp.$1);
        user.removeState(stateId);
      }
    } else {
      skip = true;
    }
  }
} else {
  var text = "";
  text += "You are getting this error because you are trying to run ";
  text += "MSEP_Z_StateProtection without the required plugins. Please visit ";
  text +=
    "MageStudios.moe and install the required plugins neede for this plugin ";
  text += "found in this plugin's help file before you can use it.";
  console.log(text);
  require("nw.gui").Window.get().showDevTools();
}
