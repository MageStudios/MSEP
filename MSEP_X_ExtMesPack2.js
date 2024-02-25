//=============================================================================
// Mage Studios Engine Plugins - Message Core Extension - Extended Message Pack 2
// MSEP_X_ExtMesPack2.js
//=============================================================================

var Imported = Imported || {};
Imported.MSEP_X_ExtMesPack2 = true;

var MageStudios = MageStudios || {};
MageStudios.EMP2 = MageStudios.EMP2 || {};
MageStudios.EMP2.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires MSEP_MessageCore.js) Adds text codes to display
 * various game data information for messages.
 * @author Mage Studios Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires MSEP_MessageCore. Make sure this plugin is located under
 * MSEP_MessageCore in the plugin list.
 *
 * This plugin makes use of text codes to deliver vital information to the
 * player. It can deliver the amount of items, weapons, and armors in the
 * player's possession to the various parameters, extra parameters, and special
 * parameters for actors and enemies. The new text codes also allow you to
 * change the text color based on two number comparisons for conditional ways
 * to color your text. In addition to conditional colors, text can also be
 * displayed based on switch values or custom conditions.
 *
 * Note: This plugin works best with RPG Maker MV 1.5.0+. Lower versions of RPG
 * Maker MV will still work with this plugin, but you will not be able to fully
 * utilize the plugin parameter features comfortably.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Quantity    Effect:
 *  \qi[x]      - Returns the quantity of item x the party currently has.
 *  \qw[x]      - Returns the quantity of weapon x the party currently has.
 *  \qa[x]      - Returns the quantity of armor x the party currently has.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Compare          Effect: Changes text color based on x and y. Defaults:
 *  \compare<x:y>    - x >= y = Green   x < y = Red
 *  \compare1<x:y>   - x >= y = Red     x < y = White
 *  \compare2<x:y>   - x >= y = Yellow  x < y = White
 *  \compare3<x:y>   - x >= y = Green   x < y = White
 *  \compare4<x:y>   - x >= y = Blue    x < y = Purple
 *  \compare5<x:y>   - x >= y = White   x < y = Grey
 *  \compare6<x:y>   - x >= y = White   x < y = Red
 *  \compare7<x:y>   - x >= y = White   x < y = Purple
 *  \compare8<x:y>   - x >= y = White   x < y = Dark Blue
 *  \compare9<x:y>   - x >= y = White   x < y = Brown
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Case                Effect: Returns a different string based on conditions.
 *
 *  \caseSwitch{s?x:y}  - If switch s is on, returns text x.
 *                        If switch s is off, returns text y.
 *
 *  \caseEval{e?x:y}    - If eval code e is true, returns text x.
 *                        If eval code e is false, returns text y.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorParam  Effect:
 *  \amhp[x]    - Returns the MaxHP value of actor x.
 *  \ahp[x]     - Returns the current HP value of actor x.
 *  \ahp%[x]    - Returns the HP rate of actor x.
 *  \ammp[x]    - Returns the MaxMP value of actor x.
 *  \amp[x]     - Returns the current MP value of actor x.
 *  \amp%[x]    - Returns the MP rate of actor x.
 *  \amtp[x]    - Returns the MaxTP value of actor x.
 *  \atp[x]     - Returns the current TP value of actor x.
 *  \atp%[x]    - Returns the TP rate of actor x.
 *  \aatk[x]    - Returns actor x's ATK value. Attack
 *  \adef[x]    - Returns actor x's DEF value. Defense
 *  \amat[x]    - Returns actor x's MAT value. Magic Attack
 *  \amdf[x]    - Returns actor x's MDF value. Magic Defense
 *  \aagi[x]    - Returns actor x's AGI value. Agility
 *  \aluk[x]    - Returns actor x's LUK value. Luck
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorXParam  Effect:
 *  \ahit[x]    - Returns actor x's HIT rate. Hit Rate
 *  \aeva[x]    - Returns actor x's EVA rate. Evasion Rate
 *  \acri[x]    - Returns actor x's CRI rate. Critical Rate
 *  \acev[x]    - Returns actor x's CEV rate. Critical Evasion Rate
 *  \amev[x]    - Returns actor x's MEV rate. Magic Evasion Rate
 *  \amrf[x]    - Returns actor x's MRF rate. Magic Reflection Rate
 *  \acnt[x]    - Returns actor x's CNT rate. Counter Attack Rate
 *  \ahrg[x]    - Returns actor x's HRG rate. HP Regeneration Rate
 *  \amrg[x]    - Returns actor x's MRG rate. MP Regeneration Rate
 *  \atrg[x]    - Returns actor x's TRG rate. TP Regeneration Rate
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorSParam  Effect:
 *  \atgr[x]    - Returns actor x's TGR rate. Target Rate
 *  \agrd[x]    - Returns actor x's GRD rate. Guard Rate
 *  \arec[x]    - Returns actor x's REC rate. Recovery Rate
 *  \apha[x]    - Returns actor x's PHA rate. Pharmacology Rate
 *  \amcr[x]    - Returns actor x's MCR rate. MP Cost Rate
 *  \atcr[x]    - Returns actor x's TCR rate. TP Charge Rate
 *  \apdr[x]    - Returns actor x's PDR rate. Physical Damage Rate
 *  \amdr[x]    - Returns actor x's MDR rate. Magical Damage Rate
 *  \afdr[x]    - Returns actor x's FDR rate. Floor Damaage Rate
 *  \aexr[x]    - Returns actor x's EXR rate. Experience Rate
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemyParam  Effect:
 *  \emhp[x]    - Returns the MaxHP value of enemy x.
 *  \ehp[x]     - Returns the current HP value of enemy x.
 *  \ehp%[x]    - Returns the HP rate of enemy x.
 *  \emmp[x]    - Returns the MaxMP value of enemy x.
 *  \emp[x]     - Returns the current MP value of enemy x.
 *  \emp%[x]    - Returns the MP rate of enemy x.
 *  \emtp[x]    - Returns the MaxTP value of enemy x.
 *  \etp[x]     - Returns the current TP value of enemy x.
 *  \etp%[x]    - Returns the TP rate of enemy x.
 *  \eatk[x]    - Returns enemy x's ATK value. Attack
 *  \edef[x]    - Returns enemy x's DEF value. Defense
 *  \emat[x]    - Returns enemy x's MAT value. Magic Attack
 *  \emdf[x]    - Returns enemy x's MDF value. Magic Defense
 *  \eagi[x]    - Returns enemy x's AGI value. Agility
 *  \eluk[x]    - Returns enemy x's LUK value. Luck
 *  \eexp[x]    - Returns enemy x's EXP value. Experience
 *  \egold[x]   - Returns enemy x's GOLD value. Gold
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemyXParam  Effect:
 *  \ehit[x]    - Returns enemy x's HIT rate. Hit Rate
 *  \eeva[x]    - Returns enemy x's EVA rate. Evasion Rate
 *  \ecri[x]    - Returns enemy x's CRI rate. Critical Rate
 *  \ecev[x]    - Returns enemy x's CEV rate. Critical Evasion Rate
 *  \emev[x]    - Returns enemy x's MEV rate. Magic Evasion Rate
 *  \emrf[x]    - Returns enemy x's MRF rate. Magic Reflection Rate
 *  \ecnt[x]    - Returns enemy x's CNT rate. Counter Attack Rate
 *  \ehrg[x]    - Returns enemy x's HRG rate. HP Regeneration Rate
 *  \emrg[x]    - Returns enemy x's MRG rate. MP Regeneration Rate
 *  \etrg[x]    - Returns enemy x's TRG rate. TP Regeneration Rate
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemySParam  Effect:
 *  \etgr[x]    - Returns enemy x's TGR rate. Target Rate
 *  \egrd[x]    - Returns enemy x's GRD rate. Guard Rate
 *  \erec[x]    - Returns enemy x's REC rate. Recovery Rate
 *  \epha[x]    - Returns enemy x's PHA rate. Pharmacology Rate
 *  \emcr[x]    - Returns enemy x's MCR rate. MP Cost Rate
 *  \etcr[x]    - Returns enemy x's TCR rate. TP Charge Rate
 *  \epdr[x]    - Returns enemy x's PDR rate. Physical Damage Rate
 *  \emdr[x]    - Returns enemy x's MDR rate. Magical Damage Rate
 *  \efdr[x]    - Returns enemy x's FDR rate. Floor Damaage Rate
 *  \eexr[x]    - Returns enemy x's EXR rate. Experience Rate
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Lunatic Mode - Text Code Structure
 * ============================================================================
 *
 * For those with JavaScript experience and would like to customize the way the
 * text codes provided by this plugin behave, you can alter the code used for
 * each of the text codes within the plugin parameters.
 *
 * Inside the plugin parameters exist the code used when each text code is
 * being converted by the in-game message functions. Refer to the variables
 * displayed in the comments at the top of each code to understand which of the
 * variables are being used and how they're being used.
 *
 * By default:
 *
 *   x
 *   - Refers to the x variable being inserted into the text code. This can be
 *   a number or string, depending on the text code.
 *
 *   y
 *   - Refers to the y variable being inserted into the text code. This can be
 *   a number of string, depending on the text code.
 *
 *   text
 *   - Refers to the text that will be displayed by the message system. This is
 *   what will appear as the final result for using the said text code.
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
 *
 * @param ---Quantity Text Codes---
 * @default
 *
 * @param TextCode QI
 * @text \qi[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of item x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar item = $dataItems[x];\nif (Imported.MSEP_ItemCore && DataManager.isIndependent(item)) {\n  var quantity = $gameParty.numIndependentItems(item);\n} else {\n  var quantity = $gameParty.numItems(item);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param TextCode QW
 * @text \qw[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of weapon x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar weapon = $dataWeapons[x];\nif (Imported.MSEP_ItemCore && DataManager.isIndependent(weapon)) {\n  var quantity = $gameParty.numIndependentItems(weapon);\n} else {\n  var quantity = $gameParty.numItems(weapon);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param TextCode QA
 * @text \qa[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of armor x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar armor = $dataArmors[x];\nif (Imported.MSEP_ItemCore && DataManager.isIndependent(armor)) {\n  var quantity = $gameParty.numIndependentItems(armor);\n} else {\n  var quantity = $gameParty.numItems(armor);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param ---Compare Text Codes---
 * @default
 *
 * @param TextCode Compare
 * @text \compare<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Green   x < y = Red
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 24;\n} else if (x < y) {\n  var colorId = 25;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare1
 * @text \compare1<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Red   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 2;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare2
 * @text \compare2<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Yellow   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 14;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare3
 * @text \compare3<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Green   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 3;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare4
 * @text \compare4<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Blue   x < y = Purple
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 4;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare5
 * @text \compare5<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Grey
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 7;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare6
 * @text \compare6<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Red
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 25;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare7
 * @text \compare7<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Purple
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 13;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare8
 * @text \compare8<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Dark Blue
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 9;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare9
 * @text \compare9<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Brown
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 20;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param ---Case Text Codes---
 * @default
 *
 * @param TextCode CaseSwitch
 * @text \caseSwitch{s?x:y}
 * @parent ---Case Text Codes---
 * @type note
 * @desc Text code used to display conditional text revolving around
 * the inserted switch s.
 * @default "// Variables:\n//   s - The switch ID (number) to be checked.\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\ntext = (s) ? x : y;"
 *
 * @param TextCode CaseEval
 * @text \caseEval{e?x:y}
 * @parent ---Case Text Codes---
 * @type note
 * @desc Text code used to display conditional text revolving around
 * the inserted eval code e.
 * @default "// Variables:\n//   e - The eval code to be checked.\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\ntext = (e) ? x : y;"
 *
 * @param ---Actor Param Codes---
 * @default
 *
 * @param ---Actor Params---
 * @text Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param ---Actor XParams---
 * @text X Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param ---Actor SParams---
 * @text S Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param TextCode ALvl
 * @text \alvl[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the LVL of actor x.
 * LVL: Level
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.level;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMhp
 * @text \amhp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MHP of actor x.
 * MHP: MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mhp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHp
 * @text \ahp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the HP of actor x.
 * HP: Current HP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHp%
 * @text \ahp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the HP rate of actor x.
 * HP Rate: Current HP / MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMmp
 * @text \ammp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MMP of actor x.
 * MMP: MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mmp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMp
 * @text \amp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the  MP of actor x.
 * MP: Current MP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMp%
 * @text \amp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MP rate of actor x.
 * MP Rate: Current MP / MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMtp
 * @text \amtp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MTP of actor x.
 * MTP: MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.maxTp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode ATp
 * @text \atp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the TP of actor x.
 * TP: Current TP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ATp%
 * @text \atp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the TP rate of actor x.
 * TP Rate: Current TP / MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AAtk
 * @text \aatk[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the ATK of actor x.
 * ATK: Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.atk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ADef
 * @text \adef[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the DEF of actor x.
 * DEF: Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.def;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMat
 * @text \amat[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MAT of actor x.
 * MAT: Magic Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mat;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMdf
 * @text \amdf[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MDF of actor x.
 * MDF: Magic Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mdf;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AAgi
 * @text \aagi[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the AGI of actor x.
 * AGI: Agility
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.agi;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ALuk
 * @text \aluk[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the LUK of actor x.
 * LUK: Luck
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.luk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHit
 * @text \ahit[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the HIT rate of actor x.
 * HIT: Hit Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hit;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AEva
 * @text \aeva[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the EVA rate of actor x.
 * EVA: Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.eva;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACri
 * @text \acri[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CRI rate of actor x.
 * CRI: Critical Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cri;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACev
 * @text \acev[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CEV rate of actor x.
 * CEV: Critical Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMev
 * @text \amev[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MEV rate of actor x.
 * MEV: Magic Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMrf
 * @text \amrf[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MRF rate of actor x.
 * MRF: Magic Reflection Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mrf;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACnt
 * @text \acnt[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CNT rate of actor x.
 * CNT: Counter Attack Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cnt;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AHrg
 * @text \ahrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the HRG rate of actor x.
 * HRG: HP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMrg
 * @text \amrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MRG rate of actor x.
 * MRG: MP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATrg
 * @text \atrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the TRG rate of actor x.
 * TRG: TP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.trg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATgr
 * @text \atgr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the TGR rate of actor x.
 * TGR: Target Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tgr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AGrd
 * @text \agrd[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the GRD rate of actor x.
 * GRD: Guard Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.grd;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ARec
 * @text \arec[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the REC rate of actor x.
 * REC: Recovery Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.rec;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode APha
 * @text \apha[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the PHA rate of actor x.
 * PHA: Pharmacology Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.pha;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMcr
 * @text \amcr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the MCR rate of actor x.
 * MCR: MP Cost Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATcr
 * @text \atcr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the TCR rate of actor x.
 * TCR: TP Charge Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode APdr
 * @text \apdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the PDR rate of actor x.
 * PDR: Physical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.pdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMdr
 * @text \amdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the MDR rate of actor x.
 * MDR: Magical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AFdr
 * @text \afdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the FDR rate of actor x.
 * FDR: Floor Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.fdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AExr
 * @text \aexr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the EXR rate of actor x.
 * EXR: Experience Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.exr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param ---Enemy Param Codes---
 * @default
 *
 * @param ---Enemy Params---
 * @text Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param ---Enemy XParams---
 * @text X Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param ---Enemy SParams---
 * @text S Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param TextCode ELvl
 * @text \elvl[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the LVL of enemy x.
 * LVL: Level
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nif (Imported.MSEP_EnemyLevels) {\n  var enemy = $gameTroop.members()[x];\n  var value = enemy.level;\n  text = this.groupDigits(value);\n} else {\n  text = $gameParty.highestLevel();\n}"
 *
 * @param TextCode EMhp
 * @text \emhp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MHP of enemy x.
 * MHP: MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mhp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHp
 * @text \ehp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the HP of enemy x.
 * HP: Current HP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHp%
 * @text \ehp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the HP rate of enemy x.
 * HP Rate: Current HP / MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMmp
 * @text \emmp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MMP of enemy x.
 * MMP: MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mmp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMp
 * @text \emp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the  MP of enemy x.
 * MP: Current MP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMp%
 * @text \emp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MP rate of enemy x.
 * MP Rate: Current MP / MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMtp
 * @text \emtp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MTP of enemy x.
 * MTP: MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.maxTp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode ETp
 * @text \etp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the TP of enemy x.
 * TP: Current TP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ETp%
 * @text \etp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the TP rate of enemy x.
 * TP Rate: Current TP / MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EAtk
 * @text \eatk[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the ATK of enemy x.
 * ATK: Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.atk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EDef
 * @text \edef[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the DEF of enemy x.
 * DEF: Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.def;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMat
 * @text \emat[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MAT of enemy x.
 * MAT: Magic Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mat;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMdf
 * @text \emdf[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MDF of enemy x.
 * MDF: Magic Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mdf;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EAgi
 * @text \eagi[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the AGI of enemy x.
 * AGI: Agility
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.agi;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ELuk
 * @text \eluk[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the LUK of enemy x.
 * LUK: Luck
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.luk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EExp
 * @text \eexp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the EXP of enemy x.
 * EXP: Experience Points
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.exp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode EGold
 * @text \egold[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the GOLD of enemy x.
 * GOLD: gold
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.gold();\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHit
 * @text \ehit[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the HIT rate of enemy x.
 * HIT: Hit Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hit;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EEva
 * @text \eeva[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the EVA rate of enemy x.
 * EVA: Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.eva;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECri
 * @text \ecri[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CRI rate of enemy x.
 * CRI: Critical Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cri;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECev
 * @text \ecev[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CEV rate of enemy x.
 * CEV: Critical Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMev
 * @text \emev[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MEV rate of enemy x.
 * MEV: Magic Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMrf
 * @text \emrf[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MRF rate of enemy x.
 * MRF: Magic Reflection Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mrf;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECnt
 * @text \ecnt[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CNT rate of enemy x.
 * CNT: Counter Attack Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cnt;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EHrg
 * @text \ehrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the HRG rate of enemy x.
 * HRG: HP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMrg
 * @text \emrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MRG rate of enemy x.
 * MRG: MP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETrg
 * @text \etrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the TRG rate of enemy x.
 * TRG: TP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.trg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETgr
 * @text \etgr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the TGR rate of enemy x.
 * TGR: Target Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tgr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EGrd
 * @text \egrd[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the GRD rate of enemy x.
 * GRD: Guard Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.grd;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ERec
 * @text \erec[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the REC rate of enemy x.
 * REC: Recovery Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.rec;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EPha
 * @text \epha[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the PHA rate of enemy x.
 * PHA: Pharmacology Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.pha;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMcr
 * @text \emcr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the MCR rate of enemy x.
 * MCR: MP Cost Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETcr
 * @text \etcr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the TCR rate of enemy x.
 * TCR: TP Charge Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EPdr
 * @text \epdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the PDR rate of enemy x.
 * PDR: Physical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.pdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMdr
 * @text \emdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the MDR rate of enemy x.
 * MDR: Magical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EFdr
 * @text \efdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the FDR rate of enemy x.
 * FDR: Floor Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.fdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EExr
 * @text \eexr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the EXR rate of enemy x.
 * EXR: Experience Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.exr;\ntext = Math.floor(value * 100) + '%';"
 *
 */
//=============================================================================

if (Imported.MSEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

MageStudios.Parameters = PluginManager.parameters('MEP_X_ExtMesPack2');
MageStudios.Param = MageStudios.Param || {};
MageStudios.Lunatic = MageStudios.Lunatic || {};

MageStudios.SetupParameters = function() {
  MageStudios.Lunatic.Msg = MageStudios.Lunatic.Msg || {};

  MageStudios.Lunatic.Msg.TcQI = JSON.parse(MageStudios.Parameters['TextCode QI']);
  MageStudios.Lunatic.Msg.TcQW = JSON.parse(MageStudios.Parameters['TextCode QW']);
  MageStudios.Lunatic.Msg.TcQA = JSON.parse(MageStudios.Parameters['TextCode QA']);

  MageStudios.Lunatic.Msg.TcCm0 = JSON.parse(MageStudios.Parameters['TextCode Compare']);
  MageStudios.Lunatic.Msg.TcCm1 = JSON.parse(MageStudios.Parameters['TextCode Compare1']);
  MageStudios.Lunatic.Msg.TcCm2 = JSON.parse(MageStudios.Parameters['TextCode Compare2']);
  MageStudios.Lunatic.Msg.TcCm3 = JSON.parse(MageStudios.Parameters['TextCode Compare3']);
  MageStudios.Lunatic.Msg.TcCm4 = JSON.parse(MageStudios.Parameters['TextCode Compare4']);
  MageStudios.Lunatic.Msg.TcCm5 = JSON.parse(MageStudios.Parameters['TextCode Compare5']);
  MageStudios.Lunatic.Msg.TcCm6 = JSON.parse(MageStudios.Parameters['TextCode Compare6']);
  MageStudios.Lunatic.Msg.TcCm7 = JSON.parse(MageStudios.Parameters['TextCode Compare7']);
  MageStudios.Lunatic.Msg.TcCm8 = JSON.parse(MageStudios.Parameters['TextCode Compare8']);
  MageStudios.Lunatic.Msg.TcCm9 = JSON.parse(MageStudios.Parameters['TextCode Compare9']);

  MageStudios.Lunatic.Msg.TcCSwitch = 
    JSON.parse(MageStudios.Parameters['TextCode CaseSwitch']);
  MageStudios.Lunatic.Msg.TcCaseEval = 
    JSON.parse(MageStudios.Parameters['TextCode CaseEval']);

  MageStudios.Lunatic.Msg.TcALvl = JSON.parse(MageStudios.Parameters['TextCode ALvl']);
  MageStudios.Lunatic.Msg.TcAMhp = JSON.parse(MageStudios.Parameters['TextCode AMhp']);
  MageStudios.Lunatic.Msg.TcAHp = JSON.parse(MageStudios.Parameters['TextCode AHp']);
  MageStudios.Lunatic.Msg.TcAHpp = JSON.parse(MageStudios.Parameters['TextCode AHp%']);
  MageStudios.Lunatic.Msg.TcAMmp = JSON.parse(MageStudios.Parameters['TextCode AMmp']);
  MageStudios.Lunatic.Msg.TcAMp = JSON.parse(MageStudios.Parameters['TextCode AMp']);
  MageStudios.Lunatic.Msg.TcAMpp = JSON.parse(MageStudios.Parameters['TextCode AMp%']);
  MageStudios.Lunatic.Msg.TcATmp = JSON.parse(MageStudios.Parameters['TextCode AMtp']);
  MageStudios.Lunatic.Msg.TcATp = JSON.parse(MageStudios.Parameters['TextCode ATp']);
  MageStudios.Lunatic.Msg.TcATpp = JSON.parse(MageStudios.Parameters['TextCode ATp%']);
  MageStudios.Lunatic.Msg.TcAatk = JSON.parse(MageStudios.Parameters['TextCode AAtk']);
  MageStudios.Lunatic.Msg.TcAdef = JSON.parse(MageStudios.Parameters['TextCode ADef']);
  MageStudios.Lunatic.Msg.TcAmat = JSON.parse(MageStudios.Parameters['TextCode AMat']);
  MageStudios.Lunatic.Msg.TcAmdf = JSON.parse(MageStudios.Parameters['TextCode AMdf']);
  MageStudios.Lunatic.Msg.TcAagi = JSON.parse(MageStudios.Parameters['TextCode AAgi']);
  MageStudios.Lunatic.Msg.TcAluk = JSON.parse(MageStudios.Parameters['TextCode ALuk']);

  MageStudios.Lunatic.Msg.TcAhit = JSON.parse(MageStudios.Parameters['TextCode AHit']);
  MageStudios.Lunatic.Msg.TcAeva = JSON.parse(MageStudios.Parameters['TextCode AEva']);
  MageStudios.Lunatic.Msg.TcAcri = JSON.parse(MageStudios.Parameters['TextCode ACri']);
  MageStudios.Lunatic.Msg.TcAcev = JSON.parse(MageStudios.Parameters['TextCode ACev']);
  MageStudios.Lunatic.Msg.TcAmev = JSON.parse(MageStudios.Parameters['TextCode AMev']);
  MageStudios.Lunatic.Msg.TcAmrf = JSON.parse(MageStudios.Parameters['TextCode AMrf']);
  MageStudios.Lunatic.Msg.TcAcnt = JSON.parse(MageStudios.Parameters['TextCode ACnt']);
  MageStudios.Lunatic.Msg.TcAhrg = JSON.parse(MageStudios.Parameters['TextCode AHrg']);
  MageStudios.Lunatic.Msg.TcAmrg = JSON.parse(MageStudios.Parameters['TextCode AMrg']);
  MageStudios.Lunatic.Msg.TcAtrg = JSON.parse(MageStudios.Parameters['TextCode ATrg']);

  MageStudios.Lunatic.Msg.TcAtgr = JSON.parse(MageStudios.Parameters['TextCode ATgr']);
  MageStudios.Lunatic.Msg.TcAgrd = JSON.parse(MageStudios.Parameters['TextCode AGrd']);
  MageStudios.Lunatic.Msg.TcArec = JSON.parse(MageStudios.Parameters['TextCode ARec']);
  MageStudios.Lunatic.Msg.TcApha = JSON.parse(MageStudios.Parameters['TextCode APha']);
  MageStudios.Lunatic.Msg.TcAmcr = JSON.parse(MageStudios.Parameters['TextCode AMcr']);
  MageStudios.Lunatic.Msg.TcAtcr = JSON.parse(MageStudios.Parameters['TextCode ATcr']);
  MageStudios.Lunatic.Msg.TcApdr = JSON.parse(MageStudios.Parameters['TextCode APdr']);
  MageStudios.Lunatic.Msg.TcAmdr = JSON.parse(MageStudios.Parameters['TextCode AMdr']);
  MageStudios.Lunatic.Msg.TcAfdr = JSON.parse(MageStudios.Parameters['TextCode AFdr']);
  MageStudios.Lunatic.Msg.TcAexr = JSON.parse(MageStudios.Parameters['TextCode AExr']);
  
  MageStudios.Lunatic.Msg.TcELvl = JSON.parse(MageStudios.Parameters['TextCode ELvl']);
  MageStudios.Lunatic.Msg.TcEMhp = JSON.parse(MageStudios.Parameters['TextCode EMhp']);
  MageStudios.Lunatic.Msg.TcEHp = JSON.parse(MageStudios.Parameters['TextCode EHp']);
  MageStudios.Lunatic.Msg.TcEHpp = JSON.parse(MageStudios.Parameters['TextCode EHp%']);
  MageStudios.Lunatic.Msg.TcEMmp = JSON.parse(MageStudios.Parameters['TextCode EMmp']);
  MageStudios.Lunatic.Msg.TcEMp = JSON.parse(MageStudios.Parameters['TextCode EMp']);
  MageStudios.Lunatic.Msg.TcEMpp = JSON.parse(MageStudios.Parameters['TextCode EMp%']);
  MageStudios.Lunatic.Msg.TcETmp = JSON.parse(MageStudios.Parameters['TextCode EMtp']);
  MageStudios.Lunatic.Msg.TcETp = JSON.parse(MageStudios.Parameters['TextCode ETp']);
  MageStudios.Lunatic.Msg.TcETpp = JSON.parse(MageStudios.Parameters['TextCode ETp%']);
  MageStudios.Lunatic.Msg.TcEatk = JSON.parse(MageStudios.Parameters['TextCode EAtk']);
  MageStudios.Lunatic.Msg.TcEdef = JSON.parse(MageStudios.Parameters['TextCode EDef']);
  MageStudios.Lunatic.Msg.TcEmat = JSON.parse(MageStudios.Parameters['TextCode EMat']);
  MageStudios.Lunatic.Msg.TcEmdf = JSON.parse(MageStudios.Parameters['TextCode EMdf']);
  MageStudios.Lunatic.Msg.TcEagi = JSON.parse(MageStudios.Parameters['TextCode EAgi']);
  MageStudios.Lunatic.Msg.TcEluk = JSON.parse(MageStudios.Parameters['TextCode ELuk']);

  MageStudios.Lunatic.Msg.TcEexp = JSON.parse(MageStudios.Parameters['TextCode EExp']);
  MageStudios.Lunatic.Msg.TcEgold = JSON.parse(MageStudios.Parameters['TextCode EGold']);

  MageStudios.Lunatic.Msg.TcEhit = JSON.parse(MageStudios.Parameters['TextCode EHit']);
  MageStudios.Lunatic.Msg.TcEeva = JSON.parse(MageStudios.Parameters['TextCode EEva']);
  MageStudios.Lunatic.Msg.TcEcri = JSON.parse(MageStudios.Parameters['TextCode ECri']);
  MageStudios.Lunatic.Msg.TcEcev = JSON.parse(MageStudios.Parameters['TextCode ECev']);
  MageStudios.Lunatic.Msg.TcEmev = JSON.parse(MageStudios.Parameters['TextCode EMev']);
  MageStudios.Lunatic.Msg.TcEmrf = JSON.parse(MageStudios.Parameters['TextCode EMrf']);
  MageStudios.Lunatic.Msg.TcEcnt = JSON.parse(MageStudios.Parameters['TextCode ECnt']);
  MageStudios.Lunatic.Msg.TcEhrg = JSON.parse(MageStudios.Parameters['TextCode EHrg']);
  MageStudios.Lunatic.Msg.TcEmrg = JSON.parse(MageStudios.Parameters['TextCode EMrg']);
  MageStudios.Lunatic.Msg.TcEtrg = JSON.parse(MageStudios.Parameters['TextCode ETrg']);

  MageStudios.Lunatic.Msg.TcEtgr = JSON.parse(MageStudios.Parameters['TextCode ETgr']);
  MageStudios.Lunatic.Msg.TcEgrd = JSON.parse(MageStudios.Parameters['TextCode EGrd']);
  MageStudios.Lunatic.Msg.TcErec = JSON.parse(MageStudios.Parameters['TextCode ERec']);
  MageStudios.Lunatic.Msg.TcEpha = JSON.parse(MageStudios.Parameters['TextCode EPha']);
  MageStudios.Lunatic.Msg.TcEmcr = JSON.parse(MageStudios.Parameters['TextCode EMcr']);
  MageStudios.Lunatic.Msg.TcEtcr = JSON.parse(MageStudios.Parameters['TextCode ETcr']);
  MageStudios.Lunatic.Msg.TcEpdr = JSON.parse(MageStudios.Parameters['TextCode EPdr']);
  MageStudios.Lunatic.Msg.TcEmdr = JSON.parse(MageStudios.Parameters['TextCode EMdr']);
  MageStudios.Lunatic.Msg.TcEfdr = JSON.parse(MageStudios.Parameters['TextCode EFdr']);
  MageStudios.Lunatic.Msg.TcEexr = JSON.parse(MageStudios.Parameters['TextCode EExr']);
};
MageStudios.SetupParameters();

//=============================================================================
// Window_Base
//=============================================================================

MageStudios.EMP2.Window_Base_convertExtraEscapeCharacters =
  Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
  text = this.convertItemQuantitiesCodes(text);
  text = this.convertActorParameterCodes(text);
  text = this.convertEnemyParameterCodes(text);
  text = MageStudios.EMP2.Window_Base_convertExtraEscapeCharacters.call(this, text);
  text = this.convertColorCompare(text);
  text = this.convertCaseText(text);
  return text;
};

Window_Base.prototype.groupDigits = function(number) {
  return MageStudios.Util.forceGroup(number);
};

Window_Base.prototype.convertItemQuantitiesCodes = function(text) {
  text = text.replace(/\x1bQI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcQI);
    return text;
  }.bind(this));

  text = text.replace(/\x1bQW\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcQW);
    return text;
  }.bind(this));

  text = text.replace(/\x1bQA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcQA);
    return text;
  }.bind(this));

  return text;
};

Window_Base.prototype.convertActorParameterCodes = function(text) {
  text = text.replace(/\x1bALVL\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcALvl);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMHP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAMhp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAHp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAHpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMMP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAMmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAMp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAMpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMTP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcATmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcATp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcATpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAATK\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAatk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bADEF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAdef);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMAT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmat);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMDF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmdf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAAGI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAagi);
    return text;
  }.bind(this));

  text = text.replace(/\x1bALUK\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAluk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHIT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAhit);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAEVA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAeva);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACRI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAcri);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACEV\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAcev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMEV\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMRF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmrf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACNT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAcnt);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAhrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAtrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATGR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAtgr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAGRD\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAgrd);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAREC\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcArec);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAPHA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcApha);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMCR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATCR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAtcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAPDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcApdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAmdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAFDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAfdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAEXR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcAexr);
    return text;
  }.bind(this));
  
  return text;
};

Window_Base.prototype.convertEnemyParameterCodes = function(text) {
  if (!$gameParty.inBattle()) return text;
  text = text.replace(/\x1bELVL\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcELvl);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMHP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEMhp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEHp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEHpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMMP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEMmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEMp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEMpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMTP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcETmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcETp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcETpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEATK\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEatk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEDEF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEdef);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMAT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmat);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMDF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmdf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEAGI\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEagi);
    return text;
  }.bind(this));

  text = text.replace(/\x1bELUK\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEluk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEXP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEexp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEGOLD\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEgold);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHIT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEhit);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEVA\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEeva);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECRI\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEcri);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECEV\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEcev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMEV\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMRF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmrf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECNT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEcnt);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEhrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEtrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETGR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEtgr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEGRD\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEgrd);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEREC\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcErec);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEPHA\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEpha);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMCR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETCR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEtcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEPDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEpdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEmdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEFDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEfdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEXR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcEexr);
    return text;
  }.bind(this));
  
  return text;
};

Window_Base.prototype.convertColorCompare = function(text) {
  text = text.replace(/\x1bCOMPARE\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm0);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE1\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm1);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE2\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm2);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE3\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm3);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE4\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm4);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE5\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm5);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE6\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm6);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE7\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm7);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE8\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm8);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE9\<(.*?):(.*?)\>/gi, function() {
    var x = MageStudios.Util.forceNumber(arguments[1]);
    var y = MageStudios.Util.forceNumber(arguments[2]);
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCm9);
    return text;
  }.bind(this));

  return text;
};

Window_Base.prototype.convertCaseText = function(text) {
  text = text.replace(/\x1bCASESWITCH\{(.*?)\?(.*?):(.*?)\}/gi, function() {
    var s = $gameSwitches.value(Number(arguments[1]));
    var x = arguments[2];
    var y = arguments[3];
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCSwitch);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCASEEVAL\{(.*?)\?(.*?):(.*?)\}/gi, function() {
    var e = eval(arguments[1]);
    var x = arguments[2];
    var y = arguments[3];
    var text = '';
    eval(MageStudios.Lunatic.Msg.TcCaseEval);
    return text;
  }.bind(this));

  return text;
};

//=============================================================================
// Utilities
//=============================================================================

MageStudios.Util = MageStudios.Util || {};

MageStudios.Util.forceGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

MageStudios.Util.forceNumber = function(str) {
  var value = str.match(/\d/g);
  value = value.join('');
  return parseInt(value);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'MEP_X_ExtMesPack2 without MSEP_MessageCore. Please visit MageStudios.moe ';
text += 'and install MSEP_MessageCore in your game project before you can use ';
text += 'this plugin.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.MSEP_MessageCore