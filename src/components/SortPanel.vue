<template>
  <div class="panel-buttons">
    <ul class="panel-buttons__list">
      <li
        class="panel-buttons__list-item"
        v-for="buttonItem in sortButtonsArray"
      >
        <v-tooltip :text="buttonItem.title">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :icon="buttonItem.icon"
              density="compact"
              variant="tonal"
              class="panel-buttons__button"
              color="white"
              @click="sortHandler(buttonItem.value)"
              :active="buttonItem.active"
            />
          </template>
        </v-tooltip>
      </li>
    </ul>
  </div>
</template>


<script setup>
  import { ref, inject, reactive, readonly } from 'vue';

  import { defaultSorting } from "../helpers/index.js";

  const firstList = inject('firstList');
  const secondList = inject('secondList');
  const lastList = inject('lastList');

  const props = defineProps({
    options: {},
  });


  let cards = ref([]);

  function getLocalCards() {
    switch (props.options.id) {
      case 1:
        cards = firstList;
        break;
      case 2:
        cards = secondList;
        break;
      case 3:
        cards = lastList;
        break;
    }
  }

  /**
   * Changes the filter active state.
   * 1) Sets all active states to false.
   * 2) Set selected active state to true.
   * @param {string} dir
   * @returns {void}
   */
  function changeState(dir) {
    for (const key in sortButtonsArray) {
      if (sortButtonsArray.hasOwnProperty(key)) {
        sortButtonsArray[key].active = false;
      }
    }
    sortButtonsArray[dir].active = true;
  };

  /**
   * The protected set of directions variants.
   */
  const dirsSet = readonly({
    asc: 'asc',
    desc: 'desc',
    default: 'default',
  });

  /**
   * Set of the directions variants.
   */
  const sortButtonsArray = reactive({
    [dirsSet.asc]: {
      value: dirsSet.asc,
      icon: 'mdi-sort-ascending',
      active: false,
      title: "По убыванию",
    },
    [dirsSet.desc]: {
      value: dirsSet.desc,
      icon: 'mdi-sort-descending',
      active: false,
      title: "По возрастанию",
    },
    [dirsSet.default]: {
      value: dirsSet.default,
      icon: 'mdi-sort-variant-off',
      active: true,
      title: "Отмена сортировки по рейтингу(по ID)",
    },
  });

  /**
   * 1) Makes the default copy of an array.
   * 2) Updates the cards array to appropriate value.
   * @param {string} The sort direction way.
   * @returns {void}.
   */
  function sortList(dir) {
    switch (dir) {
      case dirsSet.asc:
        cards.value = defaultSorting(cards.value);
        break;
      case dirsSet.desc:
        cards.value = defaultSorting(cards.value).reverse();
        break;
      case dirsSet.default:
        cards.value = cards.value.sort((a, b) => b.id - a.id).reverse();
        break;
    }
  };

  /**
   * 1) Receives cards array.
   * 2) Changes the state.
   * 3) Sorts the cards array.
   * @param {string} The direction way.
   */
  function sortHandler(dir) {
    getLocalCards();
    changeState(dir);
    sortList(dir);
  };
</script>

<style lang="scss" scoped>
  .panel-buttons {
    padding: 15px 20px;
    background-color: #111111;
    border-radius: 10px;

    &__list {
      list-style-type: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 40px;
    }
  }
</style>
