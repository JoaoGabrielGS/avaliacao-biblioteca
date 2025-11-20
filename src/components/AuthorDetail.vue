<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/book'
import Separator from '@/components/ui/Separator.vue'
import AppBookCard from '@/components/book/AppBookCard.vue'

const route = useRoute()
const router = useRouter()
const store = useBooksStore()

const authorId = computed(() => Number(route.params.id))
const author = computed(() => store.authors.find(a => a.id === authorId.value))

const authorBooks = computed(() => {
    if (!author.value) return []

    return store.books
        .filter(book => book.authorId === authorId.value)
        .map(book => ({
            ...book,
            authorName: author.value.name,
            publisherName: store.publishers.find(p => p.id === book.publisherId)?.name || 'Editora Desconhecida'
        }))
})

onMounted(() => {
    if (!author.value) {
        alert('Autor não encontrado!')
        router.push('/livros')
    }
})
</script>

<template>
    <div class="p-6">
        <div v-if="author" class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-10">
                <div class="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h1 class="text-4xl font-bold mb-2">{{ author.name }}</h1>
                        <p class="text-indigo-100 text-lg">ID do Autor: #{{ author.id }}</p>
                    </div>
                    <button @click="router.push(`/autores/${author.id}/editar`)"
                        class="px-6 mt-4 md:mt-0 text-sm md:text-base py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition flex items-center gap-2 font-medium shadow-lg">
                        <i class="pi pi-pencil"></i>
                        Editar Autor
                    </button>
                </div>
            </div>

            <div class="bg-gray-50 px-10 py-6 border-b">
                <div class="flex items-center gap-8 text-gray-700">
                    <div>
                        <span class="text-3xl font-bold text-indigo-600">{{ authorBooks.length }}</span>
                        <span class="ml-2 text-lg">livro(s) publicado(s)</span>
                    </div>
                </div>
            </div>

            <div class="p-10">
                <Separator />

                <h2 class="text-2xl font-semibold text-gray-800 mb-6">
                    Livros de {{ author.name }}
                </h2>

                <div v-if="authorBooks.length === 0" class="text-center py-12 text-gray-500">
                    <i class="pi pi-book text-6xl mb-4 text-gray-300"></i>
                    <p class="text-xl">Nenhum livro cadastrado ainda.</p>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AppBookCard v-for="book in authorBooks" :key="book.id" :book="book"
                        @open-modal="(b) => $router.push(`/livros/${b.id}`)" />
                </div>
            </div>
        </div>
    </div>
</template>