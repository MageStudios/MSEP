var Imported = Imported || {};
Imported.GamepadConfig = true;

var MageStudios = MageStudios || {};
MageStudios.GamepadConfig = MageStudios.GamepadConfig || {};
MageStudios.GamepadConfig.version = 1.0;

/*:
 * @plugindesc Allows players to adjust their button configuration
 * for gamepads.
 * @author Mage Studios Engine Plugins
 *
 * @param Command Name
 * @desc This is the option name that appears in the main menu.
 * @default Gamepad Config
 *
 * @param Button Name
 * @desc This is how a button name will appear in the config menu.
 * @default Button %1
 *
 * @param OK Button
 * @desc This is the command name for the OK button.
 * @default OK / Talk
 *
 * @param OK Help
 * @desc This is the help description for the OK button.
 * @default Used to accept menu actions and talk to people.
 *
 * @param Cancel Button
 * @desc Cancel Button
 * @desc This is the command name for the Cancel button.
 * @default Cancel
 *
 * @param Cancel Help
 * @desc This is the help description for the Cancel button.
 * @default Used to cancel menu actions.
 *
 * @param Shift Button
 * @desc This is the command name for the Shift button.
 * @default Dash
 *
 * @param Shift Help
 * @desc This is the help description for the Shift button.
 * @default Hold this button to dash on the field.
 *
 * @param Menu Button
 * @desc This is the command name for the Menu button.
 * @default Menu
 *
 * @param Menu Help
 * @desc This is the help description for the Menu button.
 * @default Access the Main Menu from the field.
 *
 * @param PageUp Button
 * @desc This is the command name for the Page Up button.
 * @default Page Up
 *
 * @param PageUp Help
 * @desc This is the help description for the Page Up button.
 * @default Use it to quickly scroll up menus.
 *
 * @param PageDown Button
 * @desc This is the command name for the Page Down button.
 * @default Page Down
 *
 * @param PageDown Help
 * @desc This is the help description for the Page Down button.
 * @default Use it to quickly scroll down menus.
 *
 * @param Reset Default
 * @desc This is the command name to reset the config to default.
 * @default Reset to Default
 *
 * @param Reset Help
 * @desc This is the help description for the Reset button.
 * @default Returns your controller to default settings.
 *
 * @param Finish Config
 * @desc This is the command name for the finish button.
 * @default Finish Configuration
 *
 * @param Finish Help
 * @desc This is the help description for the Finish button.
 * @default Are you done configuring your gamepad?
 *
 * @help
 * Adds a "Gamepad Config" option to the Options Menu if a gamepad is detected.
 * Players can then adjust the button configuration to their liking and it will
 * be loaded automatically each time they play the game. Keep in mind that if
 * at any point where a Gamepad is not detected inside of the Option or Gamepad
 * Config menu, the game will automatically eject the player out the prevent
 * the player from being locked inside.
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using MSEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 *
 * Name:
 * \i[83]Gamepad Config
 *
 * Help Description:
 * Configure the game's gamepad settings.
 *
 * Symbol:
 * gamepadConfig
 *
 * Show/Hide:
 * if (Imported.GamepadConfig && Input.isControllerConnected()) {
 *   show = !Utils.isMobileDevice();
 * } else {
 *   show = false;
 * }
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 */

