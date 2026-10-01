import type { Mode, Settings } from "../types";

interface Props {
    settings: Settings;
    onChange: (settings: Settings) => void;
}

const MODES: Mode[] = ["repel", "attract", "orbit"];

export default function Controls({ settings, onChange }: Props) {
    return (
        <div className="controls">
            <div style={{ display: "flex", gap: 8 }}>
                {MODES.map((m) => (
                    <button
                        key={m}
                        className={settings.mode === m ? "active" : ""}
                        onClick={() => onChange({ ...settings, mode: m })}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <label>
                Particles: {settings.count}
                <input
                    type="range"
                    min={20}
                    max={250}
                    value={settings.count}
                    onChange={(e) =>
                        onChange({ ...settings, count: Number(e.target.value) })
                    }
                    style={{ display: "block", width: "100%" }}
                />
            </label>

            <label>
                Speed: {settings.speed.toFixed(1)}
                <input
                    type="range"
                    min={0.2}
                    max={3}
                    step={0.1}
                    value={settings.speed}
                    onChange={(e) =>
                        onChange({ ...settings, speed: Number(e.target.value) })
                    }
                    style={{ display: "block", width: "100%" }}
                />
            </label>
        </div>
    );
}