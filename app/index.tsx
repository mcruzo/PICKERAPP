import React, { useState } from "react";
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import Tooltip from "react-native-walkthrough-tooltip";

import { Screen } from '@/components/layout/Screen';
import Button from '@/components/ui/Button';
import { IconInfo } from '@/components/ui/IconInfo';
import { AdBanner } from '@/components/game/AdBanner';
import '../global.css';

export default function Home() {
    const [showTipStarter, setTipStarter] = useState(false);
    const [showTipOrder, setTipOrder] = useState(false);
    const [showTipTeams, setTipTeams] = useState(false);

    return (
        <Screen className="gap-4 items-center h-screen w-screen" >
            <AdBanner show={false} />
            <Text className="text-5xl font-extrabold text-white justify-self-start ">Picker Finger</Text>
            <Text className="text-5xl font-extrabold text-white justify-self-start mb-32">Tap Chooser</Text>
            <View className="gap-10 w-5/6">
                <View className="bg-white/5 rounded-xl p-5 gap-10">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-lg font-semibold">Pick Starter</Text>
                        <IconInfo onPress={() => setTipStarter(true)} />
                    </View>
                    <Tooltip
                        isVisible={showTipStarter}
                        content={
                            <View>
                                <Text>Toquen la pantalla. Cada jugador con un dedo, mínimo dos. Pick Starter comenzará un conteo y al llegar a 0 elegira uno.</Text>
                            </View>
                        }
                        onClose={() => setTipStarter(false)}
                        placement="bottom"
                    >
                        <Link asChild href="/games/starter">
                            <Button label="PICK WINNER" />
                        </Link>
                    </Tooltip>
                </View>
                <View className="bg-white/5 rounded-xl p-5 gap-10">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-lg font-semibold">Pick Order</Text>
                        <IconInfo onPress={() => setTipOrder(true)} />
                    </View>
                    <Tooltip
                        isVisible={showTipOrder}
                        content={
                            <View>
                                <Text>Toquen la pantalla. Cada jugador con un dedo, mínimo dos. Pick order comenzará un conteo y al llegar a 0 le asignará un orden.</Text>
                            </View>
                        }
                        onClose={() => setTipOrder(false)}
                        placement="bottom"
                    >
                        <Link asChild href="/games/order">
                            <Button label="PICK ORDER" />
                        </Link>
                    </Tooltip>
                </View>
                <View className="bg-white/5 rounded-xl p-5 gap-10">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-lg font-semibold">Pick Teams</Text>
                        <IconInfo onPress={() => setTipTeams(true)} />
                    </View>
                    <Tooltip
                        isVisible={showTipTeams}
                        content={
                            <View>
                                <Text>Toquen la pantalla. Cada jugador con un dedo, mínimo 1 jugador extra al numero de equipos. Pick teams comenzará un contador, y al llegar a 0 les asignara un color por equipo. Los del mismo color son equipo.</Text>
                            </View>
                        }
                        onClose={() => setTipTeams(false)}
                        placement="bottom"
                    >
                        <Link asChild href="/games/teams">
                            <Button label="PICK TEAMS" />
                        </Link>
                    </Tooltip>
                </View>
            </View>
        </Screen>
    );
}
