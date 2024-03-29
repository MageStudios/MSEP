var Imported = Imported || {};
Imported.MSEP_EnhancedTP = true;

var MageStudios = MageStudios || {};
MageStudios.ETP = MageStudios.ETP || {};
MageStudios.ETP.version = 1.0;

/*:
 * @plugindesc Gives you more control over how TP is handled in
 * your game in addition to letting players switch TP modes.
 * @author Mage Studios Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Command Name
 * @parent ---General---
 * @desc This is the command name shown in the skill menu.
 * @default TP Mode
 *
 * @param Show Command
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the TP Mode command by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the TP Mode command by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Change Reset
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Reset TP to 0 whenever the TP mode is changed?
 * NO - false     YES - true
 * @default true
 *
 * @param Equipped Color
 * @parent ---General---
 * @type number
 * @min 0
 * @max 31
 * @desc This is the text color used for the equipped TP mode.
 * @default 17
 *
 * @param Default Mode
 * @parent ---General---
 * @type number
 * @min 1
 * @desc This is the default mode everybody starts with unless
 * changed through notetags.
 * @default 1
 *
 * @param Default Unlocks
 * @parent ---General---
 * @desc These are the TP modes unlocked by default. Separate the
 * modes with a space in between.
 * @default 1 2 3 4
 *
 * @param Crisis HP
 * @parent ---General---
 * @type number
 * @min 0
 * @decimals 2
 * @desc This is the rate for what is considered to be low HP.
 * @default 0.25
 *
 * @param Crisis MP
 * @parent ---General---
 * @type number
 * @min 0
 * @decimals 2
 * @desc This is the rate for what is considered to be low MP.
 * @default 0.25
 *
 * @param Dead TP Gain
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow dead characters to gain TP from TP modes while dead?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Mode 1 Settings---
 * @default
 *
 * @param Mode 1 Name
 * @parent ---Mode 1 Settings---
 * @desc The name used for this TP mode.
 * @default Stoic
 *
 * @param Mode 1 Icon
 * @parent ---Mode 1 Settings---
 * @desc The icon used for this TP mode.
 * @default 160
 *
 * @param Mode 1 Help Line 1
 * @parent ---Mode 1 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP by guarding in battle or receiving damage
 *
 * @param Mode 1 Help Line 2
 * @parent ---Mode 1 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default from attacks.
 *
 * @param Mode 1 Max TP
 * @parent ---Mode 1 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 1 Preserve
 * @parent ---Mode 1 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 1 Initial TP
 * @parent ---Mode 1 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 1 Regen TP
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 1 Take HP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default (50 * value / user.mhp * user.tcr).clamp(5, 20)
 *
 * @param Mode 1 Deal HP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Heal HP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Ally HP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Take MP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Deal MP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Heal MP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Ally MP DMG
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 1 Deal State
 * @parent ---Mode 1 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 1 Gain State
 * @parent ---Mode 1 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 1 Kill Ally
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 1 Kill Enemy
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 1 Win Battle
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 1 Flee Battle
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 1 Lose Battle
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 1 Crisis HP
 * @parent ---Mode 1 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 1 Crisis MP
 * @parent ---Mode 1 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 1 Only Member
 * @parent ---Mode 1 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 1 Evasion
 * @parent ---Mode 1 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 2 Settings---
 * @default
 *
 * @param Mode 2 Name
 * @parent ---Mode 2 Settings---
 * @desc The name used for this TP mode.
 * @default Comrade
 *
 * @param Mode 2 Icon
 * @parent ---Mode 2 Settings---
 * @desc The icon used for this TP mode.
 * @default 84
 *
 * @param Mode 2 Help Line 1
 * @parent ---Mode 2 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever allies take daMageStudios.
 *
 * @param Mode 2 Help Line 2
 * @parent ---Mode 2 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 2 Max TP
 * @parent ---Mode 2 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 2 Preserve
 * @parent ---Mode 2 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 2 Initial TP
 * @parent ---Mode 2 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 2 Regen TP
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 2 Take HP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Deal HP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Heal HP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Ally HP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 20 * user.tcr
 *
 * @param Mode 2 Take MP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Deal MP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Heal MP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Ally MP DMG
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 2 Deal State
 * @parent ---Mode 2 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 2 Gain State
 * @parent ---Mode 2 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 2 Kill Ally
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 2 Kill Enemy
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 2 Win Battle
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 2 Flee Battle
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 2 Lose Battle
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 2 Crisis HP
 * @parent ---Mode 2 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 2 Crisis MP
 * @parent ---Mode 2 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 2 Only Member
 * @parent ---Mode 2 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 2 Evasion
 * @parent ---Mode 2 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 3 Settings---
 * @default
 *
 * @param Mode 3 Name
 * @parent ---Mode 3 Settings---
 * @desc The name used for this TP mode.
 * @default Warrior
 *
 * @param Mode 3 Icon
 * @parent ---Mode 3 Settings---
 * @desc The icon used for this TP mode.
 * @default 77
 *
 * @param Mode 3 Help Line 1
 * @parent ---Mode 3 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP by attacking and dealing HP daMageStudios.
 *
 * @param Mode 3 Help Line 2
 * @parent ---Mode 3 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 3 Max TP
 * @parent ---Mode 3 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 3 Preserve
 * @parent ---Mode 3 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 3 Initial TP
 * @parent ---Mode 3 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 3 Regen TP
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 3 Take HP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Deal HP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default Math.min(16, value * 100 / target.mhp) * user.tcr
 *
 * @param Mode 3 Heal HP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Ally HP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Take MP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Deal MP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Heal MP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Ally MP DMG
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 3 Deal State
 * @parent ---Mode 3 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 3 Gain State
 * @parent ---Mode 3 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 3 Kill Ally
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 3 Kill Enemy
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 3 Win Battle
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 3 Flee Battle
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 3 Lose Battle
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 3 Crisis HP
 * @parent ---Mode 3 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 3 Crisis MP
 * @parent ---Mode 3 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 3 Only Member
 * @parent ---Mode 3 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 3 Evasion
 * @parent ---Mode 3 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 4 Settings---
 * @default
 *
 * @param Mode 4 Name
 * @parent ---Mode 4 Settings---
 * @desc The name used for this TP mode.
 * @default Healer
 *
 * @param Mode 4 Icon
 * @parent ---Mode 4 Settings---
 * @desc The icon used for this TP mode.
 * @default 72
 *
 * @param Mode 4 Help Line 1
 * @parent ---Mode 4 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP by healing HP.
 *
 * @param Mode 4 Help Line 2
 * @parent ---Mode 4 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 4 Max TP
 * @parent ---Mode 4 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 4 Preserve
 * @parent ---Mode 4 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 4 Initial TP
 * @parent ---Mode 4 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 4 Regen TP
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 4 Take HP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Deal HP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Heal HP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default Math.min(16, value * -100 / target.mhp) * user.tcr
 *
 * @param Mode 4 Ally HP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Take MP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Deal MP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Heal MP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Ally MP DMG
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 4 Deal State
 * @parent ---Mode 4 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 4 Gain State
 * @parent ---Mode 4 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 4 Kill Ally
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 4 Kill Enemy
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 4 Win Battle
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 4 Flee Battle
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 4 Lose Battle
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 4 Crisis HP
 * @parent ---Mode 4 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 4 Crisis MP
 * @parent ---Mode 4 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 4 Only Member
 * @parent ---Mode 4 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 4 Evasion
 * @parent ---Mode 4 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 5 Settings---
 * @default
 *
 * @param Mode 5 Name
 * @parent ---Mode 5 Settings---
 * @desc The name used for this TP mode.
 * @default Breaker
 *
 * @param Mode 5 Icon
 * @parent ---Mode 5 Settings---
 * @desc The icon used for this TP mode.
 * @default 174
 *
 * @param Mode 5 Help Line 1
 * @parent ---Mode 5 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user deals MP damage, receives MP damage,
 *
 * @param Mode 5 Help Line 2
 * @parent ---Mode 5 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default or an ally receives MP daMageStudios.
 *
 * @param Mode 5 Max TP
 * @parent ---Mode 5 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 5 Preserve
 * @parent ---Mode 5 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 5 Initial TP
 * @parent ---Mode 5 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 5 Regen TP
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 5 Take HP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 5 Deal HP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 5 Heal HP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 5 Ally HP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 5 Take MP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 50 * damageRate * user.tcr
 *
 * @param Mode 5 Deal MP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default Math.min(16, value / 4) * user.tcr
 *
 * @param Mode 5 Heal MP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 5 Ally MP DMG
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 20 * user.tcr
 *
 * @param Mode 5 Deal State
 * @parent ---Mode 5 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 5 Gain State
 * @parent ---Mode 5 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 5 Kill Ally
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 5 Kill Enemy
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 5 Win Battle
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 5 Flee Battle
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 5 Lose Battle
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 5 Crisis HP
 * @parent ---Mode 5 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 5 Crisis MP
 * @parent ---Mode 5 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 5 Only Member
 * @parent ---Mode 5 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 5 Evasion
 * @parent ---Mode 5 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 6 Settings---
 * @default
 *
 * @param Mode 6 Name
 * @parent ---Mode 6 Settings---
 * @desc The name used for this TP mode.
 * @default Booster
 *
 * @param Mode 6 Icon
 * @parent ---Mode 6 Settings---
 * @desc The icon used for this TP mode.
 * @default 166
 *
 * @param Mode 6 Help Line 1
 * @parent ---Mode 6 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user recovers MP for an ally.
 *
 * @param Mode 6 Help Line 2
 * @parent ---Mode 6 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 6 Max TP
 * @parent ---Mode 6 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 6 Preserve
 * @parent ---Mode 6 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 6 Initial TP
 * @parent ---Mode 6 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 6 Regen TP
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 6 Take HP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Deal HP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Heal HP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Ally HP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Take MP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Deal MP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Heal MP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default Math.min(16, value / -4) * user.tcr
 *
 * @param Mode 6 Ally MP DMG
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 6 Deal State
 * @parent ---Mode 6 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 6 Gain State
 * @parent ---Mode 6 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 6 Kill Ally
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 6 Kill Enemy
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 6 Win Battle
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 6 Flee Battle
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 6 Lose Battle
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 6 Crisis HP
 * @parent ---Mode 6 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 6 Crisis MP
 * @parent ---Mode 6 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 6 Only Member
 * @parent ---Mode 6 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 6 Evasion
 * @parent ---Mode 6 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 7 Settings---
 * @default
 *
 * @param Mode 7 Name
 * @parent ---Mode 7 Settings---
 * @desc The name used for this TP mode.
 * @default Slayer
 *
 * @param Mode 7 Icon
 * @parent ---Mode 7 Settings---
 * @desc The icon used for this TP mode.
 * @default 76
 *
 * @param Mode 7 Help Line 1
 * @parent ---Mode 7 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever an enemy is killed.
 *
 * @param Mode 7 Help Line 2
 * @parent ---Mode 7 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 7 Max TP
 * @parent ---Mode 7 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 7 Preserve
 * @parent ---Mode 7 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 7 Initial TP
 * @parent ---Mode 7 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 7 Regen TP
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 7 Take HP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Deal HP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Heal HP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Ally HP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Take MP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Deal MP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Heal MP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Ally MP DMG
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 7 Deal State
 * @parent ---Mode 7 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 7 Gain State
 * @parent ---Mode 7 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 7 Kill Ally
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 7 Kill Enemy
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 25 * user.tcr
 *
 * @param Mode 7 Win Battle
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 7 Flee Battle
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 7 Lose Battle
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 7 Crisis HP
 * @parent ---Mode 7 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 7 Crisis MP
 * @parent ---Mode 7 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 7 Only Member
 * @parent ---Mode 7 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 7 Evasion
 * @parent ---Mode 7 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 8 Settings---
 * @default
 *
 * @param Mode 8 Name
 * @parent ---Mode 8 Settings---
 * @desc The name used for this TP mode.
 * @default Avenger
 *
 * @param Mode 8 Icon
 * @parent ---Mode 8 Settings---
 * @desc The icon used for this TP mode.
 * @default 1
 *
 * @param Mode 8 Help Line 1
 * @parent ---Mode 8 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever an ally is killed.
 *
 * @param Mode 8 Help Line 2
 * @parent ---Mode 8 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 8 Max TP
 * @parent ---Mode 8 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 8 Preserve
 * @parent ---Mode 8 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 8 Initial TP
 * @parent ---Mode 8 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 8 Regen TP
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 8 Take HP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Deal HP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Heal HP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Ally HP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Take MP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Deal MP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Heal MP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Ally MP DMG
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 8 Deal State
 * @parent ---Mode 8 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 8 Gain State
 * @parent ---Mode 8 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 8 Kill Ally
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 50 * user.tcr
 *
 * @param Mode 8 Kill Enemy
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 8 Win Battle
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 8 Flee Battle
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 8 Lose Battle
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 8 Crisis HP
 * @parent ---Mode 8 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 8 Crisis MP
 * @parent ---Mode 8 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 8 Only Member
 * @parent ---Mode 8 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 8 Evasion
 * @parent ---Mode 8 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 9 Settings---
 * @default
 *
 * @param Mode 9 Name
 * @parent ---Mode 9 Settings---
 * @desc The name used for this TP mode.
 * @default Winner
 *
 * @param Mode 9 Icon
 * @parent ---Mode 9 Settings---
 * @desc The icon used for this TP mode.
 * @default 73
 *
 * @param Mode 9 Help Line 1
 * @parent ---Mode 9 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever your party defeats all enemies.
 *
 * @param Mode 9 Help Line 2
 * @parent ---Mode 9 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 9 Max TP
 * @parent ---Mode 9 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 9 Preserve
 * @parent ---Mode 9 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 9 Initial TP
 * @parent ---Mode 9 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 9 Regen TP
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 9 Take HP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Deal HP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Heal HP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Ally HP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Take MP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Deal MP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Heal MP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Ally MP DMG
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 9 Deal State
 * @parent ---Mode 9 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 9 Gain State
 * @parent ---Mode 9 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 9 Kill Ally
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 9 Kill Enemy
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 9 Win Battle
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 20 * user.tcr
 *
 * @param Mode 9 Flee Battle
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 9 Lose Battle
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 9 Crisis HP
 * @parent ---Mode 9 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 9 Crisis MP
 * @parent ---Mode 9 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 9 Only Member
 * @parent ---Mode 9 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 9 Evasion
 * @parent ---Mode 9 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 10 Settings---
 * @default
 *
 * @param Mode 10 Name
 * @parent ---Mode 10 Settings---
 * @desc The name used for this TP mode.
 * @default Coward
 *
 * @param Mode 10 Icon
 * @parent ---Mode 10 Settings---
 * @desc The icon used for this TP mode.
 * @default 74
 *
 * @param Mode 10 Help Line 1
 * @parent ---Mode 10 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever your party escapes from battle or
 *
 * @param Mode 10 Help Line 2
 * @parent ---Mode 10 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default lose a battle.
 *
 * @param Mode 10 Max TP
 * @parent ---Mode 10 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 10 Preserve
 * @parent ---Mode 10 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 10 Initial TP
 * @parent ---Mode 10 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 10 Regen TP
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 10 Take HP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Deal HP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Heal HP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Ally HP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Take MP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Deal MP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Heal MP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Ally MP DMG
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 10 Deal State
 * @parent ---Mode 10 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 10 Gain State
 * @parent ---Mode 10 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 10 Kill Ally
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 10 Kill Enemy
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 10 Win Battle
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 10 Flee Battle
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 20 * user.tcr
 *
 * @param Mode 10 Lose Battle
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 20 * user.tcr
 *
 * @param Mode 10 Crisis HP
 * @parent ---Mode 10 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 10 Crisis MP
 * @parent ---Mode 10 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 10 Only Member
 * @parent ---Mode 10 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 10 Evasion
 * @parent ---Mode 10 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 11 Settings---
 * @default
 *
 * @param Mode 11 Name
 * @parent ---Mode 11 Settings---
 * @desc The name used for this TP mode.
 * @default Daredevil
 *
 * @param Mode 11 Icon
 * @parent ---Mode 11 Settings---
 * @desc The icon used for this TP mode.
 * @default 48
 *
 * @param Mode 11 Help Line 1
 * @parent ---Mode 11 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user ends a turn with low HP.
 *
 * @param Mode 11 Help Line 2
 * @parent ---Mode 11 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 11 Max TP
 * @parent ---Mode 11 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 11 Preserve
 * @parent ---Mode 11 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 11 Initial TP
 * @parent ---Mode 11 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 11 Regen TP
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 11 Take HP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Deal HP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Heal HP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Ally HP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Take MP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Deal MP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Heal MP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Ally MP DMG
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 11 Deal State
 * @parent ---Mode 11 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 11 Gain State
 * @parent ---Mode 11 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 11 Kill Ally
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 11 Kill Enemy
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 11 Win Battle
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 11 Flee Battle
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 11 Lose Battle
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 11 Crisis HP
 * @parent ---Mode 11 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 16 * user.tcr
 *
 * @param Mode 11 Crisis MP
 * @parent ---Mode 11 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 11 Only Member
 * @parent ---Mode 11 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 11 Evasion
 * @parent ---Mode 11 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 12 Settings---
 * @default
 *
 * @param Mode 12 Name
 * @parent ---Mode 12 Settings---
 * @desc The name used for this TP mode.
 * @default Caster
 *
 * @param Mode 12 Icon
 * @parent ---Mode 12 Settings---
 * @desc The icon used for this TP mode.
 * @default 49
 *
 * @param Mode 12 Help Line 1
 * @parent ---Mode 12 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user ends a turn with low MP.
 *
 * @param Mode 12 Help Line 2
 * @parent ---Mode 12 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 12 Max TP
 * @parent ---Mode 12 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 12 Preserve
 * @parent ---Mode 12 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 12 Initial TP
 * @parent ---Mode 12 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 12 Regen TP
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 12 Take HP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Deal HP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Heal HP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Ally HP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Take MP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Deal MP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Heal MP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Ally MP DMG
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 12 Deal State
 * @parent ---Mode 12 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 12 Gain State
 * @parent ---Mode 12 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 12 Kill Ally
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 12 Kill Enemy
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 12 Win Battle
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 12 Flee Battle
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 12 Lose Battle
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 12 Crisis HP
 * @parent ---Mode 12 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 12 Crisis MP
 * @parent ---Mode 12 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 16 * user.tcr
 *
 * @param Mode 12 Only Member
 * @parent ---Mode 12 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 12 Evasion
 * @parent ---Mode 12 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 13 Settings---
 * @default
 *
 * @param Mode 13 Name
 * @parent ---Mode 13 Settings---
 * @desc The name used for this TP mode.
 * @default Tactician
 *
 * @param Mode 13 Icon
 * @parent ---Mode 13 Settings---
 * @desc The icon used for this TP mode.
 * @default 79
 *
 * @param Mode 13 Help Line 1
 * @parent ---Mode 13 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user inflicts a status effect on a foe.
 *
 * @param Mode 13 Help Line 2
 * @parent ---Mode 13 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 13 Max TP
 * @parent ---Mode 13 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 13 Preserve
 * @parent ---Mode 13 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 13 Initial TP
 * @parent ---Mode 13 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 13 Regen TP
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 13 Take HP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Deal HP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Heal HP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Ally HP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Take MP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Deal MP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Heal MP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Ally MP DMG
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 13 Deal State
 * @parent ---Mode 13 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 16 * user.tcr
 *
 * @param Mode 13 Gain State
 * @parent ---Mode 13 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 13 Kill Ally
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 13 Kill Enemy
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 13 Win Battle
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 13 Flee Battle
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 13 Lose Battle
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 13 Crisis HP
 * @parent ---Mode 13 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 13 Crisis MP
 * @parent ---Mode 13 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 13 Only Member
 * @parent ---Mode 13 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 13 Evasion
 * @parent ---Mode 13 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 14 Settings---
 * @default
 *
 * @param Mode 14 Name
 * @parent ---Mode 14 Settings---
 * @desc The name used for this TP mode.
 * @default Sufferer
 *
 * @param Mode 14 Icon
 * @parent ---Mode 14 Settings---
 * @desc The icon used for this TP mode.
 * @default 3
 *
 * @param Mode 14 Help Line 1
 * @parent ---Mode 14 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user receives a status effect from a foe.
 *
 * @param Mode 14 Help Line 2
 * @parent ---Mode 14 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 14 Max TP
 * @parent ---Mode 14 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 14 Preserve
 * @parent ---Mode 14 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 14 Initial TP
 * @parent ---Mode 14 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 14 Regen TP
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 14 Take HP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Deal HP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Heal HP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Ally HP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Take MP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Deal MP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Heal MP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Ally MP DMG
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 14 Deal State
 * @parent ---Mode 14 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 14 Gain State
 * @parent ---Mode 14 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 16 * user.tcr
 *
 * @param Mode 14 Kill Ally
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 14 Kill Enemy
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 14 Win Battle
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 14 Flee Battle
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 14 Lose Battle
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 14 Crisis HP
 * @parent ---Mode 14 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 14 Crisis MP
 * @parent ---Mode 14 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 14 Only Member
 * @parent ---Mode 14 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 14 Evasion
 * @parent ---Mode 14 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 15 Settings---
 * @default
 *
 * @param Mode 15 Name
 * @parent ---Mode 15 Settings---
 * @desc The name used for this TP mode.
 * @default Dancer
 *
 * @param Mode 15 Icon
 * @parent ---Mode 15 Settings---
 * @desc The icon used for this TP mode.
 * @default 82
 *
 * @param Mode 15 Help Line 1
 * @parent ---Mode 15 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP whenever user successfully evades an attack.
 *
 * @param Mode 15 Help Line 2
 * @parent ---Mode 15 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default
 *
 * @param Mode 15 Max TP
 * @parent ---Mode 15 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 15 Preserve
 * @parent ---Mode 15 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 15 Initial TP
 * @parent ---Mode 15 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 15 Regen TP
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 15 Take HP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Deal HP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Heal HP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Ally HP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Take MP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Deal MP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Heal MP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Ally MP DMG
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 15 Deal State
 * @parent ---Mode 15 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 15 Gain State
 * @parent ---Mode 15 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 15 Kill Ally
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 15 Kill Enemy
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 15 Win Battle
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 15 Flee Battle
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 15 Lose Battle
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 15 Crisis HP
 * @parent ---Mode 15 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 15 Crisis MP
 * @parent ---Mode 15 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 15 Only Member
 * @parent ---Mode 15 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 15 Evasion
 * @parent ---Mode 15 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 16 * user.tcr
 *
 * @param ---Mode 16 Settings---
 * @default
 *
 * @param Mode 16 Name
 * @parent ---Mode 16 Settings---
 * @desc The name used for this TP mode.
 * @default Loner
 *
 * @param Mode 16 Icon
 * @parent ---Mode 16 Settings---
 * @desc The icon used for this TP mode.
 * @default 13
 *
 * @param Mode 16 Help Line 1
 * @parent ---Mode 16 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default Raise TP every turn end when the user is the last
 *
 * @param Mode 16 Help Line 2
 * @parent ---Mode 16 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default remaining alive member.
 *
 * @param Mode 16 Max TP
 * @parent ---Mode 16 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 16 Preserve
 * @parent ---Mode 16 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 16 Initial TP
 * @parent ---Mode 16 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 16 Regen TP
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 16 Take HP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Deal HP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Heal HP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Ally HP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Take MP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Deal MP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Heal MP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Ally MP DMG
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 16 Deal State
 * @parent ---Mode 16 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 16 Gain State
 * @parent ---Mode 16 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 16 Kill Ally
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 16 Kill Enemy
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 16 Win Battle
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 16 Flee Battle
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 16 Lose Battle
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 16 Crisis HP
 * @parent ---Mode 16 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 16 Crisis MP
 * @parent ---Mode 16 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 16 Only Member
 * @parent ---Mode 16 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 16 * user.tcr
 *
 * @param Mode 16 Evasion
 * @parent ---Mode 16 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 17 Settings---
 * @default
 *
 * @param Mode 17 Name
 * @parent ---Mode 17 Settings---
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 17 Icon
 * @parent ---Mode 17 Settings---
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 17 Help Line 1
 * @parent ---Mode 17 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 17 Help Line 2
 * @parent ---Mode 17 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 17 Max TP
 * @parent ---Mode 17 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 17 Preserve
 * @parent ---Mode 17 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 17 Initial TP
 * @parent ---Mode 17 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 17 Regen TP
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 17 Take HP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Deal HP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Heal HP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Ally HP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Take MP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Deal MP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Heal MP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Ally MP DMG
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 17 Deal State
 * @parent ---Mode 17 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 17 Gain State
 * @parent ---Mode 17 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 17 Kill Ally
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 17 Kill Enemy
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 17 Win Battle
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 17 Flee Battle
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 17 Lose Battle
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 17 Crisis HP
 * @parent ---Mode 17 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 17 Crisis MP
 * @parent ---Mode 17 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 17 Only Member
 * @parent ---Mode 17 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 17 Evasion
 * @parent ---Mode 17 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 18 Settings---
 * @default
 *
 * @param Mode 18 Name
 * @parent ---Mode 18 Settings---
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 18 Icon
 * @parent ---Mode 18 Settings---
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 18 Help Line 1
 * @parent ---Mode 18 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 18 Help Line 2
 * @parent ---Mode 18 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 18 Max TP
 * @parent ---Mode 18 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 18 Preserve
 * @parent ---Mode 18 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 18 Initial TP
 * @parent ---Mode 18 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 18 Regen TP
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 18 Take HP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Deal HP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Heal HP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Ally HP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Take MP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Deal MP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Heal MP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Ally MP DMG
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 18 Deal State
 * @parent ---Mode 18 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 18 Gain State
 * @parent ---Mode 18 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 18 Kill Ally
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 18 Kill Enemy
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 18 Win Battle
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 18 Flee Battle
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 18 Lose Battle
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 18 Crisis HP
 * @parent ---Mode 18 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 18 Crisis MP
 * @parent ---Mode 18 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 18 Only Member
 * @parent ---Mode 18 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 18 Evasion
 * @parent ---Mode 18 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 19 Settings---
 * @default
 *
 * @param Mode 19 Name
 * @parent ---Mode 19 Settings---
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 19 Icon
 * @parent ---Mode 19 Settings---
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 19 Help Line 1
 * @parent ---Mode 19 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 19 Help Line 2
 * @parent ---Mode 19 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 19 Max TP
 * @parent ---Mode 19 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 19 Preserve
 * @parent ---Mode 19 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 19 Initial TP
 * @parent ---Mode 19 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 19 Regen TP
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 19 Take HP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Deal HP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Heal HP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Ally HP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Take MP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Deal MP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Heal MP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Ally MP DMG
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 19 Deal State
 * @parent ---Mode 19 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 19 Gain State
 * @parent ---Mode 19 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 19 Kill Ally
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 19 Kill Enemy
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 19 Win Battle
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 19 Flee Battle
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 19 Lose Battle
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 19 Crisis HP
 * @parent ---Mode 19 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 19 Crisis MP
 * @parent ---Mode 19 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 19 Only Member
 * @parent ---Mode 19 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 19 Evasion
 * @parent ---Mode 19 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @param ---Mode 20 Settings---
 * @default
 *
 * @param Mode 20 Name
 * @parent ---Mode 20 Settings---
 * @desc The name used for this TP mode.
 * @default Undefined
 *
 * @param Mode 20 Icon
 * @parent ---Mode 20 Settings---
 * @desc The icon used for this TP mode.
 * @default 0
 *
 * @param Mode 20 Help Line 1
 * @parent ---Mode 20 Settings---
 * @desc The 1st help description line used for this TP mode.
 * @default -
 *
 * @param Mode 20 Help Line 2
 * @parent ---Mode 20 Settings---
 * @desc The 2nd help description line used for this TP mode.
 * @default -
 *
 * @param Mode 20 Max TP
 * @parent ---Mode 20 Settings---
 * @desc The formula used to determine the max TP for this mode.
 * @default 100
 *
 * @param Mode 20 Preserve
 * @parent ---Mode 20 Settings---
 * @desc true - Carry TP from one battle to the next.
 * false - Reset the initial TP count each battle.
 * @default true
 *
 * @param Mode 20 Initial TP
 * @parent ---Mode 20 Settings---
 * @desc Formula for much TP is gained at the start of battle.
 * @default 0
 *
 * @param Mode 20 Regen TP
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained upon regeneration.
 * @default 100 * user.trg
 *
 * @param Mode 20 Take HP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained taking HP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Deal HP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained dealing HP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Heal HP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained healing HP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Ally HP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained for ally HP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Take MP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained taking MP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Deal MP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained dealing MP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Heal MP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained healing MP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Ally MP DMG
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained for ally MP daMageStudios.
 * @default 0
 *
 * @param Mode 20 Deal State
 * @parent ---Mode 20 Settings---
 * @desc Formula TP gained when user inflicts a state on a foe.
 * @default 0
 *
 * @param Mode 20 Gain State
 * @parent ---Mode 20 Settings---
 * @desc Formula TP gained when user gains a state from a foe.
 * @default 0
 *
 * @param Mode 20 Kill Ally
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when an ally is killed.
 * @default 0
 *
 * @param Mode 20 Kill Enemy
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when a foe is killed.
 * @default 0
 *
 * @param Mode 20 Win Battle
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when a battle is won.
 * @default 0
 *
 * @param Mode 20 Flee Battle
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when a battle is fled.
 * @default 0
 *
 * @param Mode 20 Lose Battle
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when a battle is lost.
 * @default 0
 *
 * @param Mode 20 Crisis HP
 * @parent ---Mode 20 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of HP.
 * @default 0
 *
 * @param Mode 20 Crisis MP
 * @parent ---Mode 20 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * with crisis amounts of MP.
 * @default 0
 *
 * @param Mode 20 Only Member
 * @parent ---Mode 20 Settings---
 * @desc Formula for TP gained during the TP regeneration timing
 * as the only ally alive.
 * @default 0
 *
 * @param Mode 20 Evasion
 * @parent ---Mode 20 Settings---
 * @desc Formula for how much TP is gained when user evades an attack.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MV is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MV users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * ============================================================================
 * Instructions - TP Mode Parameters
 * ============================================================================
 *
 * TP Modes are given to your actors for them to decide how they want to gain
 * TP over the course of battle. You can decide the rulings for each TP Mode.
 *
 * Here is an overview of what each TP Mode Parameter does:
 *
 *   Name
 *   - This is the name of the TP Mode. This is what appears in the TP Mode
 *   selection menu in the Skill Menu (if you have it enabled).
 *
 *   Icon
 *   - This is the icon used for the TP Mode in the TP Mode selection menu in
 *   the Skill Menu (if you have it enabled).
 *
 *   Help Line 1
 *   Help Line 2
 *   - This is the help description used for the TP Mode in the TP Mode
 *   selection menu in the Skill Menu (if you have it enabled).
 *
 *   Preserve
 *   - If set to true, then the user carries any earned TP from on battle to
 *   the next battle. If set to false, the at the start and each of each battle
 *   the user's TP value is cleared.
 *
 *   Initial TP
 *   - This is the formula to determine how much TP is gained at the start of
 *   battle. Previously, this was reserved for non-preserved TP values. Now, it
 *   can be used regardless.
 *
 *   Regen TP
 *   - This is how much TP is regenerated during the regeneration phase for the
 *   user. Typically, the regeneration phase occurs at the end of each turn.
 *
 *   Take HP DMG
 *   - This is how much TP is generated from the user taking HP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Deal HP DMG
 *   - This is how much TP is generated from the user dealing HP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Heal HP DMG
 *   - This is how much TP is generated from the user healing HP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Ally HP DMG
 *   - This is how much TP is generated from an ally taking HP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Take MP DMG
 *   - This is how much TP is generated from the user taking MP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Deal MP DMG
 *   - This is how much TP is generated from the user dealing MP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Heal MP DMG
 *   - This is how much TP is generated from the user healing MP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Ally MP DMG
 *   - This is how much TP is generated from an ally taking MP daMageStudios. The
 *   amount of damage taken can be retrieved from the 'value' variable.
 *
 *   Deal State
 *   - This is how much TP is generated from the user issuing a state on a foe.
 *   If the user and target are on the same team, ignore this.
 *
 *   Gain State
 *   - This is how much TP is generated from the user gaining a state from a
 *   foe. If the user and origin are on the same team, ignore this.
 *
 *   Kill Ally
 *   - This is how much TP is generated if an allied member dies. It does not
 *   matter who the killer is.
 *
 *   Kill Enemy
 *   - This is how much TP is generated if an enemy member dies. It does not
 *   matter who the killer is.
 *
 *   Win Battle
 *   - This is how much TP is generated from the player winning a battle.
 *
 *   Flee Battle
 *   - This is how much TP is generated from the player escaping a battle.
 *
 *   Lose Battle
 *   - This is how much TP is generated from the player losing a battle.
 *
 *   Crisis HP
 *   - This is how much TP is generated during the Regen TP timing if the user
 *   is in a critical HP state.
 *
 *   Crisis MP
 *   - This is how much TP is generated during the Regen TP timing if the user
 *   is in a critical MP state.
 *
 *   Only Member
 *   - This is how much TP is generated during the Regen TP timing if the user
 *   is the only alive member left.
 *
 *   Evasion
 *   - This is how much TP is generated whenever the user manages to evade an
 *   action performed by another battler.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to adjust the various settings for TP.
 *
 * Actor and Enemy Notetags:
 *
 *   <TP Mode: x>
 *   This will set the actor's default TP mode to x. If this notetag isn't used
 *   then the actor will default to the mode within the plugin's parameters.
 *
 *   <Unlock TP Mode: x>
 *   <Unlock TP Mode: x, x, x>
 *   <Unlock TP Mode: x to y>
 *   This unlocks what TP modes the actor can use by default. This tag will add
 *   upon the default unlocks already preset in the plugin's parameters.
 *
 * Skill and Item Notetags:
 *
 *   <Unlock TP Mode: x>
 *   <Unlock TP Mode: x, x, x>
 *   <Unlock TP Mode: x to y>
 *   This will cause the target to unlock TP mode x (to y). This will make the
 *   TP mode available in the TP menu.
 *
 * Skill Notetags:
 *
 *   <Learn Unlock TP Mode: x>
 *   <Learn Unlock TP Mode: x, x, x>
 *   <Learn Unlock TP Mode: x to y>
 *   When this skill is learned, unlock TP mode x (to y) in the process of also
 *   learning it. This will make the TP mode available in the TP menu.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following Plugin Commands to alter Enhanced TP.
 *
 * Plugin Command:
 *
 *   ShowTpMode
 *   HideTpMode
 *   This will show/hide the TP Mode from the Skill Menu.
 *
 *   EnableTpMode
 *   DisableTpMode
 *   This will enable/disable the TP Mode in the Skill Menu.
 *
 *   ChangeTpMode Actor 1 to 5
 *   This will change the TP mode of Actor 1 to TP Mode 5.
 *
 *   ChangeTpMode Party 2 to 6
 *   This will change the TP mode of Party Member 2 to TP Mode 6.
 *
 *   UnlockTpMode Actor 3 Mode 7
 *   This will make Actor 3 unlock TP Mode 7.
 *
 *   UnlockTpMode Party 4 Mode 8
 *   This will make Party Member 4 unlock TP Mode 8.
 *
 *   RemoveTpMode Actor 1 Mode 9
 *   This will make Actor 1 remove TP Mode 9.
 *
 *   RemoveTpMode Party 2 Mode 10
 *   This will make Party Member 2 remove TP Mode 10.
 *
 *   UnlockAllTpModes Actor 1
 *   This will make Actor 1 unlock all TP modes.
 *
 *   UnlockAllTpModes Party 2
 *   This will make Party member 2 unlock all TP modes.
 *
 *   RemoveAllTpModes Actor 1
 *   This will make Actor 1 remove all TP modes.
 *
 *   RemoveAllTpModes Party 2
 *   This will make Party member 2 remove all TP modes.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those experienced with JavaScript, you can use these new functions to
 * call upon and change various aspects related to TP Modes.
 *
 *   battler.tpMode()
 *   This will return the current TP mode the battler is using.
 *
 *   battler.tpModeId()
 *   This will return the current TP mode's ID the battler is using.
 *
 *   battler.setTpMode(x)
 *   This will set the battler's TP mode to x.
 *
 *   battler.unlockTpMode(x)
 *   This will unlock TP Mode x for the battler.
 *
 *   battler.removeTpMode(x)
 *   This will remove TP Mode x for the battler unless the battler is currently
 *   using TP Mode x.
 *
 *   battler.unlockAllTpModes()
 *   This will unlock all TP Modes for the battler.
 *
 *   battler.removeAllTpModes()
 *   This will remove all TP Modes for the battler except for the TP Mode that
 *   the battler is currently using.
 */

