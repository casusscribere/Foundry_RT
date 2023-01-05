/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
 import { ROGUETRADER } from "../helpers/config.mjs";
 import ItemSpecials from "../helpers/apps/item-specials.mjs";

export class RTItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["roguetrader", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/roguetrader/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/item-${this.item.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item.data;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = itemData.data;
    context.flags = itemData.flags;

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // Roll handlers, click handlers, etc. would go here.

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    //TODO: validate and work on this
    //handle lists of item traits
    html.find(".item-specials").click(ev => {
      if (this.item.type == "modification" || this.item.type == "ammo")
      {
        let type = ev.currentTarget.classList.contains("add") ? "add" : "remove"
        new ItemSpecials(this.item, {type}).render(true)
      }
      else 
        new ItemSpecials(this.item).render(true)
    })


    //load presets for talents/lore/etc
    html.find('.preset').change(ev =>{
      let preset = $(ev.currentTarget)[0].value;
      if(preset !== "CUSTOM"){
        let item = this.item;
        console.log("item here:",item);
        let name, text, tier, aptitudes1, aptitudes2, prereqs, shortdesc;
        switch(item.data.type) {
          case 'lore':
            //TODO: FIX THIS
            let lore  = ROGUETRADER[ROGUETRADER.specialistNameCat[item.data.system.category]][preset];
            console.log("lore: ",lore);
            name = lore.name;
            text = lore.desc;
            this.item.update({"name" : name});
            this.item.update({"data.description" : text});
            break;
          case 'talent':
            let talent = ROGUETRADER.CoreTalents[preset];
            console.log("talent here: ",talent);
            name = talent.name;
            tier = talent.tier;
            aptitudes1 = talent.aptitudes[0];
            aptitudes2 = talent.aptitudes[1];
            prereqs = talent.prereqs;
            shortdesc = talent.shortdesc;
            text = talent.desc;
            this.item.update({"name" : name});
            this.item.update({"data.tier" : tier});
            this.item.update({"data.aptitudes1" : aptitudes1});
            this.item.update({"data.aptitudes2" : aptitudes2});
            this.item.update({"data.prereqs" : prereqs});
            this.item.update({"data.shortdesc" : shortdesc});
            this.item.update({"data.desc" : text});
            break;
          default:
            // code block
        } 
      }
    });
  }
}