MageStudios.Parameters = PluginManager.parameters("GamepadConfig");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.GamepadConfigName = String(
  MageStudios.Parameters["Command Name"]
);
MageStudios.Param.GamepadConfigButton = String(
  MageStudios.Parameters["Button Name"]
);
MageStudios.Param.GamepadConfigOkTx = String(
  MageStudios.Parameters["OK Button"]
);
MageStudios.Param.GamepadConfigOkHelp = String(
  MageStudios.Parameters["OK Help"]
);
MageStudios.Param.GamepadConfigCancelTx = String(
  MageStudios.Parameters["Cancel Button"]
);
MageStudios.Param.GamepadConfigCancelHelp = String(
  MageStudios.Parameters["Cancel Help"]
);
MageStudios.Param.GamepadConfigShiftTx = String(
  MageStudios.Parameters["Shift Button"]
);
MageStudios.Param.GamepadConfigShiftHelp = String(
  MageStudios.Parameters["Shift Help"]
);
MageStudios.Param.GamepadConfigMenuTx = String(
  MageStudios.Parameters["Menu Button"]
);
MageStudios.Param.GamepadConfigMenuHelp = String(
  MageStudios.Parameters["Menu Help"]
);
MageStudios.Param.GamepadConfigPgUpTx = String(
  MageStudios.Parameters["PageUp Button"]
);
MageStudios.Param.GamepadConfigPgUpHelp = String(
  MageStudios.Parameters["PageUp Help"]
);
MageStudios.Param.GamepadConfigPgDnTx = String(
  MageStudios.Parameters["PageDown Button"]
);
MageStudios.Param.GamepadConfigPgDnHelp = String(
  MageStudios.Parameters["PageDown Help"]
);
MageStudios.Param.GamepadConfigResetTx = String(
  MageStudios.Parameters["Reset Default"]
);
MageStudios.Param.GamepadConfigResetHelp = String(
  MageStudios.Parameters["Reset Help"]
);
MageStudios.Param.GamepadConfigFinishTx = String(
  MageStudios.Parameters["Finish Config"]
);
MageStudios.Param.GamepadConfigFinishHelp = String(
  MageStudios.Parameters["Finish Help"]
);

Input.getPressedGamepadButton = function () {
  if (MageStudios.Param.GamepadTimer > 0) {
    MageStudios.Param.GamepadTimer -= 1;
    return -1;
  }
  if (navigator.getGamepads) {
    var gamepads = navigator.getGamepads();
    if (gamepads) {
      for (var i = 0; i < gamepads.length; i++) {
        var gamepad = gamepads[i];
        if (gamepad && gamepad.connected) {
          return this.gamepadButtonId(gamepad);
        }
      }
    }
  }
  return -1;
};

Input.gamepadButtonId = function (gamepad) {
  var buttons = gamepad.buttons;
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].pressed) return i;
  }
  return -1;
};

Input.getGamepadButton = function (type) {
  for (var i = 0; i < 12; ++i) {
    if (Input.gamepadMapper[i] === type) return i;
  }
  return null;
};

Input.isControllerConnected = function () {
  if (navigator.getGamepads) {
    var gamepads = navigator.getGamepads();
    if (gamepads) {
      for (var i = 0; i < gamepads.length; i++) {
        var gamepad = gamepads[i];
        if (gamepad && gamepad.connected) return true;
      }
    }
  }
  return false;
};

ConfigManager.gamepadInput = {
  0: "ok",
  1: "cancel",
  2: "shift",
  3: "menu",
  4: "pageup",
  5: "pagedown",
  12: "up",
  13: "down",
  14: "left",
  15: "right",
};

MageStudios.GamepadConfig.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = MageStudios.GamepadConfig.ConfigManager_makeData.call(this);
  config.gamepadInput = this.gamepadInput;
  return config;
};

MageStudios.GamepadConfig.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  MageStudios.GamepadConfig.ConfigManager_applyData.call(this, config);
  this.gamepadInput = this.readGamepadConfig(config, "gamepadInput");
  this.applyGamepadConfig();
};

ConfigManager.applyGamepadConfig = function () {
  Input.gamepadMapper = this.gamepadInput;
  Input.update();
  Input.clear();
};

ConfigManager.readGamepadConfig = function (config, name) {
  var value = config[name];
  if (value !== undefined) {
    return value;
  } else {
    return {
      0: "ok",
      1: "cancel",
      2: "shift",
      3: "menu",
      4: "pageup",
      5: "pagedown",
      12: "up",
      13: "down",
      14: "left",
      15: "right",
    };
  }
};

MageStudios.GamepadConfig.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
  MageStudios.GamepadConfig.Window_Options_addGeneralOptions.call(this);
  if (!Imported.MSEP_OptionsCore) this.addGameConfigCommand();
};

Window_Options.prototype.addGameConfigCommand = function () {
  if (Input.isControllerConnected()) {
    this.addCommand(MageStudios.Param.GamepadConfigName, "gamepadConfig", true);
    this._addedController = true;
  }
};

MageStudios.GamepadConfig.Window_Options_update =
  Window_Options.prototype.update;
