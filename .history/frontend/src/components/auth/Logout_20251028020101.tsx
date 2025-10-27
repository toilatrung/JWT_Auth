import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logOut } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
            try {
                await logOut();
                navigate("/login");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout