//=============================================================================
// Mage Studios Engine Plugins - Save Core
// MSEP_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.MSEP_SaveCore = true;

var MageStudios = MageStudios || {};
MageStudios.Save = MageStudios.Save || {};
MageStudios.Save.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc Alter the save menu for a more aesthetic layout
 * and take control over the file system's rules.
 * @author Mage Studios Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Max Files
 * @parent ---General---
 * @type number
 * @min 1
 * @desc The maximum number of files for your game.
 * Default: 20
 * @default 24
 *
 * @param Saved Icon
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Icon ID used for a file slot with a save.
 * @default 231
 *
 * @param Empty Icon
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Icon ID used for an empty file slot.
 * @default 230
 *
 * @param Return After Saving
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Return to the previous scene after saving?
 * NO - false     YES - true     Default: true
 * @default false
 * 
 * @param Auto New Index
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc For new games, automatically decide the save slot?
 * NO - false     YES - true     Default: true
 * @default true
 *
 * @param ---Action Window---
 * @default
 *
 * @param Load Command
 * @parent ---Action Window---
 * @desc Text for the load command in the action window.
 * @default Load
 *
 * @param Save Command
 * @parent ---Action Window---
 * @desc Text for the save command in the action window.
 * @default Save
 *
 * @param Delete Command
 * @parent ---Action Window---
 * @desc Text for the delete command in the action window.
 * @default Delete
 *
 * @param ---Help Window---
 * @default
 *
 * @param Select Help
 * @parent ---Help Window---
 * @desc Help text displayed when selecting a slot.
 * @default Please select a file slot.
 *
 * @param Load Help
 * @parent ---Help Window---
 * @desc Help text displayed when selecting load option.
 * @default Loads the data from the saved game.
 *
 * @param Save Help
 * @parent ---Help Window---
 * @desc Help text displayed when selecting save option.
 * @default Saves the current progress in your game.
 *
 * @param Delete Help
 * @parent ---Help Window---
 * @desc Help text displayed when selecting delete option.
 * @default Deletes all data from this save file.
 *
 * @param ---Delete---
 * @default
 *
 * @param Delete Filename
 * @parent ---Delete---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Used for the delete sound from the /audio/se/ folder.
 * Do NOT include the file extension.
 * @default Damage2
 *
 * @param Delete Volume
 * @parent ---Delete---
 * @desc Volume used for the delete sound.
 * @default 100
 *
 * @param Delete Pitch
 * @parent ---Delete---
 * @desc Pitch used for the delete sound.
 * @default 150
 *
 * @param Delete Pan
 * @parent ---Delete---
 * @desc Pan used for the delete sound.
 * @default 0
 *
 * @param ---Info Window---
 * @default
 *
 * @param Show Game Title
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the game title in the save file?
 * NO - false     YES - true
 * @default true
 *
 * @param Invalid Game Text
 * @parent ---Info Window---
 * @desc Text used when the save is for a different game.
 * @default This save is for a different game.
 *
 * @param Empty Game Text
 * @parent ---Info Window---
 * @desc Text used when the save is empty.
 * @default Empty
 *
 * @param Map Display Name
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Use the display name for the saved map instead?
 * NO - false     YES - true
 * @default true
 *
 * @param Party Display
 * @parent ---Info Window---
 * @type select
 * @option None
 * @value 0
 * @option Characters
 * @value 1
 * @option Faces
 * @value 2
 * @option SV Actors
 * @value 3
 * @desc The display type used for the party.
 * 0 - None; 1 - Characters; 2 - Faces; 3 - SV Actors
 * @default 2
 *
 * @param Party Y Position
 * @parent ---Info Window---
 * @desc This is the base Y position for the party display.
 * Formulas can be used.
 * @default this.lineHeight() + Window_Base._faceHeight
 *
 * @param Show Actor Names
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the names of the actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Name Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc Font size used for names if names are displayed.
 * Default: 28
 * @default 20
 *
 * @param Show Actor Level
 * @parent ---Info Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the levels of the actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Level Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc Font size used for levels if levels are displayed.
 * Default: 28
 * @default 20
 *
 * @param Level Format
 * @parent ---Info Window---
 * @desc The text format used to display levels.
 * %1 - Lv (Abbr)   %2 - Lv (Full)     %3 - Value
 * @default \c[16]%1 \c[0]%3
 *
 * @param Data Font Size
 * @parent ---Info Window---
 * @type number
 * @min 1
 * @desc Font size used for displaying data.
 * Default: 28
 * @default 20
 *
 * @param Data Column 1
 * @parent ---Info Window---
 * @desc The data to be displayed in data column 1. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default empty, playtime, save count, gold count
 *
 * @param Data Column 2
 * @parent ---Info Window---
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default location, variable 1, variable 2, variable 3
 *
 * @param Data Column 3
 * @parent ---Info Window---
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default empty, variable 4, variable 5, variable 6
 *
 * @param Data Column 4
 * @parent ---Info Window---
 * @desc The data to be displayed in data column 2. Refer to help
 * file for data entries. Separate each entry with commas.
 * @default
 *
 * @param ---Vocabulary---
 * @default
 *
 * @param Map Location
 * @parent ---Vocabulary---
 * @desc Text used to categorize 'Map Location'.
 * Leave empty to not use this category and center the data.
 * @default
 *
 * @param Playtime
 * @parent ---Vocabulary---
 * @desc Text used to categorize 'Playtime'.
 * Leave empty to not use this category and center the data.
 * @default Playtime:
 *
 * @param Save Count
 * @parent ---Vocabulary---
 * @desc Text used to categorize 'Save Count'.
 * Leave empty to not use this category and center the data.
 * @default Total Saves:
 *
 * @param Gold Count
 * @parent ---Vocabulary---
 * @desc Text used to categorize 'Gold Count'.
 * Leave empty to not use this category and center the data.
 * @default %1:
 *
 * @param ---Technical---
 * @default
 *
 * @param Save Mode
 * @parent ---Technical---
 * @type combo
 * @option local
 * @option web
 * @option auto
 * @desc How the save system should work for your game:
 * local     web     auto
 * @default auto
 *
 * @param Local Config
 * @parent ---Technical---
 * @desc Filename for config when working with local saves.
 * Default: config.rpgsave
 * @default config.rpgsave
 *
 * @param Local Global
 * @parent ---Technical---
 * @desc Filename for global when working with local saves.
 * Default: global.rpgsave
 * @default global.rpgsave
 *
 * @param Local Save
 * @parent ---Technical---
 * @desc Filename for game saves when working with local saves.
 * %1 - File Slot. Default: config.rpgsave
 * @default file%1.rpgsave
 *
 * @param Web Config
 * @parent ---Technical---
 * @desc Filename for config when working with web saves.
 * %1 - Game Name. Default: RPG Config
 * @default RPG %1 Config
 *
 * @param Web Global
 * @parent ---Technical---
 * @desc Filename for global when working with web saves.
 * %1 - Game Name. Default: RPG Global
 * @default RPG %1 Global
 *
 * @param Web Save
 * @parent ---Technical---
 * @desc Filename for game saves when working with web saves.
 * %1 - Game Name. %2 - File Slot. Default: RPG File%1
 * @default RPG %1 File%2
 *
 * @param ---Confirmation---
 * @default
 *
 * @param Load Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the load confirmation window when loading a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Load Text
 * @parent ---Confirmation---
 * @desc Text displayed when loading a save file.
 * @default Do you wish to load this save file?
 *
 * @param Save Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the save confirmation window when overwriting a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Save Text
 * @parent ---Confirmation---
 * @desc Text displayed when overwriting a save file.
 * @default Do you wish to overwrite this save file?
 *
 * @param Delete Confirmation
 * @parent ---Confirmation---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the save confirmation window when deleting a
 * save file? NO - false     YES - true
 * @default true
 *
 * @param Delete Text
 * @parent ---Confirmation---
 * @desc Text displayed when deleting a save file.
 * @default Do you wish to delete this save file?
 *
 * @param Confirm Yes
 * @parent ---Confirmation---
 * @desc Text used for the 'Yes' confirm command
 * @default Yes
 *
 * @param Confirm No
 * @parent ---Confirmation---
 * @desc Text used for the 'No' confirm command
 * @default No
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin provides a new save interface for the player. Along with a new
 * interface, the player can also load and delete saves straight from the menu
 * itself. This will in turn make the save command from the Main Menu always
 * available, but the save option within the new save menu will be enabled
 * depending on whether or not it is allowed or disallowed. From the interface,
 * the player is given more information regarding the save file including the
 * the location the player saved at, the amount of gold available, and any
 * variables that you want to show the player as well.
 *
 * ============================================================================
 * Instructions - Data Columns
 * ============================================================================
 *
 * For those who wish to show additional data in the save menu for each save
 * file, you can add various data categories within the 'Data Columns' inside
 * the plugin parameters. Separate each category with a comma (,). You can use
 * the following entries for data categories:
 *
 * Data Column Categories:
 *
 *   Empty
 *   - Leaves an empty box in the category location. This won't even show the
 *   dark rectangle in the category slot.
 *
 *   Null
 *   - Won't draw any text, but it will draw the dark rectangle in the
 *   category slot.
 *
 *   Location
 *   - Draws the current map location of the save file.
 *
 *   Playtime
 *   - Draws the playtime spent for the save file.
 *
 *   Save Count
 *   - Draws the number of times saved in that playthrough.
 *
 *   Gold Count
 *   - Draws the current gold count of the safe file.
 *
 *   Variable x
 *   - Draws the name of the variable and value of the variable. You can use
 *   text codes in the variable name. Any text between << and >> will be not
 *   be shown when drawn. If the variable name is empty, the value will be
 *   centered.
 *
 *   text: stuff
 *   left text: stuff
 *   center text: stuff
 *   right text: stuff
 *   - This will draw 'stuff' (Replace it with your own text) as text by itself
 *   with no data attached. Use 'left', 'center', or 'right' to decide the text
 *   alignment. If no alignment is used, it will default to 'left' alignment.
 *   You can use text codes within the drawn text.
 *
 * ============================================================================
 * Technical - Save Modes
 * ============================================================================
 *
 * For developers who are planning to publish their RPG Maker MV games on the
 * web, you may want to look into the 'Technical' parameters. Here, you can
 * force the game into thinking the game is running on 'local' or 'web' mode.
 * By default, you'll want it on 'auto' but the forced modes are for testing
 * purposes. Despite being for testing purposes, if you wish for your game to
 * adjust saves as per 'web' mode, you can keep it that way even if your game
 * is to be local-only. Games on the web, however, cannot use 'local' mode and
 * will automatically default to 'web' mode.
 *
 * ============================================================================
 * Technical - Save Files
 * ============================================================================
 *
 * The 'Local Config', 'Local Global', and 'Local Save' can have their filename
 * format changed to your liking. Personally, I don't recommend messing with
 * this unless you know what you're doing.
 *
 * ---
 *
 * However, if you are making a web-based (mobile included), I strongly suggest
 * you look into the 'Web Config', 'Web Global', and 'Web Save' parameters. By
 * default, RPG Maker MV defaults all of the saves to RPG FileX. All web-based
 * RPG Maker MV games would then use the same configuration, same global save
 * file, and all RPG Maker MV games played by an individual would share the
 * same save slots. This can be very problematic.
 *
 * This plugin's default settings will solve this sharing issue by making the
 * web save named accordingly to your game's name provided that you keep the
 * current plugin settings as is or adjust it accordingly. Now, your game will
 * have its own individual identity, use its own configuration, global, and
 * save files without clashing with any other RPG Maker MV games players may
 * have played.
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

