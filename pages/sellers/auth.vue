<template>
  <div id="AuthPage" class="w-full h-[100vh] bg-white">
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    >
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/logo.png" alt="logo" />
      </NuxtLink>

      <p class="ml-5 text-xl font-semi-bold text-orange-500">for sellers</p>
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
              @click="state = 'Register'; email = ''; password = '';"
            >
              Register as a seller
            </button>
          </div>

          <!-- Email and Password Form -->
          <form class="mb-6">
            <TextInput
              placeholder="Email"
              inputType="email"
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

            <div v-if="state === 'Register'">
              <CountrySelection
                @update="(v) => (country = v)"
                :error="errorCountry"
              />
              <TextInput
                placeholder="City"
                inputType="text"
                class="w-full pb-5"
                v-model:input="city"
                :error="errorCity"
              ></TextInput>

              <TextInput
                placeholder="Zip code"
                inputType="text"
                class="w-full pb-5"
                v-model:input="zipcode"
                :error="errorZip"
              ></TextInput>

              <TextInput
                placeholder="Business name"
                inputType="text"
                class="w-full pb-5"
                v-model:input="businessName"
                :error="errorBusiness"
              ></TextInput>

              <TextInput
                placeholder="Phone number"
                inputType="tel"
                class="w-full pb-5"
                v-model:input="phoneNumber"
                :error="errorPhone"
              ></TextInput>
            </div>

            <button
              type="submit"
              class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-indigo-700"
              @click.prevent="submit"
            >
              {{ state }}
            </button>
          </form>
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
import { navigateTo, useFetch } from "nuxt/app";

const client = useSupabaseClient();
const user = useSupabaseUser();

let state = ref("Log In");

let email = ref("");
let password = ref("");
let country = ref("");
let zipcode = ref("");
let city = ref("");
let businessName = ref("");
let phoneNumber = ref("");

let errorEmail = ref("");
let errorPassword = ref("");
let errorCountry = ref("");
let errorCity = ref("");
let errorZip = ref("");
let errorBusiness = ref("");
let errorPhone = ref("");

let success = ref(false);

watch(state, () => {
  // clear error messages when user changes from login to resgistration section and vice-versa
  errorEmail.value = "";
  errorPassword.value = "";
  errorCountry.value = "";
  errorCity.value = "";
  errorZip.value = "";
  errorBusiness.value = "";
  errorPhone.value = "";
});

watchEffect(() => {
  //if user is logged in try to navigate to the sellers dashboard
  if (user.value) {
    return navigateTo("/sellers/dashboard");
  }
});

const submit = async () => {
  console.log(state.value);
  
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
      return navigateTo("/sellers/dashboard");
    }
  } else if (state.value === "Register") {
    errorPassword.value = "";
    errorCountry.value = "";
    errorCity.value = "";
    errorZip.value = "";
    errorBusiness.value = "";
    errorPhone.value = "";

    //if register section is selected create new user
    if (password.value.length < 6) {
      errorPassword.value = "Your password must have at least 6 characters";
      return;
    }

    if (country.value === "") {
      errorCountry.value = "You must select a country";
      return;
    }

    if (city.value === "") {
      errorCity.value = "You must enter a city name";
      return;
    }

    if (zipcode.value === "") {
      errorZip.value = "You must enter a valid zip code";
      return;
    }

    if (businessName.value === "") {
      errorBusiness.value = "You must enter a business name";
      return;
    }

    //check if phne number is valid using regex test
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        phoneNumber.value
      )
    ) {
      errorPhone.value = "You must enter a valid phone number";
      return;
    }

    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    //error occured creating account
    if (!data.user) {
      errorEmail.value = error.message;
      errorPassword.value = " ";
    } else {
      //the client.auth.signUp creates a user in the authentication section
      //the request below connects this user to its seller information in the Seller table
      await useFetch("/api/prisma/register-seller", {
        method: "POST",
        body: {
          userId: data.user.id,
          email: email.value,
          zipcode: zipcode.value,
          city: city.value,
          country: country.value,
          businessName: businessName.value,
        },
      });

      return navigateTo("/sellers/dashboard");
    }
  }
};
</script>
