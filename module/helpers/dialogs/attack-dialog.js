import {RollDialog} from "../dialogs/base-dialog.js";

export class AttackDialog extends RollDialog {

    static get defaultOptions() {
      let options = super.defaultOptions
      options.classes.push("roll-dialog")
      options.resizable = true;
      return options
    }
  
    async _render(...args)
    {
        await super._render(...args)
    }
  
    static async create(data) {
      const html = await renderTemplate("systems/roguetrader/templates/dialog/tests/weapon-test.html", data);
      return new Promise((resolve) => {
        new this({
          title: data.title,
          content: html,
          actor : data.actor,
          targets : data.targets,
          dialogData : data,
          buttons: {
            roll: {
              icon: '<i class="fas fa-check"></i>',
              label: "Attack",
              callback: async (html) => {
                let data = this.dialogCallback(html);
                resolve(data)
              },
            }
          },
          default: "roll"
        }, { width: 550 }).render(true)
      })
    }
  
    static dialogCallback(html) {
      let testData              = this._baseTestData();
      testData.title            = parseInt(html.find("#title")[0].value);
      testData.core.abbr        = parseInt(html.find("#abbr")[0].value);
      testData.core.value       = parseInt(html.find("#value")[0].value);
      testData.core.unnatural   = parseInt(html.find("#unnatural")[0].value);
      //testData.core.bonus       = parseInt(html.find("#bonus")[0].value);
      testData.core.boundmod    = parseInt(html.find("#boundmod")[0].value);
      testData.core.modifier    = parseInt(html.find("#modifier")[0].value);
      testData.core.sum         = testData.core.value+testData.core.boundmod;
      testData.core.fp          = html.find("#status-fp")[0].checked === true ? true : false;
      return testData;
    }
  
    static _baseAttackData() {
      return {
        title: "Generic Attack",
        core: {
          abbr: "Df",
          value: 0,
          bonus: 0,
          boundmod: 0,
          modifier: 0,
          sum: 0
        },
        fprerolled: false,
      };
    }
  
    submit(button) {
      return super.submit(button);
    }

    initCalc(html){
        super.initCalc(html);
    }
  
    activateListeners(html) {
      super.activateListeners(html);
    }

}
  