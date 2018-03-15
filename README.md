# Singularity Language

This repository provides a small package to help with syntax highlighting of
Singularity recipe files in the Atom editor. The package is [published on apm](https://atom.io/packages/language-singularity) and can be updated as needed.

 - [Grammars](grammars): contains the definition of rules and highlights, with details provided below.
 - [Settings](settings): additional settings 

Note that for files that are named `Singularity.*` (with a Singularity prefix and a custom
extension to indicate a tag) the highlighter is activated on save, or on change
of the title. The others that are named just `Singularity` or end in `.def` are
rendered on load. Thus, if you open a file called `Singularity.<extension>` and
it doesn't highlight right away, just save it and it will trigger the event.
The syntax is fairly simple thus far, and looks like this:

![img/example-singularity.png](img/example-singularity.png)

Please contribute by issuing a pull request to this repository!

## How to develop
The package itself, as an "official package," should be published, but you
can easily clone this repository and put it in your `$HOME/.atom/packages` folder
(and maintain the name starting with `language-` to have it be discovered. You
should likely restart your editor, and then save a file that ends in `def` or has
`Singularity`.


## Acknowledgements
Most of the guidance for the regular expressions is taken from [language-docker](https://github.com/jagregory/language-docker) that has very similar syntax highlighting.
