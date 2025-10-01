import { Text } from 'react-native';

interface Props {
    value: number;
}

export function Countdown({ value }: Props) {
    return <Text className="text-5xl text-white font-extrabold tracking-widest">{value}</Text>;
}
