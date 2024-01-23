<template>
  <div class="d-flex align-items-center mainCard rounded">
    <div class="flex-shrink-0 m-2 p-2">
      <!-- <img src="..." alt="..." /> -->
      <svg
        class="bd-placeholder-img"
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: Image"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#e5e5e5"></rect>
        <text x="50%" y="50%" fill="#999" dy=".3em">Image</text>
      </svg>
    </div>
    <div class="flex-grow-1 ms-3">
      <div class="d-flex">
        <div class="flex-grow-1">
          <h5
            style="
              font-size: 1rem;
              line-height: 20px;
              font-weight: 500;
              color: #2f3e6d;
            "
            class="card-title"
          >
            Citizenship Education Seminar
          </h5>
        </div>
        <div class="">
          <div class="dropdown-center ms-auto">
            <button
              class="btn btn-secondary menu"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/static/icon/more_vert.svg" alt="" />
            </button>
            <ul class="dropdown-menu" style="">
              <li><a class="dropdown-item" href="#">View Details</a></li>
              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- subheading -->
      <p
        class="card-text"
        style="
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
          color: #3c4c7c;
        "
      >
        <img src="/static/icon/distance.svg" alt="" />
        Wellness Convention Center
      </p>
      <!-- icons -->
      <div class="d-flex">
        <p class="card-text icon-text">
          <small class="text-body-secondary"
            ><img src="/static/icon/account_circle.svg" alt="" />
            {{ number }} Joined</small
          >
        </p>
        <p class="card-text pl-2 ml-2 icon-text">
          <small class="text-body-secondary"
            ><img src="/static/icon/theater_comedy.svg" alt="" /> Debate</small
          >
        </p>
        <p class="card-text pl-2 ml-2 icon-text">
          <small class="text-body-secondary"
            ><img src="/static/icon/calendar_month.svg" alt="" /> 2 Days</small
          >
        </p>
        <p class="card-text pl-2 ml-2 icon-text">
          <small class="text-body-secondary"
            ><img src="/static/icon/clinical_notes.svg" alt="" /> 13 yrs+</small
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Component logic
};
let number = 23;
</script>

<style scoped>
.mainCard {
  background-color: white;
}
.menu {
  border: 0cap !important;
  background: none !important;
}
/* .icon-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
} */
</style>
