import { View } from 'react-native';
/**
 * Placeholder no-intrusivo. Si SHOW_ADS=false o no hay adUnitId, el
 * contenedor colapsa automáticamente.
 */
export function AdBanner({ show, height = 60 }: {
    show?: boolean; height?:
        number
}) {
    if (!show) return null;
    return <View className="w-full items-center justify-center justify-self-start bg-black/20
rounded-xl" style={{ height }} />;
}