MageStudios.Parameters = PluginManager.parameters('MSEP_SaveCore');
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.SaveMaxFiles = Number(MageStudios.Parameters['Max Files']);
MageStudios.Param.SaveIconSaved = Number(MageStudios.Parameters['Saved Icon']);
MageStudios.Param.SaveIconEmpty = Number(MageStudios.Parameters['Empty Icon']);
MageStudios.Param.SavePop = eval(String(MageStudios.Parameters['Return After Saving']));
MageStudios.Param.SaveAutoIndex = eval(String(MageStudios.Parameters['Auto New Index']));

MageStudios.Param.SaveCmdLoad = String(MageStudios.Parameters['Load Command']);
MageStudios.Param.SaveCmdSave = String(MageStudios.Parameters['Save Command']);
MageStudios.Param.SaveCmdDelete = String(MageStudios.Parameters['Delete Command']);

MageStudios.Param.SaveHelpSelect = String(MageStudios.Parameters['Select Help']);
MageStudios.Param.SaveLoadSelect = String(MageStudios.Parameters['Load Help']);
MageStudios.Param.SaveSaveSelect = String(MageStudios.Parameters['Save Help']);
MageStudios.Param.SaveDeleteSelect = String(MageStudios.Parameters['Delete Help']);

MageStudios.Param.SaveDeleteSound = {
  name:   String(MageStudios.Parameters['Delete Filename']),
  volume: Number(MageStudios.Parameters['Delete Volume']),
  pitch:  Number(MageStudios.Parameters['Delete Pitch']),
  pan:    Number(MageStudios.Parameters['Delete Pan'])
};

