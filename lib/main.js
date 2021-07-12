'use strict';

let CompositeDisposable = require('atom').CompositeDisposable;
let grammarName = 'source.singularity';

let SRecipe = {

    // We can subscribe to events!
    subscriptions: null,

    // This is known to be run when
    activate(state) {
        this.setGrammar = this.setGrammar.bind(this);

        // subscribe to a bunch of events that trigger when recipe saved
        this.subscriptions = new CompositeDisposable();
        this.subscribe();
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    subscribe(){
        // We want the recipe syntax to be rendered when title changes, saves
        this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
            this.subscriptions.add(editor.onDidChangeTitle(this.setGrammar));
            this.subscriptions.add(editor.onDidSave(this.setGrammar));
        }));
        this.subscriptions.add(atom.workspace.onDidOpen(this.setGrammar));
    },

    // This is the main entry function called on the event trigger
    setGrammar() {
        let editor = atom.workspace.getActiveTextEditor();
        if (editor) {
            let buffer = editor.getBuffer()
            if (editor.getTitle().startsWith('Singularity.')
                && editor.getGrammar().scopeName == "text.plain.null-grammar") {
                atom.grammars.assignLanguageMode(buffer, grammarName)
            }
        }
    }
};

module.exports = {
    activate: SRecipe.activate.bind(SRecipe),
    deactivate: SRecipe.deactivate.bind(SRecipe)
};
