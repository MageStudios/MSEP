var Imported = Imported || {};
Imported.MSEP_RegionRestrictions = true;

var MageStudios = MageStudios || {};
MageStudios.RR = MageStudios.RR || {};
MageStudios.RR.version = 1.0;

/*:
 * @plugindesc Use regions to block out Events and/or the player from
 * being able to venture into those spots.
 * @author Mage Studios Engine Plugins
 *
 * @param Player Restrict
 * @desc This region ID will restrict the player from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Restrict
 * @desc This region ID will restrict all events from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Restrict
 * @desc This region ID will restrict players and events.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Player Allow
 * @desc This region ID will always allow player passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Allow
 * @desc This region ID will always allow events passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Allow
 * @desc This region ID will always allow both passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Not everybody wants NPC's to travel all over the place. With this plugin,
 * you can set NPC's to be unable to move pass tiles marked by a specified
 * Region ID. Simply draw out the area you want to enclose NPC's in on and
 * they'll be unable to move past it unless they have Through on. Likewise,
 * there are regions that you can prevent the player from moving onto, too!
 *
 * A new change from the RPG Maker VX Ace version is that now there exist
 * Regions that can allow players and events to always travel through.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *
 *   <Player Restrict Region: x>
 *   <Player Restrict Region: x, x, x>
 *   <Player Restrict Region: x to y>
 *   Restricts region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Restrict Region: x>
 *   <Event Restrict Region: x, x, x>
 *   <Event Restrict Region: x to y>
 *   Restricts region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Restrict Region: x>
 *   <All Restrict Region: x, x, x>
 *   <All Restrict Region: x to y>
 *   Restricts region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 *   <Player Allow Region: x>
 *   <Player Allow Region: x, x, x>
 *   <Player Allow Region: x to y>
 *   Allows region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Allow Region: x>
 *   <Event Allow Region: x, x, x>
 *   <Event Allow Region: x to y>
 *   Allows region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Allow Region: x>
 *   <All Allow Region: x, x, x>
 *   <All Allow Region: x to y>
 *   Allows region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Fixed an issue with vehicles being capable of landing the player in region
 * restricted zones.
 *
 * Version 1.02:
 * - Plugin parameters have been upgraded to now accept multiple region ID's.
 * Insert a space in between them to add more than one region ID.
 *
 * Version 1.01:
 * - Added new notetags to allow for more region restriction settings!
 *
 * Version 1.00:
 * - Finished plugin!
 */

MageStudios.Param = MageStudios.Param || {};

MageStudios.SetupParameters = function () {
  var parameters = PluginManager.parameters("MSEP_RegionRestrictions");
  MageStudios.Param.RRAllAllow = String(parameters["All Allow"]);
  MageStudios.Param.RRAllAllow = MageStudios.Param.RRAllAllow.split(" ");
  for (var i = 0; i < MageStudios.Param.RRAllAllow.length; ++i) {
    MageStudios.Param.RRAllAllow[i] = Number(MageStudios.Param.RRAllAllow[i]);
  }
  MageStudios.Param.RRAllRestrict = String(parameters["All Restrict"]);
  MageStudios.Param.RRAllRestrict = MageStudios.Param.RRAllRestrict.split(" ");
  for (var i = 0; i < MageStudios.Param.RRAllRestrict.length; ++i) {
    MageStudios.Param.RRAllRestrict[i] = Number(
      MageStudios.Param.RRAllRestrict[i]
    );
  }
  MageStudios.Param.RREventAllow = String(parameters["Event Allow"]);
  MageStudios.Param.RREventAllow = MageStudios.Param.RREventAllow.split(" ");
  for (var i = 0; i < MageStudios.Param.RREventAllow.length; ++i) {
    MageStudios.Param.RREventAllow[i] = Number(
      MageStudios.Param.RREventAllow[i]
    );
  }
  MageStudios.Param.RREventRestrict = String(parameters["Event Restrict"]);
  MageStudios.Param.RREventRestrict =
    MageStudios.Param.RREventRestrict.split(" ");
  for (var i = 0; i < MageStudios.Param.RREventRestrict.length; ++i) {
    MageStudios.Param.RREventRestrict[i] = Number(
      MageStudios.Param.RREventRestrict[i]
    );
  }
  MageStudios.Param.RRPlayerAllow = String(parameters["Player Allow"]);
  MageStudios.Param.RRPlayerAllow = MageStudios.Param.RRPlayerAllow.split(" ");
  for (var i = 0; i < MageStudios.Param.RRPlayerAllow.length; ++i) {
    MageStudios.Param.RRPlayerAllow[i] = Number(
      MageStudios.Param.RRPlayerAllow[i]
    );
  }
  MageStudios.Param.RRPlayerRestrict = String(parameters["Player Restrict"]);
  MageStudios.Param.RRPlayerRestrict =
    MageStudios.Param.RRPlayerRestrict.split(" ");
  for (var i = 0; i < MageStudios.Param.RRPlayerRestrict.length; ++i) {
    MageStudios.Param.RRPlayerRestrict[i] = Number(
      MageStudios.Param.RRPlayerRestrict[i]
    );
  }
};
MageStudios.SetupParameters();

