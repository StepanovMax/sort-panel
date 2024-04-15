<template>
  <div class="cards-column">
    <SortPanel :options="options" />
    <CardsList :options="options" />
  </div>
</template>

<script setup>
  import CardsList from './CardsList.vue';
  import SortPanel from './SortPanel.vue';

  const props = defineProps({
    options: {},
  });

</script>

<style lang="scss" scoped>
  .cards-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
