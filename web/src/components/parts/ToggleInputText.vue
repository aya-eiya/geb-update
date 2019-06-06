<template>
  <div class="b_toggle_edit_text">
    <div v-if="edit">
      <textarea v-if="multiple" v-model="editText"/>
      <input v-else v-model="editText" type="text"/>
    </div>
    <div v-else>
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleInputText',
  props: {
    text: String,
    onSave: Function,
    multiple: Boolean,
    mode: {validataion: (mode) => !!['edit', 'display'].find(mode)},
  },
  data: function() {
    return {
      editText: this.text,
    }
  },
  computed: {
    edit: function() {
      return this.mode === 'edit'
    }
  },
}
</script>