DataManager.processRRNotetags = function () {
  if (!$dataMap) return;
  $dataMap.restrictPlayerRegions = MageStudios.Param.RRAllRestrict.concat(
    MageStudios.Param.RRPlayerRestrict
  );
  $dataMap.restrictEventRegions = MageStudios.Param.RRAllRestrict.concat(
    MageStudios.Param.RREventRestrict
  );
  $dataMap.allowPlayerRegions = MageStudios.Param.RRAllAllow.concat(
    MageStudios.Param.RRPlayerAllow
  );
  $dataMap.allowEventRegions = MageStudios.Param.RRAllAllow.concat(
    MageStudios.Param.RREventAllow
  );
  if (!$dataMap.note) return;

  var note1a = /<(?:PLAYER RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:PLAYER RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:EVENT RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:EVENT RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3a = /<(?:ALL RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3b = /<(?:ALL RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var note4a = /<(?:PLAYER ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4b = /<(?:PLAYER ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5a = /<(?:EVENT ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5b = /<(?:EVENT ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note6a = /<(?:ALL ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6b = /<(?:ALL ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
    } else if (line.match(note1b)) {
      var mainArray = $dataMap.restrictPlayerRegions;
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(range);
    } else if (line.match(note2a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note2b)) {
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(range);
    } else if (line.match(note3a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note3b)) {
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note4a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
    } else if (line.match(note4b)) {
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(range);
    } else if (line.match(note5a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note5b)) {
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(range);
    } else if (line.match(note6a)) {
      array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note6b)) {
      var range = MageStudios.Util.getRange(
        Number(RegExp.$1),
        Number(RegExp.$2)
      );
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    }
  }
};

MageStudios.RR.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
  MageStudios.RR.Game_Map_setup.call(this, mapId);
  if ($dataMap) DataManager.processRRNotetags();
};

Game_Map.prototype.restrictEventRegions = function () {
  if ($dataMap.restrictEventRegions === undefined) {
    DataManager.processRRNotetags();
  }
  return $dataMap.restrictEventRegions || [];
};

Game_Map.prototype.restrictPlayerRegions = function () {
  if ($dataMap.restrictPlayerRegions === undefined) {
    DataManager.processRRNotetags();
  }
  return $dataMap.restrictPlayerRegions || [];
};

Game_Map.prototype.allowEventRegions = function () {
  if ($dataMap.allowEventRegions === undefined) {
    DataManager.processRRNotetags();
  }
  return $dataMap.allowEventRegions || [];
};

Game_Map.prototype.allowPlayerRegions = function () {
  if ($dataMap.allowPlayerRegions === undefined) {
    DataManager.processRRNotetags();
  }
  return $dataMap.allowPlayerRegions || [];
};

MageStudios.RR.Game_CharacterBase_isMapPassable =
  Game_CharacterBase.prototype.isMapPassable;
Game_CharacterBase.prototype.isMapPassable = function (x, y, d) {
  if (this.isEventRegionForbid(x, y, d)) return false;
  if (this.isPlayerRegionForbid(x, y, d)) return false;
  if (this.isEventRegionAllow(x, y, d)) return true;
  if (this.isPlayerRegionAllow(x, y, d)) return true;
  return MageStudios.RR.Game_CharacterBase_isMapPassable.call(this, x, y, d);
};

Game_CharacterBase.prototype.isEvent = function () {
  return false;
};

Game_CharacterBase.prototype.isPlayer = function () {
  return false;
};

Game_CharacterBase.prototype.processRRNotetags = function () {
  DataManager.processRRNotetags();
};

Game_CharacterBase.prototype.isEventRegionForbid = function (x, y, d) {
  if (this.isPlayer()) return false;
  if (this.isThrough()) return false;
  var regionId = this.getRegionId(x, y, d);
  if (regionId === 0) return false;
  if ($gameMap.restrictEventRegions().contains(regionId)) return true;
  return false;
};

Game_CharacterBase.prototype.isPlayerRegionForbid = function (x, y, d) {
  if (this.isEvent()) return false;
  if (this.isThrough()) return false;
  var regionId = this.getRegionId(x, y, d);
  if (regionId === 0) return false;
  if ($gameMap.restrictPlayerRegions().contains(regionId)) return true;
  return false;
};

Game_CharacterBase.prototype.isEventRegionAllow = function (x, y, d) {
  if (this.isPlayer()) return false;
  var regionId = this.getRegionId(x, y, d);
  if (regionId === 0) return false;
  if ($gameMap.allowEventRegions().contains(regionId)) return true;
  return false;
};

Game_CharacterBase.prototype.isPlayerRegionAllow = function (x, y, d) {
  if (this.isEvent()) return false;
  var regionId = this.getRegionId(x, y, d);
  if (regionId === 0) return false;
  if ($gameMap.allowPlayerRegions().contains(regionId)) return true;
  return false;
};

Game_CharacterBase.prototype.getRegionId = function (x, y, d) {
  switch (d) {
    case 1:
      return $gameMap.regionId(x - 1, y + 1);
      break;
    case 2:
      return $gameMap.regionId(x + 0, y + 1);
      break;
    case 3:
      return $gameMap.regionId(x + 1, y + 1);
      break;
    case 4:
      return $gameMap.regionId(x - 1, y + 0);
      break;
    case 5:
      return $gameMap.regionId(x + 0, y + 0);
      break;
    case 6:
      return $gameMap.regionId(x + 1, y + 0);
      break;
    case 7:
      return $gameMap.regionId(x - 1, y - 1);
      break;
    case 8:
      return $gameMap.regionId(x + 0, y - 1);
      break;
    case 9:
      return $gameMap.regionId(x + 1, y - 1);
      break;
    default:
      return $gameMap.regionId(x, y);
      break;
  }
};

Game_Event.prototype.isEvent = function () {
  return true;
};

Game_Player.prototype.isPlayer = function () {
  return true;
};

MageStudios.RR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function (x, y, d) {
  var value = MageStudios.RR.Game_Vehicle_isLandOk.call(this, x, y, d);
  if (!value) return false;
  if (this.isAirship()) {
    d = 5;
    $gamePlayer._through = false;
  }
  if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return false;
  }
  if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return true;
  }
  return true;
};

MageStudios.Util = MageStudios.Util || {};

MageStudios.Util.getRange = function (n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};