MageStudios.Param.SaveInfoTitle = String(MageStudios.Parameters['Show Game Title']);
MageStudios.Param.SaveInfoTitle = eval(MageStudios.Param.SaveInfoTitle);
MageStudios.Param.SaveInfoInvalid = String(MageStudios.Parameters['Invalid Game Text']);
MageStudios.Param.SaveInfoEmpty = String(MageStudios.Parameters['Empty Game Text']);
MageStudios.Param.SaveMapDisplayName = String(MageStudios.Parameters['Map Display Name']);
MageStudios.Param.SaveMapDisplayName = eval(MageStudios.Param.SaveMapDisplayName);
MageStudios.Param.SaveInfoPartyType = Number(MageStudios.Parameters['Party Display']);
MageStudios.Param.SaveInfoPartyType = MageStudios.Param.SaveInfoPartyType.clamp(0, 3);
MageStudios.Param.SaveInfoPartyY = String(MageStudios.Parameters['Party Y Position']);
MageStudios.Param.SaveInfoActorName = String(MageStudios.Parameters['Show Actor Names']);
MageStudios.Param.SaveInfoActorName = eval(MageStudios.Param.SaveInfoActorName);
MageStudios.Param.SaveInfoActorNameSz = Number(MageStudios.Parameters['Name Font Size']);
MageStudios.Param.SaveInfoActorLv = String(MageStudios.Parameters['Show Actor Level']);
MageStudios.Param.SaveInfoActorLv = eval(MageStudios.Param.SaveInfoActorLv);
MageStudios.Param.SaveInfoActorLvSz = Number(MageStudios.Parameters['Level Font Size']);
MageStudios.Param.SaveInfoActorLvFmt = String(MageStudios.Parameters['Level Format']);
MageStudios.Param.SaveInfoDataSz = Number(MageStudios.Parameters['Data Font Size']);
MageStudios.Param.SaveInfoDataCol1 = String(MageStudios.Parameters['Data Column 1']);
MageStudios.Param.SaveInfoDataCol1 = MageStudios.Param.SaveInfoDataCol1.split(',');
MageStudios.Param.SaveInfoDataCol2 = String(MageStudios.Parameters['Data Column 2']);
MageStudios.Param.SaveInfoDataCol2 = MageStudios.Param.SaveInfoDataCol2.split(',');
MageStudios.Param.SaveInfoDataCol3 = String(MageStudios.Parameters['Data Column 3']);
MageStudios.Param.SaveInfoDataCol3 = MageStudios.Param.SaveInfoDataCol3.split(',');
MageStudios.Param.SaveInfoDataCol4 = String(MageStudios.Parameters['Data Column 4']);
MageStudios.Param.SaveInfoDataCol4 = MageStudios.Param.SaveInfoDataCol4.split(',');

MageStudios.trimSaveDataColumns = function(array) {
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    array[i] = array[i].trim();
  }
  if (length === 1 && array[0] === '') array.splice(0);
};

MageStudios.trimSaveDataColumns(MageStudios.Param.SaveInfoDataCol1);
MageStudios.trimSaveDataColumns(MageStudios.Param.SaveInfoDataCol2);
MageStudios.trimSaveDataColumns(MageStudios.Param.SaveInfoDataCol3);
MageStudios.trimSaveDataColumns(MageStudios.Param.SaveInfoDataCol4);

