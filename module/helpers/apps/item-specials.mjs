//TODO: fix this to handle DH2.0 specialqualities
import { ROGUETRADER } from "../config.mjs";

export default class ItemSpecials extends FormApplication 
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "item-specialqualities",
            template : "systems/ROGUETRADER/templates/apps/item-specials.html",
            height : "auto",
            width : "auto",
            title : "Item Special Qualities",
            resizable : true
            
        })
    }

    getData() {
        let data = super.getData(); 
        console.log("object data: ",this.object);
        //data.custom = this.constructCustomString(this.object.system.specialqualities);
        //console.log("data w/ custom string: ",data);
        try {
            data.available = ROGUETRADER.WeaponSpecialQualities;
            data.specials = Object.keys(ROGUETRADER.WeaponSpecialQualities).map(i => {
                let existing = this.object.system.specialqualities.find(t => t.name == i);
                
                return  {
                    display         : data.available[i].name,
                    key             : i,
                    existingSpecial : existing,
                    hasRating       : data.available[i].hasval,
                    specialValue    : data.available[i].hasval && existing ? existing.value : null
                }
            })
            console.log("exported to window: ",data.specials);
        }
        catch (e)
        {
            data.specials = []
            console.error("Something went wrong when trying to open the specialqualities menu: " + e)
        }

        
        return data;
    }

    _updateObject(event, formData)
    {
        let newspecialqualities = []
        if (this.object.type == "weaponUpgrade" || this.object.type == "ammo")
        {
            newspecialqualities = this.object.specialqualities.filter(i => i.type != this.options.type) // Retain specialqualities from the other type
        }
        for (let key in formData)
        {
            if (key == "custom-specialqualities")
                newspecialqualities = newspecialqualities.concat(this.parseCustomspecialqualities(formData[key]))

            else if (formData[key] && !key.includes("value"))
            {
                let traitObj = { name : key};
                console.log("key: ",key);
                if(ROGUETRADER.WeaponSpecialQualities[key]) traitObj.display = ROGUETRADER.WeaponSpecialQualities[key].name;
                let rating = formData[`${key}-value`]
                if (rating) traitObj.value = Number.isNumeric(rating) ? parseInt(rating) : rating
                newspecialqualities.push(traitObj)
            }
        }
        console.log("form data before update: ",formData);
        console.log("formmated specials before update: ",newspecialqualities);
        this.object.update(
            {
                "data.specialqualities" : newspecialqualities,
                "data.specialsstring"   : this.constructSpecialString(newspecialqualities)
            }
    )
    }

    parseCustomspecialqualities(string)
    {
        let regex = /(.+?):(.+?)(\||$)/gm

        let matches = string.matchAll(regex)
        let specialqualities = []

        for (let match of matches)
        {
            specialqualities.push({
                name : match[1].trim().slugify(),
                custom : true,
                display : match[1].trim(),
                description : match[2].trim(),
                type : this.options.type
            })
        }

        return specialqualities
    }

    constructSpecialString(specialqualities)
    {
        let customString = ``
        let customspecialqualities = specialqualities.filter(i => i.display)
        //console.log("special quality: ",customspecialqualities);
        customspecialqualities.forEach(t => {
            customString += `${t.display}`;
            if(t.value) customString += `(${t.value})`;
            customString += `, `;
        })
        return customString;
        
    }
}