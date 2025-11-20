<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/book'
import Separator from '@/components/ui/Separator.vue'
import AppBookCard from '@/components/book/AppBookCard.vue'
import BookModal from './book/BookModal.vue'

const route = useRoute()
const router = useRouter()
const store = useBooksStore()

const selectedBook = ref(null)
const modalOpen = ref(false)

const publisherId = computed(() => Number(route.params.id))
const publisher = computed(() => store.getPublisherById(publisherId.value))

const publisherBooks = computed(() => {
    if (!publisher.value) return []
    return store.books
        .filter(book => book.publisherId === publisherId.value)
        .map(book => ({
            ...book,
            authorName: store.authors.find(a => a.id === book.authorId)?.name || 'Autor Desconhecido',
            publisherName: publisher.value.name
        }))
})

const openBookDetail = (book) => {
    selectedBook.value = book
    modalOpen.value = true
}

const closeModal = () => {
    modalOpen.value = false
    setTimeout(() => selectedBook.value = null, 300)
}


onMounted(() => {
    if (!publisher.value) {
        alert('Editora não encontrada!')
        router.push('/livros')
    }
})
</script>

<template>
    <div class="p-6">
        <div v-if="publisher" class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-10">
                <div class="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h1 class="text-4xl font-bold mb-2">{{ publisher.name }}</h1>
                        <p class="text-purple-100 text-lg">ID da Editora: #{{ publisher.id }}</p>
                    </div>
                    <button @click="router.push(`/editoras/${publisher.id}/editar`)"
                        class="text-sm mt-4 md:mt-0 md:text-base px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition flex items-center gap-2 font-medium shadow-lg">
                        <i class="pi pi-pencil"></i>
                        Editar Editora
                    </button>
                </div>
            </div>

            <div class="bg-gray-50 px-10 py-6 border-b">
                <div class="text-3xl font-bold text-purple-600">
                    {{ publisherBooks.length }}
                    <span class="text-lg font-normal text-gray-700 ml-2">livro(s) publicado(s)</span>
                </div>
            </div>

            <div class="p-10">
                <Separator />

                <h2 class="text-2xl font-semibold text-gray-800 mb-6">
                    Livros publicados por {{ publisher.name }}
                </h2>

                <div v-if="publisherBooks.length === 0" class="text-center py-12 text-gray-500">
                    <p class="text-xl">Nenhum livro cadastrado nesta editora.</p>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AppBookCard v-for="book in publisherBooks" :key="book.id" :book="book"
                        @open-modal="openBookDetail" />
                </div>
            </div>
        </div>

        <BookModal :book="selectedBook" :is-open="modalOpen" @close="closeModal" />
    </div>
</template>