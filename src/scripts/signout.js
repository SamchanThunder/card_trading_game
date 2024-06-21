import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

export function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Signed Out Success");
            navigate("/card_trading_game"); // Navigate after successful sign out
        }).catch((error) => {
            console.error("Sign Out Error:", error);
        });
    };

    // You can optionally trigger sign out and navigation immediately on component mount
    // useEffect(() => {
    //     handleSignOut();
    // }, []);

    // Or return null if this component is just meant to trigger actions without rendering anything
    return null;
}
