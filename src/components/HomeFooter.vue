<template>
  <div class="container">
    <div>© 2022 booop</div>
    <div>Time tries all things.</div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@mixin fontFamily {
  color: #AAAAAA;
  font-size: 14px;
}

.container {
  @include fontFamily;
  padding: 30px 0 20px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>