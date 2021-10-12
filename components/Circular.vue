<template>
  <div class="circular">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :width="size"
      :height="size"
    >
      <circle
        class="circular__circle"
        :class="`circular__circle--${circleColor}`"
        fill="none"
        :stroke-width="strokeWidth"
        stroke="#fff"
        :cx="size / 2"
        :cy="size / 2"
        :r="size / 2 - 3"
        stroke-linecap="round"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashoffset="strokeDashOffset"
      ></circle>
    </svg>
    <div class="circular__value">
      <span>{{ circularValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Circular',
  props: {
    size: {
      type: String,
      default: '75',
    },
    value: {
      type: String,
      default: '0',
    },
  },
  computed: {
    strokeWidth() {
      return this.size * 0.05
    },
    strokeDashArray() {
      return Math.ceil((this.size / 2 - 3) * 2 * 3.14)
    },
    strokeDashOffset() {
      return this.value > 0
        ? this.strokeDashArray - this.strokeDashArray * (this.value / 10)
        : 0
    },
    circularValue() {
      return this.value > 0 ? this.value : '--'
    },
    circleColor() {
      if (this.value * 1 >= 7) {
        return 'green'
      } else if (this.value * 1 >= 3) {
        return 'yellow'
      } else if (this.value * 1 > 0) {
        return 'red'
      } else {
        return 'grey'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.circular {
  position: relative;
  background-color: $black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  &__circle {
    &--yellow {
      stroke: #fee440;
    }
    &--green {
      stroke: #77d970;
    }
    &--red {
      stroke: #df2e2e;
    }
    &--grey {
      stroke: #c8c6c6;
    }
  }
  &__value {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    letter-spacing: 1px;
    display: flex;
    align-items: flex-start;
    font-size: 12px;
    span {
      font-size: 20px;
    }
  }
}
</style>
