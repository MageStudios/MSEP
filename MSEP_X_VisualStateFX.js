var Imported = Imported || {};
Imported.MSEP_X_VisualStateFX = true;

var MageStudios = MageStudios || {};
MageStudios.VSFX = MageStudios.VSFX || {};
MageStudios.VSFX.version = 1.0;

/*:
 * @plugindesc (Req MSEP_BattleEngineCore & MSEP_BuffsStatesCore) Adds
 * visual effects to your states.
 * @author Mage Studios Engine Plugins
 *
 * @param ---Actors---
 * @default
 *
 * @param Actor State Overlay
 * @parent ---Actors---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state overlay over the head of actors?
 * YES - true     NO - false     Default: true
 * @default true
 *
 * @param Actor State Icons
 * @parent ---Actors---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state icons over the head of actors?
 * YES - true     NO - false     Default: false
 * @default true
 *
 * @param Actor State Animation
 * @parent ---Actors---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state animations on the actors?
 * YES - true     NO - false
 * @default true
 *
 * @param ---Enemies---
 * @default
 *
 * @param Enemy State Overlay
 * @parent ---Enemies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state overlay over the head of enemies?
 * YES - true     NO - false     Default: false
 * @default true
 *
 * @param Enemy State Icons
 * @parent ---Enemies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state icons over the head of enemies?
 * YES - true     NO - false     Default: true
 * @default true
 *
 * @param Enemy State Animation
 * @parent ---Enemies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show state animations on the enemies?
 * YES - true     NO - false
 * @default true
 *
 * @param ---Animation Settings---
 * @default
 *
 * @param Allow Target Flash
 * @parent ---Animation Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow state animations to use target flash effects?
 * YES - true     NO - false
 * @default true
 *
 * @param Allow Screen Flash
 * @parent ---Animation Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow state animations to use screen flash effects?
 * YES - true     NO - false
 * @default false
 *
 * @param Allow Hide Target
 * @parent ---Animation Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow state animations to use hide target effects?
 * YES - true     NO - false
 * @default false
 *
 * @param Allow Sound
 * @parent ---Animation Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow state animations to use sound effects?
 * YES - true     NO - false
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires MSEP_BattleEngineCore and MSEP_BuffsStatesCore.
 * Make sure this plugin is located under both plugins in the plugin list.
 *
 * If you are running MSEP_X_AnimatedSVEnemies, place this plugin under
 * MSEP_X_AnimatedSVEnemies on the plugin list for extra compatibility.
 *
 * States are amongst one of the most important aspects of the battle system.
 * Therefore, relaying proper information to the player is extremely important.
 * RPG Maker MV does relay information to the player about the various states
 * and effects, but it is far from perfect. This plugin allows you to add more
 * detail and visual effects regarding states to relay proper data.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to give different various visual effects
 * for your states.
 *
 * State Notetags:
 *
 *   <State Motion: Walk>
 *   <State Motion: Wait>
 *   <State Motion: Chant>
 *   <State Motion: Guard>
 *   <State Motion: Damage>
 *   <State Motion: Evade>
 *   <State Motion: Thrust>
 *   <State Motion: Swing>
 *   <State Motion: Missile>
 *   <State Motion: Skill>
 *   <State Motion: Spell>
 *   <State Motion: Item>
 *   <State Motion: Escape>
 *   <State Motion: Victory>
 *   <State Motion: Dying>
 *   <State Motion: Abnormal>
 *   <State Motion: Sleep>
 *   <State Motion: Dead>
 *   - This allows you to set a custom motion when the battler is affected by
 *   this state. If a battler has multiple states with custom motions, then
 *   priority will go to the state with the highest priority number (in the
 *   database) with this state motion notetag.
 *
 *   <State Animation: x>
 *   - If a battler is affected by a state with this notetag, then a repeating
 *   animation x will play on the battler while in battle. If a battler is
 *   affected by multiple states with this notetag, then priority will go to
 *   the state with the highest priority number (in the database) with this
 *   state animation notetag.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Fixed a bug where enemy icon settings would match actor icon settings
 * regardless of the settings made in the plugin parameters.
 *
 * Version 1.01:
 * - State animations are now adjusted to fit the opacity of the battler.
 *
 * Version 1.00:
 * - Finished Plugin!
 */

