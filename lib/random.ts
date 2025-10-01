
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
    const a = arr.slice();

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));

        [a[i], a[j]] = [a[j], a[i]];
    }
    
    return a;
}

export function pickOne<T>(arr: T[], rng: () => number = Math.random): T {
    return arr[Math.floor(rng() * arr.length)];
}