Window_Options.prototype.update = function () {
  MageStudios.GamepadConfig.Window_Options_update.call(this);
  if (this._addedController && !Input.isControllerConnected()) {
    this.refresh();
    this.height = this.windowHeight();
    this.updatePlacement();
  }
};

if (!Imported.MSEP_OptionsCore) {
  MageStudios.GamepadConfig.Window_Options_drawItem =
    Window_Options.prototype.drawItem;
  Window_Options.prototype.drawItem = function (index) {
    if (this.commandSymbol(index) === "gamepadConfig") {
      var rect = this.itemRectForText(index);
      var text = this.commandName(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(text, rect.x, rect.y, rect.width, "left");
    } else {
      MageStudios.GamepadConfig.Window_Options_drawItem.call(this, index);
    }
  };

  MageStudios.GamepadConfig.Window_Options_processOk =
    Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function () {
    if (this.commandSymbol(this.index()) === "gamepadConfig") {
      Window_Command.prototype.processOk.call(this);
    } else {
      MageStudios.GamepadConfig.Window_Options_processOk.call(this);
    }
  };
}

function Window_GamepadConfig() {
  this.initialize.apply(this, arguments);
}

Window_GamepadConfig.prototype = Object.create(Window_Command.prototype);
Window_GamepadConfig.prototype.constructor = Window_GamepadConfig;

Window_GamepadConfig.prototype.initialize = function (helpWindow) {
  var wy = helpWindow.height;
  Window_Command.prototype.initialize.call(this, 0, wy);
  this.setHelpWindow(helpWindow);
  this.height = Graphics.boxHeight - wy;
  this.refresh();
  this.activate();
  this.select(0);
};

Window_GamepadConfig.prototype.windowWidth = function () {
  return Graphics.boxWidth;
};

Window_GamepadConfig.prototype.makeCommandList = function (index) {
  for (var i = 0; i < 6; ++i) {
    var text = this.getButtonTypeText(i);
    this.addCommand(text, "button", true);
  }
  this.addCommand("", "filler", true);
  this.addCommand(this.getButtonTypeText(7), "reset", true);
  this.addCommand(this.getButtonTypeText(8), "finish", true);
};

Window_GamepadConfig.prototype.drawItem = function (index) {
  if (index > 5) {
    Window_Command.prototype.drawItem.call(this, index);
  } else {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    var ww = rect.width / 2;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, ww, align);
    var text = this.getButtonConfig(index);
    this.drawText(text, rect.x + ww, rect.y, ww, align);
  }
};

Window_GamepadConfig.prototype.getButtonTypeText = function (index) {
  if (index === 0) return MageStudios.Param.GamepadConfigOkTx;
  if (index === 1) return MageStudios.Param.GamepadConfigCancelTx;
  if (index === 2) return MageStudios.Param.GamepadConfigShiftTx;
  if (index === 3) return MageStudios.Param.GamepadConfigMenuTx;
  if (index === 4) return MageStudios.Param.GamepadConfigPgUpTx;
  if (index === 5) return MageStudios.Param.GamepadConfigPgDnTx;
  if (index === 7) return MageStudios.Param.GamepadConfigResetTx;
  if (index === 8) return MageStudios.Param.GamepadConfigFinishTx;
  return "";
};

Window_GamepadConfig.prototype.getButtonConfig = function (index) {
  if (index > 5) return "";
  var key = this.getButtonKey(index);
  var button = Input.getGamepadButton(key);
  return MageStudios.Param.GamepadConfigButton.format(button);
};

Window_GamepadConfig.prototype.getButtonKey = function (index) {
  if (index === 0) return "ok";
  if (index === 1) return "cancel";
  if (index === 2) return "shift";
  if (index === 3) return "menu";
  if (index === 4) return "pageup";
  if (index === 5) return "pagedown";
};

Window_GamepadConfig.prototype.itemTextAlign = function () {
  return "center";
};

Window_GamepadConfig.prototype.clearButtonConfig = function (index) {
  var rect = this.itemRectForText(index);
  rect.x += rect.width / 2;
  rect.width /= 2;
  this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};

