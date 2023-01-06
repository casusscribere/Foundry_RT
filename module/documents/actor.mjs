/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import { ROGUETRADER } from "../helpers/config.mjs";
import { RollDialog } from "../helpers/dialogs/base-dialog.js";
import { AttackDialog } from "../helpers/dialogs/attack-dialog.js";
import { RTTest } from "../helpers/tests/test.mjs";
import { RTWeaponTest } from "../helpers/tests/weapon-test.mjs";
export class RTActor extends Actor {
  

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    const actorData = this.data;
    this._organizeCharacteristics(actorData);
    this._organizeSkills(actorData);
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.roguetrader || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
    this._prepareVehicleData(actorData);
    this._prepareVoidshipData(actorData);
  }

  /**
   * Prepare actor type-specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;
    const data = actorData.data;
    const rt = ROGUETRADER;

    //calculate characteristic values and mods
    for (let [key, characteristic] of Object.entries(data.characteristics)) {
      characteristic.boundmod = Math.min(Math.max(characteristic.miscmods + characteristic.conditions, -60), 60);
      characteristic.value = Math.min(Math.max(characteristic.base + characteristic.adjustment, 0), 100);//+characteristic.boundmod;
      characteristic.bonus = Math.floor((characteristic.value) / 10)+Math.max(characteristic.unnatural,0);
    }

    //calculate mitigation values
    for (let [key, mitigation] of Object.entries(data.mitigations)) {
      //mitigation.sum = mitigation.armor + mitigation.extrat + data.characteristics.toughness.bonus;
      //mitigation.tt = mitigation.extrat + data.characteristics.toughness.bonus;
    }

    //calculate skill values
    for (let [key, skill] of Object.entries(data.skills)) {
      skill.bonus = data.characteristics[rt.Skills[key].attribute].bonus;
      skill.value = data.characteristics[rt.Skills[key].attribute].value + rt.rankVal[skill.rank];//+skill.miscmods;
    }

    //calculate initiative
    data.vitals.initiative.value = data.vitals.initiative.adjustment + data.characteristics.agility.bonus;
  }
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
  }
  _prepareVehicleData(actorData) {
    if (actorData.type !== 'vehicle') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
  }
  _prepareVoidshipData(actorData) {
    if (actorData.type !== 'Voidship') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
  }

  // Misc support methods
  _organizeCharacteristics(sheetData) {
    let middle = Object.values(sheetData.data.characteristics).length / 2;
    let i = 0;
    for (let characteristic of Object.values(sheetData.data.characteristics)) {
      characteristic.isLeft = i < middle;
      characteristic.isRight = i >= middle;
      i++;
    }
  }

  _organizeSkills(sheetData) {
    let middle = Object.values(sheetData.data.skills).length / 2;
    let i = 0;
    for (let skill of Object.values(sheetData.data.skills)) {
      skill.isLeft = i < middle;
      skill.isRight = i >= middle;
      i++;
    }
  }

  speakerData() {
    if (this.isToken) {
        return {
            token: this.token.id,
            scene: this.token.parent.id
        }
    }
    else {
        return {
            actor: this.id
        }
    }
  }

  //NEW Roll Dialog
  async setupCharacteristicTest(attribute, actor, options = {}) {
    const rt = ROGUETRADER;
    let attributeObject = this.data.data.characteristics[attribute];
    let dialogData = this._baseDialogData();
    dialogData.name           = actor.name;
    dialogData.id             = this.data._id;
    dialogData.title          = `${rt.Attributes[attribute].name} Test`;
    dialogData.abbrev         = rt.Attributes[attribute].abbrev;
    dialogData.value          = attributeObject.base+attributeObject.adjustment;
    dialogData.unnatural      = attributeObject.unnatural;
    dialogData.bonus          = attributeObject.bonus;
    dialogData.sheetmodifiers = attributeObject.miscmods+attributeObject.conditions;
    dialogData.etc            = 0;
    if(dialogData.sheetmodifiers > 60 || dialogData.sheetmodifiers < -60) dialogData.bound = true;
    else dialogData.bound = false; 
    let testData = await RollDialog.create(dialogData);
    testData.targets = dialogData.targets;
    testData.title = dialogData.title;
    testData.actor = actor.name;
    testData.ownername  = actor.name;
    testData.speaker = this.speakerData();
    testData.attribute = attribute;
    return new RTTest(testData);
  }
  async setupSkillTest(skill, actor, options = {}) {
    const rt = ROGUETRADER;
    let skillObject = this.system.skills[skill];
    let dialogData = this._baseDialogData();
    dialogData.id = this.data._id;
    dialogData.name = actor.name;
    if(skillObject === undefined){
      skillObject = this.data.items.find(element => element.name == skill).data;
      if(skillObject == undefined) console.log("SKILL LOOKUP FUCKED");
      dialogData.title          = `${rt.specialistSkillOptions[skillObject.data.category].name}(${skillObject.name}) Test`;
      dialogData.abbrev         = rt.Attributes[rt.specialistSkillOptions[skillObject.data.category].attribute].abbrev;
      dialogData.value          = this.data.data.characteristics[rt.specialistSkillOptions[skillObject.data.category].attribute].value+rt.rankVal[skillObject.data.rank];
      dialogData.unnatural      = this.data.data.characteristics[rt.specialistSkillOptions[skillObject.data.category].attribute].unnatural;
      dialogData.bonus          = this.data.data.characteristics[rt.specialistSkillOptions[skillObject.data.category].attribute].bonus;
      dialogData.sheetmodifiers = skillObject.data.miscmods+skillObject.data.conditions;
      dialogData.etc = 0;
    }else{
      dialogData.title          = `${rt.Skills[skill].name} Test`;
      dialogData.abbrev         = rt.Attributes[rt.Skills[skill].attribute].abbrev;
      dialogData.value          = skillObject.value;
      dialogData.unnatural      = this.system.characteristics[rt.Skills[skill].attribute].unnatural;
      dialogData.bonus          = skillObject.bonus;
      dialogData.sheetmodifiers = skillObject.miscmods+skillObject.conditions;
      dialogData.etc = 0;
    }

    if(dialogData.sheetmodifiers > 60 || dialogData.sheetmodifiers < -60) dialogData.bound = true;
    else dialogData.bound = false; 
    let testData = await RollDialog.create(dialogData);
    testData.targets = dialogData.targets;
    testData.title = dialogData.title;
    testData.ownername  = actor.name;
    testData.speaker = this.speakerData();
    if (rt.Skills[skill]) testData.attribute = rt.Skills[skill].attribute;
    else testData.attribute = "intelligence";
    return new RTTest(testData);
  }

  async setupWeaponTest(weapon, actor, options = {}) {
    console.log("setting up weapon test!", actor);
    const rt = ROGUETRADER;
    let dialogData = this._baseDialogData();
    dialogData.name = actor.name;
    let weaponObject = weapon.system;
    let attributeObject;
    dialogData.attribute      = {};
    dialogData.id             = this.data._id;
    dialogData.title          = `Attacking with ${weapon.name}`;
    dialogData.class          = weaponObject.class;
    dialogData.spec           = weaponObject.spec;
    dialogData.craftsmanship  = weaponObject.craftsmanship;
    dialogData.range          = weaponObject.range;
    dialogData.disprange      = weaponObject.range+'m';
    dialogData.rof            = weaponObject.rof;
    dialogData.damage         = weaponObject.damage;
    dialogData.dispdamage     = weaponObject.damage.dice+'d'+weaponObject.damage.size+'+'+weaponObject.damage.static+' '+weaponObject.damage.type+' P'+weaponObject.penetration;
    dialogData.penetration    = weaponObject.penetration;
    dialogData.clip           = weaponObject.clip;
    dialogData.dispclip       = weaponObject.clip.cur+'/'+weaponObject.clip.max+'/'+weaponObject.clip.ext;
    dialogData.special        = weaponObject.special;
    dialogData.dispspecials   = weaponObject.special;
    dialogData.ammo           = '';
    dialogData.mods           = '';
    dialogData.dispmods       = '';
    if(dialogData.class==='melee') {
      attributeObject = this.data.system.characteristics['weaponskill'];
      attributeObject.name = 'weaponskill';
      dialogData.disprof = 'M';
    }
    else {
      attributeObject = this.data.system.characteristics['ballisticskill'];
      attributeObject.name = 'ballisticskill';
      dialogData.disprof = weaponObject.rof.single+'/'+weaponObject.rof.semi+'/'+weaponObject.rof.full;
    }
    if(attributeObject){
      dialogData.abbrev         = rt.Attributes[attributeObject.name].abbrev;
      dialogData.value          = attributeObject.base+attributeObject.adjustment;
      dialogData.unnatural      = attributeObject.unnatural;
      dialogData.bonus          = attributeObject.bonus;
      dialogData.sheetmodifiers = attributeObject.miscmods+attributeObject.conditions;
      dialogData.etc            = 0;
      if(dialogData.sheetmodifiers > 60 || dialogData.sheetmodifiers < -60) dialogData.bound = true;
      else dialogData.bound = false; 
    }
    let testData = await AttackDialog.create(dialogData);
    testData.targets = dialogData.targets;
    testData.title = dialogData.title;
    testData.speaker = this.speakerData();
    testData.ownername  = actor.name;
    testData.attribute = attributeObject.name;
    return new RTWeaponTest(testData);
  }

  //NEW Dialog data
  _baseDialogData() {
    return {
      title: "DEFAULT",
      abbrev: "DF",
      value: 30,
      bonus: 3,
      sheetmodifiers: 0,
      etc: 0,
    };
}


  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);
    this._getVehicleRollData(data);
    this._getVoidshipRollData(data);

    return data;
  }

  /**
   * Prepare actor roll data.
   */
  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;

    // Add level for easier access, or fall back to 0.
    //if (data.attributes.level) {
    //  data.lvl = data.attributes.level.value ?? 0;
    //}
    //const data = actorData.data;
  }
  _getNpcRollData(data) {
    if (this.data.type !== 'npc') return;
  }
  _getVehicleRollData(data) {
    if (this.data.type !== 'vehicle') return;
  }
  _getVoidshipRollData(data) {
    if (this.data.type !== 'voidship') return;
  }

}