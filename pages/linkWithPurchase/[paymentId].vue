<script setup>
import { useUserStore } from '@/stores/user';
const user = useUserStore();
console.log('🚀 ~ user:', user);

watchEffect(async () => {
  if (user.value) {
    const route = useRoute();
    await $fetch(
      `/api/user/linkWithPurchase/${route.params.paymentId}`,
      {
        headers: useRequestHeaders(['cookie']),
      }
    );
    await navigateTo(
      '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
      {
        replace: true,
      }
    );
  }
});
const render = () => {};
</script>