MageStudios.Parameters = PluginManager.parameters("MSEP_EnhancedTP");
MageStudios.Param = MageStudios.Param || {};

MageStudios.Param.ETPCmdName = String(MageStudios.Parameters["Command Name"]);
MageStudios.Param.ETPShowCmd = eval(
  String(MageStudios.Parameters["Show Command"])
);
MageStudios.Param.ETPEnableCmd = eval(
  String(MageStudios.Parameters["Enable Command"])
);
MageStudios.Param.ETPChangeReset = eval(
  String(MageStudios.Parameters["Change Reset"])
);
MageStudios.Param.ETPEquipColor = Number(
  MageStudios.Parameters["Equipped Color"]
);
MageStudios.Param.ETPDefaultMode = Number(
  MageStudios.Parameters["Default Mode"]
);
MageStudios.Param.ETPUnlocks = String(
  MageStudios.Parameters["Default Unlocks"]
);
MageStudios.Param.ETPUnlocks = MageStudios.Param.ETPUnlocks.split(" ");
if (MageStudios.Param.ETPUnlocks === "") MageStudios.Param.ETPUnlocks = [];
for (
  MageStudios.i = 0;
  MageStudios.i < MageStudios.Param.ETPUnlocks.length;
  ++MageStudios.i
) {
  MageStudios.Param.ETPUnlocks[MageStudios.i] = parseInt(
    MageStudios.Param.ETPUnlocks[MageStudios.i]
  );
}
MageStudios.Param.ETPCrisisHP = Number(MageStudios.Parameters["Crisis HP"]);
MageStudios.Param.ETPCrisisMP = Number(MageStudios.Parameters["Crisis MP"]);
MageStudios.Param.ETPDeadTpGain = eval(
  String(MageStudios.Parameters["Dead TP Gain"])
);

