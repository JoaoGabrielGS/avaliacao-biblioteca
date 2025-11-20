<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div class="max-w-7xl mx-auto px-6 py-16 lg:py-24">

            <div class="text-center mb-20">
                <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Bem-vindo à<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Avaliação<span class="text-indigo-600">Biblioteca</span>
                    </span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Gerencie sua coleção de livros com uma interface moderna, intuitiva e totalmente responsiva.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div
                    class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
                    <div
                        class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <i class="pi pi-book text-4xl text-white"></i>
                    </div>
                    <h3 class="text-4xl font-bold text-gray-800">{{ store.books.length }}</h3>
                    <p class="text-gray-600 text-lg mt-2">Livros Cadastrados</p>
                </div>

                <div
                    class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
                    <div
                        class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <i class="pi pi-users text-4xl text-white"></i>
                    </div>
                    <h3 class="text-4xl font-bold text-gray-800">{{ store.authors.length }}</h3>
                    <p class="text-gray-600 text-lg mt-2">Autores</p>
                </div>

                <div
                    class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
                    <div
                        class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <i class="pi pi-building text-4xl text-white"></i>
                    </div>
                    <h3 class="text-4xl font-bold text-gray-800">{{ store.publishers.length }}</h3>
                    <p class="text-gray-600 text-lg mt-2">Editoras</p>
                </div>
            </div>

            <div class="text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                    Comece agora mesmo
                </h2>
                <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <RouterLink to="/livros"
                        class="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
                        <i class="pi pi-book"></i>
                        Explorar Livros
                    </RouterLink>

                    <RouterLink to="/livros/novo"
                        class="px-10 py-5 bg-white text-indigo-700 border-2 border-indigo-600 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all duration-300 flex items-center gap-3">
                        <i class="pi pi-plus"></i>
                        Cadastrar Novo Livro
                    </RouterLink>
                </div>
            </div>

            <div class="mt-24 text-center">
                <p class="text-gray-500 text-sm">
                    Desenvolvido com
                    <span class="text-red-500">❤</span>
                    Vue 3 • PrimeVue • TailwindCSS
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/book'
import { RouterLink } from 'vue-router'

const store = useBooksStore()
</script>

<style scoped>
.bg-gradient-to-br {
    background: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>