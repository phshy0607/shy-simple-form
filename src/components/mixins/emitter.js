const broadcast = function (componentName, eventName, ...parameters) {
  this.$children.forEach((child) => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit(eventName, ...parameters)
    } else {
      broadcast.call(child, componentName, eventName, ...parameters)
    }
  })
}

const dispatch = function (componentName, eventName, ...parameters) {
  let parent = this.$parent
  while (parent) {
    if (parent.$options.name === componentName) {
      parent.$emit(eventName, ...parameters)
    }
    parent = parent.$parent
  }
}

export default {
  methods: {
    broadcast (componentName, eventName, ...parameters) {
      broadcast.call(this, componentName, eventName, ...parameters)
    },
    dispatch (componentName, eventName, ...parameters) {
      dispatch.call(this, componentName, eventName, ...parameters)
    }
  }
}
