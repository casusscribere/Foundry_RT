export class RTUtility {
    static getSpeaker(speaker) {
        try {
        if (speaker.actor)
            return game.actors.get(speaker.actor)
        else if (speaker.token && speaker.scene)
            return game.scenes.get(speaker.scene).tokens.get(speaker.token).actor
        else
            throw "Could not find speaker"
        }
        catch (e) {
        throw new Error(e)
        }
    }
}