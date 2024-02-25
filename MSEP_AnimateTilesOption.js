var Imported = Imported || {};
Imported.MSEP_StaticTilesOption = true;

var MageStudios = MageStudios || {};
MageStudios.AniTile = MageStudios.AniTile || {};
MageStudios.AniTile.version = 1.0;

/*:
 * @plugindesc Because some computers and devices lag with animated
 * tiles on the map, an option is added to disable them.
 * @author Mage Studios Engine Plugins
 *
 * @param Command Name
 * @desc The name that appears in the options menu.
 * @default Animated Tiles
 *
 * @param Default Setting
 * @type combo
 * @option true
 * @option false
 * @option auto
 * @desc Default setting for this option.
 * ON - true     OFF - false     AUTO - auto
 * @default auto
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Some players may experience lag when walking near animated tiles. This is
 * due to the fact that animated tiles constantly draw, delete, and redraw the
 * tiles every few frames. Unfortunately, due to Pixi2's drawing method, there
 * exists some memory leaks when this kind of drawing occurs. On mobile devices
 * or weak computers with little memory to spare, this can potentially cause
 * some games to crash. The option to enable/disable animated tiles is now in
 * the options menu for players to toggle.
 *
 * For those who decide to make the default settings for the plugin to 'auto',
 * any player who is playing on mobile or browser will default to having the
 * setting off while local players will have the setting default to on.
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
 * \i[302]Animated Tiles
 *
 * Help Description:
 * Turns animated tiles ON or OFF.
 *
 * Symbol:
 * animateTiles
 *
 * Show/Hide:
 * show = Imported.MSEP_StaticTilesOption;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 *
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 *
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_AnimateTilesOption");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.STOCommandName = String(
  MageStudios.Parameters["Command Name"]
);
MageStudios.Param.STODefault = String(
  MageStudios.Parameters["Default Setting"]
);

MageStudios.getDefaultAnimateTilesOption = function () {
  if (MageStudios.Param.STODefault.match(/true/i)) {
    return true;
  } else if (MageStudios.Param.STODefault.match(/false/i)) {
    return false;
  } else {
    return Utils.isNwjs();
  }
};

ConfigManager.animateTiles = MageStudios.getDefaultAnimateTilesOption();

MageStudios.AniTile.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = MageStudios.AniTile.ConfigManager_makeData.call(this);
  config.animateTiles = this.animateTiles;
  return config;
};

MageStudios.AniTile.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  MageStudios.AniTile.ConfigManager_applyData.call(this, config);
  this.animateTiles = this.readConfigAnimateTiles(config, "animateTiles");
};

ConfigManager.readConfigAnimateTiles = function (config, name) {
  var value = config[name];
  if (value !== undefined) {
    return value;
  } else {
    return MageStudios.getDefaultAnimateTilesOption();
  }
};

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.0") {
  MageStudios.AniTile.Tilemap_update = Tilemap.prototype.update;
  Tilemap.prototype.update = function () {
    MageStudios.AniTile.Tilemap_update.call(this);
    if (!ConfigManager.animateTiles) {
      this.animationFrame = 0;
    }
  };
} else {
  Tilemap.prototype._paintTiles = function (startX, startY, x, y) {
    var tableEdgeVirtualId = 10000;
    var mx = startX + x;
    var my = startY + y;
    var dx = (mx * this._tileWidth).mod(this._layerWidth);
    var dy = (my * this._tileHeight).mod(this._layerHeight);
    var lx = dx / this._tileWidth;
    var ly = dy / this._tileHeight;
    var tileId0 = this._readMapData(mx, my, 0);
    var tileId1 = this._readMapData(mx, my, 1);
    var tileId2 = this._readMapData(mx, my, 2);
    var tileId3 = this._readMapData(mx, my, 3);
    var shadowBits = this._readMapData(mx, my, 4);
    var upperTileId1 = this._readMapData(mx, my - 1, 1);
    var lowerTiles = [];
    var upperTiles = [];

    if (this._isHigherTile(tileId0)) {
      upperTiles.push(tileId0);
    } else {
      lowerTiles.push(tileId0);
    }
    if (this._isHigherTile(tileId1)) {
      upperTiles.push(tileId1);
    } else {
      lowerTiles.push(tileId1);
    }

    lowerTiles.push(-shadowBits);

    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
      if (!Tilemap.isShadowingTile(tileId0)) {
        lowerTiles.push(tableEdgeVirtualId + upperTileId1);
      }
    }

    if (this._isOverpassPosition(mx, my)) {
      upperTiles.push(tileId2);
      upperTiles.push(tileId3);
    } else {
      if (this._isHigherTile(tileId2)) {
        upperTiles.push(tileId2);
      } else {
        lowerTiles.push(tileId2);
      }
      if (this._isHigherTile(tileId3)) {
        upperTiles.push(tileId3);
      } else {
        lowerTiles.push(tileId3);
      }
    }

    if (ConfigManager.animateTiles) {
      var count = 1000 + this.animationCount - my;
      var frameUpdated = count % 30 === 0;
      this._animationFrame = Math.floor(count / 30);
    } else {
      var frameUpdated = false;
      this._animationFrame = 0;
    }

    var lastLowerTiles = this._readLastTiles(0, lx, ly);
    if (
      !lowerTiles.equals(lastLowerTiles) ||
      (Tilemap.isTileA1(tileId0) && frameUpdated)
    ) {
      this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
      for (var i = 0; i < lowerTiles.length; i++) {
        var lowerTileId = lowerTiles[i];
        if (lowerTileId < 0) {
          this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
        } else if (lowerTileId >= tableEdgeVirtualId) {
          this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
        } else {
          this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
        }
      }
      this._writeLastTiles(0, lx, ly, lowerTiles);
    }

    var lastUpperTiles = this._readLastTiles(1, lx, ly);
    if (!upperTiles.equals(lastUpperTiles)) {
      this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
      for (var j = 0; j < upperTiles.length; j++) {
        this._drawTile(this._upperBitmap, upperTiles[j], dx, dy);
      }
      this._writeLastTiles(1, lx, ly, upperTiles);
    }
  };
}
MageStudios.AniTile.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
  MageStudios.AniTile.Window_Options_addGeneralOptions.call(this);
  if (!Imported.MSEP_OptionsCore) {
    this.addCommand(MageStudios.Param.STOCommandName, "animateTiles");
  }
};
