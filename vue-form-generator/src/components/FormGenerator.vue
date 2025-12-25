
<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, key) in formFields" :key="key">
      <slot :name="key" :field="field" :value="formValues[key]" :update="updateFormValue">
        <label>{{ field.label }}</label>
        <input
          v-if="field.type === 'input'"
          :type="field.attributes.type || 'text'"
          v-model="formValues[key]"
        />
        <select v-if="field.type === 'select'" v-model="formValues[key]">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <input
          v-if="field.type === 'checkbox'"
          type="checkbox"
          v-model="formValues[key]"
        />
        <textarea v-if="field.type === 'textarea'" v-model="formValues[key]"></textarea>
      </slot>
    </div>
    <button type="submit">Save</button>
    <button type="button" @click="handleCancel">Cancel</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface FormField {
  label: string;
  type: 'input' | 'select' | 'checkbox' | 'textarea';
  attributes?: any;
  options?: { label: string; value: any }[];
}

export default defineComponent({
  name: 'FormGenerator',
  props: {
    formFields: {
      type: Object as PropType<{ [key: string]: FormField }>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<{ [key: string]: any }>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'save', 'cancel'],
  setup(props, { emit }) {
    const formValues = props.modelValue;

    const updateFormValue = (key: string, value: any) => {
      const newFormValues = { ...formValues, [key]: value };
      emit('update:modelValue', newFormValues);
    };

    const handleSubmit = () => {
      emit('save', formValues);
    };

    const handleCancel = () => {
      emit('cancel');
    };

    return {
      formValues,
      updateFormValue,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
/* Стили для компонента */
</style>
