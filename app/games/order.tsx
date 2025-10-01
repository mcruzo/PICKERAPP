import { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';

import { Screen } from '@/components/layout/Screen';
import { GameHeader } from '@/components/game/GameHeader';
import { Arena } from '@/components/game/Arena';
import { TouchAvatar } from '@/components/game/TouchAvatar';
import { useFingerArena } from '@/hooks/useFingerArena';
import { useCountdown } from '@/hooks/useCountdown';
import { shuffle } from '@/lib/random';
import Button from '@/components/ui/Button';
import { Countdown } from '@/components/game/Countdown';

export default function Order() {
    useKeepAwake();
   
    const { fingers, setFingers, addTouches, releaseTouches, lock, unlockAndReset, lockedRef } = useFingerArena();
    const [started, setStarted] = useState(false);
    const count = useCountdown(5, started);


    useEffect(() => {
        if (!started && fingers.size >= 2) {
            setStarted(true);
        }
        if (started && fingers.size < 2) {
            setStarted(false);
        }

    }, [fingers.size, started]);

    useEffect(() => {
        if (!started)
            return;

        if (count === 0) {
            lock();
            const ids = Array.from(fingers.keys());
            const shuffled = shuffle(ids);

            setFingers(prev => {
                const next = new Map(prev);

                shuffled.forEach((id, idx) => {
                    const f = next.get(id);

                    if (f) {
                        next.set(id, {
                            ...f,
                            order: idx + 1
                        });
                    }
                });

                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                return next;
            });
        }
    }, [count, started]);

    const avatars = useMemo(() => Array.from(fingers.values()), [fingers]);
    const onReset = () => {
        setStarted(false);
        unlockAndReset();
    }
    const FIX_X = -30;
    const FIX_Y = -30;

    return (
        <Screen>
            <GameHeader
                title="Pick Order"
                onBack={() => router.back()}
                onReset={onReset}
            />
            <Arena className="flex-1 bg-slate-700 rounded-2xl" releaseTouches={releaseTouches} onTouches={addTouches}>
                {!lockedRef.current && !started
                    ? <View className="mb-2 bg-zinc-700 items-center justify-center h-12">
                        <Text className='text-xl color-white'>Toca con al menos 2 dedos para empezar</Text>
                    </View>
                    : null
                }
                {avatars.map((f) => (
                    <TouchAvatar
                        animate={false}
                        highlight={true}
                        key={f.id}
                        order={f.order}
                        x={f.x + FIX_X}
                        y={f.y + FIX_Y}
                    />
                ))}
                {started && count > 0 
                ? (<View className="absolute inset-0 items-center justifycenter">
                    <Countdown value={count} />
                </View>) 
                : null}
            </Arena>
            {lockedRef.current ? (
                <Button label="Reiniciar" className="mt-3" onPress={onReset} />
            ) : null}
        </Screen>
    );
}