MageStudios.Param.SaveVocabLocation = String(MageStudios.Parameters['Map Location']);
MageStudios.Param.SaveVocabPlaytime = String(MageStudios.Parameters['Playtime']);
MageStudios.Param.SaveVocabSaveCount = String(MageStudios.Parameters['Save Count']);
MageStudios.Param.SaveVocabGoldCount = String(MageStudios.Parameters['Gold Count']);

MageStudios.Param.SaveTechSaveMode = String(MageStudios.Parameters['Save Mode']).trim();
MageStudios.Param.SaveTechSaveMode = MageStudios.Param.SaveTechSaveMode.toLowerCase();
MageStudios.Param.SaveTechLocalConfig = String(MageStudios.Parameters['Local Config']);
MageStudios.Param.SaveTechLocalGlobal = String(MageStudios.Parameters['Local Global']);
MageStudios.Param.SaveTechLocalSave = String(MageStudios.Parameters['Local Save']);
MageStudios.Param.SaveTechWebConfig = String(MageStudios.Parameters['Web Config']);
MageStudios.Param.SaveTechWebGlobal = String(MageStudios.Parameters['Web Global']);
MageStudios.Param.SaveTechWebSave = String(MageStudios.Parameters['Web Save']);

MageStudios.Param.SaveConfirmLoad = String(MageStudios.Parameters['Load Confirmation']);
MageStudios.Param.SaveConfirmLoad = eval(MageStudios.Param.SaveConfirmLoad);
MageStudios.Param.SaveConfirmLoadTx = String(MageStudios.Parameters['Load Text']);
MageStudios.Param.SaveConfirmSave = String(MageStudios.Parameters['Save Confirmation']);
MageStudios.Param.SaveConfirmSave = eval(MageStudios.Param.SaveConfirmSave);
MageStudios.Param.SaveConfirmSaveTx = String(MageStudios.Parameters['Save Text']);
MageStudios.Param.SaveConfirmDel = String(MageStudios.Parameters['Delete Confirmation']);
MageStudios.Param.SaveConfirmDel = eval(MageStudios.Param.SaveConfirmDel);
MageStudios.Param.SaveConfirmDelTx = String(MageStudios.Parameters['Delete Text']);
MageStudios.Param.SaveConfirmYes = String(MageStudios.Parameters['Confirm Yes']);
MageStudios.Param.SaveConfirmNo = String(MageStudios.Parameters['Confirm No']);

//=============================================================================
// DataManager
//=============================================================================

DataManager.maxSavefiles = function() {
    return MageStudios.Param.SaveMaxFiles;
};

MageStudios.Save.DataManager_selectSavefileForNewGame =
    DataManager.selectSavefileForNewGame;
DataManager.selectSavefileForNewGame = function() {
    MageStudios.Save.DataManager_selectSavefileForNewGame.call(this);
    if (MageStudios.Param.SaveAutoIndex) return;
    this._lastAccessedId = 1;
};

MageStudios.Save.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
  var contents = MageStudios.Save.DataManager_makeSaveContents.call(this);
  contents.map.locationDisplayName = $dataMap.displayName;
  return contents;
};

//=============================================================================
// StorageManager
//=============================================================================

MageStudios.Save.StorageManager_isLocalMode = StorageManager.isLocalMode;
StorageManager.isLocalMode = function() {
  if (MageStudios.Param.SaveTechSaveMode === 'local') {
    if (!Utils.isNwjs()) return false;
    return true;
  } else if (MageStudios.Param.SaveTechSaveMode === 'web') {
    return false;
  } else {
    return MageStudios.Save.StorageManager_isLocalMode.call(this);
  }
};

StorageManager.localFilePath = function(savefileId) {
  var name;
  if (savefileId < 0) {
    name = MageStudios.Param.SaveTechLocalConfig;
  } else if (savefileId === 0) {
    name = MageStudios.Param.SaveTechLocalGlobal;
  } else {
    name = MageStudios.Param.SaveTechLocalSave.format(savefileId);
  }
  return this.localFileDirectoryPath() + name;
};

MageStudios.Save.StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
  if (!$dataSystem) return MageStudios.Save.StorageManager_webStorageKey.call(this);
  var title = $dataSystem.gameTitle;
  this.loadConfig();
  if (savefileId < 0) {
    return MageStudios.Param.SaveTechWebConfig.format(title);
  } else if (savefileId === 0) {
    return MageStudios.Param.SaveTechWebGlobal.format(title);
  } else {
    return MageStudios.Param.SaveTechWebSave.format(title, savefileId);
  }
};

StorageManager.loadConfig = function() {
  if (this._configLoaded) return;
  this._configLoaded = true;
  ConfigManager.load();
};

//=============================================================================
// BattleManager
//=============================================================================

MageStudios.Save.BattleManager_setBattleTest = BattleManager.setBattleTest;
BattleManager.setBattleTest = function(battleTest) {
    MageStudios.Save.BattleManager_setBattleTest.call(this, battleTest);
    if (battleTest) StorageManager.loadConfig();
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Window_MenuCommand.prototype.isSaveEnabled = function() {
    if (DataManager.isEventTest()) return false;
    return true;
};

//=============================================================================
// Window_SavefileList
//=============================================================================

Window_SavefileList.prototype.itemHeight = function() {
    return this.lineHeight();
};

Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var rect = this.itemRect(index);
    this.resetTextColor();
    //if (this._mode === 'load') this.changePaintOpacity(valid);
    this.changePaintOpacity(valid);
    var icon = valid ? MageStudios.Param.SaveIconSaved : MageStudios.Param.SaveIconEmpty;
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawFileId(id, rect.x + Window_Base._iconWidth + 4, rect.y);
};

Window_SavefileList.prototype.playOkSound = function() {
    Window_Selectable.prototype.playOkSound.call(this);
};