MageStudios.Param.ETPMax = 20;
var $dataTpModes = [null];
for (
  MageStudios.i = 1;
  MageStudios.i < MageStudios.Param.ETPMax + 1;
  ++MageStudios.i
) {
  $dataTpModes[MageStudios.i] = {
    id: MageStudios.i,
    name: String(MageStudios.Parameters["Mode " + MageStudios.i + " Name"]),
    iconIndex: Number(
      MageStudios.Parameters["Mode " + MageStudios.i + " Icon"]
    ),
    description:
      String(MageStudios.Parameters["Mode " + MageStudios.i + " Help Line 1"]) +
      "\n" +
      String(MageStudios.Parameters["Mode " + MageStudios.i + " Help Line 2"]),
    maxTp: String(MageStudios.Parameters["Mode " + MageStudios.i + " Max TP"]),
    preserve: eval(
      String(MageStudios.Parameters["Mode " + MageStudios.i + " Preserve"])
    ),
    initialTp: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Initial TP"]
    ),
    regenTp: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Regen TP"]
    ),
    takeHpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Take HP DMG"]
    ),
    dealHpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Deal HP DMG"]
    ),
    healHpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Heal HP DMG"]
    ),
    allyHpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Ally HP DMG"]
    ),
    takeMpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Take MP DMG"]
    ),
    dealMpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Deal MP DMG"]
    ),
    healMpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Heal MP DMG"]
    ),
    allyMpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Ally MP DMG"]
    ),
    allyMpDmg: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Ally MP DMG"]
    ),
    dealState: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Deal State"]
    ),
    gainState: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Gain State"]
    ),
    killAlly: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Kill Ally"]
    ),
    killEnemy: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Kill Enemy"]
    ),
    winBattle: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Win Battle"]
    ),
    fleeBattle: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Flee Battle"]
    ),
    loseBattle: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Lose Battle"]
    ),
    crisisHp: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Crisis HP"]
    ),
    crisisMp: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Crisis MP"]
    ),
    onlyMember: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Only Member"]
    ),
    evasion: String(
      MageStudios.Parameters["Mode " + MageStudios.i + " Evasion"]
    ),
  };
}

