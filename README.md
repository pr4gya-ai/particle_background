# Particle Playground

An interactive particle animation built with **React**, **TypeScript** and the **Canvas API**. Particles drift across the screen, connect with fading lines, and react to your mouse.

**Live demo:** [here!](https://particle-background-one.vercel.app/)

## Features

- Particles that bounce around the screen and connect with lines when close
- Three mouse modes: **repel**, **attract** and **orbit**
- Click anywhere to spawn a burst of fading particles
- Sliders to change particle count and speed
- Responsive full-screen canvas

## Tech Stack

- React
- TypeScript (strict mode)
- Vite
- HTML Canvas API

## Run Locally

```bash
git clone https://github.com/your-username/particle-playground.git
cd particle-playground
npm install
npm run dev
```

Then open the `localhost` link shown in the terminal.

## Project Structure

```
src/
├── components/
│   ├── ParticleCanvas.tsx   # canvas + animation loop
│   └── Controls.tsx         # mode buttons and sliders
├── utils/
│   ├── particle.ts          # create, update and mouse-force logic
│   └── helpers.ts           # distance helper
├── types.ts                 # Particle, Mode, Settings types
└── App.tsx                  # holds state, connects the components
```

## What I Learned

- Typing React components, props, refs and DOM events with TypeScript
- Using union types (`"repel" | "attract" | "orbit"`) to prevent invalid values
- Building a `requestAnimationFrame` loop with proper cleanup in `useEffect`
- Keeping fast-changing values (mouse position) in refs to avoid re-renders
