var Imported = Imported || {};
Imported.MSEP_EventCopier = true;

var MageStudios = MageStudios || {};
MageStudios.EventCopier = MageStudios.EventCopier || {};
MageStudios.EventCopier.version = 1.0;

/*:
 * @plugindesc Copy premade events from a template including all of the
 * possible data stored from a different map!
 * @author Mage Studios Engine Plugins
 * @param ---General---
 * @default
 *
 * @param TemplateMaps
 * @text Template Maps
 * @parent ---General---
 * @type number[]
 * @min 1
 * @max 999
 * @desc A list of all the ID's of the maps that will be preloaded to
 * serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param TemplateNames
 * @text Template Names
 * @parent ---General---
 * @type struct<Template>[]
 * @desc A list of templates made by name so you can use names
 * instead of mapID and eventID combinations with notetags.
 * @default []
 *
 * @param ---Lunatic Mode---
 * @default
 *
 * @param PreCopyCode
 * @text PreCopy Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc The code used before copying over an event.
 * This is global for all Copied Events.
 * @default "
 *
 * @param PostCopyCode
 * @text PostCopy Code
 * @parent ---Lunatic Mode---
 * @type note
 * @desc The code used after copying over an event.
 * This is global for all Copied Events.
 * @default "
 *
 */
/* ----------------------------------------------------------------------------
 * Template Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Name
 * @desc Name of the template. The notetag used will be
 * <Copy Event: name>     Replace 'name' with this value.
 * @default Untitled
 *
 * @param MapID
 * @text Map ID
 * @min 1
 * @max 999
 * @desc The ID of the map to be loaded when using this template.
 * Note: Will automatically add this ID to preloaded maps list.
 * @default 1
 *
 * @param EventID
 * @text Event ID
 * @min 1
 * @max 999
 * @desc The ID of the event to be copied when using this template.
 * @default 1
 *
 * @param PreCopyCode
 * @text PreCopy Code
 * @type note
 * @desc The code used before copying over an event.
 * This is local for only this template.
 * @default "
 *
 * @param PostCopyCode
 * @text PostCopy Code
 * @type note
 * @desc The code used after copying over an event.
 * This is local for only this template.
 * @default "
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * WARNING: This plugin is best used with RPG Maker MV 1.5.0 or above! This is
 * because the MV 1.5.0 editor allows for this plugin to be made in an orderly
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin to make the most out of it.
 *
 * Have you ever made an event template to copy and paste from? Good. That's
 * an efficient way to go about reproducing events that are repeatedly found in
 * your game. But have you ever decided that you suddenly want to make a change
 * to that event... after you've copied and pasted it a bunch of times already?
 * Now you've gotta go hunt down every single one you've copied and replace it.
 * What a pain, right?
 *
 * Well, the Event Copier will allow you to streamline that process. You make a
 * template event, and any events that will use this plugin's notetag will copy
 * everything from that event in the most up to date version in-game. This will
 * include the sprite graphics, the self switches (and self variables if you
 * are using those), the conditions, the pages, the event commands, and even
 * the new Notetags. The only things that won't be copied over will be the ID,
 * X position, and Y position for obvious reasons.
 *
 * This way, you can streamline your eventing process without having the need
 * to finalize an event before mass producing it.
 *
 * More information will be explained in the Instructions section of this
 * plugin's help file.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * First, set aside a dedicated map (or maps) that will be preloaded each time
 * the game starts. Each preloaded map should contain various events that you
 * wish to completely copy. These can range from templates to trigger events to
 * autorun events to parallel events. Once you've made the map(s) you want to
 * preload, open up the Plugin Manager and this plugin. Insert inside this
 * plugin's 'Template Maps' parameter the ID(s) of the map(s) you wish to use.
 *
 * If you are using RPG Maker MV 1.5.0+ and wish to make use of template names,
 * add them through the 'Template Names' plugin parameter. The data from the
 * Template Names parameters can be changed and all events in-game that use
 * notetags with the respective Template Name will be updated accordingly.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To decide if an event will copy from a template map, please follow these
 * instructions below and insert the desired notetag into the event's notebox.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Event Notetags:
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   <Copy Event: Map x, Event y>
 *   - Replace 'x' with the ID of the map to copy the event from.
 *   - Replace 'y' with the ID of the event to copy from that map.
 *
 *   - - -
 *
 *   <Copy Event: mapId, eventId>
 *   - Replace 'mapId' with the ID of the map to copy the event from.
 *   - Replace 'eventId' with the ID of the event to copy from that map.
 *
 *   - - -
 *
 *   <Copy Event: template>
 *   - Replace 'template' with a name from the 'Template Names' plugin param.
 *   This will require you to have version 1.5.0+ of RPG Maker MV. All of the
 *   Map ID and event ID data from the stored template will be used for this
 *   event. This notetag  will also have the bonus of having custom Lunatic
 *   Code unique only to this template name.
 *
 *   - - -
 *
 * When an event is copied, all data will be carried over, from the name of the
 * map, to the graphics used, to the pages, their conditions, and all of the
 * event commands. The only things that will NOT be copied over will be the
 * original event's ID, x positon, and y position.
 *
 * ============================================================================
 * Lunatic Mode - Pre and Post Copy Codes
 * ============================================================================
 *
 * Lunatic Mode requires version 1.5.0+ of RPG Maker MV.
 *
 * For those with JavaScript experience, you can throw in your own custom code
 * to run upon the loading of a copied event. This can be found in the plugin's
 * parameters 'PreCopy Code' and 'PostCopy Code'.
 *
 * If you are using Template Names, you can add in 'PreCopy Code' and
 * 'PostCopy Code' unique to that template.
 *
 * For Lunatic Mode, there are some unique variables that you can alter.
 * They are the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * PreCopy Codes
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Variables      Description
 *
 *      mapId      ID of the map to be loaded.
 *    eventId      ID of the event to be loaded.
 *     target      The event before it's copied over.
 *     player      The player character.
 *
 * Making changes to 'mapId' or 'eventId' will change the data that will be
 * loaded for the target. However, if 'mapId' is changed, you must make sure
 * that the map it's being changed to is already preloaded or else the event
 * will fail to be copied properly.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * PostCopy Codes
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Variables      Description
 *
 *     target      The loaded event after copied over.
 *     player      The player character.
 *
 * While the 'mapId' and 'eventId' variables are available, they cannot be
 * changed and make an impact. You can, however, use them as a conditional
 * check to determine what to do with the target event or player.
 *
 *
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_EventCopier");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.EventCopierData = eval(
  MageStudios.Parameters["TemplateMaps"]
);
MageStudios.Param.EventCopierList = JSON.parse(
  MageStudios.Parameters["TemplateNames"]
);

MageStudios.Param.EventCopierPreCopy = JSON.parse(
  MageStudios.Parameters["PreCopyCode"]
);
MageStudios.Param.EventCopierPostCopy = JSON.parse(
  MageStudios.Parameters["PreCopyCode"]
);

MageStudios.PreloadedMaps = MageStudios.PreloadedMaps || [];

MageStudios.ClearComments = function (str) {
  return str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1").trim();
};

MageStudios.Param.EventCopierPreCopy = MageStudios.ClearComments(
  MageStudios.Param.EventCopierPreCopy
);
MageStudios.Param.EventCopierPostCopy = MageStudios.ClearComments(
  MageStudios.Param.EventCopierPostCopy
);

MageStudios.loadMapData = function (mapId) {
  mapId = mapId.clamp(1, 999);
  if (MageStudios.PreloadedMaps[mapId]) return;
  var src = "Map%1.json".format(mapId.padZero(3));
  var xhr = new XMLHttpRequest();
  var url = "data/" + src;
  xhr.open("GET", url);
  xhr.overrideMimeType("application/json");
  xhr.onload = function () {
    if (xhr.status < 400) {
      MageStudios.PreloadedMaps[mapId] = JSON.parse(xhr.responseText);
    }
  };
  xhr.onerror =
    this._mapLoader ||
    function () {
      DataManager._errorUrl = DataManager._errorUrl || url;
    };
  MageStudios.PreloadedMaps[mapId] = null;
  xhr.send();
};

MageStudios.SetupParameters = function () {
  MageStudios.EventCopier.Template = {};
  var length = MageStudios.Param.EventCopierList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(MageStudios.Param.EventCopierList[i]);
    var name = data.Name.toUpperCase();
    MageStudios.loadMapData(parseInt(data.MapID));
    MageStudios.EventCopier.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID,
      PreCopyCode: MageStudios.ClearComments(JSON.parse(data.PreCopyCode)),
      PostCopyCode: MageStudios.ClearComments(JSON.parse(data.PostCopyCode)),
    };
  }

  var data = MageStudios.Param.EventCopierData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    MageStudios.loadMapData(mapId);
  }
};
MageStudios.SetupParameters();

MageStudios.EventCopier.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function (mapId, eventId) {
  MageStudios.EventCopier.Game_Event_initialize.call(this, mapId, eventId);
  this.setupCopyEvent();
};

Game_Event.prototype.setupCopyEvent = function () {
  var ev = this.event();
  if (ev.note.length <= 0) return;

  var template = undefined;
  if (ev.note.match(/<(?:COPY EVENT):[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)) {
    var mapId = parseInt(RegExp.$1);
    var eventId = parseInt(RegExp.$2);
  } else if (ev.note.match(/<(?:COPY EVENT):[ ](\d+),[ ](\d+)>/i)) {
    var mapId = parseInt(RegExp.$1);
    var eventId = parseInt(RegExp.$2);
  } else if (ev.note.match(/<(?:COPY EVENT):[ ](.*)>/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (MageStudios.EventCopier.Template[name]) {
      var template = MageStudios.EventCopier.Template[name];
    } else {
      return;
    }
    var mapId = parseInt(template.mapId);
    var eventId = parseInt(template.eventId);
  } else {
    return;
  }
  mapId = mapId.clamp(1, 999);

  var target = this;
  var player = $gamePlayer;
  var code = MageStudios.Param.EventCopierPreCopy;
  if (code.length > 0) {
    try {
      eval(code);
    } catch (e) {
      MageStudios.Util.displayError(e, code, "EVENT COPIER PRECOPY EVAL ERROR");
    }
  }
  if (template) {
    var code = template.PreCopyCode;
    if (code.length > 0) {
      try {
        eval(code);
      } catch (e) {
        MageStudios.Util.displayError(
          e,
          code,
          "EVENT COPIER PRECOPY EVAL ERROR"
        );
      }
    }
  }

  mapId = mapId.clamp(1, 999);
  if (MageStudios.PreloadedMaps[mapId]) {
    var map = MageStudios.PreloadedMaps[mapId];
    if (!map.events[eventId]) {
      if ($gameTemp.isPlaytest()) {
        console.log(
          "Map " +
            mapId +
            ", Event " +
            eventId +
            " does not " +
            "exist so a copy cannot be made of it."
        );
      }
      return;
    }

    this._copiedEvent = true;
    this._copiedMapId = mapId;
    this._copiedEventId = eventId;
    this._pageIndex = -2;
    this.findProperPageIndex();
    this.setupPage();
    this.refresh();
  } else if ($gameTemp.isPlaytest() && mapId !== 0) {
    console.log(
      "Map " +
        mapId +
        " is not listed in the MSEP_EventCopier " +
        'plugin parameters to use "Copy Event" notetag.'
    );
    return;
  }

  var target = this;
  var player = $gamePlayer;
  var code = MageStudios.Param.EventCopierPostCopy;
  if (code.length > 0) {
    try {
      eval(code);
    } catch (e) {
      MageStudios.Util.displayError(
        e,
        code,
        "EVENT COPIER POSTCOPY EVAL ERROR"
      );
    }
  }
  if (template) {
    var code = template.PostCopyCode;
    if (code.length > 0) {
      try {
        eval(code);
      } catch (e) {
        MageStudios.Util.displayError(
          e,
          code,
          "EVENT COPIER POSTCOPY EVAL ERROR"
        );
      }
    }
  }
};

MageStudios.EventCopier.event = Game_Event.prototype.event;
Game_Event.prototype.event = function () {
  if (this._copiedEvent) {
    return MageStudios.PreloadedMaps[this._copiedMapId].events[
      this._copiedEventId
    ];
  } else {
    return MageStudios.EventCopier.event.call(this);
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
