<template>
  <div>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
import emitter from './mixins/emitter'
export default {
  name: 'ShyInput',
  mixins: [emitter],
  props: {
    value: {
      required: true,
      type: [String, Number],
      default: () => ''
    }
  }
}
</script>

<style>
</style>
