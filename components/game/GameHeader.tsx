import { View } from 'react-native';
import { Heading } from '@/components/ui/Heading';
import Button from '@/components/ui/Button';

interface Props {
    title: string;
    onBack: () => void;
    onReset?: () => void;
}

export function GameHeader({ title, onBack, onReset }: Props) {
    return (
        <View className="flex-row items-center justify-between mb-3">
            <Button label="Menú" className="bg-zinc-700" onPress={onBack} />
            <Heading title={title} />
            {onReset ? <Button label="Reiniciar" className="bg-zinc-700" onPress={onReset} /> : <View className="w-24" />}
        </View>
    );
}
