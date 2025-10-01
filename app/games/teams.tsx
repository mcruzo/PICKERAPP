import { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';

import { Screen } from '@/components/layout/Screen';
import { GameHeader } from '@/components/game/GameHeader';
import { Arena } from '@/components/game/Arena';
import { TouchAvatar } from '@/components/game/TouchAvatar';
import { useFingerArena } from '@/hooks/useFingerArena';
import { assignTeamsUniform } from '@/lib/teams';
import Button from '@/components/ui/Button';
import { useCountdown } from '@/hooks/useCountdown';
import { Countdown } from '@/components/game/Countdown';

export default function Teams() {
    useKeepAwake();
    const { fingers, setFingers, addTouches, releaseTouches, lock, unlockAndReset } = useFingerArena();
    const [teams, setTeams] = useState(2);
    const [initialize, setInitialize] = useState(false);
    const [started, setStarted] = useState(false);
    const count = useCountdown(5, started);

    const avatars = useMemo(() => Array.from(fingers.values()), [fingers]);
    const minToStart = teams + 1;

    const onReset = () => {
        setStarted(false);
        setInitialize(false);
        unlockAndReset();
    }

    function runRoulette() {
        lock();
        const colorMap = assignTeamsUniform(avatars, teams);

        setFingers((prev) => {
            const next = new Map(prev);

            avatars.forEach((f) => next.set(f.id, {
                ...f,
                color: colorMap.get(f.id)
            }));

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            return next;
        });
    }

    useEffect(() => {
        if (!started && fingers.size >= minToStart) {
            setStarted(true);
        }
        if (started && fingers.size < minToStart) {
            setStarted(false);
        }

    }, [fingers.size, started, minToStart]);

    useEffect(() => {
        if (!started)
            return;

        if (count === 0) {
            runRoulette();
        }
    }, [count, started]);

    const FIX_X = -35;
    const FIX_Y = -50;

    return (
        <Screen>
            <GameHeader
                title="Pick Teams"
                onBack={() => router.back()}
                onReset={onReset}
            />
            {!initialize ? (
                <TeamPicker
                    teams={teams}
                    setTeams={setTeams}
                    onStart={() => setInitialize(true)}
                />
            ) : (
                <>

                    <Arena
                        className="flex-1 bg-teal-900 rounded-2xl"
                        releaseTouches={releaseTouches}
                        onTouches={addTouches}
                    >
                        {!started
                            ? <View className="mb-2 bg-zinc-700 items-center justify-center h-12">
                                <Text className='text-xl color-white'>Toca la pantalla con {minToStart} o más dedos</Text>
                            </View> : null}
                        {avatars.map((f) => (
                            <TouchAvatar
                                color={f.color}
                                key={f.id}
                                x={f.x + FIX_X}
                                y={f.y + FIX_Y}
                            />
                        ))}
                        {started && count > 0 ? (<View className="absolute inset-0 items-center justifycenter">
                            <Countdown value={count} />
                        </View>) : null}
                    </Arena>
                    <View className="flex-row gap-3 mt-3">
                        <Button label="Reiniciar" onPress={onReset} />
                        <Button
                            label="Menú"
                            className="bg-zinc-700"
                            onPress={() => router.replace('/')}
                        />
                    </View>
                </>
            )}
        </Screen>
    );
}

interface TeamPickerProps {
    teams: number;
    onStart: () => void;
    setTeams: (n: any) => void;
}

function TeamPicker({ teams, setTeams, onStart }: TeamPickerProps) {

    return (
        <View className="bg-white/5 rounded-2xl p-4 gap-3">
            <Text className="text-white text-lg font-semibold">Número de equipos</Text>
            <View className="flex-row items-center justify-center gap-4">
                <Pressable
                    onPress={() => setTeams((n: any) => Math.max(2, n - 1))}
                    className="px-4 py-2 bg-zinc-700 rounded-xl"
                >
                    <Text className="text-white">-</Text>
                </Pressable>
                <Text className="text-white text-2xl w-16 text-center">{teams}</Text>
                <Pressable
                    onPress={() => setTeams((n: any) => Math.min(30, n + 1))}
                    className="px-4 py-2 bg-zinc-700 rounded-xl"
                >
                    <Text className="text-white">+</Text>
                </Pressable>
            </View>
            <Text className="text-white/70">mín: 2 / máx: 30</Text>
            <Button label="Start" onPress={onStart} className="bg-emerald-600" />
        </View>
    );
}
