//check if user is signed in -> otherwise redirect to seller auth
//check if user is seller -> otherwise redirect to an error page saying they are not sellers
//check if the seller is verified -> otherwise redirect to error page for unverified sellers

export default defineNuxtRouteMiddleware((from, to) => {
  const user = useSupabaseUser();

  //user is not sigedn in
  if (!user.value && to.fullPath != "/sellers/auth") {
    return navigateTo("/sellers/auth");
  }

  if (user.value) {
    const userId = user.value.id;

    // TODO: add check to see if the user is verified
    useFetch(`/api/prisma/check-user-is-seller/${userId}`).then((response) => {
      if (!response.data.value) {
        //user is not a seller
        return navigateTo("/");
      }
    });
  }
});

