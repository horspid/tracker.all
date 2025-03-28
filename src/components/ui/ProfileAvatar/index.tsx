import { useEffect, useState } from "react";
import styles from "./ProfileAvatar.module.scss";
import { changeUserField } from "@services/userAuth";

interface ProfileAvatarProps {
  avatarUrl?: string;
}

const ProfileAvatar = ({ avatarUrl }: ProfileAvatarProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(avatarUrl || "");
  const [inputValue, setInputValue] = useState<string>(avatarUrl || "");
  const [error, setError] = useState<string>("");

  const handleAvatarClick = () => {
    setShowInput(true);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError("");
  };

  const validateImageUrl = (imageUrl: string) => {
    return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
  };

  const handleUrlSubmit = async () => {
    if (!inputValue) return;
    const isValid = await validateImageUrl(inputValue);

    if (isValid) {
        setUrl(inputValue);
        changeUserField({ avatar_url: inputValue})
        setShowInput(false);
    } else {
        setError("Ошибка: изображение недоступно.");
    }
  };

  useEffect(() => {
    setUrl(avatarUrl || "");
    setInputValue(avatarUrl || "");
  }, [avatarUrl]);

  return (
    <div className={styles.avatar}>
        {url ? (
            <div className={styles.avatar__block} onClick={handleAvatarClick} style={{ backgroundImage: `url(${url})`}}>
                <div className={styles.avatar__plus}>+</div>
            </div>
        ) : (
            <div className={styles.avatar__block} onClick={handleAvatarClick}>
                <div className={styles.avatar__plus}>+</div>
            </div>
        )}

        {showInput && (
        <div className={styles.avatar__form}>
            {error && <p className={styles.avatar__error}>{error}</p>}
            <input
                type="url"
                value={inputValue}
                onChange={handleUrlChange}
                placeholder="Введите URL"
                className={styles.avatar__input}
            />

            <button onClick={handleUrlSubmit}>Добавить URL</button>
        </div>
        )}
    </div>
  );
};

export default ProfileAvatar;
