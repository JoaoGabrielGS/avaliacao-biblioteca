<script setup>
import { ref, computed } from 'vue'
import AppBookCard from '@/components/book/AppBookCard.vue'
import BookModal from '@/components/book/BookModal.vue'
import CreateDropDown from '@/components/ui/CreateDropDown.vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/book'
import Separator from '@/components/ui/Separator.vue'

const router = useRouter()
const store = useBooksStore()

const search = ref('')
const orderBy = ref('title')
const sort = ref('asc')
const selectedBook = ref(null)
const modalOpen = ref(false)

const enrichedBooks = computed(() => {
  const authorsMap = new Map(store.authors.map(a => [a.id, a.name]))
  const publishersMap = new Map(store.publishers.map(p => [p.id, p.name]))

  return store.books.map(book => ({
    ...book,
    authorName: authorsMap.get(book.authorId) || 'Autor Desconhecido',
    publisherName: publishersMap.get(book.publisherId) || 'Editora Desconhecida',
  }))
})

const filteredBooks = computed(() => {
  const termo = search.value.toLowerCase().trim()
  if (!termo) return enrichedBooks.value

  return enrichedBooks.value.filter(book =>
    book.title.toLowerCase().includes(termo) ||
    book.authorName.toLowerCase().includes(termo) ||
    book.publisherName.toLowerCase().includes(termo)
  )
})

const filteredAndSortedBooks = computed(() => {
  return [...filteredBooks.value].sort((a, b) => {
    let aVal = a[orderBy.value]
    let bVal = b[orderBy.value]

    if (orderBy.value === 'authorName') aVal = a.authorName
    if (orderBy.value === 'authorName') bVal = b.authorName
    if (orderBy.value === 'publisherName') aVal = a.publisherName
    if (orderBy.value === 'publisherName') bVal = b.publisherName

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sort.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sort.value === 'asc' ? 1 : -1
    return 0
  })
})

const toggleSort = () => {
  sort.value = sort.value === 'asc' ? 'desc' : 'asc'
}

const openBookDetail = (book) => {
  selectedBook.value = book
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  setTimeout(() => selectedBook.value = null, 300)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="px-6 py-10">

      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-xl md:text-4xl font-bold text-gray-900 flex items-center gap-4">
            <i class="pi pi-book text-indigo-600 text-5xl"></i>
            Meus Livros
          </h1>
          <p class="text-gray-600 mt-2">Gerencie sua biblioteca digital com facilidade</p>
        </div>
        <CreateDropDown />
      </div>

      <Separator />

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
        <div class="grid md:grid-cols-3 gap-6 items-end">

          <div class="md:col-span-2">
            <label class="flex items-center gap-3 text-gray-700 font-medium mb-2">
              <i class="pi pi-search text-indigo-600"></i>
              Pesquisar livro, autor ou editora
            </label>
            <input v-model="search" type="text" placeholder="Ex: Dom Casmurro, Machado de Assis..."
              class="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 text-gray-800 placeholder-gray-400" />
          </div>

          <div class="flex items-end gap-4">
            <div class="flex-1">
              <label class="text-sm font-medium text-gray-700 block mb-2">Ordenar por</label>
              <select v-model="orderBy"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition">
                <option value="title">Título</option>
                <option value="authorName">Autor</option>
                <option value="year">Ano</option>
                <option value="id">ID</option>
              </select>
            </div>

            <button @click="toggleSort"
              class="px-5 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              :title="sort === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'">
              <i :class="sort === 'asc' ? 'pi pi-sort-amount-up' : 'pi pi-sort-amount-down-alt'" class="text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div class="text-3xl font-bold">{{ store.books.length }}</div>
          <div class="text-blue-100">Total de Livros</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div class="text-3xl font-bold">{{ store.authors.length }}</div>
          <div class="text-emerald-100">Autores</div>
        </div>
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div class="text-3xl font-bold">{{ store.publishers.length }}</div>
          <div class="text-purple-100">Editoras</div>
        </div>
        <div class="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
          <div class="text-3xl font-bold">{{ filteredAndSortedBooks.length }}</div>
          <div class="text-orange-100">Exibidos</div>
        </div>
      </div>

      <div v-if="filteredAndSortedBooks.length === 0" class="text-center py-20">
        <i class="pi pi-book text-8xl text-gray-300 mb-6"></i>
        <p class="text-2xl text-gray-500 font-medium">Nenhum livro encontrado</p>
        <p class="text-gray-400 mt-2">Tente ajustar os filtros ou cadastrar um novo livro.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AppBookCard v-for="book in filteredAndSortedBooks" :key="book.id" :book="book" @open-modal="openBookDetail"
          class="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl" />
      </div>

      <BookModal :book="selectedBook" :is-open="modalOpen" @close="closeModal" />
    </div>
  </div>
</template>