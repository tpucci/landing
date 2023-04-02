import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="relative">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="py-12 md:py-20">
          <div class="max-w-3xl mx-auto text-center p-6">
            <h2 class="text-4xl md:text-4xl font-bold leading-tighter tracking-tighter mb-4 font-heading">
              <span class="text-primary" id="keep-updated">
                Keep updated
              </span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-slate-400">
              Leave your email to get notified when the beta launches!
            </p>

            <div class="max-w-xs sm:max-w-md flex flex-nowrap flex-col sm:flex-row gap-4 m-auto justify-center mt-4">
              <div class="flex w-full sm:w-auto">
                <a
                  class="btn btn-primary sm:mb-0 w-full"
                  href="https://forms.gle/j3Fs1Af49VKmHJLy5"
                  target="_blank"
                >
                  Register
                </a>
              </div>
              <div class="flex w-full sm:w-auto">
                <a
                  class="btn w-full bg-gray-50 dark:bg-transparent"
                  href="https://twitter.com/Thomas_Pucci"
                  target="_blank"
                >
                  Follow the author on Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
