
<template>
  <div>
    <h1>Form Generator</h1>
    <form-generator
      :form-fields="formFields"
      v-model="formValues"
      @save="onSave"
      @cancel="onCancel"
    >
      <template #name="{ field, value, update }">
        <div>
          <label style="color: blue;">{{ field.label }}</label>
          <input
            :type="field.attributes.type || 'text'"
            :value="value"
            @input="update('name', ($event.target as HTMLInputElement).value)"
            style="border: 1px solid blue;"
          />
        </div>
      </template>
    </form-generator>
    <pre>{{ formValues }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormGenerator from '../components/FormGenerator.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    FormGenerator,
  },
  setup() {
    const formFields = ref({
      name: {
        label: 'Name',
        type: 'input',
        attributes: { type: 'text' },
      },
      email: {
        label: 'Email',
        type: 'input',
        attributes: { type: 'email' },
      },
      gender: {
        label: 'Gender',
        type: 'select',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      subscribe: {
        label: 'Subscribe to newsletter',
        type: 'checkbox',
      },
      message: {
        label: 'Message',
        type: 'textarea',
      },
    });

    const formValues = ref({
      name: 'John Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      subscribe: true,
      message: 'Hello, world!',
    });

    const onSave = (values: any) => {
      console.log('Saved:', values);
    };

    const onCancel = () => {
      console.log('Cancelled');
    };

    return {
      formFields,
      formValues,
      onSave,
      onCancel,
    };
  },
});
</script>
