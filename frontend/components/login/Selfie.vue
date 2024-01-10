<template>
  <div class="selfie-div" style="background-color: #e7f2fe">
    <div class="logo-tag">
      <img src="/static/logo/Logo.svg" alt="" />
      <p class="tag-line">Join discussions, shape democracy.</p>
    </div>

    <div class="d-none d-md-block">
      <img class="selfie" src="/static/img/selfie.svg" alt="" />
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
.tag-line {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2.6rem;
  color: #072a85;
  padding-top: 1.5rem;
  
}
.selfie-div {
  /* height: 100vh; */
  border-radius: 1rem;
  margin: 2rem;
}
.logo-tag {
  padding-left: 1.5rem;
  padding-top: 1.5rem;
}

.selfie {
  padding-left: 2rem;
  width: 23rem;
  height: 25rem;
}
</style>
