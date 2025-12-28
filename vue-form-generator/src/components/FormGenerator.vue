<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <div 
      v-for="(field, key) in formFields" 
      :key="key" 
      class="form-field"
    >
      
      <slot 
        :name="key" 
        :field="field" 
        :value="formValues[key]" 
        :update="updateFormValue"
      >
       
        <label :for="`field-${key}`" class="form-label">
          {{ field.label }}
        </label>
        
      
        <input
          v-if="field.type === 'input'"
          :id="`field-${key}`"
          :type="field.attributes?.type || 'text'"
          v-model="formValues[key]"
          :placeholder="field.attributes?.placeholder || ''"
          class="form-input"
        />
    
        <select 
          v-else-if="field.type === 'select'" 
          :id="`field-${key}`"
          v-model="formValues[key]"
          class="form-select"
        >
          <option 
            v-if="field.placeholder" 
            value=""
            disabled
          >
            {{ field.placeholder }}
          </option>
          <option 
            v-for="option in field.options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        
        
        <div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
          <input
            :id="`field-${key}`"
            type="checkbox"
            v-model="formValues[key]"
            class="form-checkbox"
          />
          <label :for="`field-${key}`" class="checkbox-label">
            {{ field.label }}
          </label>
        </div>
        
   
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="`field-${key}`"
          v-model="formValues[key]"
          :placeholder="field.attributes?.placeholder || ''"
          :rows="field.attributes?.rows || 3"
          class="form-textarea"
        ></textarea>
      </slot>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        Сохранить
      </button>
      <button type="button" @click="handleCancel" class="btn btn-secondary">
        Отмена
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue';


export interface FormField {
  label: string;
  type: 'input' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  attributes?: Record<string, any>;
  options?: { label: string; value: any }[];
}

export default defineComponent({
  name: 'FormGenerator',
  props: {
    
    formFields: {
      type: Object as PropType<{ [key: string]: FormField }>,
      required: true,
      validator: (value: any) => {
        return Object.keys(value).length > 0;
      }
    },
   
    modelValue: {
      type: Object as PropType<{ [key: string]: any }>,
      required: true,
      default: () => ({})
    },
  },
  emits: ['update:modelValue', 'save', 'cancel'],
  setup(props, { emit }) {
   
    const formValues = reactive({ ...props.modelValue });

  
    watch(() => props.modelValue, (newValue) => {
      Object.assign(formValues, newValue);
    }, { deep: true });

    
    watch(formValues, (newValue) => {
      emit('update:modelValue', newValue);
    }, { deep: true });

   
    const updateFormValue = (key: string, value: any) => {
      formValues[key] = value;
    };

    
    const handleSubmit = () => {
      emit('save', { ...formValues });
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
.form-generator {
  max-width: 500px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4d90fe;
  }
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 35px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-checkbox {
  width: 18px;
  height: 18px;
}

.checkbox-label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
}

.btn-primary {
  background-color: #4d90fe;
  color: white;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}
</style>