import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useKeepAwake } from 'expo-keep-awake';

import { Screen } from '@/components/layout/Screen';
import { GameHeader } from '@/components/game/GameHeader';
import { Arena } from '@/components/game/Arena';
import { TouchAvatar } from '@/components/game/TouchAvatar';
import { useFingerArena } from '@/hooks/useFingerArena';
import { useCountdown } from '@/hooks/useCountdown';
import { shuffle, pickOne } from '@/lib/random';
import Button from '@/components/ui/Button';
import { Countdown } from '@/components/game/Countdown';

export default function Starter() {
    useKeepAwake();

    const { fingers, setFingers, addTouches, releaseTouches, lock, unlockAndReset, lockedRef } = useFingerArena();
    const [started, setStarted] = useState(false);
    const [winner, setWinner] = useState<number | null>(null);
    const count = useCountdown(5, started);

    // Arrancar countdown tras detectar 2 dedos
    useEffect(() => {
        if (!started && fingers.size >= 2) {
            setStarted(true);
        }
        if (started && fingers.size < 2) {
            setStarted(false);
        }
    }, [fingers.size, started]);

    // Bloquear ingreso al llegar a 0 y correr ruleta
    useEffect(() => {
        let intervalId: number | undefined;

        if (!started) return;

        if (count === 0) {
            lock();
            
            const ids = Array.from(fingers.keys());
            // Pequeña "ruleta": resalta aleatoriamente durante ~2s
            const sequence = shuffle(ids).concat(shuffle(ids));
            let idx = 0;


            if (intervalId !== undefined) clearInterval(intervalId);

            intervalId = setInterval(() => {
                setFingers((prev) => new Map(Array.from(prev, ([idF, f]) => [
                    idF,
                    { ...f }
                ]))); // trigger rerender

                idx++;

                if (idx > sequence.length + 6) {
                    lock();
                    clearInterval(intervalId);
                    const final = pickOne(ids);

                    setWinner(final);

                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            }, 180);
        }

        return () => clearInterval(intervalId);
    }, [count, started]);

    const avatars = useMemo(() => Array.from(fingers.values()), [fingers]);
    const onReset = () => {
        setWinner(null);
        setStarted(false);
        unlockAndReset();
    }

    const FIX_X = -30;
    const FIX_Y = -30;

    return (
        <Screen>
            <GameHeader title="Pick Starter"
                onBack={() => router.back()}
                onReset={onReset}
            />
            <Arena className="flex-1 bg-black rounded-2xl" releaseTouches={releaseTouches} onTouches={addTouches} >
                {!lockedRef.current && !started
                    ? <View className="mb-2 bg-zinc-700 items-center justify-center h-12">
                        <Text className='text-xl color-white'>Toca con al menos 2 dedos para empezar</Text>
                    </View>
                    : null
                }
                {avatars.map((f) => (
                    <TouchAvatar
                        animate={started && count === 0 && winner === null}
                        highlight={f.id === winner}
                        key={f.id}
                        x={f.x + FIX_X}
                        y={f.y + FIX_Y}
                    />
                ))}
                {started && count > 0
                    ? (<View className="absolute inset-1 items-center justifycenter">
                        <Countdown value={count} />
                    </View>)
                    : null
                }
                {winner != null
                    ? (<WinnerOverlay
                        onRestart={onReset}
                        onMenu={() => router.replace('/')} />)
                    : null
                }
            </Arena>
        </Screen>
    );
}

function WinnerOverlay({ onRestart, onMenu }: {
    onRestart: () => void;
    onMenu: () => void
}) {
    return (
        <View className="absolute inset-0 items-center justify-center gap-4">
            <View className="px-6 py-3 rounded-2xl bgemerald-600"><TextWin>¡Ganador!</TextWin></View>
            <View className="flex-row gap-3">
                <Button label="Reiniciar" onPress={onRestart} />
                <Button label="Menú" className="bg-zinc-700" onPress={onMenu} />
            </View>
        </View>
    );
}

function TextWin({ children }: { children: React.ReactNode }) {
    return <Text className="text-white font-extrabold text-xl">{children}</Text>;
}
