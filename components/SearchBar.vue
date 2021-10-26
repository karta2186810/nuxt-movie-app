<template>
  <div class="search-bar">
    <input
      :value="searchVal"
      type="text"
      class="search-bar__input"
      :placeholder="placeholder"
      @change="$emit('change', $event.target.value || '')"
      @keyup.enter="$emit('search')"
    />
    <BoxCenter
      class="search-bar__button ph-12 pointer"
      @click="$emit('search')"
    >
      <slot name="buttonIcon">
        <i class="ri-search-line search-bar__button-icon"></i>
      </slot>
    </BoxCenter>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  model: {
    prop: 'searchVal',
    event: 'change',
  },
  props: {
    placeholder: {
      type: String,
      default: '搜尋',
    },
    searchVal: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  &__input {
    background-color: darken($white, 5%);
    outline: none;
    border: none;
    color: $text-black;
    padding: 10px 16px;
    flex: 1;
    border-radius: 4px 0 0 4px;
    font-weight: 600;
    font-size: 16px;
  }
  &__button {
    width: auto;
    height: inherit;
    border: none;
    background-color: $black-alt;
    color: $white;
    transition: 0.3s;
    border-radius: 0 4px 4px 0;
    &:hover {
      background-color: $primary;
      color: $text-black;
    }
  }
}
</style>
