<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const dropdownOpen = ref(false)

const target = ref(null)
onClickOutside(target, () => (dropdownOpen.value = false))

const options = [
    { label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: 'Livros', icon: 'pi pi-book', route: '/livros' },
    { label: 'Autores', icon: 'pi pi-users', route: '/autores' },
    { label: 'Editoras', icon: 'pi pi-building', route: '/editoras' }
]

const handleClick = (route) => {
    dropdownOpen.value = false
    router.push(route)
}
</script>

<template>
    <div ref="target" class="relative inline-block">

        <div class="cursor-pointer w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg"
            @click="dropdownOpen = !dropdownOpen">
            U
        </div>

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