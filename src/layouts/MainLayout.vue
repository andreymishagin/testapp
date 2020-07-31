<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Города и рестораны
        </q-toolbar-title>
        <q-space />
        <q-avatar class="cursor-pointer" square>
          <img
            src="~assets/mts-logo.png"
          >
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
};
</script>
