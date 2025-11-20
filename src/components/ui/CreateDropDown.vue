<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const dropdownOpen = ref(false)

const target = ref(null)
onClickOutside(target, () => (dropdownOpen.value = false))

const options = [
    {
        label: 'Novo Livro',
        description: 'Cadastrar um novo livro',
        icon: 'pi pi-book',
        color: 'text-blue-600',
        route: '/livros/novo'
    },
    {
        label: 'Novo Autor',
        description: 'Adicionar um autor',
        icon: 'pi pi-user',
        color: 'text-emerald-600',
        route: '/autores/novo'
    },
    {
        label: 'Nova Editora',
        description: 'Cadastrar uma editora',
        icon: 'pi pi-building',
        color: 'text-purple-600',
        route: '/editoras/novo'
    }
]

const handleClick = (route) => {
    dropdownOpen.value = false
    router.push(route)
}
</script>

<template>
    <div ref="target" class="relative inline-block">
        <button @click="dropdownOpen = !dropdownOpen"
            class="flex items-center gap-2 px-5 py-3 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md font-medium focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-haspopup="true" :aria-expanded="dropdownOpen">
            <i class="pi pi-plus"></i>
            Cadastrar
            <i class="pi pi-chevron-down text-sm ml-1 transition-transform" :class="{ 'rotate-180': dropdownOpen }"></i>
        </button>

        <transition enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div class="py-3">
                    <button v-for="(option, index) in options" :key="index" @click="handleClick(option.route)"
                        class="w-full px-5 py-4 text-left hover:bg-gray-50 transition flex items-center gap-4 text-gray-800 group">
                        <div
                            class="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition">
                            <i :class="`${option.icon} ${option.color} text-xl`"></i>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-900">{{ option.label }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">{{ option.description }}</div>
                        </div>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>