import {RollDialog} from "../dialogs/base-dialog.js";

export class SkillDialog extends RollDialog {

    static async create(data) {
      const html = await renderTemplate("systems/roguetrader/templates/dialog/tests/skill-test.html", data);
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
              label: "Skill",
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
}
  