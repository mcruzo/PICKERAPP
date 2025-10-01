import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string;
    loading?: boolean;
    style?: ViewStyle;
    
    onPress?: () => void;
}


export default function Button({ label, children, onPress, disabled, loading, className, style }: Props) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={cn(
                'rounded px-5 py-3 items-center justify-center bg-indigo-600 active:bg-indigo-700',
                (disabled || loading) && 'opacity-60',
                className,
            )}
            style={style}
        >
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Text className="text-white font-semibold text-base">{label ?? children}</Text>
            )}
        </Pressable>
    );
}
