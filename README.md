### Настройка окружения
Для корректной работы приложения необходимо наличие следующих установленных компонентов:
* [Node.js](https://nodejs.org/en/)

### Установить quasar CLI
```bash
npm install -g @quasar/cli
```

### Установка и запуск приложения
Перейти в корневой каталог с проектом и выполнить:
```bash
npm install
quasar dev
```
### Выполнить билд приложения
```bash
quasar build
```
### Выполнить билд приложения
Изменить адрес backend'а и порт запуска можно в файле quasar.conf.js
```bash
devServer: {
  port: 8080,
  proxy: [
    {
      target: 'http://localhost:8081/',
    }
  ]
},
```

