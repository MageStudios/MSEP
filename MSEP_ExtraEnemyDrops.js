var Imported = Imported || {};
Imported.MSEP_ExtraEnemyDrops = true;

var MageStudios = MageStudios || {};
MageStudios.EED = MageStudios.EED || {};
MageStudios.EED.version = 1.0;

/*:
 * @plugindesc Allows your enemies to drop more than just three
 * items as per the editor's limit.
 * @author Mage Studios Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MV limits enemies to only drop up to 3 items max and
 * at very limited drop rates. This plugin allows you to add more than 3 items
 * at drop. In addition to having more than 3 drops, this plugin also allows
 * you to expand the enemy drops to have conditional drops, drops that will
 * only appear before the player if certain conditions are met.
 *
 * ============================================================================
 * Generic Drop - Notetags
 * ============================================================================
 *
 * Use the following notetags to determine extra enemy drops. These drops will
 * drop normally without any special conditions other than having to go through
 * and pass a random number generator.
 *
 * Enemy Notetags:
 *   <Item x: y%>
 *   <Weapon x: y%>
 *   <Armor x: y%>
 *   Adds item, weapon, or armor ID of x to the enemy's drop pool with a y%
 *   chance of dropping the item. Insert multiples of this notetag to add more
 *   drop items for the enemy drop pool.
 *
 *   <Enemy Drops>
 *    Item x: y%
 *    Weapon x: y%
 *    Armor x: y%
 *   </Enemy Drops>
 *   Alternatively, using the above notetag format will allow you to group a
 *   large number of enemy drops together. Replace x with the item, weapon, or
 *   armor ID to give the item a drop rate of y%.
 *
 *   <Drop Potion: x%>
 *   <Drop Short Sword: x%>
 *   <Drop Feather Cap: x%>
 *   If you prefer to use names instead, you can use the above format for the
 *   notetags. This will make the named item have a drop rate of x%. If you
 *   have multiple items in your database with the same name, priority will be
 *   given to the item with the highest ID in the order of item, weapons, then
 *   armors. Insert multiple multiples of this notetag to add more drop items
 *   for the enemy drop pool.
 *
 *   <Enemy Drops>
 *    Potion: x%
 *    Short Sword: x%
 *    Feather Cap: x%
 *   </Enemy Drops>
 *   Alternatively, you can write your notetag like such to group together a
 *   list of named items. This will make the named item have a drop rate of x%.
 *   If you have multiple items in your database with the same name, priority
 *   will be given to the item with the highest ID in the order of item,
 *   weapons, then armors. Insert multiple multiples of this notetag to add
 *   more drop items for the enemy drop pool.
 *
 * ============================================================================
 * Conditional Drop - Notetags
 * ============================================================================
 *
 * Sometimes, you want certain conditions to be met before enemies will drop a
 * specific item. These conditional drops would have a 0% chance otherwise. For
 * each condition met, you can increase or decrease the drop rate. Use the
 * below format to create a conditional drop.
 *
 * Enemy Notetags:
 *   <Conditional Item x Drop>
 *    condition: +y%
 *    condition: -y%
 *   </Conditional Item x Drop>
 *
 *   <Conditional Weapon x Drop>
 *    condition: +y%
 *    condition: -y%
 *   </Conditional Weapon x Drop>
 *
 *   <Conditional Armor x Drop>
 *    condition: +y%
 *    condition: -y%
 *   </Conditional Armor x Drop>
 *   The above notetags will create the conditions for item, weapon, or armor x
 *   to drop. Insert various conditions in between the notetags to produce the
 *   conditional rate increases or decreases of y% for the drop.
 *
 *   <Conditional Named Drop>
 *    condition: +y%
 *    condition: -y%
 *   </Conditional Named Drop>
 *   If you prefer to name your drop, use the above format. If database entries
 *   have matching names, priority will be given to the item with the highest
 *   ID in the order of items, weapons, then armor. Insert various conditions
 *   in between the notetags to produce the conditional rate increases or
 *   decreases for y% for the drop.
 *
 * The following are various conditions you may use:
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALIVE MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of alive party members the player has when the drops
 * are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Alive Members > 1: +20%
 *            Alive Members === 2: +25%
 *            Alive Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALWAYS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This condition will always pass. This can be used as setting a base rate for
 * the item drop.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Always: +50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * item x COUNT EVAL
 * weapon x COUNT EVAL
 * armor x COUNT EVAL
 * named item COUNT EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the quantity of specific items, weapons, armors, and/or named
 * items you have. If you choose a named item and multiple database entries
 * share the name of that named item, priority will be given to the highest ID
 * in the order of items, weapons, and then armor.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Item 1 Count > 1: +20%
 *            Weapon 2 Count === 2: +25%
 *            Armor 3 Count <= 3: -30%
 *            Potion Count >= 4: +35%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEAD MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of dead party members the player has when the drops
 * are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Dead Members > 1: +20%
 *            Dead Members === 2: +25%
 *            Dead Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEATH TURN EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the turn number the enemy has died.
 * This effect requires the Battle Engine Core.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Death Turn > 5: +10%
 *            Death Turn === 5: +20%
 *            Death Turn <= 4: +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ENEMY LEVEL EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the enemy's level. This effect
 * requires the YEP Enemy Levels plugin.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Enemy Level === 10: +30%
 *            Enemy Level <= 5: -20%
 *            Enemy Level >= 15: +10%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check for the code you've inserted. If it returns true
 * then the condition is met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval user.name() === 'Bat A': +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * LAST STRIKE SKILL X
 * LAST STRIKE ITEM X
 * LAST STRIKE named
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks to see if the last strike on the enemy is item x, skill x, or a
 * named action. If a named action is used and multiple database entries share
 * the name of the action, priority will be given to the highest ID in the
 * order of skills then items.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Last Strike Skill 40: +20%
 *            Last Strike Item 50: -30%
 *            Last Strike Firaga: +40%
 *            Last Strike Ice Bomb: -50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PARTY MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of party members (dead or alive) the player has when
 * the drops are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Members > 1: +20%
 *            Party Members === 2: +25%
 *            Party Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This condition has a random x% chance to pass.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random 20%: +40%
 *            Random 30%: -60%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES ELEMENT X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by element x.
 * You can also replace x with the name of the item.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Element Fire Struck > 6: +10%
 *            Times Element 3 Struck === 5: -10%
 *            Times Element Thunder <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES ITEM X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by item x. You
 * can also replace x with the name of the item.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Item Bomb Struck > 6: +10%
 *            Times Item 42 Struck === 5: -10%
 *            Times Item Uni Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES SKILL X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by skill x. You
 * can also replace x with the name of the skill.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Skill Firaga Struck > 6: +10%
 *            Times Skill 40 Struck === 5: -10%
 *            Times Skill Thundaga Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES STATE X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by state x.
 * You can also replace x with the name of the state.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times State 4 Struck > 6: +10%
 *            Times State Blind Struck === 5: -10%
 *            Times State Silence Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES STYPE X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by skill type x.
 * You can also replace x with the name of the skill type.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times SType 1 Struck > 6: +10%
 *            Times SType Magic Struck === 5: -10%
 *            Times SType Special Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH X ON
 * SWITCH X OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace X with a switch ID. If switch X is ON or OFF, the condition is met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 5 ON: +10%
 *            Switch 6 OFF: -10%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the number of turns the battle has
 * gone on for until the time the drops have been made.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Turn > 5: +10%
 *            Turn === 5: +20%
 *            Turn <= 4: +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE X EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace X with a variable ID. This will run an eval check to compare the
 * variable's value to see if it meets the conditions.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Variable 5 > 10: +20%
 *            Variable 6 === 11: +25%
 *            Variable 7 <= 12: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions~
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can make use of some of these
 * newly added functions when you do an eval check for the enemy:
 *
 * enemy.deathTurn()
 * This will return the turn the enemy died as an integer.
 *
 * enemy.killer()
 * This will return the enemy's killer. If you would like to reference the
 * killer's HP, it'd be enemy.killer().hp
 *
 * enemy.lastStruckAction()
 * This will return either a skill or item that the enemy was last struck with.
 *
 * enemy.timesStruckSkill(skill ID)
 * This will return a number value for the number of times it was struck by
 * the skill referenced by the skill ID.
 *
 * enemy.timesStruckItem(item ID)
 * This will return a number value for the number of times it was struck by
 * the item referenced by the item ID.
 *
 * enemy.timesStruckSType(skill type ID)
 * This will return a number value for the number of times it was struck by
 * skills of the skill type ID.
 *
 * enemy.timesStruckState(state ID)
 * This will return a number value for the number of times it was struck by
 * the state referenced by the state ID.
 *
 * enemy.timesStruckElement(element ID)
 * This will return a number value for the number of times it was struck by
 * the element referenced by the element ID.
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_ExtraEnemyDrops");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.Variables = String(MageStudios.Parameters["Variables"]);

MageStudios.EED.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  if (!MageStudios.EED.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!MageStudios._loaded_MSEP_ExtraEnemyDrops) {
    this.processEEDNotetagsI($dataItems);
    this.processEEDNotetagsW($dataWeapons);
    this.processEEDNotetagsA($dataArmors);
    this.processEEDNotetagsS($dataSkills);
    this.processEEDNotetagsT($dataStates);
    this.processEEDNotetagsSys($dataSystem);
    this.processEEDNotetags1($dataEnemies);
    MageStudios._loaded_MSEP_ExtraEnemyDrops = true;
  }
  return true;
};

DataManager.processEEDNotetagsI = function (group) {
  if (MageStudios.ItemIdRef) return;
  MageStudios.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    MageStudios.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEEDNotetagsW = function (group) {
  if (MageStudios.WeaponIdRef) return;
  MageStudios.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    MageStudios.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEEDNotetagsA = function (group) {
  if (MageStudios.ArmorIdRef) return;
  MageStudios.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    MageStudios.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEEDNotetagsS = function (group) {
  if (MageStudios.SkillIdRef) return;
  MageStudios.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    MageStudios.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEEDNotetagsT = function (group) {
  if (MageStudios.StateIdRef) return;
  MageStudios.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    MageStudios.StateIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEEDNotetagsSys = function (group) {
  MageStudios.STypeIdRef = {};
  for (var i = 1; i < group.skillTypes.length; ++i) {
    var name = group.skillTypes[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, "");
    MageStudios.STypeIdRef[name] = i;
  }
  MageStudios.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, "");
    MageStudios.ElementIdRef[name] = i;
  }
};

DataManager.processEEDNotetags1 = function (group) {
  var noteD1 = /<(?:ITEM|DROP ITEM)[ ](\d+):[ ](\d+)([%％])>/i;
  var noteD2 = /<(?:WEAPON|DROP WEAPON)[ ](\d+):[ ](\d+)([%％])>/i;
  var noteD3 = /<(?:ARMOR|DROP armor)[ ](\d+):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.dropsMade) continue;
    var notedata = obj.note.split(/[\r\n]+/);

    obj.dropsMade = true;
    obj.conditionalDropItems = [];
    var conditionalLines = [];
    var evalMode = "none";

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteD1)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 1);
      } else if (line.match(noteD2)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 2);
      } else if (line.match(noteD3)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 3);
      } else if (line.match(/<DROP[ ](.*):[ ](\d+)([%％])>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        if (MageStudios.ItemIdRef[name]) {
          var id = MageStudios.ItemIdRef[name];
          var kind = 1;
        } else if (MageStudios.WeaponIdRef[name]) {
          var id = MageStudios.WeaponIdRef[name];
          var kind = 2;
        } else if (MageStudios.ArmorIdRef[name]) {
          var id = MageStudios.ArmorIdRef[name];
          var kind = 3;
        } else {
          continue;
        }
        this.createEnemyDrop(obj, id, rate, kind);
      } else if (line.match(/<(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = "drops";
      } else if (line.match(/<\/(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = "none";
      } else if (evalMode === "drops") {
        if (line.match(/ITEM[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 1);
        } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 2);
        } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 3);
        } else if (line.match(/(.*):[ ](\d+)([%％])/i)) {
          var name = String(RegExp.$1).toUpperCase();
          var rate = parseFloat(RegExp.$2) * 0.01;
          if (MageStudios.ItemIdRef[name]) {
            var id = MageStudios.ItemIdRef[name];
            var kind = 1;
          } else if (MageStudios.WeaponIdRef[name]) {
            var id = MageStudios.WeaponIdRef[name];
            var kind = 2;
          } else if (MageStudios.ArmorIdRef[name]) {
            var id = MageStudios.ArmorIdRef[name];
            var kind = 3;
          } else {
            continue;
          }
          this.createEnemyDrop(obj, id, rate, kind);
        }
      } else if (line.match(/<CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = "conditionalDrop";
        conditionalLines = [];
      } else if (line.match(/<\/CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = "none";
        var name = String(RegExp.$1).toUpperCase();
        if (name.match(/ITEM[ ](\d+)/i)) {
          var item = $dataItems[parseInt(RegExp.$1)];
        } else if (name.match(/WEAPON[ ](\d+)/i)) {
          var item = $dataWeapons[parseInt(RegExp.$1)];
        } else if (name.match(/ARMOR[ ](\d+)/i)) {
          var item = $dataArmors[parseInt(RegExp.$1)];
        } else if (MageStudios.ItemIdRef[name]) {
          var id = MageStudios.ItemIdRef[name];
          var item = $dataItems[id];
        } else if (MageStudios.WeaponIdRef[name]) {
          var id = MageStudios.WeaponIdRef[name];
          var item = $dataWeapons[id];
        } else if (MageStudios.ArmorIdRef[name]) {
          var id = MageStudios.ArmorIdRef[name];
          var item = $dataArmors[id];
        } else {
          continue;
        }
        if (!item) continue;
        var arr = [item, conditionalLines];
        obj.conditionalDropItems.push(arr);
        conditionalLines = [];
      } else if (evalMode === "conditionalDrop") {
        conditionalLines.push(line);
      }
    }
  }
};

DataManager.createEnemyDrop = function (obj, dataId, rate, kind) {
  var dropItem = {
    dataId: dataId,
    denominator: 1 / rate,
    kind: kind,
  };
  obj.dropItems.push(dropItem);
};

MageStudios.EED.Game_BattlerBase_addNewState =
  Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function (stateId) {
  MageStudios.EED.Game_BattlerBase_addNewState.call(this, stateId);
  if (this.isEnemy()) this.markStruckState(stateId);
  if (stateId === this.deathStateId() && this.isEnemy()) {
    this.markDeathTurn();
  }
};

MageStudios.EED.Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function () {
  var drops = MageStudios.EED.Game_Enemy_makeDropItems.call(this);
  drops = drops.concat(this.makeConditionalDropItems());
  return drops;
};

Game_Enemy.prototype.makeConditionalDropItems = function () {
  var drops = DropManager.setup(this);
  return drops;
};

Game_Enemy.prototype.markDeathTurn = function () {
  if (this._selfTurnCount !== undefined) {
    this._deathTurn = this._selfTurnCount;
  } else {
    this._deathTurn = $gameTroop.turnCount();
  }
};

Game_Enemy.prototype.markStruckState = function (id) {
  this.createTimesStruck();
  this._struckStates[id] = this._struckStates[id] || 0;
  this._struckStates[id] = this._struckStates[id] + 1;
};

Game_Enemy.prototype.deathTurn = function () {
  return this._deathTurn || 0;
};

Game_Enemy.prototype.createTimesStruck = function () {
  if (this._struckSkills === undefined) this._struckSkills = {};
  if (this._struckSType === undefined) this._struckSType = {};
  if (this._struckItems === undefined) this._struckItems = {};
  if (this._struckStates === undefined) this._struckStates = {};
  if (this._struckElements === undefined) this._struckElements = {};
  if (this._lastStruckId === undefined) this._lastStruckId = 0;
  if (this._lastStruckSkill === undefined) this._lastStruckSkill = false;
  if (this._lastStruckActor === undefined) this._lastStruckActor = null;
};

Game_Enemy.prototype.lastStruckAction = function () {
  if (this._lastStruckId === undefined) this.createTimesStruck();
  if (this._lastStruckSkill === undefined) this.createTimesStruck();
  if (this._lastStruckSkill) {
    return $dataSkills[this._lastStruckId];
  } else {
    return $dataItems[this._lastStruckId];
  }
};

Game_Enemy.prototype.markStruckActions = function (item, subject, action) {
  if (!item) return;
  this.createTimesStruck();
  this._lastStruckId = item.id;
  this._lastStruckSkill = DataManager.isSkill(item);
  this.markLastStruckActor(subject);
  if (DataManager.isSkill(item)) {
    this._struckSkills[item.id] = this._struckSkills[item.id] || 0;
    this._struckSkills[item.id] = this._struckSkills[item.id] + 1;
    this._struckSType[item.stypeId] = this._struckSType[item.stypeId] || 0;
    this._struckSType[item.stypeId] = this._struckSType[item.stypeId] + 1;
  }
  if (DataManager.isItem(item)) {
    this._struckItems[item.id] = this._struckItems[item.id] || 0;
    this._struckItems[item.id] = this._struckItems[item.id] + 1;
  }
  this.markStruckElements(item, subject, action);
};

Game_Enemy.prototype.killer = function () {
  if (this._lastStruckActor > 0) {
    return $gameActors.actor(this._lastStruckActor);
  } else {
    return this;
  }
};

Game_Enemy.prototype.markLastStruckActor = function (subject) {
  if (subject && subject.isActor()) this._lastStruckActor = subject.actor().id;
};

Game_Enemy.prototype.markStruckElements = function (item, subject, action) {
  if (Imported.MSEP_ElementCore && action) {
    var elements = action.getItemElements();
  } else if (item.daMageStudios.elementId < 0) {
    var elements = subject.attackElements();
  } else {
    var elements = [item.daMageStudios.elementId];
  }
  var length = elements.length;
  for (var i = 0; i < length; ++i) {
    var eleId = elements[i];
    if (eleId <= 0) continue;
    this._struckElements[eleId] = this._struckElements[eleId] || 0;
    this._struckElements[eleId] = this._struckElements[eleId] + 1;
  }
};

Game_Enemy.prototype.timesStruckSkill = function (id) {
  this.createTimesStruck();
  return this._struckSkills[id] || 0;
};

Game_Enemy.prototype.timesStruckItem = function (id) {
  this.createTimesStruck();
  return this._struckItems[id] || 0;
};

Game_Enemy.prototype.timesStruckSType = function (id) {
  this.createTimesStruck();
  return this._struckSType[id] || 0;
};

Game_Enemy.prototype.timesStruckState = function (id) {
  this.createTimesStruck();
  return this._struckStates[id] || 0;
};

Game_Enemy.prototype.timesStruckElement = function (id) {
  this.createTimesStruck();
  return this._struckElements[id] || 0;
};

MageStudios.EED.Game_Action_applyItemUserEffect =
  Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function (target) {
  MageStudios.EED.Game_Action_applyItemUserEffect.call(this, target);
  if (target && target.isEnemy()) {
    target.markStruckActions(this.item(), this.subject(), this);
  }
};

function DropManager() {
  throw new Error("This is a static class");
}

DropManager.setup = function (enemy) {
  this._enemy = enemy;
  this._data = this._enemy.enemy().conditionalDropItems;
  this._drops = [];
  this.makeConditionalDropItems();
  return this._drops;
};

DropManager.makeConditionalDropItems = function () {
  var length = this._data.length;
  if (length <= 0) return;
  for (var i = 0; i < length; ++i) {
    var data = this._data[i];
    var item = data[0];
    var conditions = data[1];
    if (Math.random() < this.getConditionalRate(conditions)) {
      this._drops.push(item);
    }
  }
};

DropManager.getConditionalRate = function (conditions) {
  var rate = 0;
  var length = conditions.length;
  for (var i = 0; i < length; ++i) {
    var condition = conditions[i];
    if (condition.match(/(.*):[ ]([\+\-]\d+)([%％])/i)) {
      var line = String(RegExp.$1);
      var value = parseFloat(RegExp.$2) * 0.01;
      if (this.meetsLineCondition(line)) rate += value;
    }
  }
  return rate;
};

DropManager.meetsLineCondition = function (line) {
  if (line.match(/EVAL[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionEval(line);
  }

  if (line.match(/ALIVE MEMBERS[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionAliveMembers(line);
  }

  if (line.toUpperCase() === "ALWAYS") {
    return this.conditionAlways();
  }

  if (line.match(/(.*)[ ]COUNT[ ](.*)/i)) {
    var line1 = String(RegExp.$1);
    var line2 = String(RegExp.$2);
    return this.conditionCount(line1, line2);
  }

  if (line.match(/DEAD MEMBERS[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionDeadMembers(line);
  }

  if (line.match(/DEATH TURN[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionDeathTurn(line);
  }

  if (line.match(/ENEMY LEVEL[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionEnemyLevel(line);
  }

  if (line.match(/LAST STRIKE[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionLastStrike(line);
  }

  if (line.match(/PARTY MEMBERS[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionPartyMembers(line);
  }

  if (line.match(/RANDOM[ ](\d+)([%％])/i)) {
    var rate = parseFloat(RegExp.$1) * 0.01;
    return this.conditionRandom(rate);
  }

  if (line.match(/TIMES[ ](.*)[ ]STRUCK[ ](.*)/i)) {
    var line1 = String(RegExp.$1);
    var line2 = String(RegExp.$2);
    return this.conditionTimesStruck(line1, line2);
  }

  if (line.match(/SWITCH[ ](\d+)[ ](.*)/i)) {
    var switchId = parseInt(RegExp.$1);
    var switchCase = String(RegExp.$2).toUpperCase();
    return this.conditionSwitch(switchId, switchCase);
  }

  if (line.match(/TURN[ ](.*)/i)) {
    var line = String(RegExp.$1);
    return this.conditionTurn(line);
  }

  if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
    var varId = parseInt(RegExp.$1);
    var varLine = String(RegExp.$2).toUpperCase();
    return this.conditionVariable(varId, varLine);
  }
  return false;
};

DropManager.conditionAliveMembers = function (line) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "$gameParty.aliveMembers().length " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP ALIVE CONDITION ERROR");
    return false;
  }
};

DropManager.conditionAlways = function () {
  return true;
};

DropManager.conditionCount = function (line1, line2) {
  var item = null;
  if (line1.match(/ITEM[ ](\d+)/i)) {
    item = $dataItems[parseInt(RegExp.$1)];
  } else if (line1.match(/WEAPON[ ](\d+)/i)) {
    item = $dataWeapons[parseInt(RegExp.$1)];
  } else if (line1.match(/ARMOR[ ](\d+)/i)) {
    item = $dataArmors[parseInt(RegExp.$1)];
  } else if (MageStudios.ItemIdRef[line1.toUpperCase()]) {
    item = $dataItems[MageStudios.ItemIdRef[line1.toUpperCase()]];
  } else if (MageStudios.WeaponIdRef[line1.toUpperCase()]) {
    item = $dataWeapons[MageStudios.WeaponIdRef[line1.toUpperCase()]];
  } else if (MageStudios.ArmorIdRef[line1.toUpperCase()]) {
    item = $dataArmors[MageStudios.ArmorIdRef[line1.toUpperCase()]];
  }
  if (!item) return false;
  if (Imported.MSEP_ItemCore && DataManager.isIndependent(item)) {
    var quantity = $gameParty.numIndependentItems(item);
  } else {
    var quantity = $gameParty.numItems(item);
  }
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "quantity " + line2;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP COUNT ERROR");
    return false;
  }
};

DropManager.conditionDeadMembers = function (line) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "$gameParty.deadMembers().length " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP DEAD MEMBERS ERROR");
    return false;
  }
};

DropManager.conditionDeathTurn = function (line) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "user.deathTurn() " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP DEATH TURN ERROR");
    return false;
  }
};

DropManager.conditionEnemyLevel = function (line) {
  if (!Imported.MSEP_EnemyLevels) return false;
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "enemy.level " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP ENEMY LEVEL ERROR");
    return false;
  }
};

DropManager.conditionLastStrike = function (line) {
  if (line.match(/SKILL[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    return this._enemy.lastStruckAction() === $dataSkills[id];
  } else if (line.match(/ITEM[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    return this._enemy.lastStruckAction() === $dataItems[id];
  } else if (MageStudios.SkillIdRef[line.toUpperCase()]) {
    var id = MageStudios.SkillIdRef[line.toUpperCase()];
    return this._enemy.lastStruckAction() === $dataSkills[id];
  } else if (MageStudios.ItemIdRef[line.toUpperCase()]) {
    var id = MageStudios.ItemIdRef[line.toUpperCase()];
    return this._enemy.lastStruckAction() === $dataItems[id];
  }
  return false;
};

DropManager.conditionPartyMembers = function (line) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "$gameParty.battleMembers().length " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP PARTY SIZE ERROR");
    return false;
  }
};

DropManager.conditionRandom = function (rate) {
  return Math.random() < rate;
};

DropManager.conditionSwitch = function (switchId, switchCase) {
  var condition = false;
  if (["ON", "TRUE"].contains(switchCase)) condition = true;
  return $gameSwitches.value(switchId) === condition;
};

DropManager.conditionTimesStruck = function (line1, line2) {
  var times = this.getTimesStruck(line1);
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "times " + line2;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP TIMES STRUCK ERROR");
    return false;
  }
};

DropManager.getTimesStruck = function (line) {
  var times = 0;
  if (line.match(/SKILL[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    times = this._enemy.timesStruckSkill(id);
  } else if (line.match(/SKILL[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.SkillIdRef[name]) {
      var id = MageStudios.SkillIdRef[name];
      times = this._enemy.timesStruckSkill(id);
    }
  } else if (line.match(/ITEM[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    times = this._enemy.timesStruckItem(id);
  } else if (line.match(/ITEM[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.ItemIdRef[name]) {
      var id = MageStudios.ItemIdRef[name];
      times = this._enemy.timesStruckItem(id);
    }
  } else if (line.match(/STYPE[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    times = this._enemy.timesStruckSType(id);
  } else if (line.match(/STYPE[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.STypeIdRef[name]) {
      var id = MageStudios.STypeIdRef[name];
      times = this._enemy.timesStruckSType(id);
    }
  } else if (line.match(/STATE[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    times = this._enemy.timesStruckState(id);
  } else if (line.match(/STATE[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.StateIdRef[name]) {
      var id = MageStudios.StateIdRef[name];
      times = this._enemy.timesStruckState(id);
    }
  } else if (line.match(/ELEMENT[ ](\d+)/i)) {
    var id = parseInt(RegExp.$1);
    times = this._enemy.timesStruckElement(id);
  } else if (line.match(/ELEMENT[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.ElementIdRef[name]) {
      var id = MageStudios.ElementIdRef[name];
      times = this._enemy.timesStruckElement(id);
    }
  }
  return times;
};

DropManager.conditionTurn = function (line) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = "$gameTroop.turnCount() " + line;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP TURN ERROR");
    return false;
  }
};

DropManager.conditionVariable = function (varId, varLine) {
  var value = false;
  var code = "$gameVariables.value(varId) " + varLine;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP VARIABLE ERROR");
    return false;
  }
};

DropManager.conditionEval = function (code) {
  var user = this._enemy;
  var enemy = this._enemy;
  var a = this._enemy;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    return eval(code);
  } catch (e) {
    MageStudios.Util.displayError(e, code, "ENEMY DROP EVAL ERROR");
    return false;
  }
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
