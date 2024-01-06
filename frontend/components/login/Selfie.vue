<template>
  <div class="container-fluid logo-container">
    <div class="logo-tag">
      <img src="/static/logo/Logo.svg" alt="" />
      <p class="tag-line">Join discussions, shape democracy.</p>
    </div>
    <div class="selfie">
      <img src="/static/img/selfie.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.logo-container {
  background-color: #e7f2fe;
  width: 41rem;
  height: 54rem;
  margin: 2rem;
  border-radius: 1.25rem;
}
.tag-line {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2.6rem;
  color: #072a85;
  padding-top: 1.5rem;
}
.logo-tag {
  margin: 2rem;
  padding: 2rem;
}
.selfie {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
