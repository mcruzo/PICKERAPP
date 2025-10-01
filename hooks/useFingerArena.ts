import { useCallback, useRef, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { Finger } from '@/components/game/TouchAvatar';

export function useFingerArena() {
    const [fingers, setFingers] = useState<Map<number, Finger>>(new Map());
    const lockedRef = useRef(false);

    const addTouches = useCallback((e: GestureResponderEvent) => {
        if (lockedRef.current) return;

        const { changedTouches } = e.nativeEvent as any; // RN  expone.changedTouches

        setFingers(prev => {
            const next = new Map(prev);

            for (const t of changedTouches as any[]) {
                const id = t.identifier ?? t.id ?? Math.random();

                if (!next.has(id)) {
                    next.set(id, { id, x: t.pageX - 20, y: t.pageY - 125 });
                }
            }
            return next;
        });
    }, []);

    const releaseTouches = useCallback((e: GestureResponderEvent) => {
        if (!lockedRef.current) {
            const { changedTouches } = e.nativeEvent as any;

            setFingers(prev => {
                const next = new Map(prev);

                next.delete(Number(changedTouches[0].identifier));

                return next;
            })
        }
    }, []);

    const lock = useCallback(() => {
        lockedRef.current = true;
    }, []);

    const unlockAndReset = useCallback(() => {
        lockedRef.current = false;
        setFingers(new Map());
    }, []);

    return {
        fingers,
        setFingers,
        addTouches,
        releaseTouches,
        lock,
        unlockAndReset,
        lockedRef
    } as const;
}
