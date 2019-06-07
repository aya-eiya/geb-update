<template>
  <div class="b_input">
    <p>
      <input v-model="title" :placeholder="inputName">
      <button @click="save">Add</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DataInput',
  props: {
    inputName: String,
    onSave: Function,
  },
  data: () => ({
    title: '',
  }),
  methods: {
    save() {
      if (this.title) {
        this.onSave(this.title);
      }
    },
  },
};
</script>

<style scoped>
.b_input {
  display: flex;
}
</style>