MageStudios.ETP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  if (!MageStudios.ETP.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!MageStudios._loaded_MSEP_EnhancedTP) {
    this.processETPNotetags1($dataActors);
    this.processETPNotetags1($dataEnemies);
    this.processETPNotetags2($dataSkills);
    this.processETPNotetags2($dataItems);
    this.processETPNotetags3($dataSkills);
    MageStudios._loaded_MSEP_EnhancedTP = true;
  }
  return true;
};

DataManager.processETPNotetags1 = function (group) {
  var noteU1 = /<(?:UNLOCK TP MODE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteU2 = /<(?:UNLOCK TP MODE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.tpMode = MageStudios.Param.ETPDefaultMode;
    obj.unlockedTpModes = [obj.tpMode];
    obj.unlockedTpModes = obj.unlockedTpModes.concat(
      MageStudios.Param.ETPUnlocks
    );

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:TP MODE):[ ](\d+)>/i)) {
        obj.tpMode = parseInt(RegExp.$1);
      } else if (line.match(noteU1)) {
        var array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
        obj.unlockedTpModes = obj.unlockedTpModes.concat(array);
      } else if (line.match(noteU2)) {
        var range = MageStudios.Util.getRange(
          parseInt(RegExp.$1),
          parseInt(RegExp.$2)
        );
        obj.unlockedTpModes = obj.unlockedTpModes.concat(range);
      }
    }
  }
};

