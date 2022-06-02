<template>

  <div class="flex justify-between">
  <span class="truncate">{{ indicator_hour }}</span>
  <span class="font-medium xl:ml-auto">{{ indicator_count }}</span>
  </div>

</template>
<script setup>

const props = defineProps({
  indicator_hour: {
    required: true,
    type: String,
  },
  indicator_count: {
    required: true,
    type: String
  },

})

</script>