//TODO: currently unused

export default class RTChat {
  static chatListeners(html) {
    //html.on("click", ".roll-damage", this._onDamageClick.bind(this))
    //html.on("click", ".roll-wrath", this._onWrathClick.bind(this))
    //html.on("click", "a.die", this._onDieClick.bind(this))
    //html.on("click", ".test-effect", this._onEffectClick.bind(this))
    html.on("click", ".invoke-test", this._onTestClick.bind(this))
    //html.on("click", ".roll-mutation", this._onMutationClick.bind(this))
    //html.on("click", ".add-potency", this._onPotencyClick.bind(this))
    //html.on("click", ".potency-reset", this._onPotencyReset.bind(this))
    //html.on("mouseenter", ".target", game.wng.utility.highlightToken.bind(this))
    //html.on("mouseleave", ".target", game.wng.utility.unhighlightToken.bind(this))
    //html.on("click", ".target", game.wng.utility.focusToken.bind(this))
  }

  static async _onTestClick(ev)
  {
    let id = $(ev.currentTarget).parents(".message").attr("data-message-id")
    let msg = game.messages.get(id)
    let msgTest = msg.getTest();
    let itemTest = msgTest.result.test;

    if (canvas.tokens.controlled.length)
    {
      for (let token of canvas.tokens.controlled)
      {
        let testFunction;
        if (itemTest.type == "attribute")
          testFunction = token.actor.setupAttributeTest.bind(token.actor)
        else if (itemTest.type == "skill")
          testFunction = token.actor.setupSkillTest.bind(token.actor)
        else
        {
          testFunction = token.actor.setupGenericTest.bind(token.actor)
          itemTest = duplicate(itemTest)
        }

        await testFunction(itemTest.specification, {dn: itemTest.dn, resistPower : msgTest.item?.type == "psychicPower"}).then(async test => {
          await test.rollTest();
          test.sendToChat()
        })
      }

    }
    else if (game.user.character)
    { 
      let testFunction;
      if (itemTest.type == "attribute")
        testFunction = game.user.character.setupAttributeTest.bind(game.user.character)
      else if (itemTest.type == "skill")
        testFunction = game.user.character.setupSkillTest.bind(game.user.character)
      else
      {
        testFunction = game.user.character.setupGenericTest.bind(game.user.character)
        itemTest = duplicate(itemTest)
      }

      await testFunction(itemTest.specification, {dn: itemTest.dn}).then(async test => {
        await test.rollTest();
        test.sendToChat()
      })
    }
    else 
      return ui.notifications.error(game.i18n.localize("WARN.NoActorsToTest"))
  }
}