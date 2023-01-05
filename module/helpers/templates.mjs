/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/roguetrader/templates/actor/parts/actor-combat.html",
    "systems/roguetrader/templates/actor/parts/actor-stats.html",
    "systems/roguetrader/templates/actor/parts/actor-talents.html",
    "systems/roguetrader/templates/actor/parts/actor-equipment.html",
    "systems/roguetrader/templates/actor/parts/actor-effects.html",
  ]);
};
