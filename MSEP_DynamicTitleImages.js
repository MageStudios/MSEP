var Imported = Imported || {};
Imported.MSEP_DynamicTitleImages = true;

var MageStudios = MageStudios || {};
MageStudios.DTI = MageStudios.DTI || {};
MageStudios.DTI.version = 1.0;

/*:
 * @plugindesc Change title images depending on how far along your game
 * the player has progressed.
 * @author Mage Studios Engine Plugins
 *
 * @param RequireSaveGame
 * @text Require Save Game?
 * @type boolean
 * @on YES
 * @off NO
 * @desc Require a save game to be present to show a custom title
 * image? If one isn't present, the default images are used.
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Title images can do a lot to give your game a decent first impression.
 * However, when they're the same thing seen over and over during multiple
 * loads, playthroughs, etc., they can get old pretty fast. This plugin gives
 * you, the game developer, the ability to change the title screen image(s) to
 * whatever you want during any point of the game you want, so that the next
 * time your players return to the title screen, they'll be treated with
 * something new and refreshing!
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Choosing what title screen image will appear is quite simple. By default,
 * the image that will be shown will be the ones applied in the settings.
 * But if you want to control it when the player has reached a certain point in
 * your game, put in these plugin commands in an event to determine what images
 * will be shown the next time your player views the title screen:
 *
 * Plugin Commands:
 *
 * ChangeTitle1 filename
 * ChangeTitle2 filename
 * - Replace 'filename' with the image's filename found in your 'titles1' or
 * 'titles2' folders respectively. Make sure the filename is exactly as it
 * appears as it is case sensitive. Once an event runs this plugin command, the
 * next time the player visits the title screen, the new image(s) will appear.
 *
 * ClearChangeTitle1
 * ClearChangeTitle2
 * - This will revert the Title1 or Title2 images back to default respectively.
 * The player will see the default Title1/Title2 image that's been applied in
 * the game's database settings.
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_DynamicTitleImages");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.DTIRequireSaveGame = String(
  MageStudios.Parameters["RequireSaveGame"]
);
MageStudios.Param.DTIRequireSaveGame = eval(
  MageStudios.Param.DTIRequireSaveGame
);

ConfigManager.title1ImageName = "";
ConfigManager.title2ImageName = "";

MageStudios.DTI.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = MageStudios.DTI.ConfigManager_makeData.call(this);
  config.title1ImageName = this.title1ImageName;
  config.title2ImageName = this.title2ImageName;
  return config;
};

MageStudios.DTI.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  MageStudios.DTI.ConfigManager_applyData.call(this, config);
  this.title1ImageName = config.title1ImageName || "";
  this.title2ImageName = config.title2ImageName || "";
};

MageStudios.DTI.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  MageStudios.DTI.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === "ChangeTitle1") {
    var filename = this.argsToString(args);
    ConfigManager.title1ImageName = filename;
    ConfigManager.save();
  } else if (command === "ChangeTitle2") {
    var filename = this.argsToString(args);
    ConfigManager.title2ImageName = filename;
    ConfigManager.save();
  } else if (command === "ClearChangeTitle1") {
    ConfigManager.title1ImageName = "";
    ConfigManager.save();
  } else if (command === "ClearChangeTitle2") {
    ConfigManager.title2ImageName = "";
    ConfigManager.save();
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

MageStudios.DTI.Scene_Title_createBackground =
  Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function () {
  var originalTitle1 = $dataSystem.title1Name;
  var originalTitle2 = $dataSystem.title2Name;
  this.changeTitleBackgroundImages();
  MageStudios.DTI.Scene_Title_createBackground.call(this);
  $dataSystem.title1Name = originalTitle1;
  $dataSystem.title2Name = originalTitle2;
};

Scene_Title.prototype.changeTitleBackgroundImages = function () {
  if (
    MageStudios.Param.DTIRequireSaveGame &&
    !DataManager.isAnySavefileExists()
  ) {
    return;
  }
  if (ConfigManager.title1ImageName) {
    $dataSystem.title1Name = ConfigManager.title1ImageName;
  }
  if (ConfigManager.title2ImageName) {
    $dataSystem.title2Name = ConfigManager.title2ImageName;
  }
};
