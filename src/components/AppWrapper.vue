<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import { isArray } from '@/utils/utils.js'
import ProfileDropDown from './ui/ProfileDropDown.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = [
    { label: 'Home', icon: 'pi pi-home', path: '/home' },
    { label: 'Livros', icon: 'pi pi-book', path: '/livros' },
    { label: 'Autores', icon: 'pi pi-users', path: '/autores' },
    { label: 'Editoras', icon: 'pi pi-building', path: '/editoras' }
]

onMounted(() => {
    router.push('/home')
})
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <header class="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40">
            <div class="flex items-center justify-between h-full px-6">
                <div class="flex items-center gap-3">
                    <i class="pi pi-book text-3xl text-indigo-600"></i>
                    <h1 class="text-2xl font-bold text-gray-800 tracking-tight">
                        Avaliação<span class="text-indigo-600">Biblioteca</span>
                    </h1>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-500">Bem-vindo(a)!</span>
                    <ProfileDropDown />
                </div>
            </div>
        </header>

        <div class="flex flex-1 pt-16">
            <aside
                class="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 shadow-lg z-30 overflow-y-auto">
                <nav class="p-4 flex-1">
                    <ul class="space-y-1">
                        <li v-for="item in menus" :key="item.path">
                            <RouterLink :to="item.path"
                                class="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 group"
                                active-class="bg-indigo-100 text-indigo-700 font-semibold shadow-sm">
                                <i :class="item.icon" class="text-lg group-hover:scale-110 transition-transform"></i>
                                <span class="font-medium">{{ item.label }}</span>
                                <i
                                    class="pi pi-angle-right ml-auto opacity-0 group-hover:opacity-60 transition-opacity"></i>
                            </RouterLink>
                        </li>
                    </ul>
                </nav>

                <div class="p-4 absolute bottom-0 left-10">
                    <p class="text-xs text-gray-400 text-center">v1.0.0 • Biblioteca Digital</p>
                </div>
            </aside>

            <main class="flex-1 md:ml-64 p-8 overflow-y-auto bg-gray-50">
                <RouterView />
            </main>
        </div>

        <Toast position="bottom-right" class="z-50">
            <template #message="{ message }">
                <div class="flex items-center gap-3">
                    <i :class="[
                        'text-2xl',
                        {
                            'pi pi-check-circle text-green-500': message.severity === 'success',
                            'pi pi-exclamation-triangle text-yellow-500': message.severity === 'warn',
                            'pi pi-times-circle text-red-500': message.severity === 'error',
                            'pi pi-info-circle text-blue-500': message.severity === 'info'
                        }
                    ]"></i>
                    <div>
                        <div class="font-semibold text-gray-900">{{ message.summary }}</div>
                        <div class="text-sm text-gray-600 mt-1">
                            <template v-if="isArray(message.detail)">
                                <p v-for="(line, i) in message.detail" :key="i" class="m-0">{{ line }}</p>
                            </template>
                            <template v-else>
                                {{ message.detail }}
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </Toast>
    </div>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}

.router-link-active {
    position: relative;
}

.router-link-active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 32px;
    background: #6366f1;
    border-radius: 0 4px 4px 0;
}
</style>