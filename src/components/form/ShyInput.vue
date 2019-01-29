<template>
  <div>
    <input
      type="text"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
    >
  </div>
</template>

<script>
export default {
  name: 'ShyInput',
  props: {
    value: {
      required: true,
      type: [String, Number],
      default: () => ''
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
      this.dispatch('ShyFormItem', 'on-shy-form-change', event.target.value)
    },
    handleBlur (event) {
      this.dispatch('ShyFormItem', 'on-shy-form-blur', event.target.value)
    }
  }
}
</script>

<style>
</style>
