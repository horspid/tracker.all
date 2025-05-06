import { ChangeEvent, useEffect, useState } from "react";
import { changeUserField } from "@services/userAuth";

interface ProfileAvatarProps {
  avatarUrl?: string;
  isCurrentUser: boolean;
}

const ProfileAvatar = ({ avatarUrl, isCurrentUser }: ProfileAvatarProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(avatarUrl || "");
  const [inputValue, setInputValue] = useState<string>(avatarUrl || "");
  const [error, setError] = useState<string>("");

  const handleAvatarClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    if (!isValid) setError("Неверный формат изображения");

    setUrl(inputValue);
    await changeUserField({ avatar_url: inputValue });
    setShowInput(false);
  };

  useEffect(() => {
    setUrl(avatarUrl || "");
    setInputValue(avatarUrl || "");
  }, [avatarUrl, isCurrentUser]);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="group relative">
        <img
          src={url}
          alt="avatar"
          onClick={() => isCurrentUser && handleAvatarClick()}
          className={`rounded-full w-150 h-150 ${!url && "bg-grey"} object-cover bg-center ${isCurrentUser && "hover:opacity-30  cursor-pointer"}`}
        />
        {isCurrentUser && (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 opacity-0 group-hover:opacity-100 pointer-events-none">
            +
          </div>
        )}
      </div>

      <div
        className={`w-full top-full mt-20 flex flex-col items-center ${showInput ? "visible" : "invisible"}`}
      >
        <input
          type="url"
          value={inputValue}
          onChange={handleUrlChange}
          placeholder="Введите URL"
          className={`outline-0  px-20 py-10 bg-grey rounded-2xl ${error ? "text-red" : "text-white"}`}
        />
        <button
          onClick={handleUrlSubmit}
          className="w-max px-30 py-10 mt-10 rounded-2xl bg-red cursor-pointer"
        >
          Добавить URL
        </button>
      </div>
    </div>
  );
};

export default ProfileAvatar;
