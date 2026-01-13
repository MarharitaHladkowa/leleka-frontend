import { User } from "@/types/user";
import css from "./UserBar.module.css";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Змінено з "next/router"

interface UserBarProps {
  user: User;
}

export default function UserBar({ user }: UserBarProps) {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.status === 204) {
                toast.success("Вихід успішний🎉");
                router.push("/auth/login");
            } else if (res.status === 400) {
                toast.error("Помилка 400");
            } else {
                toast.error(data.error);
            }
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : "Помилка виходу"
            );
        }
    };

    return (
        <div className={css.userBar}>
            <div className={css.userInfo}>
                <Image
                    src={user.avatarURL}
                    alt={user.name}
                    className={css.avatar}
                    width={50}
                    height={50}
                />
                <div className={css.userDetails}>
                    <p className={css.userName}>{user.name}</p>
                    <p className={css.userEmail}>{user.email}</p>
                </div>
            </div>
            <button className={css.logoutButton} aria-label="Logout" onClick={handleClick}>
                <svg width="18" height="19" className="logout-icon">
                    <use href="/icon-sprite.svg#icon-logout"></use>
                </svg>
            </button>
        </div>
    );
}