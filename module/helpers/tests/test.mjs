export class RTTest {
    constructor(data = {}) {
      this.data = {
        testData: {
            title: data.title,
            core: data.core,
            success: false,
            dos: 0
        },
        context: {
          targets: data.targets ? data.targets.map(i => i.document.toObject()) || [] : [],
          //type: data.type,
          speaker: data.speaker,
          rollClass:  this.constructor.name,
          fprerolled: data.fprerolled || false,
          dosadded:   data.dosadded || false,
          gmrerolled: data.gmrerolled || false,
          fpmodten:   data.fp || false,
          deducted:   false
          //edit: { pool: 0, wrath: 0, icons: 0, damage: 0, ed: 0, ap: 0 }
        },
        result: {}
      }
    }
  
    get template() {
      return "systems/roguetrader/templates/chat/roll/common/common-roll.html"
    }
  
    get damageTemplate() {
      return "systems/roguetrader/templates/chat/roll/damage/damage-roll.html"
    }
  
    static recreate(data) {
        //TODO: currently this is unused (tied to flags check in main)
        if (!data.context) {
            return;
        }
  
        //this section pulls the data into the container that the html chat accesses?
        let test = new game.roguetrader.rollClasses[data.context.rollClass]();
        test.data = data;
        return test;
    }
  
    async rollTest() {
      await this._rollDice();
      this._computeResult();
      return this;
    }
  
    _rollDice() {
        this.roll = new Roll("1d100");
      return this.roll.evaluate({ async: true });
    }
  
    _computeResult() {
      this.data.result = {}
      this.result.roll = this.roll.result;
      let core = this.data.testData.core;
      this._detDoS(this.roll.result,core.sum,core.unnatural);
    }

    _detDoS(roll,threshold,unnatural){
      console.log("test data: ",this.data.testData);
      console.log("your unnatural is: ",unnatural);
        let degs = 0;
        if(roll <= threshold){
            degs = (Math.floor(threshold/10) - Math.floor(roll/10)) + 1;
            degs += Math.floor(parseInt(unnatural)/2);
            this.data.testData.success = true;
        } else {
            degs = (Math.floor(threshold/10) - Math.floor(roll/10)) - 1;
        }
        this.data.testData.dos = Math.abs(degs);
    }
  
    async sendToChat({ newMessage = null, chatDataMerge = {} } = {}) {
      const html = await renderTemplate(this.template, this);
      let chatData = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: this.roll,
        flags: { "roguetrader.testData": this.data },
        user: game.user.id,
        rollMode: game.settings.get("core", "rollMode"),
        content: html,
        speaker: this.context.speaker
      };
      chatData.speaker.alias = this.actor.token ? this.actor.token.name : this.actor.data.token.name
      if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
        chatData.whisper = ChatMessage.getWhisperRecipients("GM");
      } else if (chatData.rollMode === "selfroll") {
        chatData.whisper = [game.user];
      }
      if (newMessage || !this.message) {
        return ChatMessage.create(chatData).then(msg => {
          msg.update({ "flags.roguetrader.testData.context.messageId": msg.id })
        });
      }
      else {
        delete chatData.roll
        return this.message.update(chatData)
      }
    }

    updateMessageFlags() {
      if (this.message)
        return this.message.update({ "flags.roguetrader.testData": this.data })
    }

    _reroll() {
      this._rollDice();
      this._computeResult();
    }

    async fpreroll(){
      if(!this.context.fprerolled && !this.context.dosadded){
        await this._reroll();
        this.context.fprerolled = true;
      }
      else{
        console.log("Cannot FP reroll twice!");
      }
      this.sendToChat();
    }

    async gmreroll(){
      await this._reroll();
      this.context.gmrerolled = true;
      this.sendToChat();
    }

    async addDos(num){
      if(!this.context.fprerolled && !this.context.dosadded){
        this.testData.dos += num;
        this.context.dosadded = true;
        this.sendToChat();
      }
      else {
        console.log("already added dos!");
      }
    }
  
    get testData() { return this.data.testData; }
    get context() { return this.data.context; }
    get result() { return this.data.result; }
    get attribute() { return this.actor.attributes[this.data.testData.attribute] }
    get skill() { return this.actor.skills[this.data.testData.skill] }
  
    //get item() { return this.actor.items.get(this.testData.itemId) }
    get actor() { return game.roguetrader.utility.getSpeaker(this.context.speaker) }
    get message() { return game.messages.get(this.context.messageId) }
  
  }
  