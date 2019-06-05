<template>
<div class="b_log">
  <p :class="'msg_'+lv">{{ message }}</p>
</div>
</template>

<script>
export const LEVEL = {
  I : 'info',
  E : 'error',
  W : 'warn',
}

export default {
  name: 'LogMsg',
  props: {
    message: String,
    level: String,
  },
  computed: {
    lv: function(){
      switch(this.level){
        case LEVEL.E:
          return LEVEL.E
        case LEVEL.W:
          return LEVEL.W
        //case LEVEL.I:
        default:
          return LEVEL.I
      }
    }
  }
}
</script>

<style scoped>
.msg_info {
  color: #888
}
.msg_error {
  color: #900
}
.msg_warn {
  color: #060
}
</style>