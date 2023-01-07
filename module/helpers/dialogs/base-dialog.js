export class RollDialog extends Dialog {

    static get defaultOptions() {
      let options = super.defaultOptions
      options.classes.push("roll-dialog")
      options.resizable = true;
      return options
    }
  
    async _render(...args)
    {
        await super._render(...args)
  
        //TODO: figure out what all this shit does
        /*let automatic = this.runChangeConditionals();
        let select = this.element.find(".effect-select")[0]
        let options = Array.from(select.children)
        options.forEach((opt, i) => {
            if (automatic[i])
            {
                opt.selected = true;
                select.dispatchEvent(new Event("change"))
            }
        })
        if (automatic.some(i => i))
          select.focus()
          */
    }
  
    static async create(data) {
      const html = await renderTemplate("systems/roguetrader/templates/dialog/tests/characteristic-test.html", data);
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
              label: "Roll Test",
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
  
    static _baseTestData() {
      return {
        title: "Generic Test",
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
      //TODO: re-add the error checking we're doing here
      //let html = this.options.jQuery ? this.element : this.element[0];
      //console.log("etc:",html.find("#etc")[0]);
      //let etc  = parseInt(html.find("#etc")[0].value);
      //let diff = parseInt(html.find("#diff")[0].value);
      //let val  = parseInt(html.find("#value")[0].value);
      //let target = parseInt(html.find("#difficulty-target")[0].value);
      //let penalty = parseInt(html.find("#difficulty-penalty")[0].value);
      //let rank = html.find("#difficulty-rank")[0].value;
      //if (!target && !penalty && rank == "none")
      //  return ui.notifications.error(game.i18n.localize("DIALOG.NO_DIFFICULTY"))
      //else 
      return super.submit(button);
    }

    initCalc(html){
      let modsum = 0;
      let elements = html.find('.modsum');

      for (let i = 0; i < elements.length; i++) {
        modsum += parseInt(elements[i].value);
      }
      
      if(html.find('#status-fp')[0].checked === true && html.find('#fpspent')[0].checked === true) modsum += 10;
      //set unbound modifier
      html.find('#modifier')[0].value = modsum;

      //apply bindings and set the checkbox
      if(modsum > 60 || modsum < -60){
        html.find('#status-bound')[0].checked = true;
        modsum = Math.min(Math.max(modsum, -60), 60);
      }
      else{
        html.find('#status-bound')[0].checked = false;
      }
      html.find('#boundmod')[0].value = modsum;

      if(parseInt(html.find('#value')[0].value) + parseInt(modsum) <= 0){
        html.find('#status-neg')[0].checked = true;
      }else {
        html.find('#status-neg')[0].checked = false;
      }
    }
  
    activateListeners(html) {
      super.activateListeners(html);

      //calculate modifier listener and initialize fields
      this.initCalc(html);
      html.find('.modsum').change(ev =>{
        this.initCalc(html);
      });

      html.find('#status-fp').change(ev =>{
        this.initCalc(html);
        let id = html.find('#author')[0].value;
        let actor = game.actors.get(id);

        if (actor.type == "character" && html.find('#status-fp')[0].checked === true)
        {
          if (actor.data.data.vitals.fatepoints.value <= 0)
            return ui.notifications.error("No FP Available");
          else
          {
            actor.update({"data.vitals.fatepoints.value" : actor.data.data.vitals.fatepoints.value - 1});
            html.find('#fpspent')[0].checked = true;
            ui.notifications.notify("Fate Point subtracted");
            html.find('#boundmod')[0].value = Math.min(parseInt(html.find('#boundmod')[0].value)+10,60);
            html.find('#modifier')[0].value = html.find('#modifier')[0].value+10;
          }
        } else if(actor.type == "character" && html.find('#status-fp')[0].checked === false && html.find('#fpspent')[0].checked === true){
          actor.update({"data.vitals.fatepoints.value" : actor.data.data.vitals.fatepoints.value + 1});
          html.find('#fpspent')[0].checked = false;
          ui.notifications.notify("Fate Point restored");
        }
      });



  
      //TODO: check the wng version and see what this actually does?
      //html.on("mouseenter", ".target", game.wng.utility.highlightToken.bind(this))
      //html.on("mouseleave", ".target", game.wng.utility.unhighlightToken.bind(this))
      //html.on("click", ".target", game.wng.utility.focusToken.bind(this))
      
      this.inputs = {}
  
      html.find("input").focusin(ev => {
        ev.target.select();
      })
  
      //TODO: figure out how this works
      this.userEntry = {
        //"pool.base": parseInt(this.inputs["pool.base"].value),
        //"pool.rank": this.inputs["pool.rank"].value,
        //"pool.bonus": parseInt(this.inputs["pool.bonus"].value),
        //"difficulty.base": parseInt(this.inputs["difficulty.base"].value),
        //"difficulty.rank": this.inputs["difficulty.rank"].value,
        //"difficulty.bonus": parseInt(this.inputs["difficulty.bonus"].value),
      }
    }

  }
  