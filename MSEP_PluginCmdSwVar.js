var Imported = Imported || {};
Imported.MSEP_PluginCmdSwVar = true;

var MageStudios = MageStudios || {};
MageStudios.PCSV = MageStudios.PCSV || {};
MageStudios.PCSV.version = 1.0;

/*:
 * @plugindesc Make it easier to use Switch and Variable values for
 * plugin commands across the board!
 * @author Mage Studios Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Plugin Commands are one of the more useful additions to RPG Maker MV from
 * its previous iterations. They offer the ability to launch custom plugin
 * functions without the structural complexity of script calls. However, the
 * Plugin Commands themselves aren't too flexible as the values inserted into
 * the command strings tend to be fixed. This plugin allows you to use
 * variables and switches to make the Plugin Commands values more flexible.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * When you make a Plugin Command event that you'd like for data to become more
 * dynamic and/or flexible, use the following Plugin Command replacement codes
 * to produce new effects:
 *
 * ---
 *
 * Variables:
 *
 *  v[x]
 *  - Replaces v[x] with the value of variable x.
 *
 *  Examples:
 *
 *  Quest Add v[8]
 *  - MSEP_QuestJournal's Quest Add x Plugin Command will now use variable 8 to
 *  determine which quest to add.
 *
 *  gainJp v[11] v[12]
 *  - MSEP_JobPoints's gainJp actorId jp Plugin Command will use variable 11 to
 *  determine the actorId to give variable 12's value as JP to add to.
 *
 * ---
 *
 * Switches:
 *
 *  {s[x] ? OnText : OffText}
 *  - Replaces everything inside the { } brackets depending on Switch x.
 *  If Switch x is ON, then it will be replaced with the 'OnText' string.
 *  If Switch x is OFF, then it will be replaced with the 'OffText' string.
 *
 *  Examples:
 *
 *  EventTimer {s[1] ? Pause : Resume}
 *  - MSEP_EventTimerControl's EventTimer Plugin Command will now Pause if
 *  Switch 1 is ON or Resume if Switch 1 is OFF.
 *
 *  ForceAdvantage {s[2] ? Preemptive : Surprise}
 *  - MSEP_ForceAdvantage's ForceAdvantage Plugin Command will give the player
 *  a preemptive strike if Switch 2 is ON or give the enemy a surprise attack
 *  advantage if Switch 2 is OFF.
 *
 * ---
 *
 * Combined:
 *
 *  You can combine both the variable and switches together for more complex
 *  Plugin Commands using both types.
 *
 *  Examples:
 *
 *  ShowIconBalloon v[15] on {s[5] ? Player : Event v[16]}
 *  - MSEP_IconBalloons's ShowIconBalloon x on y Plugin Command will now show
 *  an icon based on Variable 15 on the Player if Switch 5 is ON. If Switch 5
 *  is OFF, then it will show the icon on an event determined by Variable 16.
 *
 *  Quest v[20] {s[10] ? Show : Hide} Reward v[21]
 *  - MSEP_QuestJournal's Quest x Show/Hide Reward y Plugin Command will have
 *  a quest affected by Variable 20 change its reward settings to Show or Hide
 *  based on Switch 10. The reward ID changed is based on Variable 21.
 *
 * ---
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 */

MageStudios.PCSV.Game_Interpreter_command356 =
  Game_Interpreter.prototype.command356;
Game_Interpreter.prototype.command356 = function () {
  var originalString = this._params[0];
  this.processPluginCommandSwitchVariables();
  var value = MageStudios.PCSV.Game_Interpreter_command356.call(this);
  this._params[0] = originalString;
  return value;
};

Game_Interpreter.prototype.processPluginCommandSwitchVariables = function () {
  var text = this._params[0];

  text = text.replace(
    /\{S\[(\d+)\][ ]\?[ ](.*)[ ]:[ ](.*)\}/gi,
    function () {
      var text1 = String(arguments[2]);
      var text2 = String(arguments[3]);
      return $gameSwitches.value(parseInt(arguments[1])) ? text1 : text2;
    }.bind(this)
  );

  text = text.replace(
    /V\[(\d+)\]/gi,
    function () {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this)
  );
  text = text.replace(
    /V\[(\d+)\]/gi,
    function () {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this)
  );
  text = text.replace(
    /V\[(\d+)\]/gi,
    function () {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this)
  );

  this._params[0] = text;
};
