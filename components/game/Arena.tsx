import { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
    children?: ReactNode;
    className?: string;
    onTouches: (e: any) => void;
    releaseTouches: (e: any) => void;
}

export function Arena({ children, className, onTouches, releaseTouches }: Props) {
    return (
        <View
            className={className ?? 'flex-1 rounded-2xl bg-neutral-800 overflowhidden'}
            onTouchStart={onTouches}
            onTouchEnd={releaseTouches}
        >
            {children}
        </View>
    );
}
