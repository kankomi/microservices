<template>
  <div id="app">
    <v-app>
      <v-toolbar app>
        <v-toolbar-title>Docker Admin Dashboard</v-toolbar-title>
      </v-toolbar>
      <!-- <v-navigation-drawer app></v-navigation-drawer> -->
      <v-content>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>

</style>
