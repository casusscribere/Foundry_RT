// Import document classes.
import { RTActor } from "./documents/actor.mjs";
import { RTItem } from "./documents/item.mjs";
// Import sheet classes.
import { RTActorSheet } from "./sheets/actor-sheet.mjs";
import { RTItemSheet } from "./sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { ROGUETRADER } from "./helpers/config.mjs";
import { RTTest } from "./helpers/tests/test.mjs";
import { RTWeaponTest } from "./helpers/tests/weapon-test.mjs";
import { RTUtility } from "./helpers/utility.mjs";
//import { hooks } from "./hooks/hooks.js";
import FoundryOverrides from "./helpers/overrides.js"
//TODO below declarations are for a v11 example that doesn't work here
// Import New Subtype for Journal Pages
//import QuestModel from "./types/QuestModel.mjs";
import { RTJournalSheet } from "./sheets/journal-sheet.mjs";
import { SystemJournalSheet } from "./sheets/system-sheet.mjs";

function deductFP(target, actionCallback){
  let message = game.messages.get(target.attr("data-message-id"));
  let test = message.getTest();
  let actor = test.actor;
  //console.log("actor data: ",actor.data.data);
  if (actor.type == "character")
  {
    if (actor.data.data.vitals.fatepoints.value <= 0)
      return ui.notifications.error("No FP Available");
    else
    {
      actor.update({"data.vitals.fatepoints.value" : actor.data.data.vitals.fatepoints.value - 1})
      ui.notifications.notify("Fate Point subtracted");
      actionCallback();
    }
    test.context.deducted = true;
  }
  else console.log("not a character!");
}


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */
Hooks.once('init', async function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.roguetrader = {
    RTActor,
    RTItem,
    utility: RTUtility,
    rollClasses : {
      RTTest
    },
    rollItemMacro,
  };

  //DEBUG: only for testing
  CONFIG.debug.hooks = true;

  // Add custom constants for configuration.
  CONFIG.ROGUETRADER = ROGUETRADER;

  CONFIG.ChatMessage.documentClass.prototype.getTest = function () {
    if (hasProperty(this, "data.flags.roguetrader.testData"))
      return game.roguetrader.rollClasses.RTTest.recreate(this.getFlag("roguetrader", "testData"))
  }

  //FoundryOverrides();

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d10",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = RTActor;
  CONFIG.Item.documentClass = RTItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("roguetrader", RTActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("roguetrader", RTItemSheet, { makeDefault: true });
  //TODO: figure out how to build a Journal sheet via actually finding an example that does it
  //Journal.unregisterSheet("core",JournalPageSheet);
  Journal.registerSheet("roguetrader",RTJournalSheet, { makeDefault: true});
  Journal.registerSheet("roguetrader",SystemJournalSheet);

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

//hooks();
/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

// get value from simple key-value pair config objects
Handlebars.registerHelper("config", function (key, fallback="N/A") {
  if(CONFIG.ROGUETRADER[key]) return CONFIG.ROGUETRADER[key];
  else return fallback;
});

//get selected attribute from more complex config objects
Handlebars.registerHelper("objLookup", function (obj, key, value, fallback="N/A") {
  if(CONFIG.ROGUETRADER[obj][key][value]) return CONFIG.ROGUETRADER[obj][key][value];
  else return fallback;
});

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('isWeaponClass', function(weaponclass, checkedclass) {
  if(weaponclass === checkedclass) return true;
  else return false;
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

//TODO: this is from a v11 example and doesn't work :(
Hooks.on('getJournalSheetHeaderButtons', function(app, buttons) {
  if (app.document.testUserPermission(game.user, 3) && app.object._getSheetClass().name !== 'SystemJournal') {
    buttons.unshift({
      label: "System",
      class: "entry-system",
      icon: "fas fa-pen-alt",
      onclick: async ev => _excaRenderSheet(app)
    });
  }
});

async function _excaRenderSheet(app) {
  const sheet = app.object.sheet;
  await sheet.close()
  app.object._sheet = null;
  delete app.object.apps[sheet.appId];
  await app.document.setFlag('core', 'sheetClass', `system-journals.SystemJournal`);
  app.object.sheet.render(true);
}
  /*
Hooks.on("init", () => {
  Object.assign(CONFIG.JournalEntryPage.dataModels, {
    "quest-pages.quest": QuestModel
  });
});

Hooks.on("init", () => {
  DocumentSheetConfig.registerSheet(JournalEntryPage, "quest-pages", QuestSheet, {
    types: ["quest-pages.quest"],
    makeDefault: true
  });
});
*/
// End: test hooks for subtype


Hooks.once("ready", async function() {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createItemMacro(data, slot));
});

Hooks.on("renderChatMessage", (message, html, data) => {

});

//supports damage toggle in chatboxes
Hooks.on("init", () => {
  $(document).on('click', '.rt-toggledamage', function (e) { 
    $(e.target).siblings().toggle();
  })
})

Hooks.on("getChatLogEntryContext", (html, options) => {

  let canGMReroll = li => {
    let msg = game.messages.get(li.attr("data-message-id"));
    //let test = msg.getTest();
    let test = msg.getFlag('roguetrader', 'testData');
    if (test) return msg.isAuthor || msg.isOwner;
  }

  let canFPReroll = li => {
    let msg = game.messages.get(li.attr("data-message-id"));
    //let test = msg.getTest();
    let test = msg.getFlag('roguetrader', 'testData');
    if (test) return !test.context.dosadded && !test.context.fprerolled && (msg.isAuthor || msg.isOwner);
  }

  let canAddDos = li => {
    let msg = game.messages.get(li.attr("data-message-id"));
    let test = msg.getFlag('roguetrader', 'testData');
    //let test = msg.getTest();
    if(test && test.testData.dos > 0) return !test.context.dosadded && !test.context.fprerolled && (msg.isAuthor || msg.isOwner);
  }

  options.unshift(
    {
        name: "GM Reroll",
        icon: '<i class="fas fa-redo"></i>',
        condition: canGMReroll,
        callback: async li => {
            let message = game.messages.get(li.attr("data-message-id"));
            let test = message.getTest();
            test.gmreroll();
        }
    },
    {
      name: "FP Reroll",
      icon: '<i class="fas fa-redo"></i>',
      condition: canFPReroll,
      callback: async li => {
          let message = game.messages.get(li.attr("data-message-id"));
          let test = message.getTest();
          let actor = test.actor;
          if (actor.type == "character")
          {
            if (actor.data.data.vitals.fatepoints.value <= 0)
              return ui.notifications.error("No FP Available");
            else
            {
              actor.update({"data.vitals.fatepoints.value" : actor.data.data.vitals.fatepoints.value - 1})
              ui.notifications.notify("Fate Point subtracted");
              test.fpreroll();
            }
          }
          else console.log("not a character!");
      }
    },
    {
      name: "Add DoS",
      icon: '<span style="font-size: 30px">+</span>',
      condition: canAddDos,
      callback: async li => {
        let message = game.messages.get(li.attr("data-message-id"));
        let test = message.getTest();
        let actor = test.actor;
        if (actor.data.data.vitals.fatepoints.value <= 0)
            return ui.notifications.error("No FP Available");
        else
        {
          actor.update({"data.vitals.fatepoints.value" : actor.data.data.vitals.fatepoints.value - 1})
          ui.notifications.notify("Fate Point subtracted");
          test.addDos(1);
        }
      }
    },
  )
});


/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.roguetrader.rollItemMacro("${item.name}");`;
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "roguetrader.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find(i => i.name === itemName) : null;
  if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

  // Trigger the item roll
  return item.roll();
}