DataManager.processETPNotetags2 = function (group) {
  var noteU1 = /<(?:UNLOCK TP MODE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteU2 = /<(?:UNLOCK TP MODE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.unlockedTpModes = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteU1)) {
        var array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
        obj.unlockedTpModes = obj.unlockedTpModes.concat(array);
      } else if (line.match(noteU2)) {
        var range = MageStudios.Util.getRange(
          parseInt(RegExp.$1),
          parseInt(RegExp.$2)
        );
        obj.unlockedTpModes = obj.unlockedTpModes.concat(range);
      }
    }
  }
};

DataManager.processETPNotetags3 = function (group) {
  var noteU1 = /<(?:LEARN UNLOCK TP MODE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteU2 = /<(?:LEARN UNLOCK TP MODE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnUnlockedTpModes = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteU1)) {
        var array = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
        obj.learnUnlockedTpModes = obj.learnUnlockedTpModes.concat(array);
      } else if (line.match(noteU2)) {
        var range = MageStudios.Util.getRange(
          parseInt(RegExp.$1),
          parseInt(RegExp.$2)
        );
        obj.learnUnlockedTpModes = obj.learnUnlockedTpModes.concat(range);
      }
    }
  }
};

MageStudios.ETP.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function (result) {
  if (result === 0) {
    $gameParty.allMembersGainTp("winBattle");
  } else if (result === 1) {
    $gameParty.allMembersGainTp("fleeBattle");
  } else if (result === 2) {
    $gameParty.allMembersGainTp("loseBattle");
  }
  MageStudios.ETP.BattleManager_endBattle.call(this, result);
};

