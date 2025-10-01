import { Text, View, ViewProps } from 'react-native';


export function Heading({ title, subtitle, ...props }: ViewProps & { title: string; subtitle?: string }) {
    return (
        <View {...props} className="gap-1">
            <Text className="text-2xl font-bold text-white">{title}</Text>
            {subtitle ? <Text className="text-white/70">{subtitle}</Text> : null}
        </View>
    );
}
