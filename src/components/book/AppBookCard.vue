<script setup>
import Separator from '../ui/Separator.vue';

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['open-modal'])
</script>

<template>
    <div @click="emit('open-modal', book)" class="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
           transition-all duration-500 ease-out cursor-pointer
           border border-gray-100 hover:border-indigo-200">
        <div class="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <img :src="book.cover" :alt="`Capa de ${book.title}`"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />

            <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <div class="absolute top-4 right-4 z-10">
                <span
                    class="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-lg">
                    {{ book.year }}
                </span>
            </div>

            <div
                class="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-2xl font-bold text-white drop-shadow-2xl leading-tight">
                    {{ book.title }}
                </h3>
                <p class="text-sm text-white/90 mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Clique para ver detalhes
                </p>
            </div>
        </div>

        <div class="p-6 space-y-5">
            <div>
                <p class="text-gray-700 leading-relaxed line-clamp-3">
                    {{ book.sinopsis || 'Sinopse não disponível.' }}
                </p>
            </div>

            <Separator />

            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-3">
                    <span class="text-gray-500">ID</span>
                    <span class="font-bold text-indigo-600">#{{ book.id }}</span>
                </div>

                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span class="text-gray-600 font-medium">Disponível</span>
                </div>
            </div>

            <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div class="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl border border-indigo-200">
                    <span class="text-indigo-700 font-semibold flex items-center gap-2">
                        <i class="pi pi-eye text-lg"></i>
                        Ver Detalhes
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.group:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>