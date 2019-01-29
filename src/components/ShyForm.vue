<template>
  <div>
    <form>
      <slot></slot>
    </form>
    <button @click="send">发送消息给儿子</button>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from './mixins/emitter'
export default {
  name: 'ShyForm',
  mixins: [emitter],
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
  watch: {
    model: {
      deep: true,
      handler: function () {
        this.validate()
      }
    }
  },
  methods: {
    validate () {
      // 不能这样校验，应当通过观察form item的个数，并且观察form item上的prop属性，如果没有Prop，那么该form item不计入校验
      let validator = new Schema(this.rules)
      validator.validate(this.model, (errors, fields) => {
        if (errors) {
          console.error(errors)
        } else {
          console.log(fields)
        }
      })
    },
    send () {
      this.broadcast('ShyInput', 'custom', {
        name: '1',
        age: 1211
      }, 'hello im father')
    }
  },
  created () {
    this.$on('lol', function (...parameter) {
      console.log('i got it ！', ...parameter)
    })
  }
}
</script>

<style>
</style>
