<template>
  <div class="d-flex mb-3">
    <div class="me-auto p-2 d-flex">
      <h6>Draft a bill</h6>
      <div>
        <v-chip class="Hchip" variant="outlined" size="x-small">
          Unpublished
        </v-chip>
      </div>
    </div>
    <div class="p-2">
      <button type="button" class="btn btn-outline-secondary">
        Discard & close
      </button>
    </div>
    <div class="p-2">
      <button type="button" class="btn btn-primary" disabled>Save Bill</button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.Hchip {
  margin-left: 10px;
  margin-bottom: 7px;
}
h6 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
  color: #2f3e6d;
}
</style>