//=============================================================================
// Window_SaveAction
//=============================================================================

function Window_SaveAction() {
    this.initialize.apply(this, arguments);
}

Window_SaveAction.prototype = Object.create(Window_HorzCommand.prototype);
Window_SaveAction.prototype.constructor = Window_SaveAction;

Window_SaveAction.prototype.initialize = function(x, y, mode) {
    this._width = Graphics.boxWidth - x;
    this._currentFile = 0;
    this._mode = mode;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.deactivate();
    this.deselect();
};

Window_SaveAction.prototype.windowWidth = function() {
    return this._width;
};

Window_SaveAction.prototype.maxCols = function() {
    return 3;
};

Window_SaveAction.prototype.savefileId = function() {
    return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveAction.prototype.makeCommandList = function() {
    var id = this.savefileId();
    var enabled = DataManager.isThisGameFile(id);
    var valid = DataManager.loadSavefileInfo(id);
    this.addCommand(this.getCommandName('load'), 'load', valid);
    this.addCommand(this.getCommandName('save'), 'save', this.isSaveEnabled());
    this.addCommand(this.getCommandName('delete'), 'delete', enabled);
};

Window_SaveAction.prototype.getCommandName = function(type) {
    if (type === 'load') {
      return MageStudios.Param.SaveCmdLoad;
    } else if (type === 'save') {
      return MageStudios.Param.SaveCmdSave;
    } else {
      return MageStudios.Param.SaveCmdDelete;
    }
};

Window_SaveAction.prototype.isSaveEnabled = function() {
    if (this._mode !== 'save') return false;
    return $gameSystem.isSaveEnabled();
};

Window_SaveAction.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this.savefileId() !== this._currentFile) this.updateIndex();
};

Window_SaveAction.prototype.updateIndex = function() {
    this._currentFile = this.savefileId();
    this.refresh();
};

Window_SaveAction.prototype.playOkSound = function() {
};

Window_SaveAction.prototype.updateHelp = function() {
    var text = '';
    if (this.currentSymbol() === 'load') {
      text = MageStudios.Param.SaveLoadSelect;
    } else if (this.currentSymbol() === 'save') {
      text = MageStudios.Param.SaveSaveSelect;
    } else if (this.currentSymbol() === 'delete') {
      text = MageStudios.Param.SaveDeleteSelect;
    }
    this._helpWindow.setText(text);
};

//=============================================================================
// Window_SaveInfo
//=============================================================================

function Window_SaveInfo() {
    this.initialize.apply(this, arguments);
}

Window_SaveInfo.prototype = Object.create(Window_Base.prototype);
Window_SaveInfo.prototype.constructor = Window_SaveInfo;

Window_SaveInfo.prototype.initialize = function(x, y, width, height, mode) {
  this._currentFile = 0;
  this._waitTime = 0;
  this._mode = mode;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
};

Window_SaveInfo.prototype.resetFontSettings = function() {
  Window_Base.prototype.resetFontSettings.call(this);
  if (this._drawLevel) this.contents.fontSize = MageStudios.Param.SaveInfoActorLvSz;
  if (this._drawData) this.contents.fontSize = MageStudios.Param.SaveInfoDataSz;
};

Window_SaveInfo.prototype.savefileId = function() {
  return SceneManager._scene._listWindow.index() + 1;
};

Window_SaveInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};

Window_SaveInfo.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this.savefileId() !== this._currentFile) this.updateIndex();
  if (this._waitTime > 0) this.updateTimer();
};

Window_SaveInfo.prototype.systemColorEx = function() {
    if (Imported.MSEP_CoreEngine) {
      return '\\c[' + MageStudios.Param.ColorSystem + ']';
    } else {
      return '\\c[16]';
    }
};

Window_SaveInfo.prototype.updateIndex = function() {
  var id = this.savefileId();
  this._currentFile = id;
  this._waitTime = 30;
  this.contents.clear();
};

Window_SaveInfo.prototype.updateTimer = function() {
  this._waitTime -= 1;
  if (this._waitTime > 0) return;
  var id = this.savefileId();
  this._valid = DataManager.isThisGameFile(id);
  this._info = DataManager.loadSavefileInfo(id);
  this.refresh();
};

Window_SaveInfo.prototype.refresh = function() {
  this.contents.clear();
  this.resetFontSettings();
  var dy = 0;
  dy = this.drawGameTitle(dy);
  if (!this._valid) return this.drawInvalidText(dy);
  this._saveContents = StorageManager.load(this.savefileId());
  this.drawContents(dy);
};

Window_SaveInfo.prototype.drawGameTitle = function(dy) {
  if (!MageStudios.Param.SaveInfoTitle) return dy;
  if (!this._info) return dy;
  if (!this._info.title) return dy;
  this.resetFontSettings();
  var text = this._info.title;
  this.drawText(text, 0, dy, this.contents.width, 'center');
  return dy + this.lineHeight();
};

Window_SaveInfo.prototype.drawInvalidText = function(dy) {
  this.drawDarkRect(0, dy, this.contents.width, this.contents.height - dy);
  dy = (this.contents.height - dy - this.lineHeight()) / 2;
  if (this._info) {
    var text = MageStudios.Param.SaveInfoInvalid;
  } else {
    var text = MageStudios.Param.SaveInfoEmpty;
  }
  this.changeTextColor(this.systemColor());
  this.drawText(text, 0, dy, this.contents.width, 'center');
};

