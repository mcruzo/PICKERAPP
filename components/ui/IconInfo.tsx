import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    onPress?: () => void;
}

export function IconInfo({ onPress }: Props) {
    return (
        <Pressable onPress={onPress} className="p-1 rounded-full">
            <Ionicons color="white" name="information-circle-outline" size={20} />
        </Pressable>
    );
}
