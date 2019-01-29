<template>
  <div>
    <label> {{ label }} </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ShyFormItem',
  props: {
    label: {
      type: String,
      default: () => '',
      required: false
    }
  }
}
</script>

<style>

</style>
