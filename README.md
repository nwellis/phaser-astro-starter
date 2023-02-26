# Astro/Phaser Starter Kit

An opinionated starter project for making a Phaser game with Astro! Preinstalled integrations include:

- [Typescript](https://www.typescriptlang.org/)
  - [Typescript /w Astro](https://docs.astro.build/en/guides/typescript/)
- [(Web Framework) Astro](https://astro.build/)
- [(Phaser) Phaser, duh!](https://phaser.io/)
  - [Docs](https://photonstorm.github.io/phaser3-docs/index.html)
  - 3.60+ (Some great changes in this version)
- [(Game Design Pattern) bitECS](https://github.com/NateTheGreatt/bitECS)
- [Example Assets](https://opengameart.org/content/tiny-16-basic)
  - Authored by [Sharm](https://opengameart.org/users/sharm)

_Not installed, but highly recommended!_

- [(Styling) Tailwind CSS](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm i`                | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
