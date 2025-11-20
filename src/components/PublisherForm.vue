<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/book'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const store = useBooksStore()

const isCreating = computed(() => route.path.includes('/novo'))
const isEditing = computed(() => route.params.id && !isCreating.value && route.params.id !== 'novo')

const publisherId = computed(() => {
    if (isCreating.value || !route.params.id || route.params.id === 'novo') return null
    return Number(route.params.id)
})

const pageTitle = computed(() => {
    if (isCreating.value) return 'Cadastrar Nova Editora'
    if (isEditing.value) return 'Editar Editora'
    return 'Editora'
})

const validationSchema = toTypedSchema(
    yup.object({
        name: yup
            .string()
            .required('O nome da editora é obrigatório')
            .min(2, 'Mínimo 2 caracteres')
            .max(100, 'Máximo 100 caracteres')
    })
)

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema,
    initialValues: { name: '' }
})

const { value: name, errorMessage: nameError } = useField('name')

onMounted(() => {
    if (isEditing.value) {
        const pub = store.getPublisherById(publisherId.value)
        if (!pub) {
            alert('Editora não encontrada!')
            router.push('/livros')
            return
        }
        resetForm({ values: { name: pub.name } })
    }
})

const onSubmit = handleSubmit((values) => {
    const data = { name: values.name.trim() }

    if (isEditing.value) {
        store.updatePublisher(publisherId.value, data)
        alert('Editora atualizada com sucesso!')
    } else if (isCreating.value) {
        store.addPublisher(data)
        alert('Editora cadastrada com sucesso!')
    }

    router.push('/livros')
})
</script>

<template>
    <div class="p-6">
        <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                {{ pageTitle }}
            </h1>
            <p class="text-gray-600 mb-8">Preencha o nome da editora.</p>

            <form @submit.prevent="onSubmit" class="space-y-8">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Editora</label>
                    <input v-model="name" type="text" placeholder="Ex: Companhia das Letras"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                        :class="{ 'border-red-500': nameError }" />
                    <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
                </div>

                <div class="flex justify-end gap-4 pt-8 border-t">
                    <button type="button" @click="router.push('/livros')"
                        class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md disabled:opacity-70">
                        {{ isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Editora') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>