MageStudios.ETP.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  MageStudios.ETP.Game_System_initialize.call(this);
  this.initETPSettings();
};

Game_System.prototype.initETPSettings = function () {
  this._showTpMode = MageStudios.Param.ETPShowCmd;
  this._enableTpMode = MageStudios.Param.ETPEnableCmd;
};

Game_System.prototype.isShowTpMode = function () {
  if (this._showTpMode === undefined) this.initETPSettings();
  return this._showTpMode;
};

Game_System.prototype.setShowTpMode = function (value) {
  if (this._showTpMode === undefined) this.initETPSettings();
  this._showTpMode = value;
};

Game_System.prototype.isEnableTpMode = function () {
  if (this._enableTpMode === undefined) this.initETPSettings();
  return this._enableTpMode;
};

Game_System.prototype.setEnableTpMode = function (value) {
  if (this._enableTpMode === undefined) this.initETPSettings();
  this._enableTpMode = value;
};

MageStudios.ETP.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function () {
  this._maxTpCache = undefined;
  MageStudios.ETP.Game_BattlerBase_refresh.call(this);
};

Game_BattlerBase.prototype.initTpMode = function () {
  this._tpMode = MageStudios.Param.ETPDefaultMode;
  this._unlockedTpModes = [];
  if (this.isActor()) {
    this._tpMode = this.actor().tpMode;
    this._unlockedTpModes = this.actor().unlockedTpModes.slice();
  } else if (this.isEnemy()) {
    this._tpMode = this.enemy().tpMode;
    this._unlockedTpModes = this.enemy().unlockedTpModes.slice();
  }
  this._unlockedTpModes = this._unlockedTpModes.filter(
    MageStudios.Util.onlyUnique
  );
  this._unlockedTpModes.sort(function (a, b) {
    return a - b;
  });
};

Game_BattlerBase.prototype.tpMode = function () {
  if (!this._tpMode) this.initTpMode();
  return $dataTpModes[this._tpMode];
};

Game_BattlerBase.prototype.tpModeId = function () {
  if (!this._tpMode) this.initTpMode();
  return this._tpMode;
};

Game_BattlerBase.prototype.setTpMode = function (value) {
  if (!this._tpMode) this.initTpMode();
  if ($dataTpModes.contains(value)) value = value.id;
  this.configureNewTpMode(value);
  if (this._unlockedTpModes.contains(value)) return;
  this._unlockedTpModes.push(value);
  this._unlockedTpModes.sort(function (a, b) {
    return a - b;
  });
};

Game_BattlerBase.prototype.configureNewTpMode = function (tpModeId) {
  this._tpMode = tpModeId;
  if (MageStudios.Param.ETPChangeReset) this._tp = 0;
  this.refresh();
  this._tp = this._tp.clamp(0, this.maxTp());
};

Game_BattlerBase.prototype.tpRate = function () {
  return this.tp / this.maxTp();
};

Game_BattlerBase.prototype.unlockTpMode = function (tpModeId) {
  if (!this._unlockedTpModes) this.initTpMode();
  this._unlockedTpModes.push(tpModeId);
  this._unlockedTpModes = this._unlockedTpModes.filter(
    MageStudios.Util.onlyUnique
  );
  this._unlockedTpModes.sort(function (a, b) {
    return a - b;
  });
  this.refresh();
};

Game_BattlerBase.prototype.removeTpMode = function (tpModeId) {
  if (this.tpMode() && this.tpMode().id === tpModeId) return;
  var index = this._unlockedTpModes.indexOf(tpModeId);
  if (index >= 0) this._unlockedTpModes.splice(index, 1);
  this.refresh();
};

Game_BattlerBase.prototype.forgetTpMode = function (tpModeId) {
  this.removeTpMode(tpModeId);
};

Game_BattlerBase.prototype.unlockAllTpModes = function () {
  var length = $dataTpModes.length;
  for (var i = 0; i < length; ++i) {
    var tpMode = $dataTpModes[i];
    if (tpMode) this.unlockTpMode(tpMode.id);
  }
};

Game_BattlerBase.prototype.removeAllTpModes = function () {
  var length = $dataTpModes.length;
  for (var i = 0; i < length; ++i) {
    var tpMode = $dataTpModes[i];
    if (!tpMode) continue;
    if (this.tpMode() === tpMode) continue;
    this.removeTpMode(tpMode.id);
  }
};

Game_BattlerBase.prototype.unlockedTpModes = function () {
  if (!this._unlockedTpModes) this.initTpMode();
  var arr = [];
  var length = this._unlockedTpModes.length;
  for (var i = 0; i < length; ++i) {
    var modeId = this._unlockedTpModes[i];
    if (!$dataTpModes[modeId]) continue;
    if ($dataTpModes[modeId].name === "") continue;
    if ($dataTpModes[modeId].name.toUpperCase() === "UNDEFINED") continue;
    arr.push($dataTpModes[modeId]);
  }
  return arr;
};

