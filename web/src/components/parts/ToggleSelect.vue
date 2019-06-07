<template>
  <div class="b_toggle_edit_select">
    <div v-if="edit">
      <p :class="pos(opt, options)" v-for="(opt,idx) in options" :key="idx" type="text">
        <input :type="inputType" :id="labelId(opt.value)" v-model="editValues" :value="opt.value">
        <label :for="labelId(opt.value)" v-html="opt.display"></label>
      </p>
      <button @click="cancel">cancel</button>
    </div>
    <div v-else v-html="text"></div>
  </div>
</template>

<script>
import StyleUtils from '../../StyleUtils';

export default {
  name: 'ToggleSelect',
  props: {
    options: Array,
    values: Array,
    onSave: Function,
    listener: Object,
    mode: { validataion: mode => !!['edit', 'display'].find(mode) },
    multiple: Boolean,
  },
  data() {
    return {
      inputType: this.multiple ? 'checkbox' : 'radio',
      editValues: this.values.slice(),
      pos: StyleUtils.listingSelector,
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
    text() {
      return this.options
        .filter(o => this.values.indexOf(o.value) > -1)
        .map(o => o.display)
        .join(' ');
    },
  },
  methods: {
    labelId(value) {
      // eslint-disable-next-line no-underscore-dangle
      return `${this._uid}_${value}`;
    },
    cancel() {
      this.editValues = this.values.slice();
    },
    save() {
      this.onSave(this.editValues);
    },
  },
};
</script>
