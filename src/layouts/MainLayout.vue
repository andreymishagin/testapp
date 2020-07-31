<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Города и рестораны
        </q-toolbar-title>
        <q-space />
        <q-avatar @click="openDialog" class="cursor-pointer" square>
          <img
            src="~assets/mts-logo.png"
          >
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="dialog"
      persistent
    >
      <q-card>
        <q-card-section class="text-h6 text-weight-light text-uppercase">
          Техническое задание
        </q-card-section>

        <q-separator />

        <q-card-section>
          Разработать Web.API с использование .Core, которое имеет 3 метода <br />
          1. Получение списка ресторанов по определённому городу с поддержкой пейджинга <br />
          2. Добавление города <br />
          3. Добавление ресторана <br />

          Город: id,name <br />
          Ресторан: id, name <br />
        </q-card-section>

        <q-separator />

        <q-card-section>
          В качестве хранилища данных можно использовать любую реляционную БД <br/>

          Дополнительные требования: <br/>
          1. Ахитектурно предусмотреть, что-бы изменение хранилища данных
          не потребовало переписывания всего приложения. <br/>
          2. Описание доступных методов API должно быть легко получено клиентом,
          а так-же клиент должен иметь возможность проверить работу метод. <br/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="Закрыть"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>
