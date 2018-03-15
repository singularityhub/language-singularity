'use strict';

let CompositeDisposable = require('atom').CompositeDisposable;

let SRecipe = {
    subscriptions: null,
    activate(state) {
        this.setGrammer = this.setGrammer.bind(this);
        
        // subscribe to a bunch of events that all trigger a name change
        this.subscriptions = new CompositeDisposable();
        this.subscribe();
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    subscribe(){
        this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
            this.subscriptions.add(editor.onDidChangeTitle(this.setGrammer));
            this.subscriptions.add(editor.onDidSave(this.setGrammer));

        }));
    },

    setSRecipe(index, grammar, editor){
        let tab = atom.views.getView(atom.workspace).querySelectorAll('.vertical li.tab .title')[index];
        if (tab) {
            let title = tab.innerText;
            if (title.includes("Singularity") == true) {
                console.log(title);
                editor.setGrammar(grammar);
            }
        }           
    },

    setGrammer() {
        let items = atom.workspace.getPaneItems();
        let grammar = atom.grammars.grammarForScopeName('source.singularity');
        console.log(grammar);

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
