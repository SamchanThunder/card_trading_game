import { useNavigate } from 'react-router-dom';

export function Navigate() {
    const navigate = useNavigate();

    function newPage(x) {
        navigate(x);
    }

    return { newPage };
}