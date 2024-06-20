import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function StartPage(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/card_trading_game/signin');
    }, [navigate]);

    return null;
}