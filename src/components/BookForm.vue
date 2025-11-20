<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/book'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import Separator from '@/components/ui/Separator.vue'

const route = useRoute()
const router = useRouter()
const store = useBooksStore()

const isCreating = computed(() => route.path === '/livros/novo')
const isEditing = computed(() => route.path.includes('/editar'))

const bookId = computed(() => {
    if (isCreating.value) return null
    const match = route.path.match(/\/livros\/(\d+)/)
    return match ? Number(match[1]) : null
})

const pageTitle = computed(() => {
    if (isCreating.value) return 'Cadastrar Novo Livro'
    if (isEditing.value) return 'Editar Livro'
    return 'Livro'
})

const buttonText = computed(() => {
    if (isSubmitting.value) return 'Salvando...'
    return isEditing.value ? 'Salvar Alterações' : 'Cadastrar Livro'
})

const coverPreview = ref('')

const validationSchema = toTypedSchema(
    yup.object({
        title: yup.string().required('O título é obrigatório').min(2).max(200),
        year: yup.number().required('O ano é obrigatório').min(1440).max(new Date().getFullYear() + 5).integer().typeError('Ano inválido'),
        cover: yup.string().required('A URL da capa é obrigatória').url('URL inválida'),
        authorId: yup.number().required('Selecione um autor').positive(),
        publisherId: yup.number().required('Selecione uma editora').positive(),
        sinopsis: yup.string().required('A sinopse é obrigatória').min(10).max(2000)
    })
)

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema,
    initialValues: {
        title: '',
        year: new Date().getFullYear(),
        cover: '',
        authorId: '',
        publisherId: '',
        sinopsis: ''
    }
})

const { value: title, errorMessage: titleError } = useField('title')
const { value: year, errorMessage: yearError } = useField('year')
const { value: cover, errorMessage: coverError } = useField('cover')
const { value: authorId, errorMessage: authorError } = useField('authorId')
const { value: publisherId, errorMessage: publisherError } = useField('publisherId')
const { value: sinopsis, errorMessage: sinopsisError } = useField('sinopsis')

watch(cover, (url) => {
    coverPreview.value = url && yup.string().url().isValidSync(url) ? url : ''
})

onMounted(() => {
    if (isEditing.value && bookId.value) {
        const book = store.getBookById(bookId.value)
        if (!book) {
            alert('Livro não encontrado!')
            router.push('/livros')
            return
        }

        resetForm({
            values: {
                title: book.title,
                year: book.year,
                cover: book.cover,
                authorId: book.authorId,
                publisherId: book.publisherId,
                sinopsis: book.sinopsis
            }
        })

        coverPreview.value = book.cover
    }
})

const onSubmit = handleSubmit((values) => {
    const bookData = {
        title: values.title.trim(),
        year: Number(values.year),
        cover: values.cover.trim(),
        authorId: Number(values.authorId),
        publisherId: Number(values.publisherId),
        sinopsis: values.sinopsis.trim()
    }

    if (isEditing.value && bookId.value) {
        store.updateBook(bookId.value, bookData)
        alert('Livro atualizado com sucesso!')
    } else {
        store.addBook(bookData)
        alert('Livro cadastrado com sucesso!')
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
            <p class="text-gray-600 mb-8">
                Preencha todos os campos abaixo. Todos são obrigatórios.
            </p>

            <form @submit.prevent="onSubmit" class="space-y-8">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Título do Livro</label>
                    <input v-model="title" type="text" placeholder="Ex: Dom Casmurro"
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                        :class="{ 'border-red-500': titleError }" />
                    <p v-if="titleError" class="text-red-500 text-sm mt-1">{{ titleError }}</p>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ano de Publicação</label>
                        <input v-model.number="year" type="number"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': yearError }" />
                        <p v-if="yearError" class="text-red-500 text-sm mt-1">{{ yearError }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                        <select v-model="authorId"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': authorError }">
                            <option :value="null" disabled>Selecione um autor</option>
                            <option v-for="author in store.authors" :key="author.id" :value="author.id">
                                {{ author.name }} ({{ author.birthYear }})
                            </option>
                        </select>
                        <p v-if="authorError" class="text-red-500 text-sm mt-1">{{ authorError }}</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Editora</label>
                        <select v-model="publisherId"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': publisherError }">
                            <option :value="null" disabled>Selecione uma editora</option>
                            <option v-for="pub in store.publishers" :key="pub.id" :value="pub.id">
                                {{ pub.name }}
                            </option>
                        </select>
                        <p v-if="publisherError" class="text-red-500 text-sm mt-1">{{ publisherError }}</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">URL da Capa</label>
                        <input v-model="cover" type="url" placeholder="https://exemplo.com/capa.jpg"
                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            :class="{ 'border-red-500': coverError }" />
                        <p v-if="coverError" class="text-red-500 text-sm mt-1">{{ coverError }}</p>
                    </div>
                </div>

                <div v-if="coverPreview" class="flex justify-center my-8">
                    <img :src="coverPreview" alt="Preview"
                        class="h-80 rounded-lg shadow-xl object-cover border-4 border-white"
                        @error="coverPreview = ''" />
                </div>

                <Separator />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sinopse</label>
                    <textarea v-model="sinopsis" rows="10" placeholder="Escreva a sinopse..."
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                        :class="{ 'border-red-500': sinopsisError }"></textarea>
                    <p v-if="sinopsisError" class="text-red-500 text-sm mt-1">{{ sinopsisError }}</p>
                </div>

                <div class="flex justify-end gap-4 pt-8 border-t">
                    <button type="button" @click="router.push('/livros')"
                        class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md disabled:opacity-70">
                        {{ buttonText }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>