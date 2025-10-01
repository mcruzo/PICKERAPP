export const TEAM_PALETTE = [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#84cc16',
    '#22c55e',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#999999',
    '#a3e635',
    '#fde047',
    '#34d399',
    '#67e8f9',
    '#60a5fa',
    '#c084fc',
    '#f472b6',
    '#fb7185',
    '#fca5a5',
    '#fcfcfc',
    '#d9f99d',
    '#86efac',
    '#1e1e1e',
    '#a5f3fc',
    '#93c5fd',
    '#ddd6fe',
    '#fbcfe8',
    '#fecaca',
    '#fef08a',
    '#bbbbbb'
];

export function assignTeamsUniform(
    fingers: { id: number }[],
    teams: number,
    rng: () => number = Math.random
) {
    const ids = fingers.map(f => f.id);
    const shuffledIds = ids.sort(() => rng() - 0.5);
    const shuffledColors = [...TEAM_PALETTE].sort(() => rng() - 0.5);
    const colors = shuffledColors.slice(0, teams);
    const result = new Map<number, string>();

    for (let i = 0; i < shuffledIds.length; i++) {
        const color = colors[i % colors.length];

        result.set(shuffledIds[i], color);
    }

    return result; // Map<fingerId, color>
}