Game_BattlerBase.prototype.getTpEval = function (
  evalMode,
  user,
  target,
  value
) {
  var value = value || 0;
  var a = this;
  var target = target || this;
  var attacker = target || this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var formula = this.tpMode()[evalMode];
  try {
    var tpGain = eval(formula);
  } catch (e) {
    var tpGain = 0;
    MageStudios.Util.displayError(
      e,
      formula,
      "CUSTOM TP MODE GAIN FORMUAL ERROR"
    );
  }
  return Math.floor(parseInt(tpGain));
};

MageStudios.ETP.Game_BattlerBase_maxTp = Game_BattlerBase.prototype.maxTp;
Game_BattlerBase.prototype.maxTp = function () {
  if (this._maxTpCache !== undefined) return this._maxTpCache;
  if (!this.tpMode()) {
    this._maxTpCache = MageStudios.ETP.Game_BattlerBase_maxTp.call(this);
    return this._maxTpCache;
  }
  var a = this;
  var user = this;
  var target = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  this._maxTpCache = this.getTpEval("maxTp", this, this, 0);
  return this._maxTpCache;
};

MageStudios.ETP.Game_BattlerBase_isPreserveTp =
  Game_BattlerBase.prototype.isPreserveTp;
Game_BattlerBase.prototype.isPreserveTp = function () {
  if (this.tpMode()) return this.tpMode().preserve;
  return MageStudios.ETP.Game_BattlerBase_isPreserveTp.call(this);
};

MageStudios.ETP.Game_Battler_initTp = Game_Battler.prototype.initTp;
Game_Battler.prototype.initTp = function () {
  if (this.tpMode()) {
    this.clearTp();
  } else {
    MageStudios.ETP.Game_Battler_initTp.call(this);
  }
};

MageStudios.ETP.Game_Battler_onBattleStart =
  Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function () {
  MageStudios.ETP.Game_Battler_onBattleStart.call(this);
  if (this.tpMode()) this.gainBattleStartTp();
};

MageStudios.ETP.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function () {
  MageStudios.ETP.Game_Battler_onBattleEnd.call(this);
  if (this.isPreserveTp()) return;
  this.clearTp();
};

Game_Battler.prototype.gainTpmodeTp = function (value) {
  if (this.canGainTpModeTp()) this.gainSilentTp(value);
};

Game_Battler.prototype.canGainTpModeTp = function () {
  if (!MageStudios.Param.ETPDeadTpGain) {
    if (this.isDead()) return false;
  }
  return true;
};

Game_Battler.prototype.gainBattleStartTp = function () {
  var value = this.getTpEval("initialTp", this, this, 0);
  this.gainTpmodeTp(value);
};

MageStudios.ETP.Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function () {
  if ($gameParty.inBattle() && this.tpMode()) {
    this.regularRegenTp();
    this.crisisRegenTp();
    this.onlyMemberRegenTp();
  } else {
    MageStudios.ETP.Game_Battler_regenerateTp.call(this);
  }
};

Game_Battler.prototype.regularRegenTp = function () {
  var value = this.getTpEval("regenTp", this, this, 0);
  this.gainTpmodeTp(value);
};

Game_Battler.prototype.crisisRegenTp = function () {
  if (this.hpRate() <= MageStudios.Param.ETPCrisisHP) {
    var value = this.getTpEval("crisisHp", this, this, 0);
    this.gainTpmodeTp(value);
  }
  if (this.mpRate() <= MageStudios.Param.ETPCrisisMP) {
    var value = this.getTpEval("crisisMp", this, this, 0);
    this.gainTpmodeTp(value);
  }
};

Game_Battler.prototype.onlyMemberRegenTp = function () {
  if (this.isDead()) return;
  if (this.friendsUnit().aliveMembers().length > 1) return;
  var value = this.getTpEval("onlyMember", this, this, 0);
  this.gainTpmodeTp(value);
};

MageStudios.ETP.Game_Battler_chargeTpByDamage =
  Game_Battler.prototype.chargeTpByDamage;
Game_Battler.prototype.chargeTpByDamage = function (damageRate) {
  if (!this.tpMode()) {
    MageStudios.ETP.Game_Battler_chargeTpByDaMageStudios.call(this, damageRate);
  }
};

Game_Battler.prototype.chargeTpByDamageType = function (target, damage, type) {
  if (!this.tpMode()) return;
  var value = this.getTpEval(type, this, target, damage);
  this.gainTpmodeTp(value);
};

MageStudios.ETP.Game_Battler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
  if ($gameParty.inBattle() && this.tpMode()) {
    var deathState = stateId === this.deathStateId();
    var lifeState = this.isAlive();
    var affected = this.isStateAffected(stateId);
  }
  MageStudios.ETP.Game_Battler_addState.call(this, stateId);
  if ($gameParty.inBattle() && this.tpMode()) {
    var landed = this.isStateAffected(stateId);
    if (!deathState && !affected && landed) this.chargeTpByAddState();
    if (deathState && lifeState !== this.isAlive()) this.chargeTpByDeath();
  }
};

Game_Battler.prototype.chargeTpByAddState = function () {
  var user = BattleManager._subject;
  var target = this;
  if (user && target && user.isActor() && target.isActor()) return;
  if (user && target && user.isEnemy() && target.isEnemy()) return;
  if (user) {
    var value = user.getTpEval("dealState", user, this, 0);
    user.gainTpmodeTp(value);
  }
  var value = this.getTpEval("gainState", this, user, 0);
  this.gainTpmodeTp(value);
};

Game_Battler.prototype.chargeTpByDeath = function () {
  var length = this.friendsUnit().members().length;
  for (var i = 0; i < length; ++i) {
    var ally = this.friendsUnit().members()[i];
    if (!ally) continue;
    if (ally === this) continue;
    var value = ally.getTpEval("killAlly", ally, this, 0);
    ally.gainTpmodeTp(value);
  }
  var length = this.opponentsUnit().members().length;
  for (var i = 0; i < length; ++i) {
    var foe = this.opponentsUnit().members()[i];
    if (!foe) continue;
    var value = foe.getTpEval("killEnemy", foe, this, 0);
    foe.gainTpmodeTp(value);
  }
};

MageStudios.ETP.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
  MageStudios.ETP.Game_Actor_setup.call(this, actorId);
  this.initTpMode();
};

MageStudios.ETP.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function (skillId) {
  MageStudios.ETP.Game_Actor_learnSkill.call(this, skillId);
  var skill = $dataSkills[skillId];
  if (skill) this.learnSkillTpMode(skill);
};

Game_Actor.prototype.learnSkillTpMode = function (skill) {
  var length = skill.learnUnlockedTpModes.length;
  for (var i = 0; i < length; ++i) {
    var tpMode = skill.learnUnlockedTpModes[tpMode];
    if ($dataTpModes[tpMode]) this.unlockTpMode(tpMode);
  }
};

MageStudios.ETP.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
  MageStudios.ETP.Game_Enemy_setup.call(this, enemyId, x, y);
  this.initTpMode();
};

Game_Party.prototype.allMembersGainTp = function (type) {
  var length = this.members().length;
  for (var i = 0; i < length; ++i) {
    var member = this.members()[i];
    if (member) {
      var value = member.getTpEval(type, member, member, 0);
      member.gainTpmodeTp(value);
    }
  }
};

MageStudios.ETP.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
  MageStudios.ETP.Game_Action_apply.call(this, target);
  if (!target) return;
  var result = target.result();
  if (!result) return;
  if (!target.tpMode()) return;
  if (result.missed || result.evaded) {
    var value = target.getTpEval("evasion", this.subject(), target, 0);
    target.gainTpmodeTp(value);
  }
};

MageStudios.ETP.Game_Action_executeHpDamage =
  Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function (target, value) {
  MageStudios.ETP.Game_Action_executeHpDaMageStudios.call(this, target, value);
  var user = this.subject();
  var dmg = target.result().hpDamage;
  if (dmg > 0) {
    if (target) target.chargeTpByDamageType(user, dmg, "takeHpDmg");
    if (target) this.allyTpGain(target, dmg, "allyHpDmg");
    if (user) user.chargeTpByDamageType(target, dmg, "dealHpDmg");
  } else if (dmg < 0) {
    if (user) user.chargeTpByDamageType(target, dmg, "healHpDmg");
  }
};

