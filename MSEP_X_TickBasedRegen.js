var Imported = Imported || {};
Imported.MSEP_X_TickBasedRegen = true;

var MageStudios = MageStudios || {};
MageStudios.TBR = MageStudios.TBR || {};
MageStudios.TBR.version = 1.0;

/*:
 * @plugindesc (Req MSEP_BattleEngineCore & MSEP_BuffsStatesCore)
 * Tick-Based Battle system regeneration.
 * @author Mage Studios Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires MSEP_BattleEngineCore.js and MSEP_BuffsStatesCore.js.
 * Make sure this plugin is located under both of the listed plugins in the
 * plugin list.
 *
 * For those running a Tick-Based Battle System with the Battle Engine Core
 * (ie. Active Turn Battle or Charge Turn Battle), this will automatically set
 * your states for Turn End timings to use a Time Based system, but in turn,
 * causes regeneration effects to occur individually.
 *
 * This means that if Harold receives Low Healing Regen, then 50 ticks later,
 * receives High Healing Regen, Harold does not regenerate HP at the same time.
 * Instead, he will regenerate individually for both Low Healing Regen and High
 * Healing Regen.
 *
 * For states that do not function off a Turn End system but still utilize
 * regeneration effects, those effects will also work off a tick-based manner.
 *
 * Lunatic Mode Regenerate effects from the Buffs & States Core plugin will
 * also function off of a periodic timed system as opposed to a regular per
 * actor turn system.
 *
 * If a state has been reapplied, the regeneration counter will also be reset
 * as to synchronize with the state's turn counter.
 *
 * If a battler has passive states, that battler's regeneration effects will
 * reset at the start of each battle and clear itself at the end of battle. For
 * example, if the amount of time you've set in the Battle Engine Core for the
 * states to tick down is 100, at the start of battle, all passive states will
 * be reset to 100 and must reach 0 before the regeneration effects trigger.
 *
 * *NOTE: Only states will function off of tick-based regeneration. HP/MP/TP
 * regeneration gained from traits in the actor, class, enemy, weapon, or armor
 * database object entries will occur upon the battler's turn end.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Added anti-crash method for actors that are joining mid-party.
 *
 * Version 1.02:
 * - Fixed a bug that caused HP/MP/TP regeneration from non-states to not
 * function properly. They will now occur at turn end.
 *
 * Version 1.01:
 * - Fixed a bug that caused tick-based states to not trigger Leave effects.
 *
 * Version 1.00:
 * - Finished Plugin!
 */

