import { useState } from "react";
import ParticleCanvas from "./components/ParticleCanvas";
import Controls from "./components/Controls";
import type { Settings } from "./types";

export default function App() {
    const [settings, setSettings] = useState<Settings>({
        count: 100,
        speed: 1,
        mode: "repel",
    });

    return (
        <>
            <ParticleCanvas
                count={settings.count}
                speed={settings.speed}
                mode={settings.mode}
            />
            <Controls settings={settings} onChange={setSettings} />
        </>
    );
}