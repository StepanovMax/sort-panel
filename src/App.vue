<template>
  <main>
    <CardsColumn
      v-for="(item, index) in CardsListOptions"
      :key="index"
      :options="item"
    />
  </main>
</template>

<script setup>
  import { ref, provide } from 'vue';
  import axios from 'axios';
  import CardsColumn from './components/CardsColumn.vue';

  const firstList = ref([]);
  const secondList = ref([]);
  const lastList = ref([]);

  const CardsListOptions = ref([
    {
      color: '#0aa6e362',
      title: 'Необработанные',
      id: 1,
    },
    {
      color: '#e86405bd',
      title: 'В работе',
      id: 2,
    },
    {
      color: '#9400d364',
      title: 'Завершенные',
      id: 3,
    },
  ]);

  const getAllCards = async () => {
    try {
      await axios
        .get('https://fakestoreapi.com/products')
        .then((res) => (firstList.value = res.data));
      console.log('getAllCards - успешно');
    } catch (error) {
      console.log(error);
      alert('Упс! Ошибка получения данных ;(');
    }
  };

  getAllCards();

  provide('firstList', firstList);
  provide('secondList', secondList);
  provide('lastList', lastList);
</script>

<style scoped>
  html {
    height: 100%;
    overflow: hidden;
  }

  main {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 5%;
    width: 100%;
  }
</style>
