import { useEffect, useState } from 'react';

export function useCountdown(startFrom: number, running: boolean) {
    const [value, setValue] = useState(startFrom);

    useEffect(() => {
        let id: number | undefined;

        if (!running) {
            clearInterval(id);
            setValue(startFrom);
            return;
        };

        setValue(startFrom);

        let current = startFrom;

        id = setInterval(() => {
            current -= 1;
            setValue(current);
            if (current <= 0) clearInterval(id);
        }, 1000);

        return () => clearInterval(id);
    }, [startFrom, running]);

    return value;
}
