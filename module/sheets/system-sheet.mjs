/**
 * The Application responsible for displaying and editing a single JournalEntryPage document.
 * @extends {DocumentSheet}
 * @param {JournalEntryPage} object         The JournalEntryPage instance which is being edited.
 * @param {DocumentSheetOptions} [options]  Application options.
 */

//TODO: currently broken and not in use :(
export class SystemJournalSheet extends JournalPageSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        width: 600,
        height: 600,
        });
    }


    /** @inheritdoc */
    get template() {
        return `templates/journal/page-system-${this.isEditable ? "edit" : "view"}.html`;
    }
}