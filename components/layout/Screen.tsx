import { type ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    children: ReactNode;
    className?: string;
};

export function Screen({ children, className }: Props) {
    return (
        <SafeAreaView className="flex-1 bg-neutral-900">
            <View className={className ?? 'flex-1 p-4'}>{children}</View>
        </SafeAreaView>
    );
}
