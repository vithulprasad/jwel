<template>
  <div class="empty-without-dialog">
    <div class="empty">
      <img src="/static/img/Group 23.svg" alt="" />
      <div>
        <h5 class="heading">
          It looks like there are <br />
          no events available at <br />
          the moment.
        </h5>
        <p class="sub-heading">
          Stay tuned for exciting updates and <br />
          upcoming opportunities
        </p>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
}
.heading {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  padding-left: 2rem;
  color: #2f3e6d;
}
.sub-heading {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  padding-left: 2rem;
  color: #6e7ca8;
}
.empty-with-dialog {
  width: 50%; /* Adjust the width as needed */
}

.empty-without-dialog {
  width: 100%;
}
</style>
