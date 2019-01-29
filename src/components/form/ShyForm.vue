<template>
  <div>
    <form>
      <slot />
    </form>
  </div>
</template>

<script>
export default {
  name: 'ShyForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    rules: {
      type: Object,
      required: false,
      default: () => {}
    },
    model: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('on-shy-form-item-added', function (field) {
      const index = this.fields.indexOf(field)
      if (index === -1) {
        this.fields.push(field)
      }
    })

    this.$on('on-shy-form-item-remove', function (field) {
      const index = this.fields.indexOf(field)
      if (index !== -1) {
        this.fields.splice(index, 1)
      }
    })
  }
}
</script>

<style>
</style>