Window_SaveInfo.prototype.drawContents = function(dy) {
  if (!this._saveContents) {
    return setTimeout(this.drawContents.bind(this, dy), 50);
  }
  this._saveContents = JsonEx.parse(this._saveContents);
  dy = this.drawPartyGraphics(dy);
  dy = this.drawPartyNames(dy);
  dy = this.drawPartyLevels(dy);
  this.drawColumnData(dy);
};

Window_SaveInfo.prototype.drawPartyGraphics = function(dy) {
  if (MageStudios.Param.SaveInfoPartyType === 0) return dy;
  dy = eval(MageStudios.Param.SaveInfoPartyY);
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = Math.floor(dw / 2);
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      if (MageStudios.Param.SaveInfoPartyType === 1) {
        var name = member.characterName();
        var index = member.characterIndex();
        this.drawCharacter(name, index, dx, dy);
      } else if (MageStudios.Param.SaveInfoPartyType === 2) {
        var fh = Window_Base._faceHeight;
        var fw = Window_Base._faceWidth;
        var fx = dx - Math.floor(Math.min(fh, dw) / 2);
        var dif = Math.floor(Math.max(0, dw - fw) / 2);
        var name = member.faceName();
        var index = member.faceIndex();
        this.drawFace(name, index, fx - dif, dy - fh, dw, fh);
      } else if (MageStudios.Param.SaveInfoPartyType === 3) {
        this.drawSvActor(member, dx, dy);
      }
    }
    dx += dw;
  }
  return dy;
};

Window_SaveInfo.prototype.drawCharacter = function(name, index, x, y) {
    var bitmap = ImageManager.loadCharacter(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawCharacter.bind(this, name, index, x, y), 50);
    }
    Window_Base.prototype.drawCharacter.call(this, name, index, x, y);
};

Window_SaveInfo.prototype.drawFace = function(name, index, x, y, w, h) {
    var bitmap = ImageManager.loadFace(name);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawFace.bind(this, name, index, x, y, w, h), 50);
    }
    Window_Base.prototype.drawFace.call(this, name, index, x, y, w, h);
};

Window_SaveInfo.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    if (bitmap.width <= 0) {
      return setTimeout(this.drawSvActor.bind(this, actor, x, y), 50);
    }
    Window_Base.prototype.drawSvActor.call(this, actor, x, y);
};

Window_SaveInfo.prototype.drawPartyNames = function(dy) {
  if (!MageStudios.Param.SaveInfoActorName) return dy;
  this.resetFontSettings();
  this.contents.fontSize = MageStudios.Param.SaveInfoActorNameSz;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var name = member._name;
      this.drawText(name, dx, dy, dw, 'center');
    }
    dx += dw
  }
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawPartyLevels = function(dy) {
  if (!MageStudios.Param.SaveInfoActorLv) return dy;
  this._drawLevel = true;
  var length = this._saveContents.party.maxBattleMembers();
  var dw = this.contents.width / length;;
  dw = Math.floor(dw);
  var dx = 0;
  var fmt = MageStudios.Param.SaveInfoActorLvFmt;
  for (var i = 0; i < length; ++i) {
    var actorId = this._saveContents.party._actors[i];
    var member = this._saveContents.actors._data[actorId];
    if (member) {
      var lv = MageStudios.Util.toGroup(member.level);
      var text = fmt.format(TextManager.levelA, TextManager.level, lv);
      var tw = this.textWidthEx(text);
      var dif = Math.floor(Math.max(0, dw - tw) / 2);
      this.drawTextEx(text, dx + dif, dy);
    }
    dx += dw
  }
  this._drawLevel = false;
  return dy += this.lineHeight();
};

Window_SaveInfo.prototype.drawColumnData = function(dy) {
    var totalColumns = 0;
    var drawnArrays = [];
    if (MageStudios.Param.SaveInfoDataCol1.length > 0) {
      totalColumns += 1;
      drawnArrays.push(MageStudios.Param.SaveInfoDataCol1);
    }
    if (MageStudios.Param.SaveInfoDataCol2.length > 0) {
      totalColumns += 1;
      drawnArrays.push(MageStudios.Param.SaveInfoDataCol2);
    }
    if (MageStudios.Param.SaveInfoDataCol3.length > 0) {
      totalColumns += 1;
      drawnArrays.push(MageStudios.Param.SaveInfoDataCol3);
    }
    if (MageStudios.Param.SaveInfoDataCol4.length > 0) {
      totalColumns += 1;
      drawnArrays.push(MageStudios.Param.SaveInfoDataCol4);
    }
    if (totalColumns <= 0) return;
    var dw = Math.floor(this.contents.width / totalColumns);
    var dif = totalColumns > 1 ? this.textPadding() : 0;
    for (var i = 0; i < totalColumns; ++i) {
      var column = drawnArrays[i];
      var dx = i * dw;
      this.drawColumn(column, dx, dy, dw - dif);
    }
};

Window_SaveInfo.prototype.drawColumn = function(column, dx, dy, dw) {
    var length = column.length;
    var tp = this.textPadding();
    for (var i = 0; i < length; ++i) {
      this.resetFontSettings();
      this.contents.fontSize = MageStudios.Param.SaveInfoDataSz;
      var data = column[i];
      if (data.toUpperCase().trim() !== 'EMPTY') {
        this.drawDarkRect(dx, dy, dw, this.lineHeight());
        this.drawData(data, dx + tp, dy, dw - tp * 2);
      }
      dy += this.lineHeight();
    }
};

