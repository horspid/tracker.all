# [Перейти на tracker.all](https://tracker-all.vercel.app/)

# 🧑‍💻 Используемые технологии
React, Redux, Router, TypeScript, zustand, supabase, module scss (+BEM методология)
# 📖 Как использовать проект?
Для начала необходимо скопировать проект, установить зависимости
```shell
# коирование проекта
git clone https://github.com/horspid/tracker.all.git

# установка зависимостей
npm i
```
После установки зависимостей необходимо создать .env файл в корне проекта, внутри файла должна быть следующая информация:
```js
VITE_API_KEY='ключ, получаемый с tg @kinopoiskdev_bot'
VITE_DB_KEY='ключ, получаемый с db supabase'
```
Для того, что-бы на проекте заработала регистрация, авторизация, оценки фильмов и прочее - необходимо создать три таблицы в базе данных

Таблица Users
| user_id | email | login | avatar_url | total_movies | total_serials |
|---------|-------|-------|------------|--------------|---------------|

Таблица Ratings
| user_id | email | login | avatar_url | total_movies | total_serials |
|---------|-------|-------|------------|--------------|---------------|

Таблица Watchlist
| user_id | email | login | avatar_url | total_movies | total_serials |
|---------|-------|-------|------------|--------------|---------------|
