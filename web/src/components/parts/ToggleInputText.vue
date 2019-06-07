<template>
  <div class="b_toggle_edit_text">
    <div v-if="edit">
      <textarea v-if="multiple" v-model="editText"/>
      <input v-else v-model="editText" type="text">
      <button @click="cancel">cancel</button>
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
  mounted() {
    const { save, cancel } = this;
    this.listener.resolver = (message) => {
      switch (message) {
        case 'save':
          save();
          break;
        case 'cancel':
          cancel();
          break;
        default:
      }
    };
  },
  computed: {
    edit() {
      return this.mode === 'edit';
    },
  },
  methods: {
    cancel() {
      this.editText = this.text;
    },
    save() {
      this.onSave(this.editText);
    },
  },
};
</script>
