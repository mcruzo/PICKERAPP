import React from 'react';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Text, View } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export type Finger = {
    id: number; // identifier del toque
    x: number;
    y: number;
    color?: string; // para teams
    order?: number; // para order
};

interface TouchAvatarProps {
    animate?: boolean;
    x: number;
    y: number;
    highlight?: boolean;
    color?: string;
    order?: number;
}

export function TouchAvatar({
        animate = false,
        x,
        y,
        highlight = false,
        color,
        order,
    }: TouchAvatarProps) {
    const style = useAnimatedStyle(() => ({
        borderStyle: animate ?  'dotted' : 'solid',
        borderColor: '#6366f1',
        transform: [
            { translateX: x }, 
            { translateY: y }
        ],
    }));

    const pulse = useAnimatedStyle(() => ({
        borderStyle: 'solid',
        transform: [
            { translateX: x },
            { translateY: y },
            { scale: highlight ? withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 350 }),
                        withTiming(1, { duration: 350 })
                    ),
                    -1,
                    true 
                ): 5
            },
        ],
    }));
    
    const pulseAnimate = useAnimatedStyle(() => ({
        borderStyle: animate ? 'dotted' : 'solid',
        transform: [
            { translateX: x },
            { translateY: y },
            { rotate: withRepeat(
                withSequence(
                    withTiming('360deg', { duration: 300 }),
                    withTiming('0deg', { duration: 300 }),
                ),
                -1,
                false
            ) },
            { scale: withRepeat(
                    withSequence(
                        withTiming(1.1, { duration: 350 }),
                        withTiming(1, { duration: 350 })
                    ),
                    -1,
                    true 
                )
            },
        ],
    }));

    const appliedStyle = highlight ? pulse : animate ? pulseAnimate : style;

    return (
        <AnimatedView style={appliedStyle} className="absolute w-24 h-24 rounded-full items-center justify-center border-4 bg-[#101828]">
            <AnimatedView className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: color ?? '#101828'}}>
                {order != null ? <Animated.Text className="text-white font-bold text-4xl top-5">{order}</Animated.Text> : null}
                {order != null 
                    ? <AnimatedView className="rounded-full bg-sky-500 opacity-75 relative -top-14 -right-12 h-10 w-10 items-center justify-center">
                        <AnimatedText className="text-white font-bold text-xl">{order}</AnimatedText>
                    </AnimatedView>
                    : null}
            </AnimatedView>
        </AnimatedView>
    );
}
