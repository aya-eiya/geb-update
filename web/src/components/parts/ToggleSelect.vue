<template>
  <div class="b_toggle_edit_select">
    <div v-if="edit">
      <p v-for="(opt,idx) in options"
        :key="idx" type="text">
        <input
        :type="inputType"
        name="selection" :value="opt.value" v-model="editValues" />
        <label v-html="opt.display"></label>
      </p>
    </div>
    <div v-else v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSelect',
  props: {
    options: Array,
    values: Array,
    onSave: Function,
    mode: {validataion: (mode) => !!['edit', 'display'].find(mode)},
    multiple: Boolean,
  },
  data: function() {
    return {
      text: this.options.filter(o=>this.values.indexOf(o.value) > -1).map(o=>o.display).join(' '),
      editValues: this.values,
      inputType: this.multiple? 'checkbox':'radio',
    }
  },
  computed: {
    edit: function() {
      return this.mode === 'edit'
    }
  },
}
</script>
