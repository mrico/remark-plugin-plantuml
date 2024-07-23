# remark-plugin-plantuml

A remark plugin to render [plantuml](plantuml) diagrams.

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [How should I use this?](#how-should-i-use-this)
  - [Installation](#installation)
  - [Usage with Docusaurus](#usage-with-docusaurus)
- [Contribute](#contribute)
- [License](#license)

## What is this?

This repository contains a [remark](remark) plugin designed to convert code blocks in Markdown tagged with the [plantuml](plantuml) language into diagrams.

It uses the official plantuml.jar to render the diagrams to support the latest language spec.

Let's assume you have a markdown file with a plantuml code block:

````markdown
# System Diagram

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(personAlias, "Label", "Optional Description")
Container(containerAlias, "Label", "Technology", "Optional Description")
System(systemAlias, "Label", "Optional Description")

Rel(personAlias, containerAlias, "Label", "Optional Technology")
@enduml
```
````

The plugin transforms this to an image of the diagram:

```markdown
# System Diagram

![Diagram](data:image/png;base64,iVBO...)
```

## When should I use it?

Use this plugin, if you want to embed plantuml diagrams as code blocks into your markdown files and get the rendered image in the output.

Compared to the other available options, this plugin uses the official plantuml.jar to support all plantuml features. node-plantuml fails to work with c4 models.

Since the plugin replaces the code block with an image in the syntax tree it doens't require any additional rehype plugins.

## How should I use this?

### Installation

This package is a ECMA Module, install it using [npm](https://docs.npmjs.com/cli/v10/commands/npm-install):

```
npm install remark-plugin-plantuml
```

By default, the plugin expects the [plantuml.jar](https://plantuml.com/download) in the project's root directory to render the diagrams.

Make sure to download the [plantuml.jar](https://plantuml.com/download) and a [Java VM](https://aws.amazon.com/corretto/) is available on the machine.

### Usage with Docusaurus

[Install](#installation) the plugin and add it as a [remark](remark) plugin to your `docusaurus.config.js`:

```js
// Import the plugin
import remarkPlantuml from "remark-plugin-plantuml";

const config = {
  // ...
  presets: [
    [
      "classic",
      {
        docs: {
          // Add the plugin here
          remarkPlugins: [remarkPlantuml],
        },
      },
    ],
  ],
};
```

Now you can write [plantuml](plantuml) diagrams as code blocks in your mdx pages in [Docusaurus](docusaurus)
as described [here](#what-is-this).

## Contribute

Contributions are welcome. Fork this repository, make your changes, and send a Pull Request (PR).

## License

[MIT][license] © [Marco Rico][author]

<!-- Definitions -->

[license]: license
[author]: https://mrico.eu
[remark]: https://github.com/remarkjs/remark
[plantuml]: https://plantuml.com/
[docusaurus]: https://docusaurus.io/
