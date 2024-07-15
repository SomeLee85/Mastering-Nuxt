<script setup>
import { useUserStore } from '@/stores/user';
import auth from '~/middleware/auth';
const user = useUserStore();

onMounted(async () => {
  if (user) {
    const route = useRoute();
    const router = useRouter();
    console.log('This should be the route to [paymentId]: ', route.params.paymentId);
    try {
      await useFetch(`/functions/${route.params.paymentId}`, {
        headers: useRequestHeaders(['cookie']),
      });

      await router.push({
        path: '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
      });
    } catch (e) {
      console.error('🚀 ~ watchEffect ~ e:', e);
    }
  }
});
const render = () => {};
definePageMeta({
  auth: auth,
});
</script>
