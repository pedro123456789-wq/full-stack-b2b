<!-- TODO finish email confirmation for sign up -->

<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    >
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/logo.png" alt="logo" />
      </NuxtLink>
    </div>

    <div v-if="!success">
      <div class="bg-white flex items-center justify-center h-screen">
        <div class="bg-white w-96 p-2 rounded shadow-md">
          <div class="flex justify-center items-center">
            <button
              class="p-10 font-semibold"
              :class="state === 'Log In' ? 'text-red-500' : ''"
              @click="state = 'Log In'"
            >
              Log In
            </button>

            <button
              class="p-10 font-semibold"
              :class="state === 'Register' ? 'text-red-500' : ''"
              @click="state = 'Register'"
            >
              Register
            </button>
          </div>

          <!-- Email and Password Form -->
          <form class="mb-6">
            <TextInput
              placeholder="Email"
              inputType="text"
              class="w-full pb-5"
              v-model:input="email"
              :error="errorEmail"
            ></TextInput>

            <TextInput
              placeholder="Password"
              inputType="password"
              class="w-full pb-5"
              v-model:input="password"
              :error="errorPassword"
            ></TextInput>

            <button
              type="submit"
              class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-indigo-700"
              @click.prevent="submit"
            >
              {{ state }}
            </button>
          </form>

          <!-- Alternative login options -->
          <div class="flex justify-center">
            <span class="bg-black h-1 w-1/4 m-2"></span>
            <span>Or continue with</span>
            <span class="bg-black h-1 w-1/4 m-2"></span>
          </div>

          <div class="flex items-center justify-center space-x-2 mt-5 pb-5">
            <button @click="loginWithProvider('google')">
              <img src="/google-logo.png" alt="Google Logo" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 class="text-2xl font-semibold mb-4">Welcome to our platform!</h1>
        <p class="mb-6">
          Thank you for signing up. An email has been sent to your inbox with a
          verification link. Please click the link to verify your email address.
        </p>
        <p class="text-gray-600">
          Didn't receive the email?
          <a href="#" class="text-blue-500 hover:underline">Resend</a>
        </p>
        <div class="mt-6">
          <a
            href="#"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >Go to Dashboard</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

let state = ref("Log In");
let email = ref("");
let password = ref("");
let errorEmail = ref("");
let errorPassword = ref("");
let success = ref(false);

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

const submit = async () => {
  if (state.value === "Log In") {
    //if login section is selected login
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    //error occured, so show it
    if (!data.user) {
      errorEmail.value = error.message;
      errorPassword.value = " ";
    } else {
      //login successful navigate to home page
      errorEmail.value = "";
      errorPassword.value = "";
      return navigateTo("/");
    }
  } else if (state.value === "Register") {
    //if register section is selected create new user
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    //error occured creating account
    if (!data.user) {
      errorEmail.value = error.message;
      errorPassword.value = " ";
    } else {
      errorEmail.value = "";
      errorPassword.value = "";
      success.value = true; //account is created successfully and confirmation email has been sent
    }
  }
};

const loginWithProvider = async (prov) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
    redirectTo: window.location.origin | "/",
  });
};
</script>
