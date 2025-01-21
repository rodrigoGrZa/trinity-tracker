import { useState, useEffect, useRef } from 'react';

const useCooldown = (initialCooldown) => {
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const cooldownRef = useRef(null);

    const startCooldown = () => {
        const validCooldown = parseInt(initialCooldown, 10);

        setIsOnCooldown(true);
        setTimeRemaining(validCooldown);

        cooldownRef.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => {
                if (isNaN(prevTimeRemaining)) {
                    console.error("Invalid prevTimeRemaining value:", prevTimeRemaining);
                    clearInterval(cooldownRef.current);
                    setIsOnCooldown(false);
                    return 0;
                }

                const newTimeRemaining = prevTimeRemaining - 1;

                if (newTimeRemaining <= 0) {
                    clearInterval(cooldownRef.current);
                    setIsOnCooldown(false);
                    return 0;
                }

                return newTimeRemaining;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => clearInterval(cooldownRef.current);
    }, []);

    return {
        isOnCooldown,
        timeRemaining,
        startCooldown,
    };
};

export default useCooldown;
