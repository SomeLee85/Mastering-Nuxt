<script setup>
const user = useSupabaseUser();
watchEffect(async () => {
  if (user.value) {
    const route = useRoute();
    await $fetch(
      `/api/user/linkWithPurchase/${route.params.paymentId}`,
      {
        headers: useRequestHeaders(['cookie']),
      }
    );
    await navigateTo('/course', {
      replace: true,
    });
  }
});
const render = () => {};
</script>
