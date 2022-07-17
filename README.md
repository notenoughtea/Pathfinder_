# Pathfinder​  

#### Приложение для поиска походных маршрутов
#### В данном проекте были реализованы:
- Функции вывода маршрутов и маркеров с координатами конечной точки маршрута
- Добавление кастомных маршрутов с собственным описанием, координатами цели и остальными данными с возможностью их изменения
#### Регистрация и авторизация пользователя, а также его редактирование профиля. На странице карточки с маршрутом запрашивается погода по координатам выбранного маршрута. Функционал комментариев также реализован.

-----------

[Главная страница](pathfinder/public/stylesheets/screenshot0.png)  
![Главная страница](pathfinder/public/stylesheets/screenshot0.png "mainpage")  

[Карточка маршрута](pathfinder/public/stylesheets/screenshot1.png)
![Карточка маршрута](pathfinder/public/stylesheets/screenshot1.png "card")  

[Превью маршрута на встроенных Google Maps API](pathfinder/public/stylesheets/screenshot2.png)
![Превью маршрута на встроенных Google Maps API](pathfinder/public/stylesheets/screenshot2.png "preview")  



-----------

```

Запуск сервера и засеивание базы:
/server
npm i 
npx sequelize db:migrate
npx sequelize db:seed:all

Запуск приложения:
/client
npm i 
npm start
