import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";
import { ROGUETRADER } from "../helpers/config.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class RTActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["roguetrader", "sheet", "actor"],
      template: "systems/roguetrader/templates/actor/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" },{ navSelector: ".viewmode-tabs", contentSelector: ".stats-body", initial: "view" },{ navSelector: ".viewmode-tabs", contentSelector: ".talents-body", initial: "view" },{ navSelector: ".viewmode-tabs", contentSelector: ".combat-body", initial: "view" }]
    });
  }

  /** @override */
  get template() {
    return `systems/roguetrader/templates/actor/actor-${this.actor.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.actor.data.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = actorData.data;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
      //console.log("Actor Data: ",context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(this.actor.effects);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    //TODO: note: this is the site for adding/editing actor interactions with items?

    // Initialize containers.
    //const gear = [];
    const features = [];
    const lores = [];
    const talents = [];
    const weapons = [];
    const rt = ROGUETRADER;

    // Iterate through items, allocating to containers
    let j = 0;
    for (let i of context.items) {
      //i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      //if (i.type === 'item') {
      //  gear.push(i);
      //}
      if (i.type === 'lore') {
        if(j % 2 === 0){
          i.data.isLeft = true;
          i.data.isRight = false;
        } else {
          i.data.isLeft = false;
          i.data.isRight = true;
        }
        //TODO: un-hardcode this characteristic lookup
        i.data.value      = context.data.characteristics['intelligence'].value + rt.rankVal[i.data.rank];
        i.data.unnatural  = context.data.characteristics['intelligence'].unnatural;
        i.data.bonus      = context.data.characteristics['intelligence'].bonus;
        lores.push(i);
        j++;
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      else if (i.type === "talent"){
        talents.push(i);
      }
      else if (i.type === 'weapon'){
        weapons.push(i);
      }
    }

    // Assign and return
    //context.gear = gear;
    context.lores = lores;
    context.features = features;
    context.talents = talents;
    context.weapons = weapons;
   }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    //NEW add specific roll dialog listeners
    html.find(".roll-characteristic").click(this._onCharacteristicClick.bind(this));
    html.find(".roll-skill").click(this._onSkillClick.bind(this));

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    html.find('.weapon-use').click(this._onWeaponClick.bind(this));

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  //NEW handle characteristic click
  async _onCharacteristicClick(event) {
    event.preventDefault();
    const characteristic = $(event.currentTarget).data("characteristic");
    let test = await this.actor.setupCharacteristicTest(characteristic, this.actor);
    await test.rollTest();
    test.sendToChat()
  }
  async _onSkillClick(event) {
    event.preventDefault();
    const skill = $(event.currentTarget).data("skill");
    let test = await this.actor.setupSkillTest(skill, this.actor);
    await test.rollTest();
    test.sendToChat()
  }

  async _onWeaponClick(event){
    event.preventDefault();
    const li = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    let test = await this.actor.setupWeaponTest(item, this.actor);
    await test.rollTest();
    test.sendToChat()
  }


  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[roll] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

}
