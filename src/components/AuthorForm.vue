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

const authorId = computed(() => {
    if (isCreating.value || !route.params.id || route.params.id === 'novo') return null
    return Number(route.params.id)
})

const pageTitle = computed(() => {
    if (isCreating.value) return 'Cadastrar Novo Autor'
    if (isEditing.value) return 'Editar Autor'
    return 'Autor'
})

const buttonText = computed(() => {
    if (isSubmitting.value) return 'Salvando...'
    if (isEditing.value) return 'Salvar Alterações'
    return 'Cadastrar Autor'
})

const validationSchema = toTypedSchema(
    yup.object({
        name: yup
            .string()
            .required('O nome do autor é obrigatório')
            .min(3, 'Mínimo 3 caracteres')
            .max(100, 'Máximo 100 caracteres'),

        birthYear: yup
            .number()
            .required('O ano de nascimento é obrigatório')
            .min(1000, 'Ano muito antigo')
            .max(new Date().getFullYear(), 'Não pode ser no futuro')
            .integer('Deve ser um ano válido')
            .typeError('Digite um ano válido')
    })
)

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema,
    initialValues: {
        name: '',
        birthYear: ''
    }
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: birthYear, errorMessage: birthYearError } = useField('birthYear')

onMounted(() => {
    if (isEditing.value) {
        const author = store.authors.find(a => a.id === authorId.value)
        if (!author) {
            alert('Autor não encontrado!')
            router.push('/livros')
            return
        }

        resetForm({
            values: {
                name: author.name,
                birthYear: author.birthYear
            }
        })
    }
})

const onSubmit = handleSubmit((values) => {
    const authorData = {
        name: values.name.trim(),
        birthYear: Number(values.birthYear)
    }

    if (isEditing.value) {
        store.updateAuthor(authorId.value, authorData)
        alert('Autor atualizado com sucesso!')
    } else {
        store.addAuthor(authorData)
        alert('Autor cadastrado com sucesso!')
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
            <p class="text-gray-600 mb-8">Preencha os dados do autor. Todos os campos são obrigatórios.</p>

            <form @submit.prevent="onSubmit" class="space-y-8">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <input v-model="name" type="text" placeholder="Ex: Machado de Assis"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                        :class="{ 'border-red-500': nameError }" />
                    <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ano de Nascimento</label>
                    <input v-model.number="birthYear" type="number" min="1000" :max="new Date().getFullYear()"
                        placeholder="Ex: 1839"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        :class="{ 'border-red-500': birthYearError }" />
                    <p v-if="birthYearError" class="text-red-500 text-sm mt-1">{{ birthYearError }}</p>
                </div>

                <div class="flex justify-end gap-4 pt-8 border-t">
                    <button type="button" @click="router.push('/livros')"
                        class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md disabled:opacity-70">
                        {{ buttonText }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>