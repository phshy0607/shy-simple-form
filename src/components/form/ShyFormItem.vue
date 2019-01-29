<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'ShyFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: () => '',
      required: false
    },
    prop: {
      type: String,
      default: () => '',
      required: false
    }
  },
  data () {
    return {
      validateState: '',
      validateMessage: ''
    }
  },
  methods: {
    setListeners () {
      this.$on('on-shy-form-blur', function (value) {
        this.validate('blur')
      })
      this.$on('on-shy-form-change', function (value) {
        this.validate('change')
      })
    },
    getRules () {

    },
    validate (trigger) {
      // let descriptor = {
      //   [this.prop]: 
      // }

      // let validator = new Schema(rule)
      // validator.validate(value, (errors, fields) => {
      //   if (errors) {
      //     console.error(errors)
      //   } else {
      //     console.log(fields)
      //   }
      // })
    }
  },
  created () {
    if (this.prop) {
      this.dispatch('ShyForm', 'on-shy-form-item-added', this.prop)
      this.setListeners()
    }
  },
  beforeDestroy () {
    this.dispatch('ShyForm', 'on-shy-form-item-remove', this.prop)
  }
}
</script>

<style>

</style>
