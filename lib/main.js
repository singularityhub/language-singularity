'use strict';

let CompositeDisposable = require('atom').CompositeDisposable;

let SRecipe = {

    // We can subscribe to events!
    subscriptions: null,

    // This is known to be run when 
    activate(state) {
        this.setGrammer = this.setGrammer.bind(this);
        
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
            this.subscriptions.add(editor.onDidChangeTitle(this.setGrammer));
            this.subscriptions.add(editor.onDidSave(this.setGrammer));

        }));
    },

    // This function will look at the tab...
    setSRecipe(index, grammar, editor){
        let tab = atom.views.getView(atom.workspace).querySelectorAll('.vertical li.tab .title')[index];
        if (tab) {

            // Does the title start with (include) Singularity?
            let title = tab.innerText;
            if (title.includes("Singularity") == true) {

                // Render the Singularity syntax!
                editor.setGrammar(grammar);
            }
        }           
    },

    // This is the main entry function called on the event trigger
    setGrammer() {
        let items = atom.workspace.getPaneItems();
        let grammar = atom.grammars.grammarForScopeName('source.singularity');

        items.forEach((item, index) => {
            let editor = atom.workspace.getActiveTextEditor();
            this.setSRecipe(index, grammar, editor);
        });
    }
};

module.exports = {
    activate: SRecipe.activate.bind(SRecipe),
    deactivate: SRecipe.deactivate.bind(SRecipe)
};
