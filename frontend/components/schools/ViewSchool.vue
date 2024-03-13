<template>
    <div>
        This is view dilog
        <button @click="closeViewDilog">close view</button>

    </div>
</template>

<script setup>
const emit=defineEmits(["closeViewSchool"])
const closeViewDilog=()=>{
    emit("closeViewSchool")
}


</script>

<style  scoped>

</style>