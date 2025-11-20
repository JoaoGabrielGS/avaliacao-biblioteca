<script setup>
import Separator from '@/components/ui/Separator.vue'

const props = defineProps({
    book: { type: Object, default: null },
    isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen && book"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                @click.self="emit('close')">
                <div class="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl bg-white shadow-3xl
                 animate-in fade-in zoom-in-95 duration-300">
                    <button @click="emit('close')" class="absolute top-6 right-6 z-20 flex h-12 w-12 items-center justify-center 
                   rounded-full bg-white/90 backdrop-blur shadow-lg hover:bg-white 
                   transition-all hover:scale-110 hover:shadow-xl" aria-label="Fechar">
                        <i class="pi pi-times text-2xl text-gray-700"></i>
                    </button>

                    <div class="grid grid-cols-1 lg:grid-cols-2">
                        <div
                            class="relative h-52 lg:h-full overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                            <img :src="book.cover" :alt="book.title"
                                class="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                            </div>

                            <div class="absolute bottom-8 left-8">
                                <span
                                    class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-5 py-3 text-2xl font-bold text-white shadow-2xl">
                                    {{ book.year }}
                                </span>
                            </div>
                        </div>

                        <div class="p-8 lg:p-12 space-y-8 overflow-y-auto max-h-[95vh]">
                            <div>
                                <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {{ book.title }}
                                </h2>
                                <p class="mt-3 text-lg text-indigo-600 font-medium">
                                    ID do livro: <span class="font-bold">#{{ book.id }}</span>
                                </p>
                            </div>

                            <div class="grid grid-cols-2 gap-6 text-lg">
                                <div class="flex items-center gap-4">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                        <i class="pi pi-user text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">Autor</p>
                                        <p class="font-semibold text-gray-900">{{ book.authorName }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-4">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <i class="pi pi-building text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">Editora</p>
                                        <p class="font-semibold text-gray-900">{{ book.publisherName }}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator class="border-gray-200" />

                            <div>
                                <h3 class="text-2xl font-bold text-gray-800 mb-4">Sinopse</h3>
                                <p class="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                                    {{ book.sinopsis || 'Sinopse não disponível.' }}
                                </p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <button @click="$router.push(`/livros/${book.id}/editar`)"
                                    class="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    <i class="pi pi-pencil"></i>
                                    Editar Livro
                                </button>

                                <button @click="$router.push(`/autores/${book.authorId}`)"
                                    class="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    <i class="pi pi-user"></i>
                                    Ver Autor
                                </button>

                                <button @click="$router.push(`/editoras/${book.publisherId}`)"
                                    class="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    <i class="pi pi-building"></i>
                                    Ver Editora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.animate-in {
    animation: fadeIn 0.4s ease-out, zoomIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        transform: scale(0.9);
    }

    to {
        transform: scale(1);
    }
}

.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}
</style>