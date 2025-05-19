import { useState } from 'react';

export const useModal = (show = false): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState(show);

    const open = (): void => {
        setVisible(true);
    };

    const close = (): void => {
        setVisible(false);
    };

    return [visible, open, close];
};
