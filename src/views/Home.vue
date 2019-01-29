<template>
  <div class="home">
    <shy-form :rules="rules" :model="form">
      <shy-form-item label="姓名">
        <shy-input v-model="form.name"/>
      </shy-form-item>

      <shy-form-item label="年龄">
        <shy-input type="number" v-model="form.age"/>
      </shy-form-item>

      <shy-form-item label="email">
        <shy-input v-model="form.email"/>
      </shy-form-item>
    </shy-form>
  </div>
</template>

<script>
import ShyForm from '@/components/ShyForm.vue'
import ShyFormItem from '@/components/ShyFormItem.vue'
import ShyInput from '@/components/ShyInput.vue'

export default {
  name: 'home',
  components: {
    ShyForm,
    ShyFormItem,
    ShyInput
  },
  data () {
    return {
      form: {
        name: '',
        age: '',
        email: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
      }
    }
  }
}
</script>
