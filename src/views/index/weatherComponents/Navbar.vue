<template>
  <nav class="navbar">
    <h4>
      <router-link to="/">&lt; {{ city }}</router-link>
    </h4>
  </nav>
</template>

<script setup>
props: {
  city: {
    type: String
  }
}
</script>

<style scoped>
@import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
