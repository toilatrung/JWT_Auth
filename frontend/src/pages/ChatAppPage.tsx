import Logout from "@/components/auth/Logout";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      {user ? (
        <h1>Welcome back, {user.displayName}!</h1>
      ) : (
        <h1>Please log in to continue.</h1>
      )}
      <Logout />
    </div>
  );
};

export default ChatAppPage;
