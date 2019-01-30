<template>
  <div>
    <label
      v-if="label"
      :class="{'shy-form-item-is-invalid': invalid }"
    >
      {{ label }}
    </label>
    <div>
      <slot />
    </div>
    <span v-if="invalid">
      {{ this.validateMessage[0].message }}
    </span>
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
  computed: {
    fieldValue () {
      return this.form.model[this.prop]
    },
    invalid () {
      return this.validateState === 'error'
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
      const rules = this.form.rules || {}
      return [].concat(rules[this.prop] || [])
    },
    getFilteredRules (trigger) {
      const rules = this.getRules()
      return rules.filter((rule) => rule.trigger && rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRules(trigger)

      if (!rules || rules.length === 0) {
        return true
      }

      let descriptor = {
        [this.prop]: rules
      }
      let model = {
        [this.prop]: this.fieldValue
      }

      let validator = new Schema(descriptor)
      validator.validate(model, (errors) => {
        if (errors) {
          this.validateState = 'error'
          this.validateMessage = errors
          callback(errors)
        } else {
          this.validateState = 'success'
          this.validateMessage = ''
          callback()
        }
      })
    }
  },
  created () {
    if (this.prop) {
      this.dispatch('ShyForm', 'on-shy-form-item-added', this.prop)
      this.setListeners()
    }
  },
  beforeDestroy () {
    if (this.prop) {
      this.dispatch('ShyForm', 'on-shy-form-item-remove', this.prop)
    }
  }
}
</script>

<style scoped>
  .shy-form-item-is-invalid {
    color: red
  }
</style>