Window_GamepadConfig.prototype.updateHelp = function () {
  if (!this._helpWindow) return;
  switch (this.index()) {
    case 0:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigOkHelp);
      break;
    case 1:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigCancelHelp);
      break;
    case 2:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigShiftHelp);
      break;
    case 3:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigMenuHelp);
      break;
    case 4:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigPgUpHelp);
      break;
    case 5:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigPgDnHelp);
      break;
    case 7:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigResetHelp);
      break;
    case 8:
      this._helpWindow.setText(MageStudios.Param.GamepadConfigFinishHelp);
      break;
    default:
      this._helpWindow.clear();
      break;
  }
};

MageStudios.GamepadConfig.Scene_Options_createOptionsWindow =
  Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function () {
  MageStudios.GamepadConfig.Scene_Options_createOptionsWindow.call(this);
  this._optionsWindow.setHandler(
    "gamepadConfig",
    this.commandGamepadConfig.bind(this)
  );
};

Scene_Options.prototype.commandGamepadConfig = function () {
  SceneManager.push(Scene_GamepadConfig);
};

function Scene_GamepadConfig() {
  this.initialize.apply(this, arguments);
}

Scene_GamepadConfig.prototype = Object.create(Scene_MenuBase.prototype);
Scene_GamepadConfig.prototype.constructor = Scene_GamepadConfig;

Scene_GamepadConfig.prototype.initialize = function () {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_GamepadConfig.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createGamepadConfigWindow();
};

Scene_GamepadConfig.prototype.terminate = function () {
  Scene_MenuBase.prototype.terminate.call(this);
  ConfigManager.save();
};

Scene_GamepadConfig.prototype.update = function () {
  Scene_MenuBase.prototype.update.call(this);
  this.updateAttachedController();
  this.updateButtonConfig();
  this.updateAfterConfig();
};

Scene_GamepadConfig.prototype.updateAttachedController = function () {
  if (Input.isControllerConnected()) return;
  this.popScene();
};

Scene_GamepadConfig.prototype.createGamepadConfigWindow = function () {
  this._configWindow = new Window_GamepadConfig(this._helpWindow);
  this._configWindow.setHandler("button", this.commandButton.bind(this));
  this._configWindow.setHandler("reset", this.commandReset.bind(this));
  this._configWindow.setHandler("finish", this.popScene.bind(this));
  this.addWindow(this._configWindow);
};

Scene_GamepadConfig.prototype.commandButton = function () {
  var index = this._configWindow.index();
  this._configWindow.clearButtonConfig(index);
  this._configEnabled = true;
  MageStudios.Param.GamepadTimer = 12;
};

Scene_GamepadConfig.prototype.commandReset = function () {
  ConfigManager.gamepadInput = {
    0: "ok",
    1: "cancel",
    2: "shift",
    3: "menu",
    4: "pageup",
    5: "pagedown",
    12: "up",
    13: "down",
    14: "left",
    15: "right",
  };
  ConfigManager.applyGamepadConfig();
  this.refreshWindows();
};

Scene_GamepadConfig.prototype.refreshWindows = function () {
  this._configWindow.refresh();
  this._configWindow.activate();
  ConfigManager.save();
};

Scene_GamepadConfig.prototype.updateButtonConfig = function () {
  if (!this._configEnabled) return;
  var buttonId = Input.getPressedGamepadButton();
  if (buttonId > 11) return;
  if (buttonId >= 0) this.applyButtonConfig(buttonId);
};

Scene_GamepadConfig.prototype.applyButtonConfig = function (buttonId) {
  this._configEnabled = false;
  var index = this._configWindow.index();
  var newConfig = this._configWindow.getButtonKey(index);
  var formerConfig = Input.gamepadMapper[buttonId];
  var formerButton = Input.getGamepadButton(newConfig);
  ConfigManager.gamepadInput[buttonId] = newConfig;
  ConfigManager.gamepadInput[formerButton] = formerConfig;
  ConfigManager.applyGamepadConfig();
  this._configTimer = 12;
};

Scene_GamepadConfig.prototype.updateAfterConfig = function () {
  if (!this._configTimer) return;
  if (--this._configTimer > 0) return;
  SoundManager.playEquip();
  this.refreshWindows();
};
