<template>
  <div class="form-page">
    <h1>Введите данные пользователя</h1>
    
    <form-generator
      :form-fields="formFields"
      v-model="formValues"
      :loading="loading"
      @save="onSave"
      @cancel="onCancel"
    >
      <template #name="{ field, value, update }">
        <div class="custom-field">
          <div class="field-header">
            <label :for="'field-name'" class="custom-label">
              <span class="icon">👤</span>
              {{ field.label }}
            </label>
            <span class="helper-text">Максимум 50 символов</span>
          </div>
          <input
            :id="'field-name'"
            type="text"
            :value="value"
            @input="update('name', ($event.target as HTMLInputElement).value)"
            :maxlength="50"
            class="custom-input"
            placeholder="Введите ваше имя"
          />
        </div>
      </template>
      
      <template #email="{ field, value, update }">
        <div class="custom-field">
          <label :for="'field-email'" class="custom-label">
            <span class="icon">📧</span>
            {{ field.label }}
          </label>
          <div class="input-with-action">
            <input
              :id="'field-email'"
              type="email"
              :value="value"
              @input="update('email', ($event.target as HTMLInputElement).value)"
              class="custom-input email-input"
              placeholder="example@domain.com"
            />
            <button 
              type="button" 
              class="verify-btn"
              @click="verifyEmail"
            >
              Проверить
            </button>
          </div>
        </div>
      </template>
      
  
      <template #subscribe="{ field, value, update }">
        <div class="custom-checkbox">
          <input
            type="checkbox"
            :id="'field-subscribe'"
            :checked="value"
            @change="update('subscribe', ($event.target as HTMLInputElement).checked)"
            class="custom-checkbox-input"
          />
          <label :for="'field-subscribe'" class="custom-checkbox-label">
            <div class="checkbox-content">
              <span class="icon">🔔</span>
              <div>
                <div class="checkbox-title">{{ field.label }}</div>
                <div class="checkbox-description">
                  Получайте уведомления о новых акциях и предложениях
                </div>
              </div>
            </div>
          </label>
        </div>
      </template>
    </form-generator>
    
    <div class="debug-info" v-if="showDebug">
      <h3>Данные формы:</h3>
      <pre>{{ JSON.stringify(formValues, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormGenerator from '../components/FormGenerator.vue';

export default defineComponent({
  name: 'FormView',
  components: {
    FormGenerator,
  },
  setup() {
    const loading = ref(false);
    const showDebug = ref(false);

    const formFields = {
      name: {
        label: 'Имя пользователя',
        type: 'input' as const,
        required: true,
        placeholder: 'Введите имя',
        validation: (value: string) => {
          if (value && value.length < 2) {
            return 'Имя должно содержать минимум 2 символа';
          }
          return true;   },
      },
      email: {
        label: 'Электронная почта',
        type: 'input' as const,
        required: true,
        attributes: { type: 'email' },
      },
      gender: {
        label: 'Пол',
        type: 'select' as const,
        placeholder: 'Выберите пол',
        options: [
          { label: 'Мужской', value: 'male' },
          { label: 'Женский', value: 'female' },
          { label: 'Другой', value: 'other' },
        ],
      },
      subscribe: {
        label: 'Подписка на новости',
        type: 'checkbox' as const,
      },
      message: {
        label: 'О себе',
        type: 'textarea' as const,
        placeholder: 'Расскажите немного о себе...',
        attributes: { rows: 4 },
      },
    };

    const formValues = ref({
      name: '',
      email: '',
      gender: '',
      subscribe: true,
      message: '',
    });

    const onSave = async (values: any) => {
      loading.value = true;
      try {
       
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Данные сохранены:', values);
        alert('Изменения успешно сохранены!');
      } catch (error) {
        console.error('Ошибка сохранения:', error);
      } finally {
        loading.value = false;
      }
    };

    const onCancel = () => {
      if (confirm('Отменить изменения?')) {
        console.log('Изменения отменены');
     
      }
    };

    const verifyEmail = () => {
      alert('Функция проверки email будет реализована позже');
    };

   
    return {
      formFields,
      formValues,
      loading,
      showDebug,
      onSave,
      onCancel,
      verifyEmail,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.custom-field {
  margin-bottom: 24px;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 6px;
}

.custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
}

.helper-text {
  font-size: 12px;
  color: #7f8c8d;
}

.icon {
  font-size: 18px;
  line-height: 1;
  color: #4d90fe;
}

.custom-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4d90fe;
    box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.1);
  }
}

.email-input {
  font-family: 'Monaco', 'Menlo', monospace;
}

.input-with-action {
  display: flex;
  gap: 12px;
  
  .custom-input {
    flex: 1;
  }
}

.verify-btn {
  padding: 0 20px;
  background-color: #f8f9fa;
  border: 2px solid #4d90fe;
  border-radius: 6px;
  color: #4d90fe;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: #4d90fe;
    color: white;
  }
}

.custom-checkbox {
  margin: 24px 0;
}

.custom-checkbox-input {
  display: none;
  
  &:checked + .custom-checkbox-label .checkbox-content {
    border-color: #4d90fe;
    background-color: rgba(77, 144, 254, 0.05);
  }
}

.custom-checkbox-label {
  display: block;
  cursor: pointer;
}

.checkbox-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4d90fe;
  }
}

.checkbox-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.checkbox-description {
  font-size: 13px;
  color: #7f8c8d;
  line-height: 1.4;
}

.debug-info {
  margin-top: 32px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 16px;
  }
  
  pre {
    margin: 0;
    font-size: 12px;
    color: #34495e;
    background-color: white;
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
  }
}
</style>