if (Imported.MSEP_BattleEngineCore && Imported.MSEP_BuffsStatesCore) {
  MageStudios.Param.BECTimeStates = "true";

  MageStudios.TBR.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
  Game_BattlerBase.prototype.refresh = function () {
    this._cacheStatesLength = undefined;
    this._cacheStatesIndex = [];
    MageStudios.TBR.Game_BattlerBase_refresh.call(this);
  };

  MageStudios.TBR.Game_BattlerBase_traitObjects =
    Game_BattlerBase.prototype.traitObjects;
  Game_BattlerBase.prototype.traitObjects = function () {
    if ($gameTemp._tickBasedTraits) return [];
    return MageStudios.TBR.Game_BattlerBase_traitObjects.call(this);
  };

  MageStudios.TBR.Game_Battler_regenerateHp =
    Game_Battler.prototype.regenerateHp;
  Game_Battler.prototype.regenerateHp = function () {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    MageStudios.TBR.Game_Battler_regenerateHp.call(this);
    $gameTemp._tickBasedTraits = undefined;
  };

  MageStudios.TBR.Game_Battler_regenerateMp =
    Game_Battler.prototype.regenerateMp;
  Game_Battler.prototype.regenerateMp = function () {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    MageStudios.TBR.Game_Battler_regenerateMp.call(this);
    $gameTemp._tickBasedTraits = undefined;
  };

  MageStudios.TBR.Game_Battler_regenerateTp =
    Game_Battler.prototype.regenerateTp;
  Game_Battler.prototype.regenerateTp = function () {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    MageStudios.TBR.Game_Battler_regenerateTp.call(this);
    $gameTemp._tickBasedTraits = undefined;
  };

  Game_BattlerBase.prototype.updateStateTicks = function () {
    if (this.isDead()) return;
    var needRefresh = false;
    var length = this._cacheStatesLength || this.states().length;
    this._cachePassiveTicks = this._cachePassiveTicks || {};
    this._cacheStatesIndex = this._cacheStatesIndex || [];
    for (var i = 0; i < length; ++i) {
      if (!this._cacheStatesIndex[i]) {
        var state = this.states()[i];
        if (state) this._cacheStatesIndex[i] = this.states()[i].id;
      }
      var stateId = this._cacheStatesIndex[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming === 2 && this._stateTurns[stateId]) {
        var value = BattleManager.tickRate() / MageStudios.Param.BECTurnTime;
        var shown1 = Math.ceil(this._stateTurns[stateId]);
        this._stateTurns[stateId] -= value;
        var shown2 = Math.ceil(this._stateTurns[stateId]);
      } else {
        if (!this._cachePassiveTicks[stateId]) {
          this._cachePassiveTicks[stateId] = MageStudios.Param.BECTurnTime;
        }
        var value = BattleManager.tickRate() / MageStudios.Param.BECTurnTime;
        var shown1 = Math.ceil(this._cachePassiveTicks[stateId]);
        this._cachePassiveTicks[stateId] -= value;
        var shown2 = Math.ceil(this._cachePassiveTicks[stateId]);
      }
      if (shown1 !== shown2) {
        this.updateStateTickRegen(state);
        needRefresh = true;
      }
      if (state.autoRemovalTiming === 2) {
        if (this._stateTurns[stateId] && this._stateTurns[stateId] <= 0) {
          $gameTemp._customLeaveEffectEval = true;
          this.removeState(stateId);
          $gameTemp._customLeaveEffectEval = undefined;
        }
      }
    }
    if (needRefresh) this.refresh();
  };

  Game_BattlerBase.prototype.updateStateTickRegen = function (state) {
    this.clearResult();
    this.regenerateHpTick(state);
    this.regenerateMpTick(state);
    this.regenerateTpTick(state);
    this.startDamagePopup();
    this.clearResult();
    this.regenerateStateEffects(state.id);
    this.clearResult();
  };

  Game_BattlerBase.prototype.getStateTickTraits = function (
    state,
    code,
    dataId
  ) {
    var length = state.traits.length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var trait = state.traits[i];
      if (trait.code === code && trait.dataId === dataId) {
        value += trait.value;
      }
    }
    return value;
  };

  Game_BattlerBase.prototype.regenerateHpTick = function (state) {
    var rate = this.getStateTickTraits(state, 22, 7);
    var value = Math.floor(this.mhp * rate);
    value = Math.max(value, -this.maxSlipDamage());
    if (value !== 0) {
      this.clearResult();
      this.gainHp(value);
      this.startDamagePopup();
      this.clearResult();
    }
  };

  Game_BattlerBase.prototype.regenerateMpTick = function (state) {
    var rate = this.getStateTickTraits(state, 22, 8);
    var value = Math.floor(this.mmp * rate);
    if (value !== 0) {
      this.clearResult();
      this.gainMp(value);
      this.startDamagePopup();
      this.clearResult();
    }
  };

  Game_BattlerBase.prototype.regenerateTpTick = function (state) {
    var rate = this.getStateTickTraits(state, 22, 9);
    var value = Math.floor(this.maxTp() * rate);
    if (value !== 0) this.gainSilentTp(value);
  };

  MageStudios.TBR.Game_BattlerBase_resetStateCounts =
    Game_BattlerBase.prototype.resetStateCounts;
  Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
    MageStudios.TBR.Game_BattlerBase_resetStateCounts.call(this, stateId);
    var state = $dataStates[stateId];
    if (state && state.reapplyRules !== 0) {
      this._cachePassiveTicks = this._cachePassiveTicks || {};
      this._cachePassiveTicks[stateId] = MageStudios.Param.BECTurnTime;
    }
  };

  MageStudios.TBR.Game_Battler_onBattleStart =
    Game_Battler.prototype.onBattleStart;
  Game_Battler.prototype.onBattleStart = function () {
    this._cachePassiveTicks = {};
    MageStudios.TBR.Game_Battler_onBattleStart.call(this);
  };

  MageStudios.TBR.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function () {
    this._cachePassiveTicks = {};
    MageStudios.TBR.Game_Battler_onBattleEnd.call(this);
  };

  MageStudios.TBR.Game_Battler_onRegenerateStateEffects =
    Game_Battler.prototype.onRegenerateStateEffects;
  Game_Battler.prototype.onRegenerateStateEffects = function () {
    if (BattleManager.timeBasedStates()) return;
    MageStudios.TBR.Game_Battler_onRegenerateStateEffects.call(this);
  };
}