MageStudios.ETP.Game_Action_executeMpDamage =
  Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function (target, value) {
  MageStudios.ETP.Game_Action_executeMpDaMageStudios.call(this, target, value);
  var user = this.subject();
  var dmg = target.result().mpDamage;
  if (dmg > 0) {
    if (target) target.chargeTpByDamageType(user, dmg, "takeMpDmg");
    if (target) this.allyTpGain(target, dmg, "allyMpDmg");
    if (user) user.chargeTpByDamageType(target, dmg, "dealMpDmg");
  } else if (dmg < 0) {
    if (user) user.chargeTpByDamageType(target, dmg, "healMpDmg");
  }
};

Game_Action.prototype.allyTpGain = function (target, value, type) {
  var length = target.friendsUnit().members().length;
  for (var i = 0; i < length; ++i) {
    var ally = target.friendsUnit().members()[i];
    if (!ally) continue;
    if (ally === target) continue;
    ally.chargeTpByDamageType(target, value, type);
  }
};

MageStudios.ETP.Game_Action_applyItemUserEffect =
  Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function (target) {
  MageStudios.ETP.Game_Action_applyItemUserEffect.call(this, target);
  if (target && this.item()) this.applyItemUnlockTpModes(target);
};

Game_Action.prototype.applyItemUnlockTpModes = function (target) {
  var item = this.item();
  var length = item.unlockedTpModes.length;
  for (var i = 0; i < length; ++i) {
    var tpMode = item.unlockedTpModes[i];
    if ($dataTpModes[tpMode]) target.unlockTpMode(tpMode);
  }
};

MageStudios.ETP.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  MageStudios.ETP.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === "ShowTpMode") $gameSystem.setShowTpMode(true);
  if (command === "HideTpMode") $gameSystem.setShowTpMode(false);
  if (command === "EnableTpMode") $gameSystem.setEnableTpMode(true);
  if (command === "DisableTpMode") $gameSystem.setEnableTpMode(false);
  if (command === "ChangeTpMode") this.changeTpMode(args);
  if (command === "UnlockTpMode") this.unlockTpMode(args);
  if (command === "RemoveTpMode") this.removeTpMode(args);
  if (command === "UnlockAllTpModes") this.unlockAllTpModes(args);
  if (command === "RemoveAllTpModes") this.removeAllTpModes(args);
};

Game_Interpreter.prototype.changeTpMode = function (args) {
  if (!args) return;
  if (args[0].toUpperCase() === "ACTOR") {
    var actor = $gameActors.actor(parseInt(args[1]));
  } else if (args[0].toUpperCase() === "PARTY") {
    var actor = $gameParty.members()[parseInt(args[1]) - 1];
  } else {
    return;
  }
  if (!actor) return;
  var tpModeId = parseInt(args[3]);
  actor.setTpMode(tpModeId);
};

Game_Interpreter.prototype.unlockTpMode = function (args) {
  if (!args) return;
  if (args[0].toUpperCase() === "ACTOR") {
    var actor = $gameActors.actor(parseInt(args[1]));
  } else if (args[0].toUpperCase() === "PARTY") {
    var actor = $gameParty.members()[parseInt(args[1]) - 1];
  } else {
    return;
  }
  if (!actor) return;
  var tpModeId = parseInt(args[3]);
  actor.unlockTpMode(tpModeId);
};

Game_Interpreter.prototype.removeTpMode = function (args) {
  if (!args) return;
  if (args[0].toUpperCase() === "ACTOR") {
    var actor = $gameActors.actor(parseInt(args[1]));
  } else if (args[0].toUpperCase() === "PARTY") {
    var actor = $gameParty.members()[parseInt(args[1]) - 1];
  } else {
    return;
  }
  if (!actor) return;
  var tpModeId = parseInt(args[3]);
  actor.removeTpMode(tpModeId);
};

Game_Interpreter.prototype.unlockAllTpModes = function (args) {
  if (!args) return;
  if (args[0].toUpperCase() === "ACTOR") {
    var actor = $gameActors.actor(parseInt(args[1]));
  } else if (args[0].toUpperCase() === "PARTY") {
    var actor = $gameParty.members()[parseInt(args[1]) - 1];
  } else {
    return;
  }
  if (!actor) return;
  actor.unlockAllTpModes();
};

Game_Interpreter.prototype.removeAllTpModes = function (args) {
  if (!args) return;
  if (args[0].toUpperCase() === "ACTOR") {
    var actor = $gameActors.actor(parseInt(args[1]));
  } else if (args[0].toUpperCase() === "PARTY") {
    var actor = $gameParty.members()[parseInt(args[1]) - 1];
  } else {
    return;
  }
  if (!actor) return;
  actor.removeAllTpModes();
};

Window_Base.prototype.drawTpMode = function (mode, actor, wx, wy, ww) {
  ww = ww || 312;
  if (!mode) return;
  var iconBoxWidth = Window_Base._iconWidth + 4;
  this.drawIcon(mode.iconIndex, wx + 2, wy + 2);
  if (actor && actor.tpMode() === mode) {
    this.changeTextColor(this.textColor(MageStudios.Param.ETPEquipColor));
  } else {
    this.resetTextColor();
  }
  this.drawText(mode.name, wx + iconBoxWidth, wy, ww - iconBoxWidth);
};

MageStudios.ETP.Window_Selectable_playOkSound =
  Window_Selectable.prototype.playOkSound;
Window_Selectable.prototype.playOkSound = function () {
  if (SceneManager._scene instanceof Scene_Skill && this._stypeId === "tpMode")
    return;
  MageStudios.ETP.Window_Selectable_playOkSound.call(this);
};

MageStudios.ETP.Window_SkillType_makeCommandList =
  Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function () {
  MageStudios.ETP.Window_SkillType_makeCommandList.call(this);
  if ($gameSystem.isShowTpMode()) this.addTpModeCommand();
};

MageStudios.ETP.Window_SkillList_isEnabled =
  Window_SkillList.prototype.isEnabled;
Window_SkillList.prototype.isEnabled = function (item) {
  if (item && this._stypeId === "tpMode") return true;
  return MageStudios.ETP.Window_SkillList_isEnabled.call(this, item);
};

Window_SkillType.prototype.addTpModeCommand = function () {
  var text = MageStudios.Param.ETPCmdName;
  var enabled = $gameSystem.isEnableTpMode();
  this.addCommand(text, "skill", enabled, "tpMode");
};

MageStudios.ETP.Window_SkillList_makeItemList =
  Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function () {
  if (this._actor && this._stypeId === "tpMode") {
    this._data = this._actor.unlockedTpModes();
  } else {
    MageStudios.ETP.Window_SkillList_makeItemList.call(this);
  }
};

MageStudios.ETP.Window_SkillList_drawItem = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function (index) {
  if (this._stypeId === "tpMode") {
    this.drawTpItem(index);
  } else {
    MageStudios.ETP.Window_SkillList_drawItem.call(this, index);
  }
};

Window_SkillList.prototype.drawTpItem = function (index) {
  var mode = this._data[index];
  if (!mode) return;
  var rect = this.itemRect(index);
  rect.width -= this.textPadding();
  this.changePaintOpacity(this.isEnabled(mode));
  this.drawTpMode(mode, this._actor, rect.x, rect.y, rect.width);
};

MageStudios.ETP.Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
Scene_Skill.prototype.onItemOk = function () {
  if (this._skillTypeWindow.currentExt() === "tpMode") {
    this.changeTpMode();
  } else {
    MageStudios.ETP.Scene_Skill_onItemOk.call(this);
  }
};

Scene_Skill.prototype.changeTpMode = function () {
  SoundManager.playEquip();
  var tpMode = this._itemWindow.item();
  this.actor().setTpMode(tpMode);
  this._itemWindow.activate();
  this._itemWindow.refresh();
  this._statusWindow.refresh();
};

MageStudios.Util = MageStudios.Util || {};

if (!MageStudios.Util.toGroup) {
  MageStudios.Util.toGroup = function (inVal) {
    return inVal;
  };
}

MageStudios.Util.getRange = function (n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

MageStudios.Util.onlyUnique = function (value, index, self) {
  return self.indexOf(value) === index;
};

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