Window_SaveInfo.prototype.drawData = function(data, dx, dy, dw) {
  if (data.toUpperCase().trim() === 'NULL') {
    return;
  } else if (data.toUpperCase().trim() === 'LOCATION') {
    this.drawLocation(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'PLAYTIME') {
    this.drawPlaytime(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'SAVE COUNT') {
    this.drawSaveCount(dx, dy, dw);
  } else if (data.toUpperCase().trim() === 'GOLD COUNT') {
    this.drawGoldCount(dx, dy, dw);
  } else if (data.match(/VARIABLE[ ](\d+)/i)) {
    this.drawVariable(parseInt(RegExp.$1), dx, dy, dw);
  } else if (data.match(/(.*)[ ]TEXT:(.*)/i)) {
    this.drawDataText(String(RegExp.$1), String(RegExp.$2), dx, dy, dw);
  } else if (data.match(/TEXT:(.*)/i)) {
    this.drawDataText('left', String(RegExp.$1), dx, dy, dw);
  }
};

Window_SaveInfo.prototype.drawLocation = function(dx, dy, dw) {
    var id = this._saveContents.map._mapId;
    if (MageStudios.Param.SaveMapDisplayName) {
      var text = this._saveContents.map.locationDisplayName || '';
      if (text.length <= 0 && $dataMapInfos[id]) text = $dataMapInfos[id].name;
    } else if ($dataMapInfos[id]) {
      var text = $dataMapInfos[id].name;
    } else {
      var text = '';
    }
    if (MageStudios.Param.SaveVocabLocation.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(MageStudios.Param.SaveVocabLocation, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawPlaytime = function(dx, dy, dw) {
    if (!this._info.playtime) return;
    var text = this._info.playtime;
    if (MageStudios.Param.SaveVocabPlaytime.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(MageStudios.Param.SaveVocabPlaytime, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawSaveCount = function(dx, dy, dw) {
    var text = MageStudios.Util.toGroup(this._saveContents.system._saveCount);
    if (MageStudios.Param.SaveVocabSaveCount.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(MageStudios.Param.SaveVocabSaveCount, dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawGoldCount = function(dx, dy, dw) {
    var text = MageStudios.Util.toGroup(this._saveContents.party._gold);
    if (MageStudios.Param.SaveVocabGoldCount.length > 0) {
      this.changeTextColor(this.systemColor());
      var fmt = MageStudios.Param.SaveVocabGoldCount;
      this.drawText(fmt.format(TextManager.currencyUnit), dx, dy, dw, 'left');
      this.changeTextColor(this.normalColor());
      
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      var fmt = '\\c[0]%1' + this.systemColorEx() + '%2';
      var ftext = fmt.format(text, TextManager.currencyUnit);
      this._drawData = true;
      var fw = this.textWidthEx(ftext);
      dx += Math.max(0, Math.floor((dw - fw) / 2));
      this.drawTextEx(ftext, dx, dy);
      this._drawData = false;
    }
};

Window_SaveInfo.prototype.drawVariable = function(id, dx, dy, dw) {
    var varName = $dataSystem.variables[id];
    varName = varName.replace(/<<(.*?)>>/i, '');
    var text = MageStudios.Util.toGroup(this._saveContents.variables.value(id));
    var diff = Math.max(0, (this.standardFontSize() - 
      this.contents.fontSize) / 2);
    if (varName.length > 0) {
      this._drawData = true;
      this.changeTextColor(this.systemColor());
      dy += diff;
      this.drawTextEx(this.systemColorEx() + varName, dx, dy, dw, 'left');
      dy -= diff;
      this.changeTextColor(this.normalColor());
      this._drawData = false;
      this.drawText(text, dx, dy, dw, 'right');
    } else {
      this.drawText(text, dx, dy, dw, 'center');
    }
};

Window_SaveInfo.prototype.drawDataText = function(align, text, dx, dy, dw) {
    this._drawData = true;
    dy += Math.max(0, (this.standardFontSize() - this.contents.fontSize) / 2);
    var align = align.toLowerCase().trim();
    var text = text.trim();
    if (align === 'left') {
      this.drawTextEx(text, dx, dy);
    } else if (align === 'right') {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + dw - tw, dy);
    } else {
      var tw = this.textWidthEx(text);
      this.drawTextEx(text, dx + (dw - tw) / 2, dy);
    }
    this._drawData = false;
};

//=============================================================================
// Window_SaveConfirm
//=============================================================================

function Window_SaveConfirm() {
    this.initialize.apply(this, arguments);
}

Window_SaveConfirm.prototype = Object.create(Window_Command.prototype);
Window_SaveConfirm.prototype.constructor = Window_SaveConfirm;

Window_SaveConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.openness = 0;
};

Window_SaveConfirm.prototype.makeCommandList = function() {
    this.addCommand(MageStudios.Param.SaveConfirmYes, 'confirm');
    this.addCommand(MageStudios.Param.SaveConfirmNo, 'cancel');
};

Window_SaveConfirm.prototype.setData = function(text) {
    this._text = text;
    var ww = this.textWidthEx(this._text) + this.standardPadding() * 2;
    ww += this.textPadding() * 2;
    this.width = ww;
    this.refresh();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_SaveConfirm.prototype.itemTextAlign = function() {
    return 'center';
};

Window_SaveConfirm.prototype.windowHeight = function() {
    return this.fittingHeight(3);
};

Window_SaveConfirm.prototype.itemRect = function(index) {
    var rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += this.lineHeight();
    return rect;
};

//=============================================================================
// Scene_File
//=============================================================================

Scene_File.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    if (this._loadSuccess) $gameSystem.onAfterLoad();
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createHelpWindow();
    this.createListWindow();
    this.createActionWindow();
    this.createInfoWindow();
    this.createConfirmWindow();
};

Scene_File.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(2);
    this._helpWindow.setText(MageStudios.Param.SaveHelpSelect);
    this.addWindow(this._helpWindow);
};

Scene_File.prototype.createListWindow = function() {
    var x = 0;
    var y = this._helpWindow.height;
    var width = 240;
    var height = Graphics.boxHeight - y;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this.addWindow(this._listWindow);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    
};

Scene_File.prototype.createActionWindow = function() {
    var x = this._listWindow.width;
    var y = this._listWindow.y;
    this._actionWindow = new Window_SaveAction(x, y, this.mode());
    this.addWindow(this._actionWindow);
    this._actionWindow.setHelpWindow(this._helpWindow);
    this._actionWindow.setHandler('load', this.onActionLoad.bind(this));
    this._actionWindow.setHandler('save', this.onActionSave.bind(this));
    this._actionWindow.setHandler('delete', this.onActionDelete.bind(this));
    this._actionWindow.setHandler('cancel', this.onActionCancel.bind(this));
};

Scene_File.prototype.createInfoWindow = function() {
    var x = this._actionWindow.x;
    var y = this._actionWindow.y + this._actionWindow.height;
    var width = Graphics.boxWidth - x;
    var height = Graphics.boxHeight - y;
    this._infoWindow = new Window_SaveInfo(x, y, width, height, this.mode());
    this.addWindow(this._infoWindow);
};

Scene_File.prototype.createConfirmWindow = function() {
    this._confirmWindow = new Window_SaveConfirm();
    var win = this._confirmWindow;
    win.setHandler('confirm', this.onConfirmOk.bind(this));
    win.setHandler('cancel',  this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_File.prototype.onSavefileOk = function() {
    this._actionWindow.activate();
    if (this.mode() === 'load') {
      this._actionWindow.select(0);
    } else if (this.mode() === 'save') {
      this._actionWindow.select(1);
    }
};

Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
};

Scene_File.prototype.onActionLoad = function() {
    if (MageStudios.Param.SaveConfirmLoad) {
      this.startConfirmWindow(MageStudios.Param.SaveConfirmLoadTx);
    } else {
      this.performActionLoad();
    }
};

Scene_File.prototype.performActionLoad = function() {
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};

Scene_File.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};

Scene_Load.prototype.onLoadSuccess = function() {
    Scene_File.prototype.onLoadSuccess.call(this);
};

Scene_File.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Load.prototype.onLoadFailure = function() {
    Scene_File.prototype.onLoadFailure.call(this);
};

Scene_File.prototype.reloadMapIfUpdated = function() {
  if ($gameSystem.versionId() === $dataSystem.versionId) return;
  $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
  $gamePlayer.requestMapReload();
};

Scene_File.prototype.onActionSave = function() {
  var id = this.savefileId();
  if (MageStudios.Param.SaveConfirmSave && StorageManager.exists(id)) {
    this.startConfirmWindow(MageStudios.Param.SaveConfirmSaveTx);
  } else {
    this.performActionSave();
  }
};

Scene_File.prototype.performActionSave = function() {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
      this.onSaveSuccess();
    } else {
      this.onSaveFailure();
    }
};

Scene_File.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    StorageManager.cleanBackup(this.savefileId());
    if (MageStudios.Param.SavePop) {
      this.popScene();
    } else {
      this._listWindow.refresh();
      this._actionWindow._currentFile = this.savefileId() - 1;
      this._infoWindow._currentFile = this.savefileId() - 1;
      this.onActionCancel();
    }
};

Scene_Save.prototype.onSaveSuccess = function() {
    Scene_File.prototype.onSaveSuccess.call(this);
};

Scene_File.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.onActionCancel();
};

Scene_Save.prototype.onSaveFailure = function() {
    Scene_File.prototype.onSaveFailure.call(this);
};

Scene_File.prototype.onActionDelete = function() {
    if (MageStudios.Param.SaveConfirmDel) {
      this.startConfirmWindow(MageStudios.Param.SaveConfirmDelTx);
    } else {
      this.performActionDelete();
    }
};

Scene_File.prototype.performActionDelete = function() {
    AudioManager.playSe(MageStudios.Param.SaveDeleteSound);
    StorageManager.remove(this.savefileId());
    this.onActionCancel();
    this._listWindow.refresh();
    this._actionWindow._currentFile = this.savefileId() - 1;
    this._infoWindow._currentFile = this.savefileId() - 1;
};

Scene_File.prototype.onActionCancel = function() {
    this._actionWindow.deselect();
    this._listWindow.activate();
    this._helpWindow.setText(MageStudios.Param.SaveHelpSelect);
};

Scene_File.prototype.startConfirmWindow = function(text) {
    SoundManager.playOk();
    this._confirmWindow.setData(text);
    this._confirmWindow.open();
    this._confirmWindow.activate();
    this._confirmWindow.select(0);
};

Scene_File.prototype.onConfirmOk = function() {
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    if (this._actionWindow.currentSymbol() === 'load') {
      setTimeout(this.performActionLoad.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'save') {
      setTimeout(this.performActionSave.bind(this), 200);
    } else if (this._actionWindow.currentSymbol() === 'delete') {
      setTimeout(this.performActionDelete.bind(this), 200);
    } else {
      this.onConfirmCancel();
    }
};

Scene_File.prototype.onConfirmCancel = function() {
    var index = this._actionWindow.index();
    this._confirmWindow.deactivate();
    this._confirmWindow.close();
    this.onSavefileOk();
    this._actionWindow.select(index);
};

//=============================================================================
// Utilities
//=============================================================================

MageStudios.Util = MageStudios.Util || {};

if (!MageStudios.Util.toGroup) {
    MageStudios.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