if (Imported.MSEP_BattleEngineCore && Imported.MSEP_BuffsStatesCore) {
  MageStudios.Parameters = PluginManager.parameters("MSEP_X_VisualStateFX");
  MageStudios.Param = MageStudios.Param || {};

  MageStudios.Param.VSFXActorOver = String(
    MageStudios.Parameters["Actor State Overlay"]
  );
  MageStudios.Param.VSFXActorOver = eval(MageStudios.Param.VSFXActorOver);
  MageStudios.Param.VSFXActorIcons = String(
    MageStudios.Parameters["Actor State Icons"]
  );
  MageStudios.Param.VSFXActorIcons = eval(MageStudios.Param.VSFXActorIcons);
  MageStudios.Param.VSFXActorAni = String(
    MageStudios.Parameters["Actor State Animation"]
  );
  MageStudios.Param.VSFXActorAni = eval(MageStudios.Param.VSFXActorAni);

  MageStudios.Param.VSFXEnemyOver = String(
    MageStudios.Parameters["Enemy State Overlay"]
  );
  MageStudios.Param.VSFXEnemyOver = eval(MageStudios.Param.VSFXEnemyOver);
  MageStudios.Param.VSFXEnemyIcons = String(
    MageStudios.Parameters["Enemy State Icons"]
  );
  MageStudios.Param.VSFXEnemyIcons = eval(MageStudios.Param.VSFXEnemyIcons);
  MageStudios.Param.VSFXEnemyAni = String(
    MageStudios.Parameters["Enemy State Animation"]
  );
  MageStudios.Param.VSFXEnemyAni = eval(MageStudios.Param.VSFXEnemyAni);

  MageStudios.Param.VSFXAniTarget = String(
    MageStudios.Parameters["Allow Target Flash"]
  );
  MageStudios.Param.VSFXAniTarget = eval(MageStudios.Param.VSFXAniTarget);
  MageStudios.Param.VSFXAniScreen = String(
    MageStudios.Parameters["Allow Screen Flash"]
  );
  MageStudios.Param.VSFXAniScreen = eval(MageStudios.Param.VSFXAniScreen);
  MageStudios.Param.VSFXAniHide = String(
    MageStudios.Parameters["Allow Hide Target"]
  );
  MageStudios.Param.VSFXAniHide = eval(MageStudios.Param.VSFXAniHide);
  MageStudios.Param.VSFXAniSound = String(
    MageStudios.Parameters["Allow Sound"]
  );
  MageStudios.Param.VSFXAniSound = eval(MageStudios.Param.VSFXAniSound);

  MageStudios.VSFX.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (!MageStudios.VSFX.DataManager_isDatabaseLoaded.call(this)) return false;

    if (!MageStudios._loaded_MSEP_X_VisualStateFX) {
      this.processVSFXNotetags1($dataStates);
      MageStudios._loaded_MSEP_X_VisualStateFX = true;
    }

    return true;
  };

  DataManager.processVSFXNotetags1 = function (group) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.stateMotion = undefined;
      obj.stateAnimationId = 0;

      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:CUSTOM MOTION|STATE MOTION):[ ](.*)>/i)) {
          obj.motion = 4;
          obj.stateMotion = String(RegExp.$1).toLowerCase().trim();
          if (obj.stateMotion === "idle") obj.stateMotion = "walk";
        } else if (line.match(/<(?:STATE ANIMATION|STATE ANI):[ ](\d+)>/i)) {
          obj.stateAnimationId = parseInt(RegExp.$1);
        }
      }
    }
  };

  Game_BattlerBase.prototype.stateMotionIndex = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.motion) return state.motion;
    }
    return 0;
  };

  Game_BattlerBase.prototype.stateOverlayIndex = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.overlay) return state.overlay;
    }
    return 0;
  };

  MageStudios.VSFX.Game_Battler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function () {
    MageStudios.VSFX.Game_Battler_refresh.call(this);
    this.refreshStateAnimation();
  };

  MageStudios.VSFX.Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function (stateId) {
    var index = this.stateMotionIndex();
    var motion = this.customStateMotion();
    MageStudios.VSFX.Game_Battler_addState.call(this, stateId);
    this.refreshStateMotion(index, motion);
  };

  MageStudios.VSFX.Game_Battler_removeState =
    Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function (stateId) {
    var index = this.stateMotionIndex();
    var motion = this.customStateMotion();
    MageStudios.VSFX.Game_Battler_removeState.call(this, stateId);
    this.refreshStateMotion(index, motion);
  };

  Game_Battler.prototype.customStateMotion = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.stateMotion) return state.stateMotion;
    }
    return "walk";
  };

  Game_Battler.prototype.stateAnimationId = function () {
    var states = this.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.stateAnimationId) return state.stateAnimationId;
    }
    return 0;
  };

  Game_Battler.prototype.refreshStateAnimation = function () {
    if (!this.battler()) return;
    if (!$gameParty.inBattle()) return;
    this.battler().startStateAnimation(this.stateAnimationId());
  };

  Game_Battler.prototype.refreshStateMotion = function (index, motion) {
    if (!this.battler()) return;
    if (index !== this.stateMotionIndex()) {
      this.battler().refreshMotion();
    } else if (motion !== this.customStateMotion()) {
      this.battler().refreshMotion();
    }
  };

  Sprite_Battler.prototype.initChildStateSprites = function (overlay, icon) {
    if (this._stateSprite) {
      this.removeChild(this._stateSprite);
    }
    if (this._stateIconSprite) {
      this.removeChild(this._stateIconSprite);
    }
    if (overlay) {
      if (!this._stateSprite) {
        this._stateSprite = new Sprite_StateOverlay();
      }
      if (this._mainSprite) {
        var index = this.getChildIndex(this._mainSprite);
        this.addChildAt(this._stateSprite, index + 1);
      } else {
        this.addChild(this._stateSprite);
      }
    }
    if (icon) {
      if (!this._stateIconSprite) {
        this._stateIconSprite = new Sprite_StateIcon();
      }
      if (this._mainSprite) {
        var index = this.getChildIndex(this._mainSprite);
        this.addChildAt(this._stateIconSprite, index + 1);
      } else {
        this.addChild(this._stateIconSprite);
      }
    }
  };

  Sprite_Battler.prototype.initStateAnimationSprite = function () {
    if (this._stateAniSprite) return;
    this._stateAniSprite = new Sprite_StateAnimation();
    this.parent.addChild(this._stateAniSprite);
  };

  Sprite_Battler.prototype.setStateSpriteBattler = function (battler) {
    if (this._stateSprite) this._stateSprite.setup(battler);
    if (this._stateIconSprite) this._stateIconSprite.setup(battler);
  };

  Sprite_Battler.prototype.startStateAnimation = function (animationId) {
    if (!this._stateAniSprite) {
      if (this._allowSpriteAni) {
        this.initStateAnimationSprite();
      } else {
        return;
      }
    }
    if (animationId === this._currentStateAni) return;
    var animation = $dataAnimations[animationId];
    this._currentStateAni = animationId;
    this._stateAniSprite.setBattler(this._battler);
    this._stateAniSprite.setup(this.stateEffectTarget(), animation, false, 0);
  };

  Sprite_Battler.prototype.stateEffectTarget = function () {
    return this._effectTarget;
  };

  MageStudios.VSFX.Sprite_Actor_initMembers =
    Sprite_Actor.prototype.initMembers;
  Sprite_Actor.prototype.initMembers = function () {
    MageStudios.VSFX.Sprite_Actor_initMembers.call(this);
    var showOverlay = MageStudios.Param.VSFXActorOver;
    var showIcon = MageStudios.Param.VSFXActorIcons;
    this._allowSpriteAni = MageStudios.Param.VSFXActorAni;
    this.initChildStateSprites(showOverlay, showIcon);
  };

  MageStudios.VSFX.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
  Sprite_Actor.prototype.setBattler = function (battler) {
    var changed = battler !== this._actor;
    MageStudios.VSFX.Sprite_Actor_setBattler.call(this, battler);
    if (changed) {
      this.setStateSpriteBattler(battler);
    }
  };

  MageStudios.VSFX.Sprite_Actor_refreshMotion =
    Sprite_Actor.prototype.refreshMotion;
  Sprite_Actor.prototype.refreshMotion = function () {
    var actor = this._actor;
    if (!actor) return;
    var motionGuard = Sprite_Actor.MOTIONS["guard"];
    if (this._motion === motionGuard && !BattleManager.isInputting()) return;
    var stateMotion = actor.stateMotionIndex();
    if (actor.isInputting() || actor.isActing()) {
      this.startMotion(actor.idleMotion());
    } else if (stateMotion >= 4) {
      this.startMotion(actor.customStateMotion());
    } else {
      MageStudios.VSFX.Sprite_Actor_refreshMotion.call(this);
    }
  };

  MageStudios.VSFX.Sprite_Enemy_initMembers =
    Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    MageStudios.VSFX.Sprite_Enemy_initMembers.call(this);
    var showOverlay = MageStudios.Param.VSFXEnemyOver;
    var showIcon = MageStudios.Param.VSFXEnemyIcons;
    this._allowSpriteAni = MageStudios.Param.VSFXEnemyAni;
    this.initChildStateSprites(showOverlay, showIcon);
  };

  MageStudios.VSFX.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    var changed = battler !== this._battler;
    MageStudios.VSFX.Sprite_Enemy_setBattler.call(this, battler);
    if (changed) {
      this.setStateSpriteBattler(battler);
    }
  };

  if (Imported.MSEP_X_AnimatedSVEnemies) {
    MageStudios.VSFX.Sprite_Enemy_refreshMotion =
      Sprite_Enemy.prototype.refreshMotion;
    Sprite_Enemy.prototype.refreshMotion = function () {
      if (!this._svBattlerEnabled) return;
      var enemy = this._enemy;
      if (!enemy) return;
      var motionGuard = Sprite_Actor.MOTIONS["guard"];
      if (this._motion === motionGuard && !BattleManager.isInputting()) return;
      var stateMotion = enemy.stateMotionIndex();
      if (enemy.isInputting() || enemy.isActing()) {
      } else if (stateMotion >= 4) {
        this.startMotion(enemy.customStateMotion());
      } else {
        MageStudios.VSFX.Sprite_Enemy_refreshMotion.call(this);
      }
    };
  }

  Sprite_Enemy.prototype.stateEffectTarget = function () {
    if (this._svBattlerEnabled) {
      this._effectTarget = this._mainSprite;
    } else {
      this._effectTarget = this;
    }
    return this._effectTarget;
  };

  function Sprite_StateAnimation() {
    this.initialize.apply(this, arguments);
  }

  Sprite_StateAnimation.prototype = Object.create(Sprite_Animation.prototype);
  Sprite_StateAnimation.prototype.constructor = Sprite_StateAnimation;

  Sprite_StateAnimation.prototype.initialize = function () {
    Sprite_Animation.prototype.initialize.call(this);
  };

  Sprite_StateAnimation.prototype.update = function () {
    Sprite_Animation.prototype.update.call(this);
    if (this._animation) {
      this.updateLoop();
    } else {
      this.opacity = 0;
    }
  };

  Sprite_StateAnimation.prototype.setup = function (
    target,
    ani,
    mirror,
    delay
  ) {
    this.clearCellSprites();
    if (ani) {
      Sprite_Animation.prototype.setup.call(this, target, ani, mirror, delay);
    } else {
      this._animation = null;
      this._duration = 0;
    }
  };

  Sprite_StateAnimation.prototype.setBattler = function (battler) {
    this._battler = battler;
  };

  Sprite_StateAnimation.prototype.clearCellSprites = function () {
    if (!this._cellSprites) return;
    for (var i = 0; i < 16; i++) {
      var sprite = this._cellSprites[i];
      this.removeChild(sprite);
    }
  };

  Sprite_StateAnimation.prototype.remove = function () {};

  Sprite_StateAnimation.prototype.updateLoop = function () {
    if (this.isPlaying()) return;
    this.opacity = this._battler.battler().opacity;
    this.setupDuration();
  };

  Sprite_StateAnimation.prototype.processTimingData = function (timing) {
    var duration = timing.flashDuration * this._rate;
    switch (timing.flashScope) {
      case 1:
        if (MageStudios.Param.VSFXAniTarget) {
          this.startFlash(timing.flashColor, duration);
        }
        break;
      case 2:
        if (MageStudios.Param.VSFXAniScreen) {
          this.startScreenFlash(timing.flashColor, duration);
        }
        break;
      case 3:
        if (MageStudios.Param.VSFXAniHide) {
          this.startHiding(duration);
        }
        break;
    }
    if (!this._duplicated && timing.se) {
      if (MageStudios.Param.VSFXAniSound) {
        AudioManager.playSe(timing.se);
      }
    }
  };
}
