<template>
  <div class="b_toggle_edit_text">
    <div v-if="edit">
      <textarea v-if="multiple" v-model="editText"/>
      <input v-else v-model="editText" type="text">
    </div>
    <div v-else>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'ToggleInputText',
  props: {
    text: String,
    onSave: Function,
    multiple: Boolean,
    listener: Object,
    mode: { validataion: mode => !!['edit', 'display'].find(mode) },
  },
  data() {
    return {
      editText: this.text,
    };
  },
  computed: {
    edit() {
      return this.mode === 'edit';
    },
  },
  method: {
    cancel() {
      this.editValues = this.values.slice();
    },
    save() {
      this.onSave(this.editValues);
    },
  },
};
</script>
