//TODO: this is from a v11 example, so it won't work
export default class QuestModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        description: new fields.SchemaField({
          long: new fields.HTMLField({required: false, blank: true}),
          short: new fields.HTMLField({required: false, blank: true})
        }),
        img: new fields.FilePathField({required: false, categories: ["IMAGE"]}),
        steps: new fields.ArrayField(new fields.StringField({blank: true}))
      };
    }
  
    prepareDerivedData() {
      this.nSteps = this.steps.length;
    }